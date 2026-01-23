/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)" /* gray-200 */,
        input: "var(--color-input)" /* gray-200 */,
        ring: "var(--color-ring)" /* purple-300 */,
        background: "var(--color-background)" /* white */,
        foreground: "var(--color-foreground)" /* gray-800 */,
        primary: {
          DEFAULT: "var(--color-primary)" /* purple-300 */,
          foreground: "var(--color-primary-foreground)" /* gray-800 */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* blue-300 */,
          foreground: "var(--color-secondary-foreground)" /* gray-800 */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* red-500 */,
          foreground: "var(--color-destructive-foreground)" /* white */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* gray-50 */,
          foreground: "var(--color-muted-foreground)" /* gray-500 */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* yellow-400 */,
          foreground: "var(--color-accent-foreground)" /* gray-800 */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* white */,
          foreground: "var(--color-popover-foreground)" /* gray-800 */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* gray-50 */,
          foreground: "var(--color-card-foreground)" /* gray-800 */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* green-500 */,
          foreground: "var(--color-success-foreground)" /* white */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* orange-500 */,
          foreground: "var(--color-warning-foreground)" /* white */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* red-500 */,
          foreground: "var(--color-error-foreground)" /* white */,
        },
        celebration: {
          DEFAULT: "var(--color-celebration)" /* amber-500 */,
          foreground: "var(--color-celebration-foreground)" /* white */,
        },
        trust: {
          DEFAULT: "var(--color-trust)" /* blue-500 */,
          foreground: "var(--color-trust-foreground)" /* white */,
        },
        premium: {
          DEFAULT: "var(--color-premium)" /* indigo-500 */,
          foreground: "var(--color-premium-foreground)" /* white */,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ["Dancing Script", "cursive"],
      },
      spacing: {
        header: "var(--header-height)",
        sidebar: "var(--sidebar-width)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(20px) rotate(360deg)",
            opacity: "0",
          },
        },
        "pulse-gentle": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.02)", opacity: "0.9" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "confetti-fall": "confetti-fall 1.5s ease-out forwards",
        "pulse-gentle": "pulse-gentle 3s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
      },
      boxShadow: {
        warm: "0 2px 8px rgba(251, 146, 60, 0.08)",
        "warm-lg": "0 4px 16px rgba(251, 146, 60, 0.12)",
        celebration: "0 8px 25px rgba(245, 158, 11, 0.1)",
      },
    },
  },
  plugins: [],
};
