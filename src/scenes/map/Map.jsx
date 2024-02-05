import React from 'react';
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";



const Map = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const goToRandomLocation = () => {
    // Generate random offsets within a small range (adjust the range as needed)
    const latitudeOffset = (Math.random() - 0.5) * 0.1;
    const longitudeOffset = (Math.random() - 0.5) * 0.1;

    // Calculate new coordinates
    const randomLatitude = 26.9124 + latitudeOffset; // Replace with your preferred starting latitude
    const randomLongitude = 75.7873 + longitudeOffset; // Replace with your preferred starting longitude

    // Open a new tab with the specified location
    window.open('https://www.google.com/maps?q=${randomLatitude},${randomLongitude}', '_blank');
  };

  return (
    <div className="container">
      {/* <h1>Location Finder</h1> */}

      {/* Go to Random Location button */}
      <Button id="helloButton"  onClick={goToRandomLocation} sx={{ backgroundColor: colors.primary[500], color: colors.grey[100], mt: "20px", alignSelf: 'center' }}>
                  Location
      </Button>
      
    </div>
  );
};

export default Map;