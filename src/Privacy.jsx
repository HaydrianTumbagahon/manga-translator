import { useTranslation } from 'react-i18next';

function Privacy() {
  const { t } = useTranslation();
  const sections = t('privacy.sections', { returnObjects: true });

  return (
    <div className="w-full space-y-6 pb-16 sm:space-y-8">
      <div className="w-full space-y-3 sm:space-y-4">
        <h1 className="break-words text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl lg:text-6xl">
          {t('privacy.title')}
        </h1>
        <p className="text-base text-text/70 sm:text-lg">{t('privacy.description')}</p>
      </div>

      <div className="w-full space-y-5 sm:space-y-8">
        {sections.map((section, index) => (
          <section
            key={index}
            className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu-sm"
          >
            <h2 className="mb-3 text-lg font-bold text-accent sm:mb-4 sm:text-2xl">{section.title}</h2>
            {section.content.map((contentLine, lineIndex) => (
              <p key={lineIndex} className="mb-3 text-sm leading-6 text-text/80 sm:mb-4 sm:text-base sm:leading-7">
                {contentLine}
              </p>
            ))}
          </section>
        ))}

        <p className="mt-6 w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-background/50 p-4 text-xs text-text/60 sm:mt-8 sm:p-6 sm:text-sm">
          {t('privacy.lastUpdated')}
        </p>
      </div>
    </div>
  );
}

export default Privacy;
