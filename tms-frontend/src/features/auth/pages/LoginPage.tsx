import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { loginResponse, loginVariables } from "../types";
import { useSnackbar } from "notistack";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const { data } = await login({ variables: form });

    if (!data) return;

    localStorage.setItem("token", data.login.token);
    localStorage.setItem("user", JSON.stringify(data.login.user));
    navigate("/shipments/view");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper sx={{ p: 4, width: 320 }}>
        <Typography variant="h6" mb={2}>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
