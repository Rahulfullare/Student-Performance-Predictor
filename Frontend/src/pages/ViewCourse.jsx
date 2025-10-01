import React, { useEffect, useState } from "react";
import { getAllCourses, deleteCourse, updateCourse } from "../services/courseService";

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [newCourseName, setNewCourseName] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Error fetching courses");
    }
  };

  const handleDelete = async (cid) => {
    try {
      await deleteCourse(cid);
      setMessage("Course deleted successfully ");
      fetchCourses(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Error deleting course");
    }
  };

  const handleUpdate = async (cid) => {
    try {
      await updateCourse(cid, newCourseName);
      setMessage("Course updated successfully ");
      setEditingCourseId(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Error updating course");
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Courses</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {courses.length > 0 ? (
          courses.map((course) => (
            <li
              key={course.cid}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingCourseId === course.cid ? (
                <div className="d-flex w-100">
                  <input
                    type="text"
                    className="form-control"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-success ms-2"
                    onClick={() => handleUpdate(course.cid)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary ms-2"
                    onClick={() => setEditingCourseId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span>{course.CourseName}</span>
                  <div>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => {
                        setEditingCourseId(course.cid);
                        setNewCourseName(course.CourseName);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(course.cid)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className="list-group-item">No courses available</li>
        )}
      </ul>
    </div>
  );
};

export default ViewCourse;
