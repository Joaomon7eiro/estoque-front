import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc1OTQ1NTgzLCJleHAiOjE1NzY1NTAzODN9.HF_dkeonbp_U8TOcbwUXMMkJW7UvrMdEBnpdTVPsLJo',
  },
});

export default api;
