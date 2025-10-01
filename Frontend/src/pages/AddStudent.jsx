// src/pages/AddStudent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../services/studentService";

export default function AddStudent() {
  const [StudentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [course, setCourse] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        StudentName,
        email,
        password,
        contact,
        course,
      };

      const res = await registerStudent(studentData);
      setMsg(res.msg || "Student added successfully");

      // Clear form after submission
      setStudentName("");
      setEmail("");
      setPassword("");
      setContact("");
      setCourse("");
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed to add student ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="text-center mb-4"> Add Student</h3>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={StudentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-success w-100">
          Add Student
        </button>
      </form>

      {/* <p className="text-center mt-3">
        Back to{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </span>
      </p> */}
    </div>
  );
}
