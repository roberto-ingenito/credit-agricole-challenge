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
            "50": "#f0f4f8",
            "100": "#d9e2ec",
            "200": "#bcccdc",
            "300": "#9fb3c8",
            "400": "#829ab1",
            "500": "#627d98",
            "600": "#486581",
            "700": "#334e68",
            "800": "#243b53",
            "900": "#102a43",
            foreground: "#fff",
            DEFAULT: "#627d98"
          },
          primary: {
            "50": "#e6f0ff",
            "100": "#b3d7ff",
            "200": "#80bfff",
            "300": "#4da6ff",
            "400": "#1a8dff",
            "500": "#0074e6",
            "600": "#005bb3",
            "700": "#004380",
            "800": "#002a4d",
            "900": "#00121a",
            foreground: "#fff",
            DEFAULT: "#0074e6"
          },
          secondary: {
            "50": "#e0f5f5",
            "100": "#b3e5e6",
            "200": "#80d4d6",
            "300": "#4dc3c6",
            "400": "#26b6b9",
            "500": "#00a9ad",
            "600": "#009499",
            "700": "#007a7e",
            "800": "#006163",
            "900": "#004748",
            foreground: "#fff",
            DEFAULT: "#00a9ad"
          },
          success: {
            "50": "#e8f7ed",
            "100": "#c2eacd",
            "200": "#9bddad",
            "300": "#74d08d",
            "400": "#4dc46d",
            "500": "#26b74d",
            "600": "#1e9a3f",
            "700": "#177d31",
            "800": "#0f6023",
            "900": "#084315",
            foreground: "#fff",
            DEFAULT: "#26b74d"
          },
          warning: {
            "50": "#fff7e6",
            "100": "#ffe8b3",
            "200": "#ffd980",
            "300": "#ffca4d",
            "400": "#ffbb1a",
            "500": "#e6a200",
            "600": "#b37f00",
            "700": "#805c00",
            "800": "#4d3900",
            "900": "#1a1600",
            foreground: "#000",
            DEFAULT: "#ffbb1a"
          },
          danger: {
            "50": "#ffe9e9",
            "100": "#ffc2c2",
            "200": "#ff9a9a",
            "300": "#ff7373",
            "400": "#ff4c4c",
            "500": "#ff2424",
            "600": "#e60000",
            "700": "#b30000",
            "800": "#800000",
            "900": "#4d0000",
            foreground: "#fff",
            DEFAULT: "#ff2424"
          },
          background: "#f8fafc",
          foreground: "#1e293b",
          content1: {
            DEFAULT: "#ffffff",
            foreground: "#1e293b"
          },
          content2: {
            DEFAULT: "#f1f5f9",
            foreground: "#1e293b"
          },
          content3: {
            DEFAULT: "#e2e8f0",
            foreground: "#1e293b"
          },
          content4: {
            DEFAULT: "#cbd5e1",
            foreground: "#1e293b"
          },
          focus: "#0074e6",
          overlay: "#000000",
          divider: "#e2e8f0"
        }
      },
      dark: {
        layout: {
          disabledOpacity: 0.4
        },
        colors: {
          default: {
            "50": "#0f1419",
            "100": "#1a202c",
            "200": "#2d3748",
            "300": "#4a5568",
            "400": "#718096",
            "500": "#a0aec0",
            "600": "#cbd5e0",
            "700": "#e2e8f0",
            "800": "#edf2f7",
            "900": "#f7fafc",
            foreground: "#000",
            DEFAULT: "#4a5568"
          },
          primary: {
            "50": "#001a33",
            "100": "#002a4d",
            "200": "#004080",
            "300": "#005bb3",
            "400": "#0074e6",
            "500": "#1a8dff",
            "600": "#4da6ff",
            "700": "#80bfff",
            "800": "#b3d7ff",
            "900": "#e6f0ff",
            foreground: "#000",
            DEFAULT: "#1a8dff"
          },
          secondary: {
            "50": "#002e30",
            "100": "#004748",
            "200": "#006163",
            "300": "#007a7e",
            "400": "#009499",
            "500": "#00a9ad",
            "600": "#26b6b9",
            "700": "#4dc3c6",
            "800": "#80d4d6",
            "900": "#b3e5e6",
            foreground: "#000",
            DEFAULT: "#00a9ad"
          },
          success: {
            "50": "#042111",
            "100": "#084315",
            "200": "#0f6023",
            "300": "#177d31",
            "400": "#1e9a3f",
            "500": "#26b74d",
            "600": "#4dc46d",
            "700": "#74d08d",
            "800": "#9bddad",
            "900": "#c2eacd",
            foreground: "#000",
            DEFAULT: "#26b74d"
          },
          warning: {
            "50": "#1a1600",
            "100": "#4d3900",
            "200": "#805c00",
            "300": "#b37f00",
            "400": "#e6a200",
            "500": "#ffbb1a",
            "600": "#ffca4d",
            "700": "#ffd980",
            "800": "#ffe8b3",
            "900": "#fff7e6",
            foreground: "#000",
            DEFAULT: "#ffbb1a"
          },
          danger: {
            "50": "#2d0000",
            "100": "#4d0000",
            "200": "#800000",
            "300": "#b30000",
            "400": "#e60000",
            "500": "#ff2424",
            "600": "#ff4c4c",
            "700": "#ff7373",
            "800": "#ff9a9a",
            "900": "#ffc2c2",
            foreground: "#000",
            DEFAULT: "#ff4c4c"
          },
          background: "#0f172a",
          foreground: "#e2e8f0",
          content1: {
            DEFAULT: "#1e293b",
            foreground: "#e2e8f0"
          },
          content2: {
            DEFAULT: "#334155",
            foreground: "#e2e8f0"
          },
          content3: {
            DEFAULT: "#475569",
            foreground: "#e2e8f0"
          },
          content4: {
            DEFAULT: "#64748b",
            foreground: "#e2e8f0"
          },
          focus: "#1a8dff",
          overlay: "#ffffff",
          divider: "#334155"
        }
      }
    }
  })],
}

module.exports = config;