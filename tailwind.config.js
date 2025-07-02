/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans TC', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#A47551',
          600: '#8b6240',
          700: '#745239',
          800: '#5d4230',
          900: '#4a3528',
        },
      },
    },
  },
  plugins: [],
} 