// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [homeMessage, setHomeMessage] = useState("");

  useEffect(() => {
    // Make a GET request to the Flask backend for the home page
    axios.get("http://localhost:5000/") // Replace with your Flask backend URL
      .then(response => {
        setHomeMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <p>{homeMessage}</p>
    </div>
  );
}

export default Home;
