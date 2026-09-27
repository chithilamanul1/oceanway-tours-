import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0A4DAB', dark: '#083C86', light: '#DCE8FA' },
        ink: '#0B0B0F',
        mist: '#EEF4FD',
        mint: '#EDF7F3',
        cream: '#FDF6EC',
        forest: { DEFAULT: '#0B1B34', light: '#16305A' },
        canvas: '#FFFFFF',
        sand: '#EEF4FD',
        terracotta: { DEFAULT: '#0A4DAB', dark: '#083C86' },
        charcoal: '#1F2937',
        moss: '#0A4DAB',
        line: '#E5E7EB',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
