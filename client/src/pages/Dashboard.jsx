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
      if (message) {
        e.preventDefault();
        submitMessage(e);
        setMessage("");
      }
    }
  };

  console.log(messages);

  return (
    <div className="body">
      <div className="serverSideBar"></div>
      <div className="chatContent">
        <div className="chatHeader">
          <h1 className="serverName">Server Name</h1>
        </div>
        <div className="chatMessages">
          {messages.map((_msg) => {
            return (
              <div key={_msg} className="messagesContainer">
                <p className="messageSender">{_msg.username}</p>
                <p className="message">{_msg.message}</p>
              </div>
            );
          })}
        </div>
        <div className="inputContainer">
          <input
            className="sendMessageInput"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
