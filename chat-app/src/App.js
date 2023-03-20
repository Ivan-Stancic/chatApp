import { useState } from "react";
import { ROOM_NAME, SCALEDRONE_API_KEY } from "./components/data";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Sidebar from "./components/sidebar/Sidebar";
import Messages from "./components/messages/Messages";
import Input from "./components/input/Input";
import { CssBaseline, Box, Paper } from "@mui/material";
import "./App.css";

function App() {
  const [chatMember, setChatMember] = useState({
    username: "",
    clientId: ""
  });
  const [chat, setChat] = useState(null);
  const [activeMembers, setActiveMembers] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleEnterChat = (username) => {
    const member = { ...chatMember, username };
    setChatMember(member);
    const chat = connectToChat(member);
    const room = subscribeToRoom(chat);
    getRoomMembers(room);
  };

  const connectToChat = (member) => {
    const drone = new window.Scaledrone(SCALEDRONE_API_KEY, { data: member });
    drone.on("open", (error)=>{
      const clientId = drone.clientId;
      setChatMember(chatMember=>({...chatMember, clientId}))
    })
    setChat(drone);
    return drone;
  };
  
  const subscribeToRoom = (chat) => {
    const room = chat.subscribe(ROOM_NAME);
    room.on("message", (message) => setMessages((prev) => [...prev, message]));
    return room;
  };

  const getRoomMembers = (room) => {
    room.on("members", (members) => {
      setActiveMembers(members);
    });
  
    room.on("member_leave", (member) => {
      setActiveMembers((prevMembers) =>
        prevMembers.filter((m) => m.id !== member.id)
      );
    });

    room.on("member_join", (member) => {
      setActiveMembers((prevMembers) =>
       [...prevMembers, member]
      );
    });
  };
  
  const onSendMessage = (message) => {
    chat.publish({
      room: ROOM_NAME,
      message,
    });
  };

  const handleLogout = () => {
    chat.close();
    setChatMember({ chatId: "", username: "", avatar: "" });
    setActiveMembers([]);
    setMessages([]);
  };

  return (
      <div className="app">
        <CssBaseline />
        {chatMember.username === "" ? (
          <Login userEnter={handleEnterChat} />
        ) : (
          <>
            <Paper className="chat-main" elevation={24}>
              <Sidebar activeMembers={activeMembers} className="sidebar"/>
              <Box className="chat" elevation={24}>
                <Messages
                  className="messages"
                  messages={messages}
                  currentMember={chatMember}
                />
                <Input className="chat-input" onSendMessage={onSendMessage} />
              </Box>
            </Paper>
            <Logout onLogout={handleLogout} chatMember={chatMember} />
          </>
        )}
      </div>
    );
}

export default App;