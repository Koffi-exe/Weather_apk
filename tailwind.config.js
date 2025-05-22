/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        navColor:"#3A59D1",
        navColorLight:"#3D90D7",
        navColorHover:"#7AC6D2",
        whiteText:"#FFF8F8"
      }
    },
  },
  plugins: [],
}