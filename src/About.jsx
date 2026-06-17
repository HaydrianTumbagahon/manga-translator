function About() {
  return (
    <div className="w-full space-y-10 pb-16 sm:space-y-12">
      <div className="w-full space-y-4 sm:space-y-6">
        <div className="w-full space-y-3 sm:space-y-4">
          <h1 className="break-words text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl lg:text-6xl">
            About MangaTranslator
          </h1>
          <p className="text-base leading-7 text-text/70 sm:text-lg sm:leading-8">
            Bridging the gap between manga creators and global audiences through intelligent, accessible translation technology.
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
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">Our Passion</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            We started this project out of genuine love for manga and doujins. Frustrated with inconsistent and low-quality translations, we decided to create something better—a tool that respects the original artwork while delivering accurate, polished translations to readers worldwide.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-accent/10 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" strokeWidth="2" stroke="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">Our Mission</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            Make high-quality manga translations accessible to everyone, instantly, while preserving the visual beauty of the original work. We believe language should never be a barrier to enjoying amazing stories.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-accent/10 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" strokeWidth="2" stroke="currentColor">
              <path d="M12 2L15.09 8.26H22L17.45 12.79L19.54 19.05L12 14.46L4.46 19.05L6.55 12.79L2 8.26H8.91L12 2Z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">Current Features</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            Support for multiple languages, batch processing, AI-powered translation with context awareness, and artwork preservation. Our engine handles complex manga layouts and speech bubbles with precision.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu transition duration-300 hover:shadow-neu-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-accent/10 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" strokeWidth="2" stroke="currentColor">
              <path d="M9 12L11 14L15 10M21 12A9 9 0 11 1 3 12A9 9 0 01 21 12Z" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-text sm:mb-3 sm:text-xl">Future Vision</h3>
          <p className="text-sm leading-6 text-text/70 sm:text-base sm:leading-7">
            Expanding to support more languages, adding real-time translation mode, integrating community feedback, and building mobile apps. We're committed to continuous improvement and community collaboration.
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-background/80 p-5 sm:p-8 shadow-neu">
        <h2 className="mb-4 text-2xl font-bold text-text sm:mb-6 sm:text-3xl">Why Choose MangaTranslator?</h2>
        <div className="grid w-full gap-3 sm:gap-4 sm:grid-cols-2">
          {[
            { title: 'Context-Aware', desc: 'AI understands manga-specific language and cultural nuances' },
            { title: 'Artwork Preserved', desc: 'Original art and layout remain untouched and beautiful' },
            { title: 'Fast Processing', desc: 'Get translations in seconds, not hours' },
            { title: 'Multiple Languages', desc: 'Support for Japanese, English, Spanish, French, and more' },
            { title: 'Quality Focused', desc: 'Hand-tuned translations that read naturally' },
            { title: 'Community Driven', desc: 'Built with manga readers and creators in mind' },
          ].map((item, idx) => (
            <div key={idx} className="w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/50 p-4">
              <p className="text-sm font-semibold text-accent sm:text-base">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-text/70 sm:text-sm sm:leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/90 p-5 sm:p-8 shadow-neu">
        <h2 className="mb-4 text-2xl font-bold text-text sm:mb-6 sm:text-2xl">Open Source & Community</h2>
        <p className="mb-4 text-sm leading-6 text-text/70 sm:mb-6 sm:text-base sm:leading-7">
          MangaTranslator is built by passionate developers and manga enthusiasts. We believe in transparency, community collaboration, and giving back to the manga community. Contributions, feedback, and support from readers like you make this project possible.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button className="rounded-full border border-white/10 bg-background/80 px-5 py-2 text-sm font-medium text-text/80 transition duration-300 hover:border-accent hover:text-accent sm:px-6 sm:py-3">
            View on GitHub
          </button>
          <button className="rounded-full border border-white/10 bg-background/80 px-5 py-2 text-sm font-medium text-text/80 transition duration-300 hover:border-accent hover:text-accent sm:px-6 sm:py-3">
            Join Discord
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
