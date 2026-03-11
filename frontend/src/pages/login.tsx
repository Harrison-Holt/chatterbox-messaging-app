import { Container, Typography, Box, Button, TextField, Alert, Paper } from "@mui/material";
import panel from "../assets/gradient.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.ts";
import { useState } from "react";
import { AlertTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Login() {
  const { username, setUsername, password, setPassword, loading, error, login } = useLogin();

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    setUsernameError("");
    setPasswordError("");

    if (!username.trim()) {
      setUsernameError("Username is required.");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return;

    await login(e);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 3, md: 6 },
          py: 3,
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box component="img" src={logo} alt="ChatterBox logo" sx={{ height: 56, width: "auto" }} />
        </Box>

        {/* Login card */}
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 460,
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 5 },
            borderRadius: 4,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to continue to ChatterBox
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {error && (
            <Alert severity="error">
                {error}
            </Alert>
            )}

            <TextField
              label="Username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameError) setUsernameError("");
              }}
              variant="outlined"
              fullWidth
              error={!!usernameError}
              helperText={usernameError}
            />

            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              variant="outlined"
              fullWidth
              error={!!passwordError}
              helperText={passwordError}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !username.trim() || !password.trim()}
              sx={{
                mt: 1,
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Don&apos;t have an account?
              </Typography>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Create Account
                </Button>
              </Link>
            </Box>
          </Box>
        </Paper>

        {/* Footer */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            &copy; 2026 ChatterBox
          </Typography>
        </Box>
      </Box>

      {/* Right side image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${panel})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: { xs: "none", md: "block" },
        }}
      />
    </Container>
  );
}

export default Login;
