/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ui: ['"Segoe UI"', "system-ui", "-apple-system", "Noto Sans SC", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,0.08)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
