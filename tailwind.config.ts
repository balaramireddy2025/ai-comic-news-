import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        comic: {
          yellow: "#FFD700",
          red: "#FF4444",
          blue: "#0066CC",
          green: "#00CC66",
          orange: "#FF8800",
          purple: "#AA44FF",
        },
      },
      fontFamily: {
        comic: ["var(--font-comic-headline)", "cursive"],
        comicBody: ["var(--font-comic-body)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;

