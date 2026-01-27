import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        accent: "#0ea5e9",
        surface: "#0b1220",
        card: "#111827"
      }
    }
  },
  plugins: []
};

export default config;
