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
    screens: {
      xs: '440px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
