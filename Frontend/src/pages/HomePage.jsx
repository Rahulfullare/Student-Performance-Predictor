import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been submitted.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#004d40" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white" to="/">
            StudentApp 🎓
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={scrollToAbout}
                >
                  About Us
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/studentlife">
                  Student Life
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={scrollToContact}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          backgroundImage: "url('/student_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        {/* Hero Content (optional) */}
      </div>

      {/* About Us Section */}
      <div
        ref={aboutRef}
        className="container my-5 p-5"
        style={{
          backgroundColor: "#f3f3f3ff",
          borderRadius: "10px",
          color: "black",
          border: "2px solid black",
        }}
      >
        <h1 className="mb-4 text-center">About Us</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          StudentApp is designed to help students easily connect with faculty,
          access learning resources, and manage their academic life in one
          centralized platform. Our team includes passionate developers, designers,
          and educators who collaborated to create an engaging and intuitive
          platform. The app was created to simplify communication, enhance
          educational engagement, and empower students with a digital solution for
          their academic journey.
        </p>
      </div>

      {/* Contact Us Section with Form */}
      <div
        ref={contactRef}
        className="container my-5 p-5"
        style={{
          backgroundColor: "#fefefeff",
          borderRadius: "10px",
          color: "black",
          border: "2px solid #006064",
        }}
      >
        <h1 className="mb-4 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message:
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
