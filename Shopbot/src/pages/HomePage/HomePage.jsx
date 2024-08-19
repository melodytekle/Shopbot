import React from "react";
import { Link } from "react-router-dom";
import robotLogo from "../../assets/robot-logo.jpg";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div>
      <div className="homepage__container">
        <h1>
          Welcome to ShopBot{" "}
          <img src={robotLogo} alt="ShopBot Logo" className="chat__logo" />
        </h1>
        <p></p>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/chat">Chat with Shopbot</Link>
      </div>
    </div>
  );
};

export default HomePage;
