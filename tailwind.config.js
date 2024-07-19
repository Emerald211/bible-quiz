/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serrat: 'Montserrat'
      },
      backgroundImage: {
        main: "url('/src/assets/images/Group 22670.png')"
      },
      backgroundColor: {
       core: 'rgb(223,8,255)'
      },
      colors: {
        core: 'rgb(223,8,255)'
      }
    },
  },
  plugins: [],
}

