import React, { useEffect, useState, useCallback } from 'react';
import { TextField, Autocomplete, Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { fetchColleges } from '../constants/fetchCollege';
import { useInView } from 'react-intersection-observer';

const Search = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const getColleges = useCallback(async (page) => {
    setLoading(true);
    try {
      const data = await fetchColleges(page);
      if (data.length > 0) {
        setColleges((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getColleges(page);
  }, [page, getColleges]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  const handleCollegeSelect = (event, newValue) => {
    setSelectedCollege(newValue);
  };

  return (
    <Box sx={{ p: 2, height: '72vh', overflowY: 'auto', position: 'relative', width: '95vw', margin: '0 auto' }}>
      <Autocomplete
        options={colleges}
        getOptionLabel={(option) => option.name}
        onChange={handleCollegeSelect}
        renderInput={(params) => <TextField {...params} label="Select College" variant="outlined" />}
        ListboxProps={{ style: { maxHeight: '40vh', overflow: 'auto' } }}
        sx={{ backgroundColor: 'white' }}

        
      />
      {selectedCollege && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5">{selectedCollege.name}</Typography>
            <Typography variant="body1">
              Location: {selectedCollege.location.lat}, {selectedCollege.location.lon}
            </Typography>
            <Typography variant="body1">Size: {selectedCollege.size}</Typography>
            <Typography variant="body1">Admission Rate: {selectedCollege.admissionRate*100}%</Typography>
            <Typography variant="body1">SAT: {selectedCollege.sat || "N/A"}</Typography>

          </CardContent>
        </Card>
      )}
      <div ref={ref} style={{ height: '1px' }} />
      {loading && <CircularProgress sx={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)' }} />}
    </Box>
  );
};

export default Search;
