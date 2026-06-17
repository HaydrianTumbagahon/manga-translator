import { useState } from 'react';
import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

function Translate() {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [fromLanguage, setFromLanguage] = useState(t('translate.autoDetect'));
  const [toLanguage, setToLanguage] = useState(t('translate.target.english'));
  const [outputText, setOutputText] = useState('');
  const [showRows, setShowRows] = useState(10);

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
    const files = Array.from(event.dataTransfer.files).map((file) => file.name).join(', ');
    setOutputText(files ? `${t('translate.outputPlaceholder')} ${files}` : '');
  };

  const handleClear = () => {
    setOutputText('');
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
            <div className="flex h-24 w-24 items-center justify-center rounded-[2.25rem] bg-background/80 text-accent shadow-neu-sm">
              <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12" aria-hidden="true">
                <path d="M8 16h8a4 4 0 0 0 0-8 5 5 0 0 0-9.9 1.4A3.5 3.5 0 0 0 8 16Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M9 13l3-3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="space-y-3">
              <p className="text-xl font-semibold text-text">{t('translate.browseTitle')}</p>
              <p className="text-sm text-text/70">{t('translate.browseSubtitle')}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-background p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <h3 className="mb-4 text-lg font-semibold text-text">{t('translate.outputTitle')}</h3>
          <div className="flex min-h-[300px] items-center justify-center rounded-[1.75rem] border border-white/10 bg-surface/90 p-6 text-center text-text/70 shadow-neu-sm transition duration-300">
            <p>{outputText || t('translate.outputPlaceholder')}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background shadow-[0_16px_36px_rgba(59,130,246,0.24)] transition duration-300 hover:bg-accentSoft hover:shadow-[0_18px_42px_rgba(59,130,246,0.32)]">
          {t('translate.translateButton')}
        </button>
        <button
          onClick={handleClear}
          className="rounded-full border border-white/10 bg-background/90 px-8 py-4 text-sm font-semibold text-text/80 transition duration-300 hover:border-accent hover:text-accent"
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
    </div>
  );
}

export default Translate;
