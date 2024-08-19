import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/shopbot-api";
import "./Login.scss";
import robotLogo from "../../assets/shopbot-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/profile");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <a href="/" className="chat-logo-link">
        <img src={robotLogo} alt="ShopBot Logo" className="shopbot-logo" />
      </a>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="submit-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
