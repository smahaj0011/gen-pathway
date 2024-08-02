import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {


  return (
    <Box
      sx={{
        height: "12vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontFamily: "Beiruti",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          fontSize: { xs: "1rem", sm: "1.2rem" },
        }}
      >
        © 2024 GenPathway | All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
