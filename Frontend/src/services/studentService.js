import axios from "./axios";

//  Register new student
export const registerStudent = async (studentData) => {
  const response = await axios.post("/registerstudent", studentData);
  return response.data;
};

// frontend/services/studentService.js
export const getAllStudents = async (search = "") => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await axios.get(`/viewstudents${query}`);
  return res.data;
};

//  Update student
export const updateStudent = async (sid, studentData) => {
  const res = await axios.put(`/updatestudent/${sid}`, studentData);
  return res.data;
};

//  Delete student
export const deleteStudent = async (sid) => {
  const res = await axios.delete(`/deletestudent/${sid}`);
  return res.data;
};
