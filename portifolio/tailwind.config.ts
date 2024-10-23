import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
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
        customBlue: "#02001a",
      },
      backgroundColor:{
        "blue-1000": "#02001a",
      },
      
      backgroundImage: {
          'gradient-90': 'linear-gradient(90deg, #5170ff, #ff66c4)',
        },
    },
  },
  plugins: [
    typography,
    forms
  ],
};
export default config;
