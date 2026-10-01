import { useTranslation } from 'react-i18next';

function Dashboard({ onCreate }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-0 flex flex-col items-center justify-center px-4 py-8 text-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-surface text-6xl shadow-neu-sm">
          😢
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold text-text">{t('dashboard.title')}</h2>
          <p className="text-lg leading-8 text-text/70">{t('dashboard.description')}</p>
        </div>
        <button
          onClick={onCreate}
          className="neu-button neu-button-primary mx-auto px-12 py-4 text-base focus:outline-none"
        >
          {t('dashboard.button')}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
