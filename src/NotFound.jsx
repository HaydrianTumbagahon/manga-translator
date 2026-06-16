import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-surface p-10 shadow-neu text-center">
        <div className="mx-auto mb-8 h-52 w-52 rounded-[2.5rem] bg-background/80 p-6 shadow-neu-sm">
          <svg viewBox="0 0 200 200" className="h-full w-full sad-face-bounce" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sad-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="92" fill="url(#sad-grad)" opacity="0.14" />
            <circle cx="100" cy="100" r="80" fill="#0a1428" />
            <circle cx="72" cy="88" r="10" fill="#e2e8f0" />
            <circle cx="128" cy="88" r="10" fill="#e2e8f0" />
            <path d="M70 128c10 12 30 18 50 2" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" />
            <path className="tear-drop" d="M76 110c-4 14 6 28 14 30 9-5 10-19 4-28-4-6-12-9-18-2z" fill="#60a5fa" opacity="0.9" />
          </svg>
        </div>
        <p className="text-sm uppercase tracking-[0.35em] text-accentSoft/80">Page not found</p>
        <h1 className="mt-4 text-5xl font-bold text-text">404 — Lost in the manga void</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-text/70">
          Sorry, the page you are looking for doesn't exist yet. Return to the dashboard and continue translating.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background shadow-[0_18px_42px_rgba(59,130,246,0.28)] transition duration-300 hover:bg-accentSoft"
        >
          Back to dashboard
        </button>
      </div>
    </main>
  );
}

export default NotFound;
