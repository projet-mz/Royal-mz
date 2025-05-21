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
        background: "#FFFFFF", // Updated to match brand identity
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4A1D75", // Royal Purple (Primary)
          50: "#F5F0FA",
          100: "#E9DEF5",
          200: "#D3BDEB",
          300: "#BD9CE0",
          400: "#A77BD6",
          500: "#915ACC",
          600: "#7B39C2",
          700: "#652FA3",
          800: "#4A1D75", // Base color
          900: "#341452",
          950: "#220D36",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0F3460", // Deep Blue (Secondary)
          50: "#E6EEF7",
          100: "#CCDDEF",
          200: "#99BBDF",
          300: "#6699CF",
          400: "#3377BF",
          500: "#0055AF",
          600: "#0044A0",
          700: "#003380",
          800: "#0F3460", // Base color
          900: "#001140",
          950: "#000B2B",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8ECB85", // Light Green (Accent)
          50: "#F5FAF4",
          100: "#EBF5E9",
          200: "#D7EBD3",
          300: "#C3E1BD",
          400: "#AFD7A7",
          500: "#8ECB85", // Base color
          600: "#6DB962",
          700: "#4C9740",
          800: "#2B752E",
          900: "#0A531C",
          950: "#043210",
          foreground: "#000000",
        },
        neutral: {
          DEFAULT: "#F0F4F8", // Gray (Neutral)
          50: "#FFFFFF",
          100: "#F0F4F8", // Base color
          200: "#D9E2EC",
          300: "#BCCCDC",
          400: "#9FB3C8",
          500: "#829AB1",
          600: "#627D98",
          700: "#486581",
          800: "#334E68",
          900: "#243B53",
          950: "#102A43",
          foreground: "#000000",
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
          DEFAULT: "#8ECB85", // Updated to match accent color
          foreground: "#000000",
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
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}                        