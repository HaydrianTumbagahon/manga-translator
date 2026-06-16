const tabs = ['Dashboard', 'Translate'];

function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-xl shadow-neu">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setActiveTab('Home')}
          className="text-xl font-bold tracking-tight text-text sm:text-2xl transition hover:text-accent"
          aria-label="Go to home"
        >
          MangaTranslator
        </button>

        <nav className="flex flex-wrap items-center gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition duration-300 focus:outline-none ${
                  isActive
                    ? 'bg-accent text-background shadow-[0_12px_30px_rgba(59,130,246,0.28)] -translate-y-0.5'
                    : 'bg-surface text-text/70 shadow-neu-sm hover:text-text hover:shadow-neu'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
