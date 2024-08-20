import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/shopbot-api";
import robotLogo from "../../assets/shopbot-logo.png";
import "./Register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { email, password, fName, lName, role });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <a href="/" className="chat-logo-link">
        <img src={robotLogo} alt="ShopBot Logo" className="shopbot-logo" />
      </a>
      <input
        type="text"
        placeholder="First Name"
        value={fName}
        onChange={(e) => setFName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lName}
        onChange={(e) => setLName(e.target.value)}
      />
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
      <button className="register-button" type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
