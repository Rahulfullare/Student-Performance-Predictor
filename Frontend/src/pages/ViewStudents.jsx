import React, { useEffect, useState } from "react";
import { getAllStudents, updateStudent, deleteStudent } from "../services/studentService";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [searchName, setSearchName] = useState("");

  // Fetch students (full list if name is empty)
const fetchStudents = async (searchTerm = "") => {
  try {
    const data = await getAllStudents(searchTerm); // send search term
    setStudents(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error fetching students:", err);
    setStudents([]);
  }
};


  useEffect(() => {
    fetchStudents(); // fetch full list on load
  }, []);

  // Delete student
  const handleDelete = async (sid) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(sid);
        fetchStudents(searchName);
      } catch (err) {
        console.error("Error deleting student:", err);
      }
    }
  };

  // Update student
  const handleUpdate = async (sid) => {
    if (!editStudent.StudentName || !editStudent.email || !editStudent.course) {
      alert("Name, Email, and Course are required!");
      return;
    }
    try {
      await updateStudent(sid, editStudent);
      setEditStudent(null);
      fetchStudents(searchName);
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  // Search students
  const handleSearch = () => {
    fetchStudents(searchName.trim());
  };

  return (
    <div className="container mt-5">
      <h3>All Students</h3>

      {/* Search Box */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Search "
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Students Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>SID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s.sid}>
                <td>{s.sid}</td>
                <td>
                  {editStudent?.sid === s.sid ? (
                    <input
                      type="text"
                      value={editStudent.StudentName}
                      onChange={(e) =>
                        setEditStudent({ ...editStudent, StudentName: e.target.value })
                      }
                    />
                  ) : (
                    s.StudentName
                  )}
                </td>
                <td>
                  {editStudent?.sid === s.sid ? (
                    <input
                      type="email"
                      value={editStudent.email}
                      onChange={(e) =>
                        setEditStudent({ ...editStudent, email: e.target.value })
                      }
                    />
                  ) : (
                    s.email
                  )}
                </td>
                <td>
                  {editStudent?.sid === s.sid ? (
                    <input
                      type="text"
                      value={editStudent.contact}
                      onChange={(e) =>
                        setEditStudent({ ...editStudent, contact: e.target.value })
                      }
                    />
                  ) : (
                    s.contact
                  )}
                </td>
                <td>
                  {editStudent?.sid === s.sid ? (
                    <input
                      type="text"
                      value={editStudent.course}
                      onChange={(e) =>
                        setEditStudent({ ...editStudent, course: e.target.value })
                      }
                    />
                  ) : (
                    s.course
                  )}
                </td>
                <td>
                  {editStudent?.sid === s.sid ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdate(s.sid)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditStudent(s)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(s.sid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
