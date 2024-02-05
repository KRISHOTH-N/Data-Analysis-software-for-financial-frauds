// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FraudPredict() {
  const [rowData, setRowData] = useState({});
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      const response = await axios.get('http://localhost:5001/api/predict');
      setRowData(response.data.row);
      setPrediction(response.data.prediction);
    };

    fetchPrediction();

    // Set up an interval to fetch the next row and prediction every second
    const interval = setInterval(fetchPrediction, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Real-time Data Simulation with Prediction</h1>
      {Object.keys(rowData).length > 0 && (
        <div>
          <p>Row Data:</p>
          <ul>
            {Object.entries(rowData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {prediction !== null && (
        <p>Prediction: {prediction}</p>
      )}
    </div>
  );
}

export default FraudPredict;
