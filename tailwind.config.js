/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        custom2Xlg: "1180px",
        customXlg: "1108px",
        customTablet1: "940px",
        customMiniTablet: "700px",
      },
      colors: {
        customBlue: {
          100: "#0500ff",
        },
        customGray: {
          100: "#e5e7eb",
          200: "#252525",
          300: "#f0f0f2",
          400: "#616e85",
          500: "#0d1421",
          600: "#d9d9d9",
        },
        customRed: {
          100: "#c21414",
        },
        customGreen: {
          100: "#008e29",
        },
        customPurple: {
          100: "#6764ff",
        },
        customYellow: {
          100: "#ca8f10",
        },
      },
      fontSize: {
        custom15px: "15px",
      },
      keyframes: {
        rotateWithPause: {
          "0%": { transform: "rotate(0deg)" },
          "40%": { transform: "rotate(360deg)" }, // adjust % for spin length
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "rotate-pause": "rotateWithPause 7s linear infinite", // adjust total cycle
      },
    },
  },
  plugins: [],
};
