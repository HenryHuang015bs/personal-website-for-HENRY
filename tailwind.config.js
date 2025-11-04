module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
  ],
  theme: {
    extend: {
      screens: {
        short: { raw: "(max-height: 748px)" },
      },
      spacing: {
        inset: "var(--inset)",
        sides: "var(--sides)",
        "footer-safe-area": "var(--footer-safe-area)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg,rgba(255,255,255, 0.1) 0%,rgba(255,255,255, 0.4) 100%),rgba(85,85,85,0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionProperty: {
        "colors-and-shadows":
          "color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow",
      },
      animation: {
        shine: "shine 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        flow: "flow 16s ease-in-out infinite alternate",
        "flow-timeline": "flow-timeline 4s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite",
        "shimmer-fast": "shimmer 3s ease-in-out infinite",
        "card-rotate": "card-rotate 6s ease-in-out infinite alternate",
        glowFloat: "glowFloat 9s ease-in-out infinite alternate",
        drift: "drift 6s ease-in-out infinite alternate",
        twinkle: "twinkle 2.8s ease-in-out infinite",
        kenburns: "kenburns 12s ease-in-out infinite alternate",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 5px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.1)",
          },
          "100%": {
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(0.5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        waveFade: {
          "0%": { opacity: "0", transform: "translateY(0.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flow: {
          "0%": { transform: "translateY(-2%)" },
          "100%": { transform: "translateY(2%)" },
        },
        "flow-timeline": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) translateY(-50%)" },
          "100%": { transform: "translateX(100%) translateY(-50%)" },
        },
        "card-rotate": {
          "0%": { transform: "rotateY(-5deg) rotateX(2deg)" },
          "100%": { transform: "rotateY(5deg) rotateX(-2deg)" },
        },
        glowFloat: {
          "0%": { transform: "translateY(-1%)" },
          "100%": { transform: "translateY(1%)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(var(--dx, 12px), var(--dy, -10px))" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.1) translate(-2%, -2%)" },
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "serif"],
      },
      boxShadow: {
        button:
          "inset 0 0 1px 1px rgba(255, 255, 255, 0.05), inset 0 0 2px 1px rgba(255, 255, 255, 0.2), inset -1px -1px 1px 0px rgba(0, 0, 0, 0.0), 0 0 10px 0 rgba(255, 255, 255, 0.1)",
        "button-hover":
          "inset 0 0 5px 1px rgba(255, 255, 255, 0.2), inset 0.5px 0.5px 1px 0.5px rgba(255, 255, 255, 0.5), inset -0.5px -0.5px 0.5px 0.5px rgba(0, 0, 0, 0.2), 0 0 12px 4px rgba(255, 255, 255, 0.5)",
        "card-3d":
          "inset 0 1px 2px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.1), 0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.04)",
        "card-3d-hover":
          "inset 0 1px 3px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 3px 0 rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.12), 0 3px 6px 0 rgba(0, 0, 0, 0.06)",
        "timeline-light":
          "inset 0 2px 4px 0 rgba(255, 255, 255, 0.4), inset -2px -2px 4px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0, 0, 0, 0.1), 0 0 30px rgba(5, 38, 89, 0.15)",
        "timeline-light-hover":
          "inset 0 3px 6px 0 rgba(255, 255, 255, 0.5), inset -3px -3px 6px 0 rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3), 0 6px 30px rgba(0, 0, 0, 0.15), 0 0 40px rgba(5, 38, 89, 0.25)",
        "timeline-light-dark":
          "inset 0 2px 4px 0 rgba(255, 255, 255, 0.2), inset -2px -2px 4px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(148, 163, 184, 0.2), 0 4px 20px rgba(0, 0, 0, 0.2), 0 0 30px rgba(148, 163, 184, 0.15)",
        "timeline-light-dark-hover":
          "inset 0 3px 6px 0 rgba(255, 255, 255, 0.3), inset -3px -3px 6px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.3), 0 6px 30px rgba(0, 0, 0, 0.25), 0 0 40px rgba(148, 163, 184, 0.25)",
        glass: "0 10px 30px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        morandi: {
          cream: "#FFF6E7",
          "light-blue": "#C8E3F5",
          "muted-blue": "#93C2E2",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
