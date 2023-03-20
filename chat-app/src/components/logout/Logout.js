import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./Logout.css"

function Logout({ onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <Box className="logout">
      <Typography variant="h3"> 
        Dobrodošli na chat app
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
      >
        Izlaz
      </Button>
    </Box>
  );
}

export default Logout;
