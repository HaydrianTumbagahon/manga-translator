import { useTranslation } from 'react-i18next';
import { FiSettings } from 'react-icons/fi';

const tabs = ['Dashboard', 'Translate'];
const drawerLinks = ['About', 'FAQs', 'Terms and Conditions', 'Privacy Policy'];

function Navbar({ activeTab, setActiveTab, isDrawerOpen, setIsDrawerOpen, onOpenSettings }) {
  const { t } = useTranslation();

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const handleLogoClick = () => {
    setActiveTab('Home');
    setIsDrawerOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-xl shadow-neu">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={handleLogoClick}
          className="text-xl font-bold tracking-tight text-text sm:text-2xl transition hover:text-accent"
          aria-label={t('app.title')}
        >
          {t('app.title')}
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              const tabKey = tab.toLowerCase();
              return (
                <button
                  key={tab}
                  onClick={() => handleNavigate(tab)}
                  className={`neu-button px-5 py-2 focus:outline-none hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-active ${
                    isActive
                      ? 'neu-button-primary'
                      : 'text-text/70 hover:text-text'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(`nav.${tabKey}`)}
                </button>
              );
            })}
          </nav>

          {activeTab === 'Translate' && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="neu-button neu-button-icon"
              aria-label={t('translate.settings.open')}
              title={t('translate.settings.open')}
            >
              <FiSettings aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="md:hidden">
          <div className="hamburger">
            <input
              className="checkbox"
              type="checkbox"
              checked={isDrawerOpen}
              onChange={(event) => setIsDrawerOpen(event.target.checked)}
              aria-label={t('app.title')}
            />
            <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
              <path className="lineTop line" strokeLinecap="round" strokeWidth="4" stroke="currentColor" d="M6 11L44 11" />
              <path className="lineMid line" strokeLinecap="round" strokeWidth="4" stroke="currentColor" d="M6 24H43" />
              <path className="lineBottom line" strokeLinecap="round" strokeWidth="4" stroke="currentColor" d="M6 37H43" />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-2xl transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 h-screen w-1/2 max-w-[280px] transform bg-surface/95 border-l border-white/10 shadow-neu transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="hamburger"
                onClick={() => setIsDrawerOpen(false)}
                aria-label={t('app.title')}
              >
                <input className="checkbox" type="checkbox" checked={isDrawerOpen} readOnly />
                <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
                  <path className="lineTop line" strokeLinecap="round" strokeWidth="4" stroke="currentColor" d="M6 11L44 11" />
                  <path className="lineMid line" strokeLinecap="round" strokeWidth="4" stroke="currentColor" d="M6 24H43" />
                  <path className="lineBottom line" strokeLinecap="round" strokeWidth="4" stroke="currentColor" d="M6 37H43" />
                </svg>
              </button>
            </div>

            <div className="mt-10 space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleNavigate(tab)}
                  className="neu-button w-full justify-start px-5 py-5 text-left text-base"
                >
                  {t(`nav.${tab.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-text/60">{t('footer.linksLabel')}</p>
            <div className="space-y-3">
              {drawerLinks.map((link) => {
                const key = link === 'Terms and Conditions' ? 'terms' : link === 'Privacy Policy' ? 'privacy' : link.toLowerCase();
                return (
                  <button
                    key={link}
                    type="button"
                    onClick={() => handleNavigate(link)}
                    className="neu-button w-full justify-start px-4 py-4 text-left text-sm font-medium text-text/80"
                  >
                    {t(`nav.${key}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
