/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        link: "rgb(var(--link))",
        stroke: "rgba(var(--stroke),0.3)",
        banner: "rgb(var(--banner-background))",
        highlight: "rgb(var(--highlight-background))",
        primary: {
          background: "rgb(var(--primary-background))",
          text: "rgb(var(--primary-text))",
          button: "rgb(var(--primary-button))",
        },
        secondary: {
          background: "rgb(var(--secondary-background))",
          text: "rgb(var(--secondary-text))",
          button: "rgb(var(--secondary-button))",
          "button-background": "rgb(var(--secondary-button-background))",
        },
        destructive: {
          DEFAULT: "rgb(var(--error-or-destructive))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
        hover: {
          overlay: "var(--hover-overlay)",
          "primary-button": "rgb(var(--primary-button-hover))",
          "secondary-button": "rgb(var(--secondary-button-hover))",
        },
        separator: {
          DEFAULT: "rgba(var(--border-separator))",
          divider: "rgb(var(--divider))",
          elevated: "rgb(var(--elevated-separator))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}