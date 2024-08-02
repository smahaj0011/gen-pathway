import React from "react";
import { Box } from "@mui/material";

const About = () => {
  return (
    <>
      <Box sx={{ height: "76vh", width: '50vw', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1>About Us</h1>
        <h3>
          Hello, we have developed this demo page to show our idea of connecting the 
          community for the ones scared and frightened by college admissions, especially those
          that are in need. We at GenPathways are here to assist you during this 
          stressful time, with information of the college/university that you may want to 
          apply to and even a 1 on 1 chat with a college representative so that they may be able to 
          answer your questions. Here in this app connecting with one another can further assist
          you in accomplishing your goals and the world
        </h3>
      </Box>
    </>
  );
};

export default About;
