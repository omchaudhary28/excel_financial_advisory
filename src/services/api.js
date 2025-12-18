import axios from "axios";

const api = axios.create({
  // 🔴 IMPORTANT: SAME ORIGIN
  // This makes `/api/login` go to Vercel, not InfinityFree
  baseURL: "",

  headers: {
    Accept: "application/json",
  },
});

export default api;
