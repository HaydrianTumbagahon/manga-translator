const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

const loadImage = (blob) => new Promise((resolve, reject) => {
  const image = new Image();
  const objectUrl = URL.createObjectURL(blob);
  image.onload = () => {
    URL.revokeObjectURL(objectUrl);
    resolve(image);
  };
  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    reject(new Error('Could not load the page for rendering.'));
  };
  image.src = objectUrl;
});

const sampleBackground = (context, x, y) => {
  try {
    const pixel = context.getImageData(
      clamp(Math.round(x), 0, context.canvas.width - 1),
      clamp(Math.round(y), 0, context.canvas.height - 1),
      1,
      1,
    ).data;
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
  } catch {
    return '#ffffff';
  }
};

const wrapText = (context, text, maxWidth) => {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (context.measureText(nextLine).width <= maxWidth || !line) {
      line = nextLine;
    } else {
      lines.push(line);
      line = word;
    }
  });

  if (line) lines.push(line);
  return lines.length ? lines : [''];
};

const drawTextToFit = (context, text, x, y, width, height) => {
  const padding = Math.max(8, Math.round(Math.min(width, height) * 0.08));
  const maxWidth = Math.max(1, width - padding * 2);
  const maxHeight = Math.max(1, height - padding * 2);
  let fontSize = clamp(Math.round(Math.min(width, height) * 0.18), 12, 64);
  let lines = [];
  let lineHeight = 0;

  while (fontSize >= 10) {
    context.font = `600 ${fontSize}px "Comic Neue", "Comic Sans MS", sans-serif`;
    lines = wrapText(context, text, maxWidth);
    lineHeight = Math.round(fontSize * 1.15);
    if (lines.length * lineHeight <= maxHeight) break;
    fontSize -= 2;
  }

  context.font = `600 ${fontSize}px "Comic Neue", "Comic Sans MS", sans-serif`;
  context.fillStyle = '#111827';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const totalHeight = lines.length * lineHeight;
  const firstLineY = y + height / 2 - totalHeight / 2 + lineHeight / 2;

  lines.forEach((line, index) => {
    context.fillText(line, x + width / 2, firstLineY + index * lineHeight, maxWidth);
  });
};

export const renderTranslatedPage = async (imageBlob, regions) => {
  const image = await loadImage(imageBlob);
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('This browser cannot create a canvas context.');

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  regions.forEach((region) => {
    if (!Array.isArray(region.box) || region.box.length !== 4 || !region.translation) return;
    const [ymin, xmin, ymax, xmax] = region.box.map(Number);
    const x = clamp((xmin / 1000) * canvas.width, 0, canvas.width);
    const y = clamp((ymin / 1000) * canvas.height, 0, canvas.height);
    const right = clamp((xmax / 1000) * canvas.width, x, canvas.width);
    const bottom = clamp((ymax / 1000) * canvas.height, y, canvas.height);
    const width = right - x;
    const height = bottom - y;
    if (width < 2 || height < 2) return;

    const background = sampleBackground(context, x + width / 2, y + height / 2);
    context.fillStyle = background || '#ffffff';
    context.fillRect(x, y, width, height);
    drawTextToFit(context, region.translation, x, y, width, height);
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Could not export the rendered page.'));
    }, imageBlob.type === 'image/jpeg' ? 'image/jpeg' : 'image/png', 0.95);
  });
};
