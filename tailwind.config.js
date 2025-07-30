/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./_pages/**/*.{js,ts,jsx,tsx}",
    "./components/***/**/*.{js,ts,jsx,tsx}",
    "./components/****/***/**/*.{js,ts,jsx,tsx}",
    "./pages/*/.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./_components/**/*.{js,ts,jsx,tsx}",
    "./app/layout.js",
  ],
  theme: {
    extend: {
      colors: {
        "croonus-1": "#382e2c",
        "croonus-2": "#eeeee0",
        "croonus-3": "#eddd9e",
        "croonus-4": "#333333",
        "croonus-5": "#f5f5f6",
        "croonus-gray": "#f7f7f7",
      },
      screens: {
        "3xl": "1680px",
        "4xl": "1920px",
      },
      aspectRatio: {
        "2/3": "2/3",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
