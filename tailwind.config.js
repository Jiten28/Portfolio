/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        luxeBlack: "#000000",
        luxeSlate: "#494d54",
        luxeTan: "#d6c6ac",
        luxeBronze: "#aa9371",
        luxeCream: "#fef4e3",
      },
      fontFamily: {
        kanit: ["'Kanit'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
