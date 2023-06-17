import { theme } from './src/styles/tailwind.theme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/styles/global.css',
  ],
  theme,
  plugins: [],
};
