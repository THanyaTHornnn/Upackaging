/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Pantone 3245 C — สีหลักของ UDP Packaging
        teal: {
          50:  "#E1F5EE",
          100: "#9FE1CB",
          200: "#5DCAA5",
          300: "#1D9E75", // ← ใช้บ่อยที่สุด
          400: "#0F6E56",
          800: "#085041",
          900: "#04342C",
        },
      },
    },
  },
  plugins: [],
};