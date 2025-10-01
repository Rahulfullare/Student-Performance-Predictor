import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../services/studentService";

export default function Register() {
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

      setMsg(res.msg || "Student registered successfully ");

      // Redirect to login after 1.5 seconds
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.error || "Registration failed ");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="text-center mb-4">🎓 Student Registration</h3>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={StudentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
          autoComplete="on"
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="on"
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
          autoComplete="on"
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
          autoComplete="on"
        />

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
}
