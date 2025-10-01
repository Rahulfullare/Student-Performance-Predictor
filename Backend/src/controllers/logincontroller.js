const usermodel = require("../models/usermodel");
const db = require("../../db.js"); //  to fetch student data
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await usermodel.findUser(username, password);

    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials ❌" });
    }

    //  If user is student, fetch sid and details
    let studentInfo = null;
    if (user.role === "student") {
      studentInfo = await new Promise((resolve, reject) => {
        db.query(
          "SELECT sid, StudentName, course FROM students WHERE uid = ?",
          [user.id], // assuming user.id === users.uid
          (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
          }
        );
      });
    }

    //  Create JWT with role + id
    const token = jwt.sign(
      { id: user.id, role: user.role }, // payload
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    //  Response
    res.json({
      msg: "Login successful ",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        ...(studentInfo ? studentInfo : {}), // merge sid, StudentName, course
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error " });
  }
};
