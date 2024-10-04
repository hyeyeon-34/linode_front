/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      customFontEn: ['IBM PLEX Mono', 'monospace'],
      customFontKr: ['IBM PLEX Sans KR', 'sans-serif'],
    },
  },
  plugins: [],
};
