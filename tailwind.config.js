/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'], 
        'custom': ['MyCustomFont', 'sans-serif'], 
        'odor': ['Odor Mean Chey', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'commissioner': ['Commissioner', 'sans-serif'],
        'montserrat': ['Montserrat Alternates', 'sans-serif'],
        'mitr': ['Mitr', 'sans-serif'],
      },
      colors: {
        'primary': '#1B8A6B',
        'secondary': '#115E49',
        'accent': '#E7F6F2',
        'light-green': '#A7D7C5',
        'text-dark': '#0B3F31',
        'text-light': '#407165',
        'custom-color': '#357D5F'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(27, 138, 107, 0.1), 0 2px 4px -1px rgba(27, 138, 107, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};