import React, { useContext, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Register = () => {
  const context = useContext(AppContext)
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.register(formData);

    setformData({
      name: "",
      email: "",
      password: "",
    })
  }
  return (
    <div className="register-wrapper">
      <div className="login-link-div">
        <h3>Welcome, back!</h3>
        <p>Already have an account on GameZone? Click below to login.</p>
        <span>
          <button onClick={() => navigate(`/auth/login`)} className="login-btn">
            Login
          </button>
        </span>
      </div>
      <div className="register-div">
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Username"
            name="name"
            required
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
            required
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button className="login-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
