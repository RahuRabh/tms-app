import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

import type { loginResponse, loginVariables } from "../types";

import { useSnackbar } from "notistack";

import { LOGIN } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [login] = useMutation<loginResponse, loginVariables>(LOGIN, {
    onCompleted: () => {
      enqueueSnackbar("Login successful! Welcome back.", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Login failed. Please check your credentials.", {
        variant: "error",
      });
    },
  });

  const validate = () => {
    const newErrors = { email: "", password: "" };
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((x) => x === "");
  };

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    if (validate()) {
      const { data } = await login({ variables: form });

      if (!data) return;

      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      navigate("/shipments/view");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 380,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          color="primary"
          gutterBottom
          sx={{ letterSpacing: "-0.5px" }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={4}>
          Enter your credentials to access the TMS Dashboard
        </Typography>

        <TextField
          label="Email Address"
          name="email"
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          variant="outlined"
          margin="normal"
          autoComplete="email"
          onChange={handleChange}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          variant="outlined"
          margin="normal"
          autoComplete="current-password"
          onChange={handleChange}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: "600",
            boxShadow: "0 4px 14px 0 rgba(25, 118, 210, 0.39)",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(25, 118, 210, 0.23)",
            },
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <Box mt={3}>
          <Typography variant="caption" color="textSecondary">
            Protected by TMS Secure Auth
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
