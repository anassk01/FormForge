module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'media', // or 'class' if you prefer to toggle dark mode manually
  theme: {
    extend: {
      colors: {
        primary: '#ff5722',
        secondary: '#4caf50',
        accent: '#9c27b0',
        // Add more custom colors as needed
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};