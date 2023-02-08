/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            'primary': ['Poppins']
        },
        gridTemplateColumns: {
            'cards': 'repeat(auto-fill, minmax(310px, 1fr))',
        }
      },
    },
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/line-clamp')
    ],
    darkMode: 'class',
  }