import { useState } from 'react';

function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What file formats does MangaTranslator support?',
      answer: 'We support JPG, PNG, WebP, and archive formats like ZIP and CBZ (Comic Book Archive). You can also upload entire folders for batch processing. Our system automatically detects the best processing method for each file type.',
    },
    {
      question: 'How accurate are the translations?',
      answer: 'Our AI-powered translation engine uses context-aware deep learning trained on thousands of manga pages. Accuracy depends on image quality and text clarity, but we typically achieve 95%+ accuracy for most manga. Manual review is recommended for professional use.',
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Absolutely. All processing happens securely on our servers. Uploaded files are processed and deleted immediately after translation. We do not store, share, or use your images for training. See our Privacy Policy for detailed information.',
    },
    {
      question: 'How long does translation take?',
      answer: 'Most images translate in 5-30 seconds depending on complexity and current server load. Batch processing typically takes a few minutes for 50+ pages. Premium users get priority processing queues.',
    },
    {
      question: 'Can I translate manga into multiple languages at once?',
      answer: 'Yes! You can translate a single manga into multiple target languages simultaneously. Choose your target languages, and our system will process and deliver all versions. This is perfect for sharing with international communities.',
    },
    {
      question: 'Does MangaTranslator preserve the original artwork?',
      answer: 'Yes, that\'s our core philosophy. We only translate the text and speech bubbles while keeping all original artwork, colors, and layout intact. The character expressions and visual storytelling remain exactly as the artist intended.',
    },
    {
      question: 'Can I use these translations commercially?',
      answer: 'MangaTranslator is designed for personal use and fan translation. Using our translations for commercial purposes requires proper licensing agreements with copyright holders. Please review our Terms and Conditions for details.',
    },
    {
      question: 'Do you support OCR for handwritten text?',
      answer: 'Our current system handles printed manga text excellently. Handwritten text recognition is on our roadmap for future releases. Let us know if this feature is important to you!',
    },
    {
      question: 'What languages can I translate from and to?',
      answer: 'We currently support Japanese, English, Spanish, French, German, Italian, Portuguese, Korean, and Simplified/Traditional Chinese. More languages are being added regularly based on community demand.',
    },
    {
      question: 'Is there a batch processing limit?',
      answer: 'Free users can translate up to 50 pages per month. Premium users get unlimited processing. Batch upload supports up to 1000 pages at once for efficient processing.',
    },
    {
      question: 'How do I report a translation error?',
      answer: 'We have a feedback system in the dashboard where you can report inaccuracies. Your feedback helps us improve the AI model. Premium users get direct support and manual correction options.',
    },
    {
      question: 'Is MangaTranslator open source?',
      answer: 'Yes! Our codebase is open source on GitHub. We welcome contributions, bug reports, and feature requests from the community. Join our Discord server to connect with other developers and users.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full space-y-6 pb-16 sm:space-y-8">
      <div className="w-full space-y-3 sm:space-y-4">
        <h1 className="break-words text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl lg:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-text/70 sm:text-lg">
          Find answers to common questions about MangaTranslator, features, and how to get the best results.
        </p>
      </div>

      <div className="w-full space-y-2 sm:space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface/90 shadow-neu-sm transition duration-300"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition duration-300 hover:bg-background/50 sm:gap-4 sm:px-6 sm:py-5"
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
              <div className="border-t border-white/10 bg-background/50 px-4 py-4 sm:px-6 sm:py-5">
                <p className="text-sm leading-6 text-text/80 sm:text-base sm:leading-7">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-background/80 p-5 sm:p-8 shadow-neu">
        <h2 className="mb-4 text-2xl font-bold text-text sm:mb-6 sm:text-2xl">Still have questions?</h2>
        <p className="mb-4 text-sm leading-6 text-text/70 sm:mb-6 sm:text-base sm:leading-7">
          Can't find the answer you're looking for? Please reach out to our support team or join our community Discord.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition duration-300 hover:bg-accentSoft sm:px-8 sm:py-3">
            Contact Support
          </button>
          <button className="rounded-full border border-white/10 bg-surface px-5 py-2 text-sm font-medium text-text/80 transition duration-300 hover:border-accent hover:text-accent sm:px-6 sm:py-3">
            Join Discord
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
