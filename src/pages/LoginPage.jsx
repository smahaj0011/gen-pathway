import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const theme = createTheme();

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then()
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setOpen(true);
          setMessage("Incorrect email/password");
        } else if (error.code == "auth/too-many-requests") {
          setOpen(true);
          setMessage("Too many requests. Try again later.");
        }


        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "76vh",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#121212",
              padding: 3,
              borderRadius: 2,
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
              color: "#fff",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  style: {
                    backgroundColor: "#262626",
                    borderRadius: "5px",
                    color: "#fff",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#8e8e8e",
                  },
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  style: {
                    backgroundColor: "#262626",
                    borderRadius: "5px",
                    color: "#fff",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#8e8e8e",
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#fff",
                  color: "#121212",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Log in
              </Button>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "#8e8e8e",
                  textAlign: "center",
                  display: "block",
                  marginBottom: 2,
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#121212",
              padding: 2,
              borderRadius: 2,
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
              color: "#fff",
            }}
          >
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                variant="body2"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default LoginPage;
