import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          from: {
            opacity: "0",
            transform: "scale(0.9)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-ring": {
          "0%": {
            boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.7)",
          },
          "70%": {
            boxShadow: "0 0 0 10px rgba(245, 158, 11, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(245, 158, 11, 0)",
          },
        },
        slideInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        popIn: "popIn 0.3s ease",
        fadeInUp: "fadeInUp 0.5s ease",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        slideInUp: "slideInUp 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
