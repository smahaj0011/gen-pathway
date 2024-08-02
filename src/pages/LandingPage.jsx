import React from "react";
import { ReactTyped } from "react-typed";
import { Box, Typography } from "@mui/material";
import "../styles/Home.css";

const LandingPage = () => {
  return (
    <>
      <Box className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "76vh",
          }}
        >
          <Box sx={{ textAlign: "center", height: "9.5vh" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                fontFamily: "DM Sans",
                color: "white",
              }}
            >
              Welcome to <span style={{ color: "white" }}>GenPathway</span>
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontFamily: "Beiruti",
                fontSize: { xs: "2rem", sm: "2rem", md: "3rem" },
              }}
            >
              Discover&nbsp;&nbsp;your
              <ReactTyped
                strings={["future", " path", " community"]}
                typeSpeed={40}
                backSpeed={50}
                loop
                style={{ paddingLeft: "5px", color: "#FFD700" }}
              ></ReactTyped>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
