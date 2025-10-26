import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    defaultTheme: "light",
    themes: {
      light: {
        layout: {
          disabledOpacity: 0.4
        },
        colors: {
          default: {
            "50": "#f8f9fa",
            "100": "#e9ecef",
            "200": "#dee2e6",
            "300": "#ced4da",
            "400": "#adb5bd",
            "500": "#6c757d",
            "600": "#495057",
            "700": "#343a40",
            "800": "#212529",
            "900": "#0d0f12",
            foreground: "#fff",
            DEFAULT: "#6c757d"
          },
          primary: {
            "50": "#eff6ff",
            "100": "#dbeafe",
            "200": "#bfdbfe",
            "300": "#93c5fd",
            "400": "#60a5fa",
            "500": "#2563eb",
            "600": "#1e40af",
            "700": "#1e3a8a",
            "800": "#1e2a5a",
            "900": "#0f172a",
            foreground: "#fff",
            DEFAULT: "#2563eb"
          },
          secondary: {
            "50": "#f0fdfa",
            "100": "#ccfbf1",
            "200": "#99f6e4",
            "300": "#5eead4",
            "400": "#2dd4bf",
            "500": "#14b8a6",
            "600": "#0d9488",
            "700": "#0f766e",
            "800": "#115e59",
            "900": "#134e4a",
            foreground: "#fff",
            DEFAULT: "#14b8a6"
          },
          success: {
            "50": "#f0fdf4",
            "100": "#dcfce7",
            "200": "#bbf7d0",
            "300": "#86efac",
            "400": "#4ade80",
            "500": "#22c55e",
            "600": "#16a34a",
            "700": "#15803d",
            "800": "#166534",
            "900": "#14532d",
            foreground: "#fff",
            DEFAULT: "#22c55e"
          },
          warning: {
            "50": "#fffbeb",
            "100": "#fef3c7",
            "200": "#fde68a",
            "300": "#fcd34d",
            "400": "#fbbf24",
            "500": "#f59e0b",
            "600": "#d97706",
            "700": "#b45309",
            "800": "#92400e",
            "900": "#78350f",
            foreground: "#000",
            DEFAULT: "#f59e0b"
          },
          danger: {
            "50": "#fef2f2",
            "100": "#fee2e2",
            "200": "#fecaca",
            "300": "#fca5a5",
            "400": "#f87171",
            "500": "#ef4444",
            "600": "#dc2626",
            "700": "#b91c1c",
            "800": "#991b1b",
            "900": "#7f1d1d",
            foreground: "#fff",
            DEFAULT: "#ef4444"
          },
          background: "#ffffff",
          foreground: "#0f172a",
          content1: {
            DEFAULT: "#f8fafc",
            foreground: "#000"
          },
          content2: {
            DEFAULT: "#f1f5f9",
            foreground: "#000"
          },
          content3: {
            DEFAULT: "#e2e8f0",
            foreground: "#000"
          },
          content4: {
            DEFAULT: "#cbd5e1",
            foreground: "#000"
          },
          focus: "#2563eb",
          overlay: "#000000"
        }
      },
      dark: {
        layout: {
          disabledOpacity: 0.4
        },
        colors: {
          default: {
            "50": "#0d0f12",
            "100": "#1a1d23",
            "200": "#282c34",
            "300": "#363b45",
            "400": "#4a5160",
            "500": "#6c757d",
            "600": "#8b95a1",
            "700": "#a9b3c0",
            "800": "#c8d1db",
            "900": "#e6eaf0",
            foreground: "#fff",
            DEFAULT: "#4a5160"
          },
          primary: {
            "50": "#0a1628",
            "100": "#172a46",
            "200": "#1e3a64",
            "300": "#264b82",
            "400": "#2e5ca0",
            "500": "#3b82f6",
            "600": "#60a5fa",
            "700": "#93c5fd",
            "800": "#bfdbfe",
            "900": "#dbeafe",
            foreground: "#000",
            DEFAULT: "#3b82f6"
          },
          secondary: {
            "50": "#042f2e",
            "100": "#134e4a",
            "200": "#0f766e",
            "300": "#0d9488",
            "400": "#14b8a6",
            "500": "#2dd4bf",
            "600": "#5eead4",
            "700": "#99f6e4",
            "800": "#ccfbf1",
            "900": "#f0fdfa",
            foreground: "#000",
            DEFAULT: "#2dd4bf"
          },
          success: {
            "50": "#052e16",
            "100": "#14532d",
            "200": "#166534",
            "300": "#15803d",
            "400": "#16a34a",
            "500": "#22c55e",
            "600": "#4ade80",
            "700": "#86efac",
            "800": "#bbf7d0",
            "900": "#dcfce7",
            foreground: "#000",
            DEFAULT: "#22c55e"
          },
          warning: {
            "50": "#451a03",
            "100": "#78350f",
            "200": "#92400e",
            "300": "#b45309",
            "400": "#d97706",
            "500": "#f59e0b",
            "600": "#fbbf24",
            "700": "#fcd34d",
            "800": "#fde68a",
            "900": "#fef3c7",
            foreground: "#000",
            DEFAULT: "#f59e0b"
          },
          danger: {
            "50": "#450a0a",
            "100": "#7f1d1d",
            "200": "#991b1b",
            "300": "#b91c1c",
            "400": "#dc2626",
            "500": "#ef4444",
            "600": "#f87171",
            "700": "#fca5a5",
            "800": "#fecaca",
            "900": "#fee2e2",
            foreground: "#000",
            DEFAULT: "#ef4444"
          },
          background: "#0a0e14",
          foreground: "#e2e8f0",
          content1: {
            DEFAULT: "#151b24",
            foreground: "#fff"
          },
          content2: {
            DEFAULT: "#1e2734",
            foreground: "#fff"
          },
          content3: {
            DEFAULT: "#283444",
            foreground: "#fff"
          },
          content4: {
            DEFAULT: "#334154",
            foreground: "#fff"
          },
          focus: "#3b82f6",
          overlay: "#ffffff"
        }
      }
    }
  })],
}

module.exports = config;