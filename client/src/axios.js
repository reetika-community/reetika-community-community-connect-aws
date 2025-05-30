// import axios from 'axios';

// // const instance = axios.create({
// //   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api', // Using environment variable or local fallback
// // });

// const instance = axios.create({
//   // Ensure this baseURL matches your backend's address and port
//   baseURL: process.env.REACT_APP_API_BASE_URL || 'd35nkvkwxhw2yr.cloudfront.net/api', // Changed to port 5000
// });

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default instance;

import axios from 'axios';

const instance = axios.create({
  // Use your actual backend URL (EC2 public IP or domain name + port)
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://d35nkvkwxhw2yr.cloudfront.net',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
