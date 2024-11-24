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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        "2xl": "1440px",
        "3xl": "1536px",
        "4xl": "1920px",
        "5xl": "2560px",
      },
      fontSize: {
        "r-base": [
          "1rem",
          {
            lineHeight: "1.125em",
            letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "r-md": [
          "2.5625em",
          {
            lineHeight: "1.1707em",
            letterSpacing: "-0.03em",
            fontWeight: "300",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
