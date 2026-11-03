/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
   extend: {
    fontFamily: {
      mincho: ['"Shippori Mincho"', 'serif'],
      plex: ['"IBM Plex Mono"', 'monospace'],
      zen: ['"Zen Kaku Gothic New"', 'sans-serif'],
    },
    colors: {
      ink: '#0e0c0b',
      paper: '#e6d9bb',
      blood: '#9a1b1b',
      gold: '#b08d3a',
      ash: '#7d8082',
    },
    boxShadow: {
      hard: '6px 6px 0 #9a1b1b',
      ink: '5px 5px 0 #000',
    },
  },
  },
  plugins: [],
};