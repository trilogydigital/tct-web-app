import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#030816",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

export default theme;
