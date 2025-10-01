import axios from "axios";

export const generatePrediction = async (sid) => {
  const res = await axios.post(`http://localhost:3000/prediction/${sid}`);
  return res.data;
};

export const getLatestPrediction = async (sid) => {
  const res = await axios.get(`http://localhost:3000/prediction/${sid}`);
  return res.data;
};

export const getAllStudents = async () => {
  const res = await axios.get("http://localhost:3000/viewstudents");
  return res.data;
};
