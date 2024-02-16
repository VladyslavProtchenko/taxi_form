/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '570px'},
        'sm': { 'max': '768px'},
        'lg': {'min': '769px', 'max': '992px'},
        'xl': {'min': '993px', 'max': '1240px'},
        '2xl': {'min': '1241px'},
      },
      keyframes: {
        jerk: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        'jerk': 'jerk 1s cubic-bezier(0.42, 0, 0.58, 1) infinite',
      },
    },
    fontFamily: {
      'roboto': ["Roboto"],
    }
  },
  
  plugins: [],
}







