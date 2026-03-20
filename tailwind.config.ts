import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#12121a",
        primary: "#00d4ff",
        secondary: "#a855f7",
        accent: "#39ff14",
        warning: "#ff6b35",
        muted: "#64748b",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        accent: ["var(--font-orbitron)", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "typing-cursor": "typing-cursor 1s step-end infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "typing-cursor": {
          "0%, 100%": { borderRightColor: "currentColor" },
          "50%": { borderRightColor: "transparent" },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(0, 212, 255, 0.5)",
        "glow-secondary": "0 0 20px rgba(168, 85, 247, 0.5)",
        "glow-accent": "0 0 20px rgba(57, 255, 20, 0.5)",
        "glow-card": "0 0 40px rgba(0, 212, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
