import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Avatar,
  Tooltip,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ user = undefined }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const navigateToLogin = () => navigate("/login");
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing out: ", error);
      });
  };
  const toggleDrawer = (newOpen) => (event) => {
    setOpen(newOpen);
  };


  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Home", "Search", "Messages", "Info"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 && <HomeIcon sx={{ color: "white" }} />}
                  {index === 1 && <SearchIcon sx={{ color: "white" }} />}
                  {index === 2 && (
                    <Badge badgeContent={12} color="error">
                      <ChatBubbleIcon sx={{ color: "white" }} />
                    </Badge>
                  )}
                  {index === 3 && <InfoIcon sx={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex", 
        justifyContent: "space-between", 
        p: 2,
        alignItems: "stretch",
        height: "12vh",
        borderRadius: "10px",
        margin: "auto",
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ display: { md: "none" }, flex: 1 }}
        onClick={toggleDrawer(true)}
        
      >
        <MenuIcon sx={{ fontSize: 30 }} />
      </IconButton>

      <Box
        sx={{
          flex: 1,
          m: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            display: { xs: "none", md: "inline-flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
            alignItems: "center",
          }}
        >
          GenPathway
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1, 
          m: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "space-evenly",
        }}
      >
        <IconButton
          aria-label="delete"
          size="large"
          sx={{ color: "white" }}
          onClick={() => navigate("/")}
        >
          <HomeIcon sx={{ fontSize: 30 }} />
        </IconButton>
        { user && <IconButton
          aria-label="delete"
          size="large"
          sx={{ color: "white" }}
          onClick={() => navigate("/search")}
        >
          <SearchIcon sx={{ fontSize: 30 }} />
        </IconButton> }
        { user && (<IconButton aria-label="delete" size="large" sx={{ color: "white" }}>
          <Badge badgeContent={12} color="error">
            <ChatBubbleIcon sx={{ fontSize: 30 }} />
          </Badge>
        </IconButton>)}
        <IconButton
          aria-label="delete"
          size="large"
          sx={{ color: "white" }}
          onClick={() => navigate("/about")}
        >
          <InfoIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1, 
          m: 1, 
          display: "flex",
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: "white",
            color: "black",
            height: "70%",
            fontSize: { xs: ".75rem", sm: "1rem", md: "1rem", lg: "1rem" },
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
          onClick={!user ? navigateToLogin : handleSignOut}
        >
          {!user ? "Log In" : "Sign Out"}
        </Button>

        {user && (
          <Tooltip title={user.email}>
            <IconButton onClick={() => navigate("/profile")}> 
            <Avatar
              alt={user.email.toUpperCase()}
              src="c"
              sx={{ width: 40, height: 40, ml: 2, backgroundColor: "pink" }}
            />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: "#121212", color: "white" } }}
      >
        {drawerList}
      </Drawer>
    </Box>
  );
};

export default Navbar;
