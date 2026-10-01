import { useState, useRef } from 'react';
import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { FiDownload } from 'react-icons/fi';
import TranslationSettings from './components/TranslationSettings.jsx';
import { MODEL } from './providers/gemini.js';
import { PROVIDERS, translatePageWithProvider } from './providers/index.js';
import { renderTranslatedPage } from './lib/canvasRenderer.js';

function Translate({ isSettingsOpen, setIsSettingsOpen }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fromLanguage, setFromLanguage] = useState('auto');
  const [toLanguage, setToLanguage] = useState('en');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showRows, setShowRows] = useState(10);
  const [sortBy, setSortBy] = useState('newest');
  const [previewImage, setPreviewImage] = useState(null);
  const [provider, setProvider] = useState(() => localStorage.getItem('aiProvider') || 'gemini');
  const [apiKeys, setApiKeys] = useState(() => ({
    gemini: localStorage.getItem('geminiApiKey') || '',
    grok: localStorage.getItem('grokApiKey') || '',
    openai: localStorage.getItem('openaiApiKey') || '',
  }));
  const [models, setModels] = useState(() => ({
    gemini: localStorage.getItem('geminiModel') || MODEL,
    grok: localStorage.getItem('grokModel') || PROVIDERS.grok.defaultModel,
    openai: localStorage.getItem('openaiModel') || PROVIDERS.openai.defaultModel,
  }));
  const [readingDirection, setReadingDirection] = useState('rtl');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);
  const [translationError, setTranslationError] = useState('');
  const [translationNotice, setTranslationNotice] = useState('');
  const [translatedImages, setTranslatedImages] = useState([]);
  const [recentTranslations, setRecentTranslations] = useState([]);

  const apiKey = apiKeys[provider] || '';
  const model = models[provider] || PROVIDERS[provider].defaultModel;

  const handleProviderChange = (nextProvider) => {
    setProvider(nextProvider);
    localStorage.setItem('aiProvider', nextProvider);
  };

  const handleApiKeyChange = (nextKey) => {
    setApiKeys((previousKeys) => ({ ...previousKeys, [provider]: nextKey }));
    localStorage.setItem(PROVIDERS[provider].keyStorage, nextKey);
  };

  const handleModelChange = (nextModel) => {
    setModels((previousModels) => ({ ...previousModels, [provider]: nextModel }));
    localStorage.setItem(PROVIDERS[provider].modelStorage, nextModel);
  };

  const supportedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'zip', 'cbz'];

  const isSupportedFile = (file) => {
    const extension = file.name.toLowerCase().split('.').pop();
    return supportedExtensions.includes(extension);
  };

  const fileToDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files) => {
    const filteredFiles = Array.from(files).filter(isSupportedFile);
    if (filteredFiles.length === 0) return;

    const fileDataPromises = filteredFiles.map(async (file) => {
      const dataUrl = await fileToDataUrl(file);
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        file,
        dataUrl,
        isImage: ['jpg', 'jpeg', 'png', 'webp'].includes(file.name.toLowerCase().split('.').pop()),
      };
    });

    const fileData = await Promise.all(fileDataPromises);
    setSelectedFiles((prevFiles) => [...prevFiles, ...fileData]);
  };

  const handleFileInputChange = (event) => {
    handleFiles(event.target.files);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileId) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const sourceLanguages = [
    { key: 'auto', code: 'AUTO', label: t('translate.autoDetect') },
    { key: 'ja', code: 'JP', label: t('translate.source.japanese') },
    { key: 'en', code: 'EN', label: t('translate.source.english') },
    { key: 'ko', code: 'KR', label: t('translate.source.korean') }
  ];

  const targetLanguages = [
    { key: 'en', code: 'EN', label: t('translate.target.english') },
    { key: 'ja', code: 'JP', label: t('translate.target.japanese') },
    { key: 'es', code: 'ES', label: t('translate.target.spanish') },
    { key: 'fr', code: 'FR', label: t('translate.target.french') }
  ];

  const sortOptions = [
    { key: 'newest', label: t('translate.sortNewest') },
    { key: 'oldest', label: t('translate.sortOldest') },
    { key: 'name', label: t('translate.sortName') }
  ];

  const rowOptions = [10, 30, 50].map((rows) => ({
    key: String(rows),
    label: String(rows),
  }));

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleClear = () => {
    setSelectedFiles([]);
    setTranslationResult(null);
    setTranslationError('');
    setTranslationNotice('');
    translatedImages.forEach(({ url }) => URL.revokeObjectURL(url));
    setTranslatedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRender = async (result = translationResult, selectedImage = selectedFiles.find((file) => file.isImage)) => {
    if (!selectedImage || !result) return;

    try {
      const renderedBlob = await renderTranslatedPage(selectedImage.file, result);
      const nextUrl = URL.createObjectURL(renderedBlob);
      setTranslatedImages((previousImages) => previousImages.map((image) => {
        if (image.fileId !== selectedImage.id) return image;
        URL.revokeObjectURL(image.url);
        return { ...image, url: nextUrl };
      }));
    } catch (error) {
      setTranslationError(error.message);
    }
  };

  const handleTranslate = async () => {
    const imageFiles = selectedFiles.filter((file) => file.isImage);
    if (imageFiles.length === 0) {
      setTranslationError('Import one image before translating. ZIP and CBZ files are not supported in this step.');
      return;
    }

    setIsTranslating(true);
    setTranslationResult(null);
    setTranslationError('');
    setTranslatedImages((previousImages) => {
      previousImages.forEach(({ url }) => URL.revokeObjectURL(url));
      return [];
    });

    let lastRegions = null;
    let usedFallbackModel = '';

    for (const selectedImage of imageFiles) {
      const extension = selectedImage.name.split('.').pop()?.toUpperCase() || 'IMAGE';
      const translationId = `${selectedImage.id}-${Date.now()}`;
      const translatedAt = new Date().toLocaleString();
      setRecentTranslations((previous) => [{
        id: translationId,
        name: selectedImage.name,
        fileType: extension,
        status: 'translating',
        source: selectedSource?.code || fromLanguage,
        target: selectedTarget?.code || toLanguage,
        translatedAt,
        downloadUrl: '',
      }, ...previous]);

      try {
        const { regions, modelUsed, usedFallback } = await translatePageWithProvider(
          provider,
          selectedImage.file,
          selectedSource?.label || fromLanguage,
          selectedTarget?.label || toLanguage,
          apiKey,
          model,
        );
        console.log('[MangaTranslator] Translation JSON result:', regions);
        const renderedBlob = await renderTranslatedPage(selectedImage.file, regions);
        const renderedUrl = URL.createObjectURL(renderedBlob);
        const translatedImage = {
          fileId: selectedImage.id,
          name: selectedImage.name,
          url: renderedUrl,
        };
        setTranslatedImages((previous) => [...previous, translatedImage]);
        setRecentTranslations((previous) => previous.map((item) => item.id === translationId
          ? { ...item, status: 'done', downloadUrl: renderedUrl }
          : item));
        lastRegions = regions;
        if (usedFallback) usedFallbackModel = modelUsed;
      } catch (error) {
        setRecentTranslations((previous) => previous.map((item) => item.id === translationId
          ? { ...item, status: 'failed', error: error.message }
          : item));
        setTranslationError(error.message);
      }
    }

    setTranslationResult(lastRegions);
    setTranslationNotice(usedFallbackModel ? t('translate.fallbackNotice', { model: usedFallbackModel }) : '');
    setIsTranslating(false);
  };

  const downloadTranslation = (translation) => {
    if (!translation.downloadUrl) return;
    const link = document.createElement('a');
    const baseName = translation.name.replace(/\.[^/.]+$/, '');
    link.href = translation.downloadUrl;
    link.download = `${baseName}_translated.png`;
    link.click();
  };

  const fromItems = sourceLanguages.map((language) => ({
    key: language.key,
    label: language.label,
  }));

  const toItems = targetLanguages.map((language) => ({
    key: language.key,
    label: language.label,
  }));

  const selectedSource = sourceLanguages.find(({ key }) => key === fromLanguage);
  const selectedTarget = targetLanguages.find(({ key }) => key === toLanguage);
  const visibleRecentTranslations = [...recentTranslations]
    .sort((first, second) => {
      if (sortBy === 'name') return first.name.localeCompare(second.name);
      const firstTime = new Date(first.translatedAt).getTime();
      const secondTime = new Date(second.translatedAt).getTime();
      return sortBy === 'oldest' ? firstTime - secondTime : secondTime - firstTime;
    })
    .slice(0, showRows);

  return (
    <div className="space-y-10 pb-16">
      <TranslationSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        provider={provider}
        setProvider={handleProviderChange}
        providers={PROVIDERS}
        apiKey={apiKey}
        setApiKey={handleApiKeyChange}
        model={model}
        setModel={handleModelChange}
        targetLanguage={toLanguage}
        setTargetLanguage={setToLanguage}
        readingDirection={readingDirection}
        setReadingDirection={setReadingDirection}
        targetLanguages={targetLanguages}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Dropdown
          menu={{
            items: fromItems,
            onClick: ({ key }) => setFromLanguage(key),
          }}
          trigger={['click']}
          placement="bottomLeft"
        >
          <button
            type="button"
            className="neu-dropdown-trigger"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-text/70">{t('translate.translateFrom')}</div>
                <div className="mt-2 text-sm font-semibold tracking-[0.2em] text-text">{selectedSource?.code}</div>
              </div>
              <span className="text-text/50">▾</span>
            </div>
          </button>
        </Dropdown>

        <Dropdown
          menu={{
            items: toItems,
            onClick: ({ key }) => setToLanguage(key),
          }}
          trigger={['click']}
          placement="bottomLeft"
        >
          <button
            type="button"
            className="neu-dropdown-trigger"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-text/70">{t('translate.translateTo')}</div>
                <div className="mt-2 text-sm font-semibold tracking-[0.2em] text-text">{selectedTarget?.code}</div>
              </div>
              <span className="text-text/50">▾</span>
            </div>
          </button>
        </Dropdown>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,.zip,.cbz"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div
          className={`neu-card group p-8 transition-all duration-300 ${
            isDragging
              ? 'border-accent bg-background/90 shadow-[0_0_0_1px_rgba(59,130,246,0.3)]'
              : 'hover:border-accent/40 hover:shadow-[0_20px_48px_rgba(59,130,246,0.1)]'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex h-full min-h-[22rem] flex-col items-center justify-center gap-6 text-center">
            {selectedFiles.length === 0 ? (
              <>
                <button
                  onClick={handleFileButtonClick}
                  type="button"
                  className="neu-button neu-button-icon flex h-24 w-24 items-center justify-center rounded-[2rem] bg-background/80 text-accent shadow-neu-sm transition hover:scale-110 hover:shadow-neu"
                  aria-label={t('translate.browseTitle')}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12" aria-hidden="true">
                    <path d="M8 16h8a4 4 0 0 0 0-8 5 5 0 0 0-9.9 1.4A3.5 3.5 0 0 0 8 16Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M9 13l3-3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="space-y-3">
                  <p className="text-xl font-semibold text-text">{t('translate.browseTitle')}</p>
                  <p className="text-sm text-text/70">{t('translate.browseSubtitle')}</p>
                </div>
              </>
            ) : (
              <div className="w-full text-left">
                <div className={`import-preview-area ${selectedFiles.length > 1 ? 'import-preview-area-batch' : 'import-preview-area-single'}`}>
                  <div className={selectedFiles.length === 1 ? 'flex items-center justify-center gap-3' : 'grid grid-cols-4 gap-2 sm:gap-3'}>
                    <button
                      onClick={handleFileButtonClick}
                      type="button"
                      className="import-add-tile"
                      aria-label={t('translate.browseTitle')}
                      title={t('translate.browseTitle')}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                    {selectedFiles.map((file) => (
                      <div key={file.id} className={`group relative min-w-0 overflow-hidden rounded-xl bg-background shadow-neu-sm ${selectedFiles.length === 1 ? 'max-w-[75%]' : ''}`}>
                        {file.isImage ? (
                          <button
                            onClick={() => setPreviewImage(file)}
                            type="button"
                            className={selectedFiles.length === 1 ? 'block max-h-[18rem] overflow-hidden' : 'block aspect-square w-full overflow-hidden'}
                          >
                            <img
                              src={file.dataUrl}
                              alt={file.name}
                              className={selectedFiles.length === 1 ? 'block max-h-[18rem] max-w-full object-contain transition duration-300 group-hover:scale-[1.02]' : 'h-full w-full object-contain p-1 transition duration-300 group-hover:scale-105'}
                            />
                          </button>
                        ) : (
                          <div className="flex aspect-square items-center justify-center p-3 text-center">
                            <p className="line-clamp-3 text-xs font-semibold text-text/70">{file.name}</p>
                          </div>
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          type="button"
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-lg bg-background/90 text-text opacity-0 shadow-neu-sm transition group-hover:opacity-100 hover:text-red-300"
                          title="Remove file"
                          aria-label={`Remove ${file.name}`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="neu-card p-8 transition duration-300 hover:shadow-neu-sm">
          <h3 className="mb-4 text-lg font-semibold text-text">{t('translate.outputTitle')}</h3>
          {translationNotice && <p className="mb-3 text-sm leading-6 text-amber-200">{translationNotice}</p>}
          <div className="neu-well flex min-h-[300px] flex-col items-center justify-center overflow-auto p-6 transition duration-300">
            {translationError ? (
              <p className="text-center text-sm leading-6 text-red-300">{translationError}</p>
            ) : translatedImages.length > 0 ? (
              translatedImages.length === 1 ? (
                <button
                  type="button"
                  onClick={() => setPreviewImage({ name: translatedImages[0].name, dataUrl: translatedImages[0].url })}
                  className="group max-h-[28rem] max-w-full overflow-hidden rounded-xl bg-background shadow-neu-sm"
                >
                  <img
                    src={translatedImages[0].url}
                    alt={translatedImages[0].name}
                    className="block max-h-[28rem] max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                  />
                </button>
              ) : (
                <div className="translated-output-gallery-batch">
                  <div className="grid w-full grid-cols-3 gap-3">
                    {translatedImages.map((image) => (
                      <button
                        key={image.fileId}
                        type="button"
                        onClick={() => setPreviewImage({ name: image.name, dataUrl: image.url })}
                        className="group overflow-hidden rounded-xl bg-background shadow-neu-sm"
                      >
                        <img
                          src={image.url}
                          alt={image.name}
                          className="aspect-square h-full w-full object-contain p-1 transition duration-300 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )
            ) : translationResult ? (
              <pre className="max-h-72 w-full overflow-auto whitespace-pre-wrap break-words text-left text-xs leading-5 text-text/80">
                {JSON.stringify(translationResult, null, 2)}
              </pre>
            ) : (
              <p className="text-center text-text/70">{t('translate.outputPlaceholder')}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={handleTranslate}
          disabled={isTranslating || selectedFiles.length === 0}
          className="neu-button neu-button-primary px-8 py-4"
        >
          {isTranslating ? 'Translating...' : t('translate.translateButton')}
        </button>
        {translationResult && (
          <button
            onClick={() => handleRender()}
            type="button"
            className="neu-button px-8 py-4"
          >
            Render translation
          </button>
        )}
        <button
          onClick={handleClear}
          className={`neu-button px-8 py-4 ${
            selectedFiles.length > 0
              ? 'neu-button-danger'
              : ''
          }`}
        >
          {t('translate.clearButton')}
        </button>
      </div>

      <section className="neu-card p-8 pb-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-text">{t('translate.recentTitle')}</h2>
          <div className="flex items-center gap-3 text-sm text-text/70">
            <span className="font-medium text-text/70">{t('translate.sortBy')}</span>
            <Dropdown
              menu={{
                items: sortOptions,
                onClick: ({ key }) => setSortBy(key),
              }}
              trigger={['click']}
              placement="bottomRight"
            >
              <button type="button" className="neu-dropdown-compact min-w-[13rem]" aria-haspopup="menu">
                <span>{sortOptions.find(({ key }) => key === sortBy)?.label}</span>
                <span className="text-text/50" aria-hidden="true">▾</span>
              </button>
            </Dropdown>
          </div>
        </div>

        <div className="neu-well overflow-hidden">
          <table className="min-w-full text-left text-sm text-text/70">
            <thead className="border-b border-white/10 bg-background/90">
              <tr>
                <th className="px-4 py-4 font-semibold text-text">Preview</th>
                <th className="px-4 py-4 font-semibold text-text">File</th>
                <th className="px-4 py-4 font-semibold text-text">Status</th>
                <th className="hidden md:table-cell px-4 py-4 font-semibold text-text">Languages</th>
                <th className="hidden lg:table-cell px-4 py-4 font-semibold text-text">Date and time</th>
                <th className="px-4 py-4 text-right font-semibold text-text">Download</th>
              </tr>
            </thead>
            <tbody>
              {visibleRecentTranslations.length === 0 ? (
                <tr className="h-24">
                  <td colSpan="6" className="px-6 py-8 text-center text-text/50 sm:px-12">
                    {t('translate.noTranslations')}
                  </td>
                </tr>
              ) : visibleRecentTranslations.map((translation) => (
                <tr key={translation.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3">
                    {translation.downloadUrl ? (
                      <img src={translation.downloadUrl} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-surface" aria-hidden="true" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="max-w-[14rem] truncate font-medium text-text">{translation.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text/50">{translation.fileType}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={translation.status === 'done' ? 'text-emerald-300' : translation.status === 'failed' ? 'text-red-300' : 'text-amber-200'}>
                      {translation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text/70">{translation.source} → {translation.target}</td>
                  <td className="px-4 py-3 text-text/70">{translation.translatedAt}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => downloadTranslation(translation)}
                      disabled={!translation.downloadUrl}
                      className="neu-button neu-button-icon ml-auto"
                      aria-label={`Download ${translation.name}`}
                      title={`Download ${translation.name}`}
                    >
                      <FiDownload aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col gap-4 border-t border-white/10 bg-background/90 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="hidden sm:flex items-center gap-3 text-sm text-text/70">
              <span>{t('translate.showRows')}</span>
              <Dropdown
                menu={{
                  items: rowOptions,
                  onClick: ({ key }) => setShowRows(Number(key)),
                }}
                trigger={['click']}
                placement="topLeft"
              >
                <button type="button" className="neu-dropdown-compact min-w-16" aria-haspopup="menu">
                  <span>{showRows}</span>
                  <span className="text-text/50" aria-hidden="true">▾</span>
                </button>
              </Dropdown>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-text/70 sm:justify-end">
              <span>{t('translate.pagination.range')}</span>
              <div className="flex items-center gap-2">
                <button className="neu-button px-3 py-2" disabled>
                  {t('translate.pagination.prev')}
                </button>
                <button className="neu-button px-3 py-2" disabled>
                  {t('translate.pagination.next')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[90vw] rounded-[2rem] bg-background p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <button
              onClick={() => setPreviewImage(null)}
              type="button"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/90 text-white transition hover:bg-red-600 z-10"
              title="Close preview"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <img
              src={previewImage.dataUrl}
              alt={previewImage.name}
              className="max-h-[85vh] max-w-[85vw] rounded-[1.5rem]"
            />
            <p className="mt-4 text-center text-sm text-text/70">{previewImage.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Translate;
