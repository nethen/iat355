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
        background: "rgb(var(--background) / <alpha-value>)",
        midground: "rgb(var(--midground) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        diagram: "rgb(var(--diagram) / <alpha-value>)",
      },
      screens: {
        xs: "480px",
        "2xl": "1440px",
        "3xl": "1536px",
        "4xl": "1920px",
        "5xl": "2560px",
      },
      fontSize: {
        "r-micro": [
          "1rem",
          {
            lineHeight: "1.3125rem",
            letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "r-base": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "r-xs": [
          "1.5rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.025em",
            fontWeight: "400",
          },
        ],
        "r-sm": [
          "2.4375rem",
          {
            lineHeight: "2.625rem",
            letterSpacing: "-0.025em",
            fontWeight: "400",
          },
        ],
        "r-md": [
          "3.25rem",
          {
            lineHeight: "3.5rem",
            letterSpacing: "-0.03em",
            fontWeight: "300",
          },
        ],

        "r-lg": [
          "4.9375rem",
          {
            lineHeight: "4.375rem",
            letterSpacing: "-0.05em",
            fontWeight: "300",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
