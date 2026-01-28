import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useSnackbar } from "notistack";

export default function Header({
  toggleTheme,
  onMenuClick,
}: {
  toggleTheme: () => void;
  onMenuClick: () => void;
}) {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    enqueueSnackbar("Logged out successfully", { variant: "info" });
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(30, 41, 59, 0.8)",
        backdropFilter: "blur(8px)",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
        <IconButton
          color="inherit"
          onClick={onMenuClick}
          sx={{
            display: { md: "none" },
            color: "primary.main",
            pl:2,
            ml:0,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              borderRadius: 1,
              display: {xs: "none", sm: "flex"},
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              ml: {xs: 0, sm: 1}
            }}
          >
            U
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ display: { xs: "none", sm: "block" }, color: "primary.main" }}
          >
            UltraShip
            <span
              style={{ fontWeight: 400, color: theme.palette.text.secondary }}
            >
              {" "}
              TMS
            </span>
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 2 }}>
          {/* User Info - Hidden on mobile */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box textAlign="right">
              <Typography
                variant="subtitle2"
                sx={{ lineHeight: 1.2, fontWeight: 700 }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                {user.role}
              </Typography>
            </Box>
          </Box>

          <Avatar
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              bgcolor: "action.hover",
              color: "primary.main",
              fontSize: "0.8rem",
            }}
          >
            {user.name?.[0]}
          </Avatar>

          <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon fontSize="small" sx={{ color: "#fbbf24" }} />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            color="inherit"
            startIcon={<LogoutIcon />}
            sx={{
              minWidth: { xs: "auto", sm: "80px" },
              textTransform: "none",
              fontWeight: 600,
              "& .MuiButton-startIcon": { mr: { xs: 0, sm: 1 } },
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Logout
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
