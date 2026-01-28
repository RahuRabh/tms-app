import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useShipmentUI } from "../../features/shipments/context/ShipmentUIContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openAdd } = useShipmentUI();

  return (
    <Box
      width={240}
      bgcolor="#5f89e6"
      color="#fff"
      display="flex"
      flexDirection="column"
      pt={2}
    >
      <Box p={3}>
        <Typography variant="h5" fontWeight={600}>
          TMS Dashboard
        </Typography>

        <Divider sx={{ bgcolor: "rgba(157, 71, 71, 0.1)" }} />

        <List>
          <ListItemButton
            selected={location.pathname.includes("grid")}
            onClick={() => navigate("/shipments/grid")}
          >
            <ListItemText primary="Grid View" />
          </ListItemButton>

          <ListItemButton
            selected={location.pathname.includes("title")}
            onClick={() => navigate("/shipments/title")}
          >
            <ListItemText primary="Tile View" />
          </ListItemButton>

          <ListItemButton onClick={openAdd}>
            <ListItemText primary="Add Shipment" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}
