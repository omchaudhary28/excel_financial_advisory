import axios from "axios";

const api = axios.create({
  baseURL: "https://excel-financial-advisory-backend.onrender.com",
  withCredentials: false,
});

export default api;
