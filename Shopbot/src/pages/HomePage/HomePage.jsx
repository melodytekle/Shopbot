import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to ShopBot</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/chat">Chat with AI</Link>
    </div>
  );
};

export default HomePage;
