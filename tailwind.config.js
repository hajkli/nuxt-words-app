/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}'
  ],
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-3',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
};
