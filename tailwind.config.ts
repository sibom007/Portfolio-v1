import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      contrast: {
        25: ".15",
      },
      backgroundColor: {
        primary: "#804ceb",
      },
      textColor: {
        primary: "#804ceb",
      },
      borderColor: {
        primary: "#804ceb",
      },
      outlineColor: {
        primary: "#804ceb",
      },
    },
  },
  plugins: [],
};
export default config;
