/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50:  "#faf5fb",
          100: "#f3e6f0",
          200: "#f0d8dd",
          300: "#e0b6c4",
          400: "#c98fa3",
          500: "#a8698a",
          600: "#8a5170",
        },
        lavender: {
          50:  "#f8f4fb",
          100: "#ece0f2",
          200: "#d9c3e6",
          300: "#bd9bd2",
          400: "#a179bd",
          500: "#815d9e",
          600: "#654a7d",
        },
        rose: {
          dusty: "#b28fae",
          deep:  "#5c3a5e",
        },
        gold: {
          light: "#d4a96a",
          DEFAULT: "#b8862a",
          dark:   "#8a6218",
        },
        cream: "#fdf8f5",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Lato", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
