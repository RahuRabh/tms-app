import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";

import { useNavigate, useLocation } from "react-router-dom";

import { useShipmentUI } from "../../features/shipments/context/ShipmentUIContext";

export default function Sidebar({ onNavItemClick }: { onNavItemClick?: () => void}) {
  const navigate = useNavigate();
  
  const theme = useTheme();
  
  const { openAdd } = useShipmentUI();
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.role as "admin" | "employee";
  
  // Checks which path is active
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  const menuItems = [
    { text: "Grid View", icon: <GridViewIcon />, path: "/shipments/grid" },
    { text: "Tile View", icon: <ViewQuiltIcon />, path: "/shipments/title" },
  ];

   const handleNavigation = (path: string) => {
    navigate(path);
    if (onNavItemClick) onNavItemClick();
  };

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s ease",
      }}
    >
      <Box p={3}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1.2 }}
        >
          Management
        </Typography>

        <List sx={{ mt: 2, px: 0 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                py: 1.2,
                px: 2,
                transition: "all 0.2s",
                "&.Mui-selected": {
                  bgcolor: `${theme.palette.primary.main}20`,
                  color: "primary.main",
                  "& .MuiListItemIcon-root": { color: "primary.main" },
                  "&:hover": { bgcolor: `${theme.palette.primary.main}30` },
                },
                "&:hover": {
                  bgcolor: "action.hover",
                  transform: "translateX(4px)",
                  color: "primary.main",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 600 }}
              />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 2, opacity: 0.6 }} />
          
          {/* Action Button */}
          <ListItemButton
            onClick={openAdd}
            sx={{
              borderRadius: 2,
              py: 1.2,
              px: 2,
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
                boxShadow: `0 4px 12px ${theme.palette.mode === "light" ? "rgba(25, 118, 210, 0.2)" : "rgba(0, 0, 0, 0.5)"}`,
              },
            }}
            disabled={userRole === "employee"}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Add Shipment"
              primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 700 }}
            />
          </ListItemButton>
        
        </List>
        
      </Box>

      {/* Active Server Check */}
      <Box sx={{ mt: "auto", p: 3 }}>
        <Box
          sx={{
            p: 2,
            bgcolor: "action.hover",
            borderRadius: 3,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" fontWeight={700} color="text.secondary">
            SYSTEM STATUS
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "success.main",
                borderRadius: "50%",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? `0 0 8px ${theme.palette.success.main}`
                    : "none",
              }}
            />
            <Typography variant="caption" fontWeight={600} color="text.primary">
              Operational
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
