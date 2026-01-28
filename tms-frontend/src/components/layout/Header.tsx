import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSnackbar } from "notistack";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = () => {
    localStorage.clear();
    enqueueSnackbar("Logged out successfully", { variant: "info" });
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{ bgcolor: "fff", color: "#333" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight={600}>
          UltraShip TMS
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2">{user.name}</Typography>
          <Avatar sx={{ bgcolor: "#8aadd1" }}>{user.name?.[0]}</Avatar>
          <IconButton onClick={handleLogout} color="error">
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
