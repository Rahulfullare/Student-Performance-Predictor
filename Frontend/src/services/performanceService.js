// src/services/performanceService.js
import axios from "./axios";

// Add performance for a student
export const addPerformance = async (performanceData) => {
  const response = await axios.post("/performance", performanceData);
  return response.data;
};

// Get performance by student ID
export const getPerformanceById = async (sid) => {
  const response = await axios.get(`/getperfom/${sid}`);
  return response.data;
};

// Get all students (admin)
export const getAllStudents = async () => {
  const response = await axios.get("/viewstudents");
  return response.data;
};
