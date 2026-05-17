/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        supermercado: ['Supermercado One', 'cursive'],
        playfair: ['Playfair Display', 'serif'],
        share: ['"Share Tech"', 'sans-serif'],
      },
      colors: {
        primary: '#003070',
      },

    },
  },
  plugins: [],
}

