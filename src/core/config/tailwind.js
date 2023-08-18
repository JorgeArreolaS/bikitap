/** @type {import('tailwindcss').Config['theme']} */
export default {
  extend: {
    gridTemplateRows: {
      // Simple 8 row grid
      7: 'repeat(7, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))'
    }
  }
};
