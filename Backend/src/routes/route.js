  let express = require("express");
  let userctrl = require("../controllers/usercontroller.js");
  let coursectrl = require("../controllers/coursecontroller.js");
  let studentctrl = require("../controllers/studentcontroller.js");
  let loginctrl = require("../controllers/logincontroller.js");
  let performctrl = require("../controllers/performcontroller.js");
  let predictionctrl = require("../controllers/predictioncontroller.js");
  let { verifyToken, isAdmin } = require("../middleware/auth");

  let router = express.Router();

  // -------- Home & Auth Routes ----------
  router.get("/", (req, res) => res.json({ msg: "Welcome to StudentApp API 🚀" }));

  router.post("/login", loginctrl.loginUser);
  router.post("/adduser", userctrl.saveUser);

  // -------- Admin Routes ----------
  router.get("/admin", verifyToken, isAdmin, (req, res) => {
    res.json({ msg: "Welcome Admin ", user: req.user });
  });

  // -------- Student Routes ----------
  router.get("/user", verifyToken, (req, res) => {
    if (req.user.role !== "student") {
      return res.status(403).json({ msg: "Access Denied: Students only " });
    }
    res.json({ msg: "Welcome Student ", user: req.user });
  });

  // -------- Course Routes ----------
  router.post("/addcourse", verifyToken, isAdmin, coursectrl.createCourse);
  router.get("/viewcourse", coursectrl.viewAllCourse);
  router.get("/getcourse", coursectrl.getCourseById);
  router.delete("/deletecourse/:cid", verifyToken, isAdmin, coursectrl.deleteCourseById);
  router.put("/updatecourse/:cid", verifyToken, isAdmin, coursectrl.updateCourse);

  // -------- Student Routes ----------
  // Public: Student Registration
  router.post("/registerstudent", studentctrl.registerStudent);

  // Admin: Manage Students
  router.get("/viewstudents",  studentctrl.getAllStudents);
  router.put("/updatestudent/:sid", verifyToken, isAdmin, studentctrl.updateStudent);
  router.delete("/deletestudent/:sid", verifyToken, isAdmin, studentctrl.deleteStudent);
  // Get student by ID
  router.get("/getstudent/:sid", studentctrl.getStudentById);
  // -------- Student Role-Based Dashboard Route ----------
  router.get("/student/me", verifyToken, studentctrl.getLoggedInStudent);


  // -------- Performance Routes ----------
  router.post("/performance", performctrl.addPerformance);
  router.get("/getperfom/:sid",performctrl.getPerformanceById);

  // -------- Prediction Routes ----------
  // Generate prediction for a student
  router.post("/prediction/:sid", predictionctrl.generateStudentPredictionBySid);

  // Get latest prediction for a student
  router.get("/prediction/:sid", predictionctrl.getLatestPredictionBySid);

  // Fetch all performances for a student
router.get("/getperfom/:sid", performctrl.getPerformanceById);

// Fetch all predictions for a student
router.get("/predictions/:sid", predictionctrl.getAllPredictionsBySid);

// Fetch all performances for a student
router.get("/performances/:sid", performctrl.getAllPerformancesById);



  module.exports = router;
