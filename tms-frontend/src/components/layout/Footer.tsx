import { Box, Typography, Link, Stack, Chip, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        px: { xs: 2, md: 4 },
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        boxShadow:
          theme.palette.mode === "light"
            ? "0px -4px 20px rgba(0, 0, 0, 0.03)"
            : "none",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ xs: 3, md: 0 }}
      >
        {/* Branding Section */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="body2"
            sx={{ color: "text.primary", fontWeight: 700, letterSpacing: 0.5 }}
          >
            ULTRA
            <span style={{ color: theme.palette.primary.main }}>SHIP</span> TMS
          </Typography>
          <Chip
            label="v1.0.4"
            size="small"
            variant="outlined"
            sx={{
              height: 20,
              fontSize: "0.65rem",
              fontWeight: 700,
            }}
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Developed by{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              borderBottom: "2px solid",
              borderColor: "primary.main",
              pb: 0.5,
              "&:hover": { color: "primary.dark" },
            }}
          >
            Rahul
          </Box>
        </Typography>

        {/* Social Links */}
        <Stack direction="row" spacing={{ xs: 4, md: 3 }}>
          {[
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/rahurabh/",
            },
            { label: "X", href: "https://x.com/KumarRahul1195" },
            { label: "GitHub", href: "https://github.com/RahuRabh" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              sx={{
                fontSize: { xs: "0.75rem", md: "0.85rem" },
                fontWeight: 600,
                color: "text.secondary",
                textDecoration: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "primary.main",
                  transform: "translateY(-1px)",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
