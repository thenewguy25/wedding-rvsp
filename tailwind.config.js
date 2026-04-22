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
          50:  "#fdf6f0",
          100: "#faeae0",
          200: "#f5d5c1",
          300: "#edb898",
          400: "#e3966e",
          500: "#d8764a",
          600: "#c95e35",
        },
        rose: {
          dusty: "#c9a0a0",
          deep:  "#9b5b5b",
        },
        gold: {
          light: "#d4a96a",
          DEFAULT: "#b8862a",
          dark:   "#8a6218",
        },
        cream: "#fdf8f2",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Lato", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
