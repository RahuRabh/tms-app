import { createTheme } from "@mui/material/styles";

export const getCustomTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#4f46e5" : "#818cf8", // Indigo
      },
      background: {
        default: mode === "light" ? "#f8fafc" : "#0f172a", // Slate
        paper: mode === "light" ? "#ffffff" : "#1e293b",
      },
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h6: { fontWeight: 700 },
    },
  });
