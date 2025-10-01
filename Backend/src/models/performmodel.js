const db = require("../../db.js");

// Add performance
exports.addPerformance = (machine_test, mcq_test, mock_interview_score, sid) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO performance 
            (machine_test, mcq_test, mock_interview_score, sid) 
            VALUES (?, ?, ?, ?)`;

        db.query(sql, [machine_test, mcq_test, mock_interview_score, sid], (err, result) => {
            if (err) {
                reject("Performance not saved: " + err);
            } else {
                resolve("Performance saved ");
            }
        });
    });
};

// Get performance by student ID
exports.getAllPerformancesById = (sid) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.pid, p.machine_test, p.mcq_test, p.mock_interview_score, p.sid,
                   pr.predicted_percentage, pr.status_message, pr.created_at
            FROM performance p
            LEFT JOIN prediction pr ON p.sid = pr.sid
            WHERE p.sid = ?
            ORDER BY pr.created_at DESC
        `;
        db.query(sql, [sid], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


// Get latest single performance by student ID
exports.getPerformanceById = (sid) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT p.pid, p.machine_test, p.mcq_test, p.mock_interview_score, p.sid,
                   pr.predicted_percentage, pr.status_message, pr.created_at
            FROM performance p
            LEFT JOIN prediction pr ON p.sid = pr.sid
            WHERE p.sid = ?
            ORDER BY pr.created_at DESC
            LIMIT 1
        `;
        db.query(sql, [sid], (err, result) => {
            if (err) reject(err);
            else resolve(result[0]); // return only one record
        });
    });
};

