import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/FINANCIAL-project', // Adjust if your PHP server is elsewhere
  withCredentials: true, // This is crucial for sending session cookies
});

export default api;
