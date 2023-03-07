/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      orange: "#ff650e",
      black: "#292929",
    },

    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
