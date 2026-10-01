import { useState } from 'react';
import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import { testProvider } from '../providers/index.js';

function TranslationSettings({ isOpen, onClose, provider, setProvider, providers, apiKey, setApiKey, model, setModel, targetLanguage, setTargetLanguage, readingDirection, setReadingDirection, targetLanguages }) {
  const { t } = useTranslation();
  const [isTesting, setIsTesting] = useState(false);
  const [testMessage, setTestMessage] = useState('');
  const [testError, setTestError] = useState(false);

  const handleKeyChange = (event) => {
    const nextKey = event.target.value;
    setApiKey(nextKey);
    setTestMessage('');
    setTestError(false);
  };

  const handleModelChange = (event) => {
    const nextModel = event.target.value;
    setModel(nextModel);
    setTestMessage('');
    setTestError(false);
  };

  const handleTestKey = async () => {
    setIsTesting(true);
    setTestMessage('');
    setTestError(false);

    try {
      await testProvider(provider, apiKey, model);
      setTestMessage(t('translate.settings.testSuccess'));
    } catch (error) {
      const modelMessage = error.modelUnavailable ? ` ${t('translate.settings.modelUnavailable')}` : '';
      setTestMessage(`${error.message}${modelMessage}`);
      setTestError(true);
    } finally {
      setIsTesting(false);
    }
  };

  const targetItems = targetLanguages.map((language) => ({
    key: language.key,
    label: language.label,
  }));
  const selectedTarget = targetLanguages.find(({ key }) => key === targetLanguage);
  const providerItems = Object.entries(providers).map(([key, config]) => ({
    key,
    label: config.label,
  }));
  const modelItems = (providers[provider]?.modelOptions || []).map((option) => ({
    key: option.id,
    label: `${option.label} (${option.id})`,
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-24 backdrop-blur-sm sm:p-8 sm:pt-28">
      <section className="neu-card relative w-full max-w-3xl space-y-5 p-6" aria-labelledby="translation-settings-title">
        <button
          type="button"
          onClick={onClose}
          className="neu-button neu-button-icon absolute right-5 top-5"
          aria-label={t('translate.settings.close')}
          title={t('translate.settings.close')}
        >
          <FiX aria-hidden="true" />
        </button>
        <div className="pr-12">
          <h2 id="translation-settings-title" className="text-xl font-semibold text-text">
            {t('translate.settings.title')}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text/70">
            {t('translate.settings.description')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 text-sm text-text/80">
          <span className="font-medium text-text">{t('translate.settings.provider')}</span>
          <Dropdown
            menu={{
              items: providerItems,
              onClick: ({ key }) => setProvider(key),
            }}
            trigger={['click']}
            placement="bottomLeft"
          >
            <button type="button" className="neu-dropdown-compact w-full" aria-haspopup="menu">
              <span>{providers[provider]?.label}</span>
              <span className="text-text/50" aria-hidden="true">▾</span>
            </button>
          </Dropdown>
        </div>

          <label className="space-y-2 text-sm text-text/80">
          <span className="font-medium text-text">{providers[provider]?.label} {t('translate.settings.apiKey')}</span>
          <input
            type="password"
            value={apiKey}
            onChange={handleKeyChange}
            placeholder={t('translate.settings.apiKeyPlaceholder')}
            autoComplete="off"
            className="neu-native-select w-full"
          />
          </label>

          <div className="space-y-2 text-sm text-text/80">
            <span className="font-medium text-text">{t('translate.settings.model')}</span>
            <Dropdown
              menu={{
                items: modelItems,
                onClick: ({ key }) => handleModelChange({ target: { value: key } }),
              }}
              trigger={['click']}
              placement="bottomLeft"
            >
              <button type="button" className="neu-dropdown-compact w-full" aria-haspopup="menu">
                <span>{modelItems.find((option) => option.key === model)?.label || model}</span>
                <span className="text-text/50" aria-hidden="true">▾</span>
              </button>
            </Dropdown>
          </div>

        <div className="space-y-2 text-sm text-text/80">
          <span className="font-medium text-text">{t('translate.settings.targetLanguage')}</span>
          <Dropdown
            menu={{
              items: targetItems,
              onClick: ({ key }) => setTargetLanguage(key),
            }}
            trigger={['click']}
            placement="bottomLeft"
          >
            <button type="button" className="neu-dropdown-compact w-full" aria-haspopup="menu">
              <span>{selectedTarget?.label}</span>
              <span className="text-text/50" aria-hidden="true">▾</span>
            </button>
          </Dropdown>
        </div>

        <div className="space-y-2 text-sm text-text/80 md:col-span-2">
          <span className="font-medium text-text">{t('translate.settings.readingDirection')}</span>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setReadingDirection('rtl')}
              className={`neu-button ${readingDirection === 'rtl' ? 'neu-button-primary' : ''}`}
              aria-pressed={readingDirection === 'rtl'}
            >
              {t('translate.settings.mangaDirection')}
            </button>
            <button
              type="button"
              onClick={() => setReadingDirection('ttb')}
              className={`neu-button ${readingDirection === 'ttb' ? 'neu-button-primary' : ''}`}
              aria-pressed={readingDirection === 'ttb'}
            >
              {t('translate.settings.manhwaDirection')}
            </button>
          </div>
        </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleTestKey}
          disabled={isTesting || !apiKey.trim() || !model.trim()}
          className="neu-button neu-button-primary"
        >
          {isTesting ? t('translate.settings.testing') : t('translate.settings.testKey')}
        </button>
        {testMessage && (
          <p className={`text-sm ${testError ? 'text-red-300' : 'text-emerald-300'}`} role="status">
            {testMessage}
          </p>
        )}
        </div>

        <p className="text-xs leading-5 text-text/55">
          {t('translate.settings.keyNote')} {t('translate.settings.providerNote')}
        </p>
      </section>
    </div>
  );
}

export default TranslationSettings;
