import * as flowbite from "flowbite-react/tailwind"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        secondary: "#F0B90B",
        primary: "#111111",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
}
