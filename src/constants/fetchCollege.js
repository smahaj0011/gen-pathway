import axios from 'axios';

const API_KEY = import.meta.env.VITE_COLLEGE_SCORECARD_API_KEY;
const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';

export const fetchColleges = async (page = 10) => {
  const response = await axios.get(BASE_URL, {
    params: {
      api_key: API_KEY,
      _fields: 'school.name,location.lat,location.lon,latest.student.size,latest.admissions.admission_rate.overall,latesst.admissions.sat_scores.average.overall',
      per_page: 51, 
      page,

    },
  });

  return response.data.results.map((school,index) => ({
    id: index,
    name: school['school.name'],
    location: {
      lat: school['location.lat'],
      lon: school['location.lon'],
    },
    sat: school['latest.admissions.sat_scores.average.overall'],
    size: school['latest.student.size'],
    admissionRate: school['latest.admissions.admission_rate.overall'],
    


  }));
};
