// src/services/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // backend base URL
});

// Add token automatically for every request if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
