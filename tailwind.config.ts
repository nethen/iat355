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
        midground: "var(--midground)",
        foreground: "var(--foreground)",
        diagram: "var(--diagram)",
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
        "m-lg": [
          "min(16.875vw, 4.6875em)",
          {
            // lineHeight:
            //   "min(calc(16.875vw - 36 * (100vw - 20rem)/320), 4.5rem)",
            lineHeight: "calc(1em - ((1em - 3.375rem) / 7))",
            letterSpacing: "-0.05em",
            fontWeight: "300",
          },
        ],
        "t-lg": [
          "4.6875em",
          {
            lineHeight: "0.96em",
            letterSpacing: "-0.05em",
            fontWeight: "300",
          },
        ],

        "r-lg": [
          "6em",
          {
            lineHeight: "1.1667em",
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
