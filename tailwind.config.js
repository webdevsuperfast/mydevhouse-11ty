module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,md,njk,svg}',
    './src/_includes/**/*.njk',
    './src/_includes/partials/*.njk',
    './src/_styles/**/*.{scss,pcss,css}',
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    debugScreens: {
      position: ['bottom', 'right'],
    },
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
      },
      backgroundImage: {
        light: 'url(../images/background-light.jpg)',
        dark: 'url(../images/background-dark.jpg)',
      },
    },
  },
}
