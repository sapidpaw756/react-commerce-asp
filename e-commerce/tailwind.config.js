/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
          skin:{
            red:'var(--color-dark-red)',
            light_red:'var(--color-light-red)',
            black:'var(--color-black)',
          }
      }
    },
  },
  plugins: [],
}

