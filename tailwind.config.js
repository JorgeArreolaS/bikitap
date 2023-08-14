const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'

  ],
  theme: {
    extend: {
       gridTemplateRows: {
        // Simple 8 row grid
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
