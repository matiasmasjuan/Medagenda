/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#4d91ff",
        "secondary": "#6c757d",
        "lgray": "#d9e7ff",
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    },
    container: {
      padding: '2rem',
      center: true
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

