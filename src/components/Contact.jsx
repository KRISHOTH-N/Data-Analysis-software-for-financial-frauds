// Contact.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Contact() {
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    // Make a GET request to the Flask backend for the contact page
    axios.get("http://localhost:5000/contact") // Replace with your Flask backend URL
      .then(response => {
        setContactMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Contact Page</h2>
      <p>{contactMessage}</p>
    </div>
  );
}

export default Contact;
