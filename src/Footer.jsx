import { useTranslation } from 'react-i18next';

const links = ['About', 'FAQs', 'Terms and Conditions', 'Privacy Policy'];
const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ar', label: 'العربية' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'tr', label: 'Türkçe' }
];
const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.805 1.305 3.49.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.125-.305-.535-1.53.115-3.185 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.655.245 2.88.12 3.185.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.1.81 2.22 0 1.605-.015 2.9-.015 3.29 0 .325.21.705.825.585C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.34 4.34 0 001.9-2.4 8.7 8.7 0 01-2.75 1.05 4.33 4.33 0 00-7.38 3.95 12.27 12.27 0 01-8.9-4.5 4.33 4.33 0 001.34 5.78 4.28 4.28 0 01-1.96-.54v.06a4.33 4.33 0 003.47 4.24 4.34 4.34 0 01-1.95.07 4.34 4.34 0 004.05 3.01A8.7 8.7 0 012 19.54a12.29 12.29 0 006.64 1.95c7.97 0 12.33-6.6 12.33-12.33v-.56A8.8 8.8 0 0024 5.5a8.5 8.5 0 01-2.54.7z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.075.037c-.21.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.405-.42-.874-.632-1.249a.069.069 0 00-.075-.037 19.736 19.736 0 00-4.885 1.515.063.063 0 00-.032.027C2.825 9.03 1.918 13.56 2.5 18.03a.082.082 0 00.031.056 19.92 19.92 0 005.994 3.065.07.07 0 00.077-.027c.46-.63.874-1.295 1.226-1.99a.069.069 0 00-.04-.098 13.92 13.92 0 01-1.987-.951.07.07 0 01-.007-.116c.133-.1.266-.204.393-.31a.07.07 0 01.077-.01c4.168 1.9 8.68 1.9 12.854 0a.069.069 0 01.079.009c.128.107.26.212.394.312a.07.07 0 01-.006.116 13.576 13.576 0 01-1.986.951.069.069 0 00-.04.098c.36.695.774 1.36 1.226 1.99a.07.07 0 00.077.027 19.926 19.926 0 005.994-3.065.082.082 0 00.031-.056c.589-4.533-.322-9.052-2.927-13.635a.061.061 0 00-.031-.028zm-11.49 9.173c-1.183 0-2.157-1.086-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.211 0 2.188 1.1 2.158 2.42 0 1.334-.957 2.42-2.158 2.42zm7.436 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.211 0 2.188 1.1 2.158 2.42 0 1.334-.947 2.42-2.158 2.42z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1-2.9-.2-7.2-.2-7.2-.2h-.1s-4.3 0-7.2.2c-.4.1-1.4.1-2.1 1-.6.7-.8 2.3-.8 2.3S2 7.9 2 9.7v1.6c0 1.8.2 3.5.2 3.5s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.1 7.2.2 7.2.2s4.3 0 7.2-.2c.4-.1 1.4-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.7.2-3.5v-1.6c0-1.8-.2-3.5-.2-3.5zM9.75 14.57V8.43l5.5 3.07-5.5 3.07z" />
      </svg>
    ),
  }
];

function Footer({ setActiveTab }) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const handleLinkClick = (link) => {
    setActiveTab(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
  };

  const footerLinks = links.map((link) => ({ key: link, label: t(`nav.${link === 'Terms and Conditions' ? 'terms' : link === 'Privacy Policy' ? 'privacy' : link.toLowerCase()}`) }));

  return (
    <footer className="mt-auto border-t border-white/10 bg-background/95 py-6 text-text/70 shadow-neu-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:gap-8 sm:px-6 lg:px-8">
        <div className="space-y-4 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">{t('footer.linksLabel')}</p>
          <div className="space-y-3 text-sm text-text/70">
            {footerLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleLinkClick(link.key)}
                className="block text-left transition hover:text-accent"
                type="button"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">{t('footer.languagesLabel')}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {languages.map((lang) => {
              const active = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`text-sm transition duration-200 ease-out ${
                    active
                      ? 'text-accent'
                      : 'text-text/70 hover:text-accent'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">Social</p>
          <div className="flex flex-wrap items-center gap-3">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[1.5rem] bg-surface shadow-neu transition duration-300 hover:bg-accentSoft/10 hover:text-accent"
                aria-label={item.name}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-4 text-center text-xs text-text/50 sm:px-6 lg:px-8">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}

export default Footer;
