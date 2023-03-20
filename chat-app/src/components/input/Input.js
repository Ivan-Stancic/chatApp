import React, { useState } from "react";
import "./Input.css";
import { Box, TextField, Button } from "@mui/material";

function Input({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    onSendMessage(message);
    setMessage("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <Box className="input-container">
      <TextField
        className="input-field"
        required
        id="input-message"
        placeholder="Upiši poruku"
        variant="standard"
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyUp={handleEnter}
      />
      <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>
        SEND
      </Button>
    </Box>
  );
}

export default Input;