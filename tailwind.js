module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled', 'group-hover', 'dark'],
    cursor: ['responsive', 'hover']
  },
  plugins: [],
}
