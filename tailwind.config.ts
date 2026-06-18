import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F5F1",
        surface: "#FBFAF8",
        ink: "#14171C",
        graphite: "#5C6672",
        hairline: "#D9D7CF",
        instrument: "#0E7C86",
        uqpurple: "#51247A",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,23,28,0.04), 0 14px 30px -18px rgba(20,23,28,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
