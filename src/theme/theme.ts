import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#914BF1" },
    background: { default: "transparent", paper: "#272829" },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
    h1: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h2: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h3: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Outfit', sans-serif", fontWeight: 500 },
    h6: { fontFamily: "'Outfit', sans-serif", fontWeight: 500 },
    button: { fontFamily: "'Manrope', sans-serif", fontWeight: 600 },
  },
});

export default theme;
