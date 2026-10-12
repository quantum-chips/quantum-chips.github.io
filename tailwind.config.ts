import type { Config } from "tailwindcss";

// Linear-style modern-tool system (see docs/superpowers/specs/2026-10-12-site-redesign.md):
// warm near-black ground, three surfaces, hairline borders, one accent.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Not "base": that name collides with the text-base font-size utility.
        ground: "#08090A", // page ground
        panel: "#16171C", // surface 1: cards, product panels
        raised: "#1E1F25", // surface 2: cards inside panels, inline code
        lift: "#26272E", // surface 3: hover, pressed controls
        fg: "#F7F8F8",
        "fg-muted": "#9CA3AF",
        // Lighter than the recipe's #6B7280, which fails AA for small text on these grounds.
        "fg-subtle": "#7F8691",
        line: "rgb(255 255 255 / 0.06)",
        "line-strong": "rgb(255 255 255 / 0.1)",
        // The single accent, taken from the old heat ramp: attention, findings, focus.
        // Keep it under ~5% of pixels.
        accent: "#F5A524",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // Modest and precise: never above 16.
        sm: "6px",
        md: "12px",
        lg: "16px",
      },
      boxShadow: {
        raised: "0 1px 2px rgba(0,0,0,0.3)",
      },
      transitionTimingFunction: {
        quint: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
