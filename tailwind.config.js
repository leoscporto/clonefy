/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadein: "fadein 0.5s ease-in-out"
      },
      keyframes: {
        fadein: {
          '0%' : {
            opacity: 0
          },
          '100%' : {
            opacity: 1
          }
        }
      },
      fontFamily: {
        body: ['Roboto']
      },
      screens: {
        'sm': {'max': '767px'}, // applies to screen sizes less than 768px
        // => @media (min-width: 768px) { ... }
        
        'md': '767px',

        'lg': '1038px',
        // => @media (min-width: 1024px) { ... }
        
        'xl':'1188px',

        '2xl':'1700px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        primary: '#027957',
        secondary: '#252f3e',
      },
    },
  },
  plugins: [],
}
