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
        primary: "#074bae",
        secondary: "#c66be4",
        tertiary: "#f7f7f7",
        quaternary: "#9962d8"
      },
      // lato and hind fonts applied uniformly
      fontFamily: { 
        lato: ["Lato", "sans-serif"],
        hind: ["Hind", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
