// App.js

import React, { useState } from 'react';
import axios from 'axios';

const Alert = () => {
  const [messageStatus, setMessageStatus] = useState(null);

  const handleButtonClick = async () => {
 
      const response = await axios.get('http://localhost:5001/api/alert');
      console.log(response);
      if (response) {
        setMessageStatus('SMS sent successfully!');
      } else {
        setMessageStatus('Failed to send SMS.');
      }
    
  };

  return (
    <div>
      <h1>React App</h1>
      <button onClick={handleButtonClick}>Send SMS</button>
      {messageStatus && <p>{messageStatus}</p>}
    </div>
  );
};

export default Alert;
