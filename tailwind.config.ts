import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : {
        "btn" : "hsl(26, 77, 50)",
        "primary" : "hsl(25, 97, 41)",
        "form" : "hsl(200,100,99)",
        "gray" : "hsl(0,0,55)",
        "black" : "var(--black)",
        "border" : "hsl(26, 77, 50)"
      },
    },
  },
  plugins: [],
};
export default config;
