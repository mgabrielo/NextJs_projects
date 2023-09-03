const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(180.96deg, #000000 0.82%, #4A2800 129.1%)"
      },
      colors: {
        primary: {
          light: "3FCC182",
          DEFAULT: "#FA9021",
          dark: "#AF5B04"
        }
      }
    },
  },
  plugins: [],
}
