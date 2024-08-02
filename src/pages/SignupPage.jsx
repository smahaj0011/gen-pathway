import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Snackbar,
  Alert,
  TextField,
  Typography,
  Link,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase'
import { setDoc, doc } from "firebase/firestore";
const theme = createTheme();

const SignupPage = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [student, setStudent] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleSignup = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(userCredential.user, { displayName: username }).then().catch((error) => {console.log(error)});
        setDoc(doc(db, "users", user.uid), {
          email,
          username,
          student,
          uid: user.uid
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });

      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setOpen(true);
          setMessage("The email address is already in use.");
        } else if (error.code === "auth/weak-password") {
          setOpen(true);
          setMessage("The password should be atleast 6 characters");
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
          sx={{ width: '100%' }}
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
              padding: 4,
              borderRadius: 2,
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography component="h1" variant="h6" sx={{ fontWeight: "bold" }}>
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
              <TextField
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
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
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
                onChange={(e) => setUsername(e.target.value)}
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
              <FormControlLabel control={<Checkbox  />} label="Make College Account" sx={{ 
                  '& .MuiSvgIcon-root': {
                    borderColor: 'red', 
                    '& path': {
                      stroke: 'white',
                      strokeWidth: 2,
                    },
                  },
               }} onClick={() => setStudent(s => !s)}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  backgroundColor: "#fff",
                  color: "#121212",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Sign up
              </Button>
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
            }}
          >
            <Typography variant="body2">
              Have an account?{" "}
              <Link
                variant="body2"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignupPage;
