/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Prempeh Green — primary
        brand: {
          DEFAULT: '#005C32',
          dark: '#00451F',
          light: '#E6F0EA',
        },
        // Accent Gold
        gold: {
          DEFAULT: '#D3AF5E',
          dark: '#A98735',
          light: '#F7EFD8',
        },
        cream: '#D3AF5E',
        ink: '#0F1A2A',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
