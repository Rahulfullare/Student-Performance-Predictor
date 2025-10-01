import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Admin.css";

const Admin = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (id) => setOpenDropdown(openDropdown === id ? null : id);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <Link className="navbar-brand" to="/admin/dashboard">
          <i className="bi bi-lightning-charge"></i> Admin Panel
        </Link>
        <button
          className="navbar-toggler text-white"
          type="button"
          onClick={() => document.getElementById("sidebar").classList.toggle("active")}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link btn btn-link" to="/">
                <i className="bi bi-house"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <Link to="/admin/users"><i className="bi bi-people"></i> Manage Users</Link>

        <a href="#!" onClick={() => toggleDropdown("courseDropdown")}>
          <i className="bi bi-journal-text"></i> Manage Courses
        </a>
        {openDropdown === "courseDropdown" && (
          <div className="dropdown-container">
            <Link to="/admin/addcourse">➤ Add Course</Link>
            <Link to="/admin/viewcourse">➤ View Courses</Link>
          </div>
        )}

        <a href="#!" onClick={() => toggleDropdown("studentDropdown")}>
          <i className="bi bi-person-badge"></i> Manage Students
        </a>
        {openDropdown === "studentDropdown" && (
          <div className="dropdown-container">
            <Link to="/admin/addstudent">➤ Add Student</Link>
            <Link to="/admin/viewstudents">➤ View Students</Link>
          </div>
        )}

        <a href="#!" onClick={() => toggleDropdown("performanceDropdown")}>
          <i className="bi bi-graph-up"></i> Student Performance
        </a>
        {openDropdown === "performanceDropdown" && (
          <div className="dropdown-container">
            <Link to="/admin/performance">➤ Add Performance</Link>
            <Link to="/admin/viewperformance">➤ Search Performance</Link>
          </div>
        )}

        <a href="#!" onClick={() => toggleDropdown("predictionDropdown")}>
          <i className="bi bi-bar-chart"></i> Predictions
        </a>
        {openDropdown === "predictionDropdown" && (
          <div className="dropdown-container">
            <Link to="/admin/predictions">➤ Generate Prediction</Link>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet /> {/* This will render either Prediction.jsx or ViewPrediction.jsx */}
      </div>
    </>
  );
};

export default Admin;
