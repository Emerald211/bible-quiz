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
        main: "url('/src/assets/images/white-simple-textured-design-background.jpg')"
      },
      backgroundColor: {
       core: 'rgb(223,8,255)'
      },
      colors: {
        core: 'rgb(223,8,255)',
        main: 'rgb(223,8,255)'
      }
    },
  },
  plugins: [],
}

