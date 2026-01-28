import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider, CssBaseline } from "@mui/material";

import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import ShipmentPage from "./features/shipments/pages/ShipmentPage";

import { getCustomTheme } from "./theme/theme";

import NotFoundPage from "./components/common/NotFoundPage";

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => getCustomTheme(mode), [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/shipments/grid" replace />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/shipments/:view"
            element={
              <ProtectedRoute>
                <AppLayout toggleTheme={toggleTheme}>
                  <ShipmentPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
