import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import StudentDashboard from "./pages/StudentDashboard";
import AddCourse from "./pages/AddCourse";
import ViewCourse from "./pages/ViewCourse";
import AddPerformance from "./pages/AddPerformance";
import ViewPerformance from "./pages/ViewPerformance";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudents";
import Prediction from "./pages/Prediction";
import ViewPrediction from "./pages/viewPrediction";

// Protected route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<div>Admin Dashboard</div>} />
        <Route path="addcourse" element={<AddCourse />} />
        <Route path="viewcourse" element={<ViewCourse />} />
        <Route path="addstudent" element={<AddStudent />} />
        <Route path="viewstudents" element={<ViewStudents />} />
        <Route path="performance" element={<AddPerformance />} />
        <Route path="viewperformance" element={<ViewPerformance />} />
        <Route path="predictions" element={<Prediction />} />
        <Route path="viewprediction/:sid" element={<ViewPrediction />} />

        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Student Route */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  </Router>
);

export default App;
