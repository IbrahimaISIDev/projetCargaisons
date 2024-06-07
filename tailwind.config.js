/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*/.{html,js,ts,php}',
    './router/*/.{html,js,tsphp}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}