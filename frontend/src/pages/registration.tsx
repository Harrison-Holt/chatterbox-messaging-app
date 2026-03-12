import { Container, Typography, Box, Button, TextField, Alert, Paper } from "@mui/material";
import panel from "../assets/gradient.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister.ts";

function Registration() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    retypedPassword,
    setRetypedPassword,
    loading,
    error,
    register,
  } = useRegister();

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
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 3, md: 6 },
          py: 3,
          height: "100%",
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

        {/* Register card */}
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
              Create your account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join ChatterBox and start connecting
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={register}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              fullWidth
            />

            <TextField
              label="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
            />

            <TextField
              label="Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              fullWidth
              helperText="8+ chars, uppercase, lowercase, number, special character"
            />

            <TextField
              label="Confirm Password"
              id="confirm_password"
              name="confirm_password"
              value={retypedPassword}
              onChange={(e) => setRetypedPassword(e.target.value)}
              type="password"
              variant="outlined"
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Already have an account?
              </Typography>
              <Link to="/login" style={{ textDecoration: "none" }}>
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
                  Login
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${panel})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: { xs: "none", md: "block" },
        }}
      />
    </Container>
  );
}

export default Registration;


