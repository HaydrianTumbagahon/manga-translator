import { useTranslation } from 'react-i18next';

function Landing({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-0 flex flex-col items-center justify-center gap-10 py-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
      <div className="mx-auto space-y-10 max-w-2xl lg:max-w-lg">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold leading-tight text-text sm:text-6xl">
            {t('landing.title')}
          </h1>
          <p className="text-lg leading-8 text-text/70">
            {t('landing.description')}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => onNavigate('Translate')}
            className="neu-button neu-button-primary px-8 py-4"
          >
            {t('landing.start')}
          </button>
          <button
            onClick={() => onNavigate('Dashboard')}
            className="neu-button px-8 py-4 text-text/80"
          >
            {t('landing.dashboard')}
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <img
          src="/LP-bg-img.png"
          alt={t('landing.title')}
          className="h-[520px] max-w-full object-contain"
        />
      </div>
    </div>
  );
}

export default Landing;
