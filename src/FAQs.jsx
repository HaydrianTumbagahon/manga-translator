import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function FAQs() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = t('faqs.items', { returnObjects: true });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full space-y-6 pb-16 sm:space-y-8">
      <div className="mx-auto w-full max-w-5xl space-y-3 sm:space-y-4">
        <h1 className="break-words text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl">
          {t('faqs.title')}
        </h1>
        <p className="text-base text-text/70 sm:text-lg">{t('faqs.description')}</p>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-2 sm:space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface/90 shadow-neu-sm transition duration-300"
          >
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              className="neu-button w-full items-start justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
            >
              <h3 className="flex-1 text-sm font-semibold text-text sm:text-base lg:text-lg">{faq.question}</h3>
              <div
                className={`ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-300 flex-shrink-0 sm:h-8 sm:w-8`}
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>

            {openIndex === index && (
              <div id={`faq-answer-${index}`} role="region" className="border-t border-white/10 bg-background/50 px-4 py-4 sm:px-6 sm:py-5">
                <p className="text-sm leading-6 text-text/80 sm:text-base sm:leading-7">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-background/80 p-5 shadow-neu sm:p-8">
        <h2 className="mb-4 text-2xl font-bold text-text sm:mb-6 sm:text-2xl">{t('faqs.ctaTitle')}</h2>
        <p className="mb-4 text-sm leading-6 text-text/70 sm:mb-6 sm:text-base sm:leading-7">{t('faqs.ctaText')}</p>
      </div>
    </div>
  );
}

export default FAQs;
