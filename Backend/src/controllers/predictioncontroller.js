const db = require("../../db");

// Generate prediction for a student
const generateStudentPredictionBySid = (req, res) => {
  const { sid } = req.params;
  if (!sid) return res.status(400).json({ msg: "Student ID (sid) is required" });

  // Fetch student's performance
 db.query(
  "SELECT * FROM performance WHERE sid = ? ORDER BY pid DESC LIMIT 1",
  [sid],
  (err, performances) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (!performances.length) return res.status(404).json({ msg: "No performance data found" });

    const perf = performances[0]; // latest one


      // Calculate simple average percentage
      const machine = parseFloat(perf.machine_test || 0);
      const mcq = parseFloat(perf.mcq_test || 0);
      const mock = parseFloat(perf.mock_interview_score || 0);

      const predictedPercentage = ((machine + mcq + mock) / 30) * 100; // out of 100
      let status_message = "Still need to work";
      if (predictedPercentage >= 75) status_message = "Ready for Placement";
      else if (predictedPercentage >= 50) status_message = "Almost Ready";

      // Insert or update prediction
            db.query(
        `INSERT INTO prediction (sid, predicted_percentage, status_message)
        VALUES (?, ?, ?)`,
        [sid, predictedPercentage, status_message],
        (err2) => {
          if (err2) return res.status(500).json({ error: "Server error" });

          res.json({
            msg: "Prediction generated successfully",
            prediction: {
              sid: perf.sid,
              predictedPercentage,
              status_message,
            },
          });
        }
      );

    }
  );
};

// Get latest prediction for a student
const getLatestPredictionBySid = (req, res) => {
  const { sid } = req.params;
  if (!sid) return res.status(400).json({ msg: "Student ID (sid) is required" });

  db.query(
    `SELECT p.pred_id, s.StudentName, s.course, p.predicted_percentage, p.status_message, p.created_at
     FROM prediction p
     JOIN students s ON p.sid = s.sid
     WHERE p.sid = ?
     ORDER BY p.created_at DESC
     LIMIT 1`,
    [sid],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (!rows.length) return res.status(404).json({ msg: "No prediction found" });
      res.json(rows[0]);
    }
  );
};

// Get all students
const getAllStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, rows) => {
    if (err) return res.status(500).json({ error: "Server error" });
    res.json(rows);
  });
};

// Get all predictions for a student
const getAllPredictionsBySid = (req, res) => {
  const { sid } = req.params;
  if (!sid) return res.status(400).json({ msg: "Student ID (sid) is required" });

  db.query(
    `SELECT p.pred_id, p.predicted_percentage, p.status_message, p.created_at
     FROM prediction p
     WHERE p.sid = ?
     ORDER BY p.created_at DESC`,
    [sid],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (!rows.length) return res.status(404).json({ msg: "No prediction found" });
      res.json(rows);
    }
  );
};

module.exports = { generateStudentPredictionBySid, getLatestPredictionBySid, getAllPredictionsBySid, getAllStudents };

// module.exports = { generateStudentPredictionBySid, getLatestPredictionBySid, getAllStudents };
