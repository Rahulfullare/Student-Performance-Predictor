import React, { useEffect, useState } from "react";
import axios from "axios";

const AddPerformance = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    machine_test: "",
    mcq_test: "",
    mock_interview_score: "",
  });
  const [message, setMessage] = useState("");

  //  Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/viewstudents");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Submit performance for selected student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      await axios.post("http://localhost:3000/performance", {
        sid: selectedStudent.sid,
        ...formData,
      });
      setMessage(` Performance added for ${selectedStudent.StudentName}`);
      setFormData({ machine_test: "", mcq_test: "", mock_interview_score: "" });
      setSelectedStudent(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || " Failed to add performance");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Student Performance</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {!selectedStudent ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>SID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.sid}>
                  <td>{s.sid}</td>
                  <td>{s.StudentName}</td>
                  <td>{s.course}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedStudent(s)}
                    >
                      Add Performance
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>Add Performance for {selectedStudent.StudentName}</h4>
          <input
            type="number"
            name="machine_test"
            value={formData.machine_test}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Machine Test Marks"
            required
          />
          <input
            type="number"
            name="mcq_test"
            value={formData.mcq_test}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="MCQ Test Marks"
            required
          />
          <input
            type="number"
            name="mock_interview_score"
            value={formData.mock_interview_score}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Mock Interview Score"
            required
          />
          <button type="submit" className="btn btn-success">Save Performance</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setSelectedStudent(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AddPerformance;
