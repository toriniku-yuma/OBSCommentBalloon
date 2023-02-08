/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
        animation: {
            "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
        },
        keyframes: {
            "slide-in-right": {
                "0%": {
                    transform: "translateX(1000px)",
                    opacity: "0"
                },
                to: {
                    transform: "translateX(0)",
                    opacity: "1"
                }
            }
        }
    }
  },
  plugins: [],
}
