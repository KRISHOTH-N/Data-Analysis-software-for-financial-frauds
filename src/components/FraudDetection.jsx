// FraudDetection.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const FraudDetection = () => {
  const [transactionData, setTransactionData] = useState({});

  const makePredictionRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/generate-and-predict");
      const data = response.data;
      setTransactionData(data);
    } catch (error) {
      console.error("Error making prediction request:", error);
    }
  };

  useEffect(() => {
    makePredictionRequest();

    const predictionInterval = setInterval(() => {
      makePredictionRequest();
    }, 1000);

    return () => clearInterval(predictionInterval);
  }, []);

  return (
    <div>
      <h2>Fraud Detection</h2>
      {transactionData && (
        <>
          <p>Transaction ID: {transactionData.transaction_id}</p>
          <p>Customer ID: {transactionData.customer_id}</p>
          <p>Amount: {transactionData.amount}</p>
          <p>Prediction: {transactionData.prediction}</p>
        </>
      )}
    </div>
  );
};

export default FraudDetection;
