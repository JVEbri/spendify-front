/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        grow: "grow 1s ease-in-out",
      },
      keyframes: {
        grow: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      colors: {
        background: {
          light: "#F3F4F6", // Fondo claro (modo claro)
          dark: "#1E293B", // Fondo oscuro (modo oscuro)
        },
        card: {
          light: "#FFFFFF", // Card en modo claro
          dark: "#374151", // Card en modo oscuro
        },
        textPrimary: {
          light: "#1E293B", // Texto principal en modo claro
          dark: "#F3F4F6", // Texto principal en modo oscuro
        },
        textSecondary: {
          light: "#6B7280", // Texto secundario en modo claro
          dark: "#9CA3AF", // Texto secundario en modo oscuro
        },
        primary: {
          light: "#2563EB", // Azul para modo claro
          dark: "#3B82F6", // Azul brillante para modo oscuro
        },
        secondary: {
          light: "#9333EA", // Morado para modo claro
          dark: "#A855F7", // Morado para modo oscuro
        },
        tertiary: {
          light: "#F59E0B", // Dorado para modo claro
          dark: "#FACC15", // Dorado para modo oscuro
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class", // Activa el modo oscuro mediante clases
};
