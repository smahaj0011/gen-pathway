import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  CircularProgress,
  Box,
  Typography,
  CardActionArea,
  Backdrop,
  Button,
  Card,
  CardContent,
} from "@mui/material";


const CollegeCards = ({ user, additionalInfo }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [collegeSelected, setCollegeSelected] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const pageNum = Math.floor(Math.random() * 10) + 1;
        const response = await axios.get(
          `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${import.meta.env.VITE_COLLEGE_SCORECARD_API_KEY}&per_page=51`,
          {
            fields: "school.name,school.city,school.state,latest.student.size",
          }
        );
        console.log(response.data.results);
        setColleges(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box>
          {colleges[collegeSelected] && (
            <>
              <Card sx={{ borderRadius: '10px', display: 'flex', justifyContent: 'center', width: {xd: '60vw',md: '30vw'}, margin: '0 auto' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Name: {colleges[collegeSelected].school.name}
                  </Typography>


                  <Typography variant="body2">
                    Address: {colleges[collegeSelected].school.address},{" "}
                    {colleges[collegeSelected].school.city},{" "}
                    {colleges[collegeSelected].school.state},{" "}
                    {colleges[collegeSelected].school.zip}
                  </Typography>
                  <Typography>
                    Student size:{" "}
                    {colleges[collegeSelected].latest.student.size}
                  </Typography>
                  <Typography>
                    Admission rate:{" "}
                    {colleges[collegeSelected].latest.admissions.admission_rate
                      .overall * 100}
                    %
                  </Typography>
                  <Typography>
                    Average SAT score:{" "}
                    {
                      colleges[collegeSelected].latest.admissions.sat_scores
                        .average.overall || "N/A"
                    } 
                  </Typography>
                  <Typography>
                    Average ACT score:{" "}
                    {
                      colleges[collegeSelected].latest.admissions.act_scores
                        .midpoint.cumulative || "N/A"
                    }
                  </Typography>
                  <Typography>
                    Average cost: $
                    {
                      colleges[collegeSelected].latest.cost.avg_net_price
                        .overall
                    }
                  </Typography>
                  <Typography>
                    Completion rate:{" "}
                    {
                      colleges[collegeSelected].latest.completion
                        .completion_cohort_4yr_150nt
                    }
                  </Typography>
                  <Typography>
                    Median earnings: $
                    {
                      colleges[collegeSelected].latest.earnings[
                        "10_yrs_after_entry"
                      ].median
                    }
                  </Typography>
                  <Typography>
                    Average debt: $
                    {
                      colleges[collegeSelected].latest.aid.median_debt
                        .completers.overall
                    }
                  </Typography>
                  <Typography>
                    Average family income: $
                    {
                      colleges[collegeSelected].latest.student.demographics
                        .avg_family_income
                    }
                  </Typography>
                  <Typography>
                    Average age:{" "}
                    {
                      colleges[collegeSelected].latest.student.demographics
                        .age_entry
                    }
                  </Typography>
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      </Backdrop>
      <Typography variant="h5" sx={{ height: "4vh", textAlign: "center" }}>
        {user && `Hello ${user.displayName}, let's explore some colleges!`}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: "scroll",
          height: "72vh",
          "&::-webkit-scrollbar": { width: "12px" },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            background: "rgba(255,0,0,0.8)",
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.5)",
          },

          
        }}
      >
        <Grid container spacing={2}>
          {colleges.map((college, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setCollegeSelected(index);
                handleOpen();
              }}
            >
              <Paper
                sx={{
                  "&:hover": { backgroundColor: "gray" },
                  padding: 2,
                  textAlign: "center",
                  color: "text.secondary",
                  height: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3>{college.school.name}</h3>
                <p>
                  {college.school.city}, {college.school.state}
                </p>
                <p>Student size: {college.latest.student.size}</p>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CollegeCards;
