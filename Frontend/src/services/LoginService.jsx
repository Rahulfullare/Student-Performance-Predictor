import axios from "./axios";

// Login
const loginUser = async (username, password) => {
  const response = await axios.post("/login", { username, password });
  return response.data;
};

// Register new user
const registerUser = async (username, password, role) => {
  const response = await axios.post("/adduser", { username, password, role });
  return response.data;
};

// Admin dashboard (protected)
const getAdminDashboard = async () => {
  const response = await axios.get("/admin");
  return response.data;
};

// Student dashboard (protected)
const getStudentDashboard = async () => {
  const response = await axios.get("/user");
  return response.data;
};

export default { loginUser, registerUser, getAdminDashboard, getStudentDashboard };
