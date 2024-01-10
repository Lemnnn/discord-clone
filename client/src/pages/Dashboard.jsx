import "../styles/dashboard.css";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:3001";
const socket = io(URL);

const Dashboard = () => {
  const userData = localStorage.getItem("data");
  const user = JSON.parse(userData);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", (data) => console.log("asd"));
    socket.on("disconnect", (data) => console.log("dosc"));
    socket.on("sendMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("sendMessage");
    };
  }, [socket]);

  const submitMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { message, username: user.username });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitMessage(e);
      setMessage("");
    }
  };

  console.log(messages);

  return (
    <div className="body">
      <div>
        {messages.map((_msg) => {
          return (
            <div key={_msg}>
              <p>{_msg.username}</p>
              <div>{_msg.message}</div>
            </div>
          );
        })}
      </div>
      <input
        className="sendMessageInput"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
};

export default Dashboard;
