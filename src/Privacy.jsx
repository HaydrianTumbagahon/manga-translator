import { useTranslation } from 'react-i18next';

function Privacy() {
  const { t } = useTranslation();
  const sections = t('privacy.sections', { returnObjects: true });

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 pb-16 sm:space-y-10">
      <div className="max-w-3xl space-y-3 sm:space-y-4">
        <h1 className="break-words text-3xl font-bold leading-tight text-text sm:text-4xl">
          {t('privacy.title')}
        </h1>
        <p className="text-base text-text/70 sm:text-lg">{t('privacy.description')}</p>
      </div>

      <article className="divide-y divide-white/10">
        {sections.map((section, index) => (
          <section
            key={index}
            className="py-7 first:pt-0 sm:py-8"
          >
            <h2 className="mb-3 text-xl font-semibold text-text sm:mb-4 sm:text-2xl">{section.title}</h2>
            {section.content?.map((contentLine, lineIndex) => (
              <p key={lineIndex} className="mb-3 max-w-3xl text-base leading-7 text-text/75 last:mb-0 sm:leading-8">
                {contentLine}
              </p>
            ))}
          </section>
        ))}
        <p className="pt-6 text-sm leading-6 text-text/55 sm:pt-8">
          {t('privacy.lastUpdated')}
        </p>
      </article>
    </div>
  );
}

export default Privacy;
