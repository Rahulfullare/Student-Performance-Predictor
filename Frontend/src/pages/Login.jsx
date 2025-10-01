import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await LoginService.loginUser(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("username", data.user.username);

      if (data.user.role === "admin") {
        setMsg("Admin Logged In ✅");
        navigate("/admin/dashboard");
      } else if (data.user.role === "student") {
        setMsg("Student Logged In ✅");
        navigate("/student/dashboard");
      } else {
        setMsg("Access Denied ❌");
      }
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh", // full screen height
        background: "linear-gradient(135deg, #74ebd5, #ACB6E5)", // example bg
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 800,
          background: "#fff",
          padding: "70px",
          borderRadius: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h3 className="text-center mb-5">🔑 Login</h3>

        {msg && <div className="alert alert-info text-center py-2">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Enter Username / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="on"
          />

          <input
            type="password"
            className="form-control mb-4"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="on"
          />

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register Here
            </Link>
          </p>
          <p>
            Back to{" "}
            <Link to="/" className="text-decoration-none">
              Home Page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
