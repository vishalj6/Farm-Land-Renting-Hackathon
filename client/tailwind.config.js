/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amazon-ember': ['Amazon Ember', 'sans-serif'],
        'signika': ["Signika", 'sans-serif'],
      },
    },
  },
  plugins: [],
}

