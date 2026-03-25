/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:  '#0B3C5D',   // Navbar
          blue:  '#1D70B8',   // Sidebar
          light: '#E6F0FA',   // Cards, highlights
          grey:  '#F5F7FA',   // Background sections
        },
      }
    },
  },
  plugins: [],
}
