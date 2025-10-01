let usermodel = require("../models/usermodel.js");
let bcrypt = require("bcrypt");

// Register user
exports.saveUser = async (req, res) => {
  try {
    let { username, password, role } = req.body;

    // Encrypt password
    let encFormatPass = bcrypt.hashSync(password, 8);

    // Save user in DB (adjust usermodel.saveUser to accept encFormatPass)
    let result = await usermodel.saveUser(username, encFormatPass, role);

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error saving user",
      error: err.message,
    });
  }
};

// Just return a JSON response instead of rendering EJS
exports.homePage = (req, res) => {
  res.json({ msg: "Welcome to Home Page" });
};

exports.newUser = (req, res) => {
  res.json({ msg: "API ready for new user registration" });
};

// Login user
exports.login = async (req, res) => {
  try {
    let { username, password } = req.body;

    // find user (you must define findUserByUsername in usermodel.js)
    let user = await usermodel.findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Compare passwords
    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    res.json({
      success: true,
      msg: "Login successful",
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error logging in",
      error: err.message,
    });
  }
};
