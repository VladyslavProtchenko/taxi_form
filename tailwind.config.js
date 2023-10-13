/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js, ts,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': {'max': '576px'},
        'md': {'max': '768px'},
        'lg': { 'max': '992px'},
        'xl': {'max': '1240px'},
        '2xl': {'max': '1400px'},
      }
    },
  },
  
  plugins: [],
}


