import axios from "axios";

// Access the environment variable
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Set a logical fallback only if the variable is missing
const api = axios.create({
  baseURL: envBaseUrl || "https://csc419-backend.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;