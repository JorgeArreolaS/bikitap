import TailwindTheme from "./src/core/config/tailwind";

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'

  ],
  theme: TailwindTheme,
  darkMode: "class",
  plugins: [nextui()]
};
