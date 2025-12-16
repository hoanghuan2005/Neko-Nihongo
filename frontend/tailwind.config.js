/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skin: {
          50: "#fffaf7",
          100: "#fff1e6",
          200: "#ffd9b8",
          300: "#ffc493",
          400: "#ffab66",
          500: "#ff9250",
          600: "#ff7b32",
          700: "#cc5f26",
          800: "#99441d",
          900: "#662b14",
        },
        warm: {
          50: "#fff8f3",
          100: "#fff0e6",
          200: "#ffe0cc",
          300: "#ffd1b3",
          400: "#ffc199",
          500: "#ffb180",
          600: "#ff9f5f",
          700: "#cc7a49",
          800: "#995934",
          900: "#663822",
        },
      },
    },
  },
  plugins: [],
};
