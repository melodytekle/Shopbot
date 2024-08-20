import React, { useState } from "react";
import API from "../../services/shopbot-api";
import "./ChatWidget.scss";
import robotLogo from "../../assets/shopbot-chat-logo.png";
import emailjs from "emailjs-com";

const ChatWidget = () => {
  const [messages, setMessages] = useState([
    {
      text: "Welcome to the ShopBot chat! You can check in on the status of your orders or ask any shopping-related questions like 'What should I buy my sister for a birthday present?' Give it a try!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

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

  const sendEmail = (e) => {
    e.preventDefault();

    if (!userEmail || !userName) {
      alert("Please enter your name and email address.");
      return;
    }

    emailjs
      .send(
        "service_fp670a8",
        "template_b8qsrmd",
        {
          message: emailContent,
          user_email: userEmail,
          user_name: userName,
        },
        "fXORTVaMU-un5WxM8"
      )
      .then(
        (result) => {
          alert("Email sent successfully!");
          setShowEmailForm(false);
          setEmailContent("");
          setUserEmail("");
          setUserName("");
        },
        (error) => {
          alert("Failed to send email, please try again later.");
        }
      );
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

        <div className="email-section">
          <button
            className="email-button"
            onClick={() => setShowEmailForm(!showEmailForm)}
          >
            {showEmailForm ? "Cancel" : "Dissatisfied? Send an Email"}
          </button>
          {showEmailForm && (
            <form onSubmit={sendEmail}>
              <div className="email__input">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Describe your issue..."
                rows="4"
                cols="30"
              ></textarea>
              <button type="submit">Send Email</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChatWidget;
