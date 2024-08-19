import React, { useState } from "react";
import API from "../../services/shopbot-api";
import "./ChatWidget.scss";
import robotLogo from "../../assets/shopbot-chat-logo.png";

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
        <a href="/" className="chat-logo-link">
          <img src={robotLogo} alt="ShopBot Logo" className="chat-logo" />
        </a>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? "user-message" : "bot-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <section className="chat__input">
        <div className="input__container">
          <input
            type="text"
            value={input}
            placeholder="Type your message here"
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
        </div>
        <div className="button__container">
          <button onClick={sendMessage}>Send</button>
        </div>
      </section>
    </div>
  );
};

export default ChatWidget;
