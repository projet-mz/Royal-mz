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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F5F7FA",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4A1D75", // Updated to Deep Purple
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0F3460", // Updated to Royal Blue
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#2E8B57", // Updated to Green
          foreground: "#FFFFFF",
        },
        cream: {
          DEFAULT: "#FFF8E1", // Added Cream color
          foreground: "#000000",
        },
        gold: {
          DEFAULT: "#FFD700", // Gold/Yellow for highlights
          foreground: "#000000",
        },
        success: {
          DEFAULT: "#2E8B57",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FFA000",
          foreground: "#000000",
        },
        error: {
          DEFAULT: "#D32F2F",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
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