// About.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [aboutMessage, setAboutMessage] = useState("");

  useEffect(() => {
    // Make a GET request to the Flask backend for the about page
    axios.get("http://localhost:5000/about") // Replace with your Flask backend URL
      .then(response => {
        setAboutMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>About Page</h2>
      <p>{aboutMessage}</p>
    </div>
  );
}

export default About;
