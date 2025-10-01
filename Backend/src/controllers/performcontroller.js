const performanceModel = require("../models/performmodel.js");

//  Add new performance
exports.addPerformance = async (req, res) => {
    try {
        const {
            machine_test,
            mcq_test,
            mock_interview_score,
            sid
        } = req.body;

        // Convert inputs to numbers for validation
        const values = [
            Number(machine_test),
            Number(mcq_test),
            Number(mock_interview_score)
        ];

        //  Validation
        if (!values.every(score => !isNaN(score) && score >= 0 && score <= 100)) {
            return res.status(400).json({ error: "All scores must be numbers between 0 and 100." });
        }

        // Save into DB using model
        const result = await performanceModel.addPerformance(
            values[0],
            values[1],
            values[2],
            sid
        );

        return res.status(200).json({
            message: result
        });
    } catch (error) {
        console.error("Error adding performance:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//  Get performance by student ID
exports.getPerformanceById = async (req, res) => {
    const sid = req.params.sid;

    try {
        const performance = await performanceModel.getPerformanceById(sid);

        if (!performance) {
            return res.status(404).json({ message: "No performance record found for this student" });
        }

        return res.status(200).json(performance);
    } catch (error) {
        console.error("Error fetching performance:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all performances by student ID
exports.getAllPerformancesById = async (req, res) => {
  const sid = req.params.sid;
  try {
    const performances = await performanceModel.getAllPerformancesById(sid);
    if (!performances.length) {
      return res.status(404).json({ message: "No performance records found for this student" });
    }
    return res.status(200).json(performances);
  } catch (error) {
    console.error("Error fetching performances:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
