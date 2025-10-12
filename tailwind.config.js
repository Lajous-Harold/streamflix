/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0f",
        "bg-elev": "#12121a",
        "bg-elev-2": "#1a1a25",
        text: "#e9e9ef",
        muted: "#b8b8c7",
        primary: "#e50914",
        secondary: "#2e6df6",
        card: "#151520",
        outline: "#3c3c4b",
      },
      boxShadow: {
        elev: "0 10px 30px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};
