let studentmodel = require("../models/studentmodel.js");
const db = require("../../db.js");


// ➤ Register Student
exports.registerStudent = (req, res) => {
  let { StudentName, email, password, contact, course } = req.body;

  studentmodel
    .registerStudent(StudentName, email, password, contact, course)
    .then((result) => res.status(201).json({ success: true, ...result }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
};

// ➤ Get All Students
// controllers/studentcontroller.js
exports.getAllStudents = (req, res) => {
  const { search } = req.query; // get search term from frontend
  let query = "SELECT sid, StudentName, email, contact, course, uid FROM students";

  if (search) {
    query += " WHERE StudentName LIKE ? OR email LIKE ? OR contact LIKE ? OR course LIKE ?";
    const searchPattern = `%${search}%`;
    db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    });
  } else {
    db.query(query, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    });
  }
};

// ➤ Update Student
exports.updateStudent = (req, res) => {
  let { sid } = req.params;
  let { StudentName, email, contact, uid, course } = req.body;

  studentmodel
    .updateStudent(sid, StudentName, email, contact, uid, course)
    .then((result) => res.json({ msg: result }))
    .catch((err) => res.status(500).json({ error: err }));
};

// ➤ Delete Student
exports.deleteStudent = (req, res) => {
  let { sid } = req.params;

  studentmodel
    .deleteStudent(sid)
    .then((result) => res.json({ msg: result }))
    .catch((err) => res.status(500).json({ error: err }));
};


exports.getStudentById = (req, res) => {
  const sid = req.params.sid;
  if (!sid) return res.status(400).json({ msg: "Student ID is required" });

  db.query("SELECT * FROM students WHERE sid = ?", [sid], (err, rows) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (!rows.length) return res.status(404).json({ msg: "Student not found" });

    res.json(rows[0]);
  });
};
// controllers/studentcontroller.js
exports.getLoggedInStudent = (req, res) => {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).json({ msg: "Access denied: Students only " });
  }

  const userId = req.user.id; // Use the user ID from JWT

  db.query(
    "SELECT sid, StudentName, email, contact, course FROM students WHERE uid = ?",
    [userId],
    (err, rows) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Server error", details: err.message });
      }
      
      if (!rows.length) {
        console.log("Student not found for user ID:", userId);
        return res.status(404).json({ 
          msg: "Student not found", 
          userId: userId,
          suggestion: "No student profile linked to your user account"
        });
      }

      res.json(rows[0]); // send profile back
    }
  );
};