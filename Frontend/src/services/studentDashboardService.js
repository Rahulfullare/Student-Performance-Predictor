import axios from "./axios";

export const getStudentDashboardData = async () => {
  try {
    //  Logged-in student
    const studentRes = await axios.get("/student/me");
    const student = studentRes.data;

    if (!student?.sid) throw new Error("Student ID missing from backend");

    const sid = student.sid;

    //  Performance
    const perfRes = await axios.get(`/getperfom/${sid}`);
    const performance = perfRes.data || {};

    //  Prediction
    const predRes = await axios.get(`/prediction/${sid}`);
    const prediction = predRes.data || {};

    return { student, performance, prediction };
  } catch (err) {
    console.error("Error fetching student dashboard data:", err.response?.data || err.message);
    throw err;
  }
};

// services/studentDashboardService.js
export const getStudentPerformances = async (sid) => {
  const res = await axios.get(`/performances/${sid}`);
  return res.data;
};

export const getStudentPredictions = async (sid) => {
  const res = await axios.get(`/predictions/${sid}`);
  return res.data;
};
