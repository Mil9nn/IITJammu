/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#2E7D32", // Dark Green (Example)
          secondary: "#FFD700", // Rich Gold (Example)
          accent: "#6D4C41", // Deep Brown (Example)
        },
        fontFamily: {
          rubik: ["Rubik", "sans-serif"],
          heading: ["Montserrat", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  