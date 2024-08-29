import React from "react";
import Login from "../components/login/Login";
import { useParams } from "react-router-dom";
import Register from "../components/register/Register";

const Auth = () => {
  const {category} = useParams();
  return <>{category === "login" ? <Login /> : <Register />}</>;
};

export default Auth;
