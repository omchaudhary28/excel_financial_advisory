import axios from "axios";

const api = axios.create({
  baseURL: "https://excel-financial-advisory.kesug.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export default api;
