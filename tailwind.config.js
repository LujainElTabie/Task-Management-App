/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D49600",
        secondary: "#1E5154",
        black: "#202B30",
        grey: "#D7D7D7",
        pastDue: "#FF4C23",
        inTime: "#7E92A2",
        greyText: "#617D8A",
        lightGrey: "#F2F2F2",
        darkBlue: "#092C4C",
      },
      spacing: {
        "2x": "20px",
        "3x": "30px",
      },
      borderRadius: {
        "4xl": "40px",
      },
    },
  },
  plugins: [],
};
