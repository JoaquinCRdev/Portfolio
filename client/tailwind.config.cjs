/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 14px 40px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
};
