export const MODEL = 'gemini-3.5-flash-lite';
export const FALLBACK_MODELS = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash'];
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

const getErrorMessage = async (response) => {
  try {
    const payload = await response.json();
    return payload?.error?.message || `Gemini request failed with status ${response.status}.`;
  } catch {
    return `Gemini request failed with status ${response.status}.`;
  }
};

const requestGemini = async (apiKey, model, body) => {
  if (!apiKey?.trim()) {
    throw new Error('Enter a Gemini API key first.');
  }
  if (!model?.trim()) {
    throw new Error('Enter a Gemini model name in Settings first.');
  }

  let response;
  try {
    response = await fetch(`${GEMINI_ENDPOINT}/${encodeURIComponent(model.trim())}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey.trim(),
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Could not reach Gemini. Check your internet connection and browser permissions.');
  }

  if (!response.ok) {
    const message = await getErrorMessage(response);
    const error = new Error(message);
    error.status = response.status;
    error.apiMessage = message;
    error.modelUnavailable = response.status === 404 || /not found|no longer available|does not exist/i.test(message);
    error.capacityIssue = [429, 500, 502, 503, 504].includes(response.status)
      || /high demand|temporarily unavailable|resource[_ ]exhausted|overloaded|capacity/i.test(message);
    throw error;
  }

  return response.json();
};

const fileToBase64 = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result).split(',')[1]);
  reader.onerror = () => reject(new Error('Could not read the image for Gemini.'));
  reader.readAsDataURL(blob);
});

export const testGeminiKey = async (apiKey, model = MODEL) => {
  return requestGemini(apiKey, model, {
    contents: [{
      parts: [{ text: 'Reply with exactly: OK' }],
    }],
    generationConfig: {
      maxOutputTokens: 8,
    },
  });
};

export const translatePage = async (imageBlob, sourceLang, targetLang, apiKey, model = MODEL) => {
  const base64Image = await fileToBase64(imageBlob);
  const prompt = `Find every text region in this manga page, including speech bubbles, narration boxes, sound effects, and free-floating text. Read the original text and translate it from ${sourceLang} to ${targetLang}. Preserve tone, honorifics, character voice, and slang. Return only valid JSON in this shape: [{"box":[ymin,xmin,ymax,xmax],"original":"...","translation":"...","type":"bubble|narration|sfx"}]. Box values must be normalized from 0 to 1000.`;

  const response = await requestGemini(apiKey, model, {
    contents: [{
      parts: [
        { text: prompt },
        {
          inline_data: {
            mime_type: imageBlob.type || 'image/png',
            data: base64Image,
          },
        },
      ],
    }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            box: {
              type: 'ARRAY',
              minItems: 4,
              maxItems: 4,
              items: { type: 'INTEGER', minimum: 0, maximum: 1000 },
              description: 'Exactly [ymin, xmin, ymax, xmax], normalized from 0 to 1000.',
            },
            original: { type: 'STRING' },
            translation: { type: 'STRING' },
            type: { type: 'STRING', enum: ['bubble', 'narration', 'sfx'] },
          },
          required: ['box', 'original', 'translation', 'type'],
        },
      },
    },
  });

  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini returned no translation data.');
  }

  return JSON.parse(text);
};

export const translatePageWithFallback = async (imageBlob, sourceLang, targetLang, apiKey, model = MODEL) => {
  const modelsToTry = [model, ...FALLBACK_MODELS].filter((candidate, index, models) => candidate && models.indexOf(candidate) === index);
  let lastError;

  for (const modelToTry of modelsToTry) {
    try {
      const regions = await translatePage(imageBlob, sourceLang, targetLang, apiKey, modelToTry);
      return {
        regions,
        modelUsed: modelToTry,
        usedFallback: modelToTry !== model,
      };
    } catch (error) {
      lastError = error;
      if (!error.capacityIssue) throw error;
    }
  }

  const error = new Error(`Gemini models are temporarily unavailable. Tried: ${modelsToTry.join(', ')}. Last API error: ${lastError?.message || 'unknown error'}`);
  error.apiMessage = lastError?.apiMessage || error.message;
  error.capacityIssue = true;
  throw error;
};
