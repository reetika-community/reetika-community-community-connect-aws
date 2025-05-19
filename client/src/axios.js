import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://YOUR_EC2_PUBLIC_IP:5000/api', // replace this
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
