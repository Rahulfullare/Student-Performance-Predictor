import axios from "./axios"; // your axios instance

// Add new course
export const addCourse = async (courseName) => {
  const response = await axios.post("/addcourse", { CourseName: courseName });
  return response.data;
};

// Get all courses
export const getAllCourses = async () => {
  const response = await axios.get("/viewcourse");
  return response.data;
};

// Get course by ID
export const getCourseById = async (cid) => {
  const response = await axios.get(`/getcourse?cid=${cid}`);
  return response.data;
};

// Update course
export const updateCourse = async (cid, CourseName) => {
  const response = await axios.put(`/updatecourse/${cid}`, { CourseName });
  return response.data;
};

// Delete course
export const deleteCourse = async (cid) => {
  const response = await axios.delete(`/deletecourse/${cid}`);
  return response.data;
};
