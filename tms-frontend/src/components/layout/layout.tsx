import { Box, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #e5e7eb",
        bgcolor: "#ffffff",
        py: 2,
        px: 3,
        mt: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Typography variant="body2" color="text.secondary">
          Designed and developed as part of a scalable TMS product demo.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Rahul •
          </Typography>

          <Link
            href="https://www.linkedin.com/in/rahurabh/"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            LinkedIn
          </Link>

          <Link
            href="https://x.com/KumarRahul1195"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            X
          </Link>

          <Link
            href="https://github.com/RahuRabh"
            target="_blank"
            underline="hover"
            color="inherit"
          >
            GitHub
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
