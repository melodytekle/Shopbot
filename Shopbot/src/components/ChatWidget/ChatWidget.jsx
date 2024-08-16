import React, { useState } from "react";
import API from "../../services/shopbot-api";

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = input;
    setMessages([...messages, { text: userMessage, sender: "user" }]);
    setInput("");

    try {
      const { data } = await API.post("/chat", { userMessage });
      setMessages([
        ...messages,
        { text: userMessage, sender: "user" },
        { text: data.aiResponse, sender: "bot" },
      ]);
    } catch (error) {
      setMessages([
        ...messages,
        { text: "Error retrieving response", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="chat-widget">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWidget;
