import { useState, useRef } from 'react';
import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

function Translate() {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fromLanguage, setFromLanguage] = useState(t('translate.autoDetect'));
  const [toLanguage, setToLanguage] = useState(t('translate.target.english'));
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showRows, setShowRows] = useState(10);
  const [previewImage, setPreviewImage] = useState(null);

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
    { key: t('translate.autoDetect'), label: t('translate.autoDetect') },
    { key: t('translate.source.japanese'), label: t('translate.source.japanese') },
    { key: t('translate.source.english'), label: t('translate.source.english') },
    { key: t('translate.source.korean'), label: t('translate.source.korean') }
  ];

  const targetLanguages = [
    { key: t('translate.target.english'), label: t('translate.target.english') },
    { key: t('translate.target.japanese'), label: t('translate.target.japanese') },
    { key: t('translate.target.spanish'), label: t('translate.target.spanish') },
    { key: t('translate.target.french'), label: t('translate.target.french') }
  ];

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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fromItems = sourceLanguages.map((language) => ({
    key: language.key,
    label: language.label,
  }));

  const toItems = targetLanguages.map((language) => ({
    key: language.key,
    label: language.label,
  }));

  return (
    <div className="space-y-10 pb-16">
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
            className="w-full rounded-[1.75rem] border border-white/10 bg-background/90 px-4 py-4 text-left text-text transition duration-300 hover:border-accent focus:outline-none sm:max-w-[16rem]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-text/70">{t('translate.translateFrom')}</div>
                <div className="mt-2 text-sm font-semibold text-text">{fromLanguage}</div>
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
            className="w-full rounded-[1.75rem] border border-white/10 bg-background/90 px-4 py-4 text-left text-text transition duration-300 hover:border-accent focus:outline-none sm:max-w-[16rem]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-text/70">{t('translate.translateTo')}</div>
                <div className="mt-2 text-sm font-semibold text-text">{toLanguage}</div>
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
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div
          className={`group rounded-[2rem] border border-white/10 bg-surface p-8 shadow-neu transition-all duration-300 ${
            isDragging
              ? 'border-accent bg-background/90 shadow-[0_0_0_1px_rgba(59,130,246,0.3)]'
              : 'hover:border-accent/40 hover:shadow-[0_20px_48px_rgba(59,130,246,0.1)]'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <button
              onClick={handleFileButtonClick}
              type="button"
              className="flex h-24 w-24 items-center justify-center rounded-[2.25rem] bg-background/80 text-accent shadow-neu-sm transition hover:scale-110 hover:shadow-neu"
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
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-background p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <h3 className="mb-4 text-lg font-semibold text-text">{t('translate.outputTitle')}</h3>
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-surface/90 p-6 shadow-neu-sm transition duration-300">
            {selectedFiles.length === 0 ? (
              <p className="text-center text-text/70">{t('translate.outputPlaceholder')}</p>
            ) : selectedFiles.length === 1 ? (
              selectedFiles[0].isImage ? (
                <button
                  onClick={() => setPreviewImage(selectedFiles[0])}
                  type="button"
                  className="max-h-full max-w-full rounded-[1rem] shadow-neu transition hover:shadow-[0_20px_48px_rgba(59,130,246,0.3)] hover:scale-105"
                >
                  <img
                    src={selectedFiles[0].dataUrl}
                    alt={selectedFiles[0].name}
                    className="max-h-full max-w-full rounded-[1rem]"
                  />
                </button>
              ) : (
                <div className="text-center">
                  <p className="font-semibold text-text">{selectedFiles[0].name}</p>
                  <p className="text-xs text-text/70 mt-2">Archive file</p>
                </div>
              )
            ) : (
              <div className="w-full overflow-y-auto max-h-80">
                <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                  {selectedFiles.map((file) => (
                    <div key={file.id} className="group relative overflow-hidden rounded-[0.75rem] bg-background shadow-neu-sm transition hover:shadow-[0_12px_24px_rgba(59,130,246,0.15)]">
                      {file.isImage ? (
                        <>
                          <button
                            onClick={() => setPreviewImage(file)}
                            type="button"
                            className="h-24 w-full object-cover transition group-hover:scale-105"
                          >
                            <img
                              src={file.dataUrl}
                              alt={file.name}
                              className="h-24 w-full object-cover transition group-hover:scale-105"
                            />
                          </button>
                          <button
                            onClick={() => removeFile(file.id)}
                            type="button"
                            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/80 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                            title="Remove image"
                          >
                            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex h-24 items-center justify-center bg-background/90 p-2 text-center">
                            <p className="text-xs font-semibold text-text/70 line-clamp-2">{file.name}</p>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            type="button"
                            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/80 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                            title="Remove file"
                          >
                            <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background shadow-[0_16px_36px_rgba(59,130,246,0.24)] transition duration-300 hover:bg-accentSoft hover:shadow-[0_18px_42px_rgba(59,130,246,0.32)]">
          {t('translate.translateButton')}
        </button>
        <button
          onClick={handleClear}
          className={`rounded-full px-8 py-4 text-sm font-semibold transition duration-300 ${
            selectedFiles.length > 0
              ? 'border border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500 hover:text-red-300'
              : 'border border-white/10 bg-background/90 text-text/80 hover:border-accent hover:text-accent'
          }`}
        >
          {t('translate.clearButton')}
        </button>
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-surface/90 p-8 shadow-neu pb-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-text">{t('translate.recentTitle')}</h2>
          <label className="flex items-center gap-3 text-sm text-text/70">
            <span className="font-medium text-text/70">{t('translate.sortBy')}</span>
            <select className="rounded-full border border-white/10 bg-background/90 px-4 py-2 text-sm text-text outline-none transition focus:border-accent">
              <option>{t('translate.sortNewest')}</option>
              <option>{t('translate.sortOldest')}</option>
              <option>{t('translate.sortName')}</option>
            </select>
          </label>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-background/90 shadow-neu-sm">
          <table className="min-w-full text-left text-sm text-text/70">
            <thead className="border-b border-white/10 bg-background/90">
              <tr>
                <th className="px-6 py-4 font-semibold text-text">{t('translate.outputTitle')}</th>
                <th className="hidden sm:table-cell px-6 py-4 font-semibold text-text">Status</th>
                <th className="hidden md:table-cell px-6 py-4 font-semibold text-text">Languages</th>
                <th className="hidden lg:table-cell px-6 py-4 font-semibold text-text">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-24">
                <td colSpan="4" className="px-6 py-8 text-center text-text/50 sm:px-12">
                  {t('translate.noTranslations')}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-col gap-4 border-t border-white/10 bg-background/90 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="hidden sm:flex items-center gap-3 text-sm text-text/70">
              <span>{t('translate.showRows')}</span>
              <select
                value={showRows}
                onChange={(event) => setShowRows(Number(event.target.value))}
                className="rounded-full border border-white/10 bg-surface px-3 py-2 text-sm text-text outline-none transition focus:border-accent"
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-text/70 sm:justify-end">
              <span>{t('translate.pagination.range')}</span>
              <div className="flex items-center gap-2">
                <button className="rounded-full border border-white/10 bg-surface px-3 py-2 text-sm text-text/70 transition hover:border-accent hover:text-accent" disabled>
                  {t('translate.pagination.prev')}
                </button>
                <button className="rounded-full border border-white/10 bg-surface px-3 py-2 text-sm text-text/70 transition hover:border-accent hover:text-accent" disabled>
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
