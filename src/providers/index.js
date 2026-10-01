import { MODEL as GEMINI_MODEL, testGeminiKey, translatePageWithFallback as translateGeminiPage } from './gemini.js';

export const PROVIDERS = {
  gemini: {
    label: 'Google Gemini',
    defaultModel: GEMINI_MODEL,
    modelOptions: [
      { id: 'gemini-3.5-flash-lite', label: 'Starter / free tier' },
      { id: 'gemini-3.8-flash', label: 'Advanced / paid tier' },
      { id: 'gemini-3.1-pro-preview', label: 'Premium / paid tier' },
    ],
    keyStorage: 'geminiApiKey',
    modelStorage: 'geminiModel',
  },
  grok: {
    label: 'xAI Grok',
    defaultModel: 'grok-4.7',
    modelOptions: [
      { id: 'grok-4.3', label: 'Standard / paid API' },
      { id: 'grok-4.7', label: 'Advanced / paid API' },
    ],
    keyStorage: 'grokApiKey',
    modelStorage: 'grokModel',
  },
  openai: {
    label: 'OpenAI ChatGPT',
    defaultModel: 'gpt-6-luna',
    modelOptions: [
      { id: 'gpt-6-luna', label: 'Economy / paid API' },
      { id: 'gpt-6.1-sol', label: 'Balanced / paid API' },
      { id: 'gpt-6-astra', label: 'Premium / paid API' },
    ],
    keyStorage: 'openaiApiKey',
    modelStorage: 'openaiModel',
  },
};

const API_ENDPOINTS = {
  grok: 'https://api.x.ai/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions',
};

const regionSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      box: {
        type: 'array',
        minItems: 4,
        maxItems: 4,
        items: { type: 'integer', minimum: 0, maximum: 1000 },
        description: 'Exactly [ymin, xmin, ymax, xmax], normalized from 0 to 1000.',
      },
      original: { type: 'string' },
      translation: { type: 'string' },
      type: { type: 'string', enum: ['bubble', 'narration', 'sfx'] },
    },
    required: ['box', 'original', 'translation', 'type'],
    additionalProperties: false,
  },
};

const fileToBase64 = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result).split(',')[1]);
  reader.onerror = () => reject(new Error('Could not read the image for the selected provider.'));
  reader.readAsDataURL(blob);
});

const providerError = async (response, provider) => {
  let message = `${provider} request failed with status ${response.status}.`;
  try {
    const payload = await response.json();
    message = payload?.error?.message || payload?.error?.details || message;
  } catch {
    // Keep the status message when the provider does not return JSON.
  }
  const error = new Error(message);
  error.status = response.status;
  error.provider = provider;
  return error;
};

const requestCompatibleProvider = async (provider, apiKey, model, body) => {
  if (!apiKey?.trim()) throw new Error(`Enter your ${PROVIDERS[provider].label} API key first.`);
  if (!model?.trim()) throw new Error(`Enter a ${PROVIDERS[provider].label} model name first.`);

  let response;
  try {
    response = await fetch(API_ENDPOINTS[provider], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({ ...body, model: model.trim() }),
    });
  } catch {
    throw new Error(`Could not reach ${PROVIDERS[provider].label}. Check your internet connection and browser CORS permissions.`);
  }

  if (!response.ok) throw await providerError(response, PROVIDERS[provider].label);
  return response.json();
};

const buildPrompt = (sourceLang, targetLang) => `Find every text region in this manga page, including speech bubbles, narration boxes, sound effects, and free-floating text. Read the original text and translate it from ${sourceLang} to ${targetLang}. Preserve tone, honorifics, character voice, and slang. Return only valid JSON matching the supplied schema. Box values must be [ymin, xmin, ymax, xmax] normalized from 0 to 1000.`;

const parseCompatibleRegions = (response, provider) => {
  const text = response?.choices?.[0]?.message?.content;
  if (!text) throw new Error(`${provider} returned no translation data.`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${provider} returned invalid JSON for the translation regions.`);
  }
};

const compatibleBody = (prompt, imageBlob, base64Image, isTest = false) => ({
  messages: [{
    role: 'user',
    content: isTest ? prompt : [
      { type: 'text', text: prompt },
      {
        type: 'image_url',
        image_url: {
          url: `data:${imageBlob.type || 'image/png'};base64,${base64Image}`,
          detail: 'high',
        },
      },
    ],
  }],
  max_completion_tokens: isTest ? 8 : 8192,
  ...(isTest ? {} : {
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'manga_translation_regions',
        strict: true,
        schema: regionSchema,
      },
    },
  }),
});

export const testProvider = async (provider, apiKey, model) => {
  if (provider === 'gemini') return testGeminiKey(apiKey, model);
  return requestCompatibleProvider(provider, apiKey, model, compatibleBody('Reply with exactly: OK', null, null, true));
};

export const translatePageWithProvider = async (provider, imageBlob, sourceLang, targetLang, apiKey, model) => {
  if (provider === 'gemini') {
    const result = await translateGeminiPage(imageBlob, sourceLang, targetLang, apiKey, model);
    return { regions: result.regions, modelUsed: result.modelUsed, usedFallback: result.usedFallback };
  }

  const base64Image = await fileToBase64(imageBlob);
  const response = await requestCompatibleProvider(
    provider,
    apiKey,
    model,
    compatibleBody(buildPrompt(sourceLang, targetLang), imageBlob, base64Image),
  );
  return { regions: parseCompatibleRegions(response, PROVIDERS[provider].label), modelUsed: model, usedFallback: false };
};
