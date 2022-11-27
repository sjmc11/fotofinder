module.exports = {
  content: [
    './public/*.{vue,html,js,ts}',
    './src/**/*.{vue,html,js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem'
      }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
