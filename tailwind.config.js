/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 enables manual dark mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 all React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
