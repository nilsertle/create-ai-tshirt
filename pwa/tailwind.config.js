const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--nunito-font)", ...fontFamily.sans],
        serif: ["var(--nunito-font)", ...fontFamily.serif],
      },
      colors: ({ colors }) => ({
        // primary: "#2b3252",
        // primaryLight: "#3c3f5c",
        // secondary: "#ef5455",
        // secondaryLight: "#F36364",
        // tertiary: "#e3b34c",
        // tertiaryLight: "#f2d08a",
        // lightGray: "#f3f3f4",
        // darkGray: "#E7E7E9",

        primary: "#343346",
        primaryLight: "#3c3f5c",
        secondary: "#ef9e99",
        secondaryLight: "#F36364",
        tertiary: "#e3b34c",
        tertiaryLight: "#f2d08a",
        veryLightGray: "#f9f9f9",
        lightGray: "#f3f3f4",
        darkGray: "#E7E7E9",
        lightGreen: "#e6f7e6",
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
