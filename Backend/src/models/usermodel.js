// models/usermodel.js
const db = require("../../db.js");
const bcrypt = require("bcrypt");

exports.findUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    // First check in users (admins)
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
      if (err) return reject(err);
      if (results.length) {
        const user = results[0];
        const valid = await bcrypt.compare(password, user.password);
        if (valid) return resolve({ id: user.uid, username: user.username, role: user.role });
        return resolve(null);
      }

      // If not found, check in students
      db.query("SELECT * FROM students WHERE email = ?", [username], async (err2, results2) => {
        if (err2) return reject(err2);
        if (results2.length) {
          const student = results2[0];
          const valid = await bcrypt.compare(password, student.password);
          if (valid) {
            return resolve({ id: student.sid, username: student.StudentName, role: "student" });
          }
        }
        resolve(null); // not found
      });
    });
  });
};
