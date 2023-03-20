import React from "react";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import "./Sidebar.css";
import { Paper, List, ListItem, Avatar, Chip } from "@mui/material";

function Sidebar({ activeMembers, currentMember }) {
  const getAvatar = (userId) => {
    const avatar = createAvatar(personas, {
      seed: userId.toString(),
    });
    const dataUri = avatar.toDataUriSync();
    return dataUri;
  };

  return (
    <Paper elevation={9} className="sidebar">
      <Chip variant="outlined" color="primary" label="Online korisnici" />
        <List>
          {activeMembers.map((user) => (
            <ListItem key={user.id}>
              <Avatar src={getAvatar(user.id)} alt="avatar" />
              {user.clientData.username}
            </ListItem>
          ))}
          {currentMember && (
            <ListItem>
              <Avatar src={getAvatar(currentMember.chatId)} alt="avatar" />
              {currentMember.username}
            </ListItem>
          )}
        </List>
    </Paper>
  );
}

export default Sidebar;
