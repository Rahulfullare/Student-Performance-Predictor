import React, { useState } from "react";
import { addCourse } from "../services/courseService";


const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addCourse(courseName);
      setMessage(res.msg);
      setCourseName(""); // clear input
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Error adding course");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            className="form-control"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Course
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default AddCourse;
