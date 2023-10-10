/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js, ts,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': {'min':'0', 'max': '767px'},
        'md': {'min': '768px','max': '1023px'},
        'lg': {'min': '1024px', 'max': '1279px'},
        'xl': {'min': '1280px', 'max': '1920px'},
        '2xl': {'min': '1921px'},
      }
    },
  },
  plugins: [],
}

