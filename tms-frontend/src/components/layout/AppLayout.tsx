import { useState } from "react";
import { Box, Drawer } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

import { ShipmentUIProvider } from "../../features/shipments/context/ShipmentUIContext";

export default function AppLayout({
  children,
  toggleTheme,
}: {
  children: React.ReactNode;
  toggleTheme: () => void;
}) {
  const [mobileOpen, setmobileOpen] = useState(false);
  const handleDrawerToggle = () => setmobileOpen(!mobileOpen);

  return (
    <ShipmentUIProvider>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        bgcolor="background.paper"
      >
        <Header toggleTheme={toggleTheme} onMenuClick={handleDrawerToggle} />

        <Box display="flex" flex={1} overflow="hidden">
          {/* Hidden on mobile */}
          <Box
            component="nav"
            sx={{
              width: { md: 260 },
              flexShrink: { md: 0 },
              display: { xs: "none", md: "block" },
            }}
          >
            <Sidebar />
          </Box>

          {/* MOBILE SIDEBAR (Drawer) */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260 },
            }}
          >
            <Sidebar onNavItemClick={handleDrawerToggle} />
          </Drawer>

          <Box component="main" flex={1} p={3} overflow="auto">
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </ShipmentUIProvider>
  );
}
