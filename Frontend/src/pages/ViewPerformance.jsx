import React, { useState } from "react";
import { getPerformanceById } from "../services/performanceService";

const ViewPerformance = () => {
  const [sid, setSid] = useState("");
  const [performance, setPerformance] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      const data = await getPerformanceById(sid);
      setPerformance(data);
      setMessage("");
    } catch (err) {
      console.error(err);
      setPerformance(null);
      setMessage(err.response?.data?.message || " No performance found");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Student Performance</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          value={sid}
          onChange={(e) => setSid(e.target.value)}
          placeholder="Enter Student ID"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {message && <div className="alert alert-warning">{message}</div>}

      {performance && (
        <div className="card p-3">
          <h5>Performance of Student ID: {performance.sid}</h5>
          <ul>
            <li>Attendance: {performance.attendance_percentage}%</li>
            <li>Machine Test: {performance.machine_test}</li>
            <li>MCQ Test: {performance.mcq_test}</li>
            <li>Interview: {performance.mock_interview_score}</li>
            <li>Final Score: {performance.final_score}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewPerformance;
