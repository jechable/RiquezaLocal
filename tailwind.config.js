/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#1B8A6B',
        'secondary': '#115E49',
        'accent': '#E7F6F2',
        'light-green': '#A7D7C5',
        'text-dark': '#0B3F31',
        'text-light': '#407165',
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