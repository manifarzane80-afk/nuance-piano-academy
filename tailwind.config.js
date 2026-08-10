/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        panel2: "var(--panel-2)",
        line: "var(--line)",
        ink: "var(--ink)",
        inkdim: "var(--ink-dim)",
        gold: "var(--gold)",
        goldbright: "var(--gold-bright)",
        sage: "var(--sage)",
        clay: "var(--clay)",
      },

      fontFamily: {
        fa: ["Vazirmatn", "sans-serif"],
        en: ["Inter", "sans-serif"],
      },

      borderRadius: {
        npa: "18px",
      },

    },
  },

  plugins: [],
};