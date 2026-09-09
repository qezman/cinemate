import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        'paper-raised': 'var(--paper-raised)',
        text: 'var(--text)',
        'text-soft': 'var(--text-soft)',
        'text-on-dark': 'var(--text-on-dark)',
        'text-on-dark-soft': 'var(--text-on-dark-soft)',
        wine: 'var(--wine)',
        'wine-text': 'var(--wine-text)',
        'wine-on-dark': 'var(--wine-on-dark)',
        'wine-dim': 'var(--wine-dim)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        hero: 'clamp(48px, 7vw, 96px)',
        headline: 'clamp(30px, 4vw, 52px)',
        title: 'clamp(20px, 2.5vw, 26px)',
        label: '11px',
        caption: '13px',
      },
    },
  },
  plugins: [],
};

export default config;
