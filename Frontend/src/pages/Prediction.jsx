import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePrediction, getAllStudents } from "../services/predictionService";

const Prediction = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (sid) => {
    try {
      setLoading(true);
      await generatePrediction(sid);
      setLoading(false);
      navigate(`/admin/viewprediction/${sid}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Generate Predictions</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.sid}>
              <td>{s.StudentName}</td>
              <td>{s.course}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleGenerate(s.sid)}>
                  Generate Prediction
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Generating...</p>}
    </div>
  );
};

export default Prediction;
