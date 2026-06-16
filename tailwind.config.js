/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a1428',
        surface: '#1e2a44',
        accent: '#3b82f6',
        accentSoft: '#60a5fa',
        text: '#e2e8f0',
      },
      boxShadow: {
        neu: '20px 20px 40px rgba(0, 0, 0, 0.35), -14px -14px 30px rgba(96, 165, 250, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
