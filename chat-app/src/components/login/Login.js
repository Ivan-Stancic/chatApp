import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import "./Login.css";

function Login({ userEnter }) {
  const [nickname, setNickname] = useState("");
  const handleInputChange = (e) => {
    setNickname(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    userEnter(nickname);
  };

  return (
    <div className = "background">
    <Box className="enter-page">
        <TextField label="Odaberi Nickname" color="primary"
          required
          id="input-nickname"
          variant="outlined"
          type="text"
          value={nickname}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Ulazak u sobu
        </Button>
    </Box>
    </div>
  );
}

export default Login;
