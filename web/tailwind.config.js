/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0A0A0B",
          800: "#0F0F11",
          700: "#141417",
          600: "#1A1A1E",
          500: "#222227",
        },
        fg: "#ECECEE",
        muted: "#8B8B93",
        faint: "#56565E",
        line: "rgba(255,255,255,0.08)",
        signal: "#F5A524",
        tally: "#FF453A",
        now: "#34D399",
        near: "#F5A524",
        horizon: "#5B9DFF",
        motion: "#A78BFA",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        desk: "44rem",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse_tally: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(255,69,58,0.55)" },
          "50%": { opacity: "0.65", boxShadow: "0 0 0 4px rgba(255,69,58,0)" },
        },
      },
      animation: {
        rise: "rise 0.5s cubic-bezier(0.16,1,0.3,1) both",
        tally: "pulse_tally 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
