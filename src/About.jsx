import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  const benefits = t('about.benefits', { returnObjects: true });

  return (
    <div className="w-full space-y-10 pb-16 sm:space-y-12">
      <div className="w-full space-y-4 sm:space-y-6">
        <div className="w-full space-y-3 sm:space-y-4">
          <h1 className="break-words text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl lg:text-6xl">
            {t('about.title')}
          </h1>
          <p className="text-base leading-7 text-text/70 sm:text-lg sm:leading-8">
            {t('about.description')}
          </p>
        </div>
      </div>

      <div className="grid w-full gap-4 sm:gap-6 md:grid-cols-2">
        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-accent/10 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" strokeWidth="2" stroke="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">{t('about.passionTitle')}</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            {t('about.passionText')}
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-accent/10 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" strokeWidth="2" stroke="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">{t('about.missionTitle')}</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            {t('about.missionText')}
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-accent/10 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" strokeWidth="2" stroke="currentColor">
              <path d="M12 2L15.09 8.26H22L17.45 12.79L19.54 19.05L12 14.46L4.46 19.05L6.55 12.79L2 8.26H8.91L12 2Z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">{t('about.featuresTitle')}</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            {t('about.featuresText')}
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-accent/10 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" strokeWidth="2" stroke="currentColor">
              <path d="M9 12L11 14L15 10M21 12A9 9 0 11 1 3 12A9 9 0 01 21 12Z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">{t('about.visionTitle')}</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            {t('about.visionText')}
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-background/80 p-5 sm:p-8 shadow-neu">
        <h2 className="mb-4 text-2xl font-bold text-text sm:mb-6 sm:text-3xl">{t('about.whyTitle')}</h2>
        <div className="grid w-full gap-3 sm:gap-4 sm:grid-cols-2">
          {benefits.map((item, idx) => (
            <div key={idx} className="w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/50 p-4">
              <p className="text-sm font-semibold text-accent sm:text-base">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-text/70 sm:text-sm sm:leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu">
        <h2 className="mb-4 text-2xl font-bold text-text sm:mb-6 sm:text-2xl">{t('about.openSourceTitle')}</h2>
        <p className="mb-4 text-sm leading-6 text-text/70 sm:mb-6 sm:text-base sm:leading-7">
          {t('about.openSourceText')}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button className="rounded-full border border-white/10 bg-background/80 px-5 py-2 text-sm font-medium text-text/80 transition duration-300 hover:border-accent hover:text-accent sm:px-6 sm:py-3">
            {t('about.githubButton')}
          </button>
          <button className="rounded-full border border-white/10 bg-background/80 px-5 py-2 text-sm font-medium text-text/80 transition duration-300 hover:border-accent hover:text-accent sm:px-6 sm:py-3">
            {t('about.discordButton')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
