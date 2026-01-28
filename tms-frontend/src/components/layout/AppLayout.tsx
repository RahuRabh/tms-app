import { Box } from "@mui/material";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { ShipmentUIProvider } from "../../features/shipments/context/ShipmentUIContext";
import Footer from "./layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ShipmentUIProvider>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        bgcolor="#f5f7fa"
      >
        <Header />
        <Box flex={1} display="flex" overflow="hidden">
          <Sidebar />

          <Box flex={1} p={3} bgcolor="#f5f7fa" overflow="auto">
            {children}
          </Box>

          <Footer />
        </Box>
      </Box>
    </ShipmentUIProvider>
  );
}
