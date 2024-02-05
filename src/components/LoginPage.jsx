// LoginPage.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate authentication logic
    if (username === 'police' && password === 'password') {
      // Redirect to the dashboard or perform other actions
      console.log('Login successful!');
    } else {
      console.log('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Police Login
      </Typography>
      <Box width="300px">
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
