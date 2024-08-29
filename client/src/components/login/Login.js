import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context.login(formData);
    
    setFormData({
      name: "",
      password: "",
    });
  }
  return (
    <div className="login-wrapper">
      <div className="register-link-div">
        <h3>New User</h3>
        <p>Are you new to GameZone? Click below to register.</p>
        <span>
          <button onClick={() => navigate(`/auth/register`)} className="register-btn">Register</button>
        </span>
      </div>
      <div className="login-div">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
