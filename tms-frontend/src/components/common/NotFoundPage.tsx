import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
        textAlign: "center",
        px: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: "primary.main", mb: 2, opacity: 0.8 }} />
      
      <Typography variant="h1" fontWeight={900} color="text.primary" sx={{ fontSize: { xs: '5rem', md: '8rem' }, lineHeight: 1 }}>
        404
      </Typography>
      
      <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
        Oops! Page not found.
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 450 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 700,
          boxShadow: "0 8px 16px rgba(79, 70, 229, 0.2)"
        }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}
