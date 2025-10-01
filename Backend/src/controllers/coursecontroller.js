let coursemodel = require("../models/coursemodel.js");

//  Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { CourseName } = req.body;

    if (!CourseName) {
      return res.status(400).json({ msg: " CourseName is required" });
    }

    const result = await coursemodel.createCourse(CourseName);

    res.status(201).json({
      msg: " Course added successfully",
      course: result,
    });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ msg: " Failed to add course", error: err.message });
  }
};

//  Get all courses
exports.viewAllCourse = async (req, res) => {
  try {
    const result = await coursemodel.viewAllCourse();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ msg: " Failed to fetch courses", error: err.message });
  }
};

//  Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { cid } = req.query;

    if (!cid) {
      return res.status(400).json({ msg: " Please provide a Course ID" });
    }

    const result = await coursemodel.getCourseById(cid);

    if (!result) {
      return res.status(404).json({ msg: " Course not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ msg: " Failed to fetch course", error: err.message });
  }
};

//  Delete course by ID
exports.deleteCourseById = async (req, res) => {
  try {
    const { cid } = req.params;

    if (!cid) {
      return res.status(400).json({ msg: " Please provide a Course ID" });
    }

    await coursemodel.deleteCourseById(cid);

    res.status(200).json({ msg: " Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ msg: " Failed to delete course", error: err.message });
  }
};

//  Update course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { cid } = req.params;
    const { CourseName } = req.body;

    if (!cid || !CourseName) {
      return res.status(400).json({ msg: " Course ID and CourseName are required" });
    }

    const result = await coursemodel.updateCourse(cid, CourseName);

    res.status(200).json({
      msg: " Course updated successfully",
      course: result,
    });
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ msg: " Failed to update course", error: err.message });
  }
};
