let db = require("../../db.js");
let bcrypt = require("bcrypt");

// ➤ Register Student
exports.registerStudent = (StudentName, email, password, contact, course) => {
  return new Promise((resolve, reject) => {
    let hashedPass = bcrypt.hashSync(password, 8);

    // Step 1: Insert into users
    let userQuery = `INSERT INTO users (username, password, role) VALUES (?, ?, 'student')`;

    db.query(userQuery, [email, hashedPass], (err, userResult) => {
      if (err) return reject("Error saving user: " + err);

      let uid = userResult.insertId; // FK for student table

      // Step 2: Insert into students
      let studentQuery = `INSERT INTO students (StudentName, email, password, contact, course, uid)
                          VALUES (?,?,?,?,?,?)`;

      db.query(
        studentQuery,
        [StudentName, email, hashedPass, contact, course, uid],
        (err2, result) => {
          if (err2) return reject("Error saving student: " + err2);

          let sid = result.insertId;

          resolve({
            msg: "Student Registered Successfully ",
            user: {
              uid,
              sid,
              role: "student",
              StudentName,
              email,
              course,
              contact,
            },
          });
        }
      );
    });
  });
};

// ➤ Get All Students (with uid)
exports.getAllStudents = () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT sid, StudentName, email, contact, course, uid FROM students`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// ➤ Update Student
exports.updateStudent = (sid, StudentName, email, contact, uid, course) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE students 
                 SET StudentName=?, email=?, contact=?, uid=?, course=? 
                 WHERE sid=?`;
    db.query(query, [StudentName, email, contact, uid, course, sid], (err, result) => {
      if (err) reject(err);
      else resolve("Student Updated Successfully ");
    });
  });
};

// ➤ Delete Student
exports.deleteStudent = (sid) => {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM students WHERE sid=?`;
    db.query(query, [sid], (err, result) => {
      if (err) reject(err);
      else resolve("Student Deleted Successfully ");
    });
  });
};
