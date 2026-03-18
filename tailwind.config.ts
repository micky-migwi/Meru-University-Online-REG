import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',
        accent: '#ea580c',
        surface: '#0f172a',
      },
      boxShadow: {
        card: '0 20px 40px -24px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
