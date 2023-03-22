import React from "react";
import { List, ListItem, ListItemText, Chip } from "@mui/material";
import "./Messages.css";

function Messages({ messages, currentMember }) {
  const renderMessage = (message) => {
    const { data: messageText, 
            member: { clientData: { username } }, clientId } = message;
    const messageFromMe = currentMember.clientId === clientId;
    const color = messageFromMe ? "lightgreen" : "lightblue";
    const textAlign = messageFromMe ? "right" : "left";

    return (
      <ListItem key={message.id}>
        <ListItemText
          disableTypography={true}
          primary={
            <div className="username" style={{ textAlign: textAlign }}>
              {username}
            </div>
          }
          secondary={
            <Chip
              label={messageText}
              style={{
                backgroundColor: color,
                float: textAlign === "right" ? "right" : "none",
              }}
            />
          }
        />
      </ListItem>
    );
  };

  return (
    <div className="messages-container">
      <List className="messages-list">
        {messages.map(renderMessage)}
        </List>
    </div>
  );
}

export default Messages;
