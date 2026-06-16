function Landing({ onNavigate }) {
  return (
    <div className="min-h-0 flex flex-col justify-center gap-10 py-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-10 max-w-2xl lg:max-w-lg">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold leading-tight text-text sm:text-6xl">
            Translate your favorite manga instantly.
          </h1>
          <p className="text-lg leading-8 text-text/70">
            Translate your favorite manga into any language instantly while preserving the original artwork and layout.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('Translate')}
            className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background shadow-[0_18px_42px_rgba(59,130,246,0.28)] transition duration-300 hover:bg-accentSoft"
          >
            Start translating
          </button>
          <button
            onClick={() => onNavigate('Dashboard')}
            className="rounded-full border border-white/10 bg-surface px-8 py-4 text-sm font-semibold text-text/80 transition duration-300 hover:border-accent hover:text-accent"
          >
            View dashboard
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <img
          src="/LP-bg-img.png"
          alt="Manga ghost hero"
          className="h-[520px] max-w-full object-contain"
        />
      </div>
    </div>
  );
}

export default Landing;
