module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        text: "#180202",
        Lightbackground: "#eeee",
        primary: "#ff6d4d",
        secondary: "#e6e6e5",
        accent: "#d12600",
      },
    },
  },
  plugins: [],
};
