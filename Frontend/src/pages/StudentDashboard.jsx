// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentDashboardData, getStudentPerformances, getStudentPredictions } from "../services/studentDashboardService";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previousResults, setPreviousResults] = useState([]);
  const [showPrevious, setShowPrevious] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      navigate("/login");
      return;
    }

    fetchDashboard();
  }, [navigate]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const dashboardData = await getStudentDashboardData();
      setData(dashboardData);
    } catch (err) {
      if (err.response?.data?.msg === "Student not found") {
        setError("Your student profile was not found. Please contact administrator.");
        localStorage.clear();
      } else {
        setError("Failed to load dashboard. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousResults = async () => {
    if (!data?.student?.sid) return;
    try {
      const [perfList, predList] = await Promise.all([
        getStudentPerformances(data.student.sid),
        getStudentPredictions(data.student.sid),
      ]);

      // Merge them by created_at (if available)
      const merged = [
        ...(perfList || []).map((p) => ({
          type: "Performance",
          date: p.created_at || p.date || null,
          details: `Machine: ${p.machine_test}, MCQ: ${p.mcq_test}, Interview: ${p.mock_interview_score}`,
        })),
        ...(predList || []).map((pr) => ({
          type: "Prediction",
          date: pr.created_at,
          details: `Predicted: ${pr.predicted_percentage}%, Status: ${pr.status_message}`,
        })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));

      setPreviousResults(merged);
      setShowPrevious(true);
    } catch (err) {
      console.error("Error fetching previous results:", err);
    }
  };

  if (loading)
    return <p className="text-center text-lg font-medium mt-10">Loading dashboard...</p>;

  if (error)
    return (
      <div className="flex flex-col items-center mt-10">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/login")}
        >
          Return to Login
        </button>
      </div>
    );

  if (!data) return <p className="text-center mt-10">No data available.</p>;

  const { student, performance, prediction } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">🎓 Student Dashboard</h2>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">My Profile</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Name:</span> {student?.StudentName || "-"}</p>
          <p><span className="font-medium">Email:</span> {student?.email || "-"}</p>
          <p><span className="font-medium">Contact:</span> {student?.contact || "-"}</p>
          <p><span className="font-medium">Course:</span> {student?.course || "-"}</p>
        </div>
      </div>

      {/* Performance Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">My Performance</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Machine Test:</span> {performance?.machine_test ?? "-"}</p>
          <p><span className="font-medium">MCQ Test:</span> {performance?.mcq_test ?? "-"}</p>
          <p><span className="font-medium">Mock Interview:</span> {performance?.mock_interview_score ?? "-"}</p>
        </div>
      </div>

      {/* Prediction Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">Prediction</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-medium">Predicted Percentage:</span> {prediction?.predicted_percentage ?? "-"}</p>
          <p><span className="font-medium">Status:</span> {prediction?.status_message ?? "-"}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
          onClick={fetchDashboard}
        >
          Refresh
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          onClick={fetchPreviousResults}
        >
          View Previous Results
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}        >
          Logout
        </button>
      </div>

      {/* Previous Results Section */}
      {showPrevious && (
        <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Previous Results</h3>
          {previousResults.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {previousResults.map((item, idx) => (
                <li
                  key={idx}
                  className="border p-3 rounded bg-white shadow-sm flex justify-between"
                >
                  <span>
                    <span className="font-medium">{item.type}:</span> {item.details}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {item.date ? new Date(item.date).toLocaleString() : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No previous records found.</p>
          )}
        </div>
      )}
    </div>
  );
}