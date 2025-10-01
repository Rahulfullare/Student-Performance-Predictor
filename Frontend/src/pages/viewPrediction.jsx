import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLatestPrediction } from "../services/predictionService";

const ViewPrediction = () => {
  const { sid } = useParams();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrediction();
  }, [sid]);

  const fetchPrediction = async () => {
    try {
      const data = await getLatestPrediction(sid);
      setPrediction(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!prediction) return <p>No prediction found</p>;

  return (
    <div className="container mt-4">
      <h2>Prediction Details</h2>
      <table className="table table-bordered">
        <tbody>
          {/* <tr>
            <th>Student ID</th>
            <td>{prediction.sid}</td>
          </tr> */}
          <tr>
            <th>Student Name</th>
            <td>{prediction.StudentName}</td>
          </tr>
          <tr>
            <th>Course</th>
            <td>{prediction.course}</td>
          </tr>
          <tr>
            <th>Predicted Percentage</th>
            <td>{parseFloat(prediction.predicted_percentage).toFixed(2)}%</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{prediction.status_message}</td>
          </tr>
          <tr>
            <th>Generated At</th>
            <td>{new Date(prediction.created_at).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewPrediction;
