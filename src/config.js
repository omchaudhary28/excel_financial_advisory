// API Configuration
// Uses window.location.hostname to automatically switch between localhost and your local IP
// This ensures the app connects to the backend correctly when accessed from a mobile device.
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://excel-financial-advisory.kesug.com";
export default API_BASE_URL;