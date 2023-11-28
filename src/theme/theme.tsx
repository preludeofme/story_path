"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 25,
    fontFamily: [
      "NothingYouCouldDo", // Name of your font
      "Arial", // Fallback font
      "sans-serif", // Generic font family
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'NothingYouCouldDo';
          src: url('/font/NothingYouCouldDo.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `,
    },
  },
});

export default theme;
