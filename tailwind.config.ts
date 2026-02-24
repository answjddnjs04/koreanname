import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 사용자 디자인 가이드 반영: 60-30-10 법칙
        primary: {
          DEFAULT: "#020617", // Background (60-70%)
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#1e293b", // Sub/Card (25-30%)
          foreground: "#f1f5f9",
        },
        accent: {
          DEFAULT: "#a855f7", // Highlight/CTA (5-10%)
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
