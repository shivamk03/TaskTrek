import React from "react";
import { Link } from "react-router-dom";
import "./css/SignInHandler.css";

export default function SignInHandler() {
  return (
    <div className="login-container">
      <div className="login-image-container">
        <img
          src={require("../imageComponents/login.png")}
          alt=""
          className="login-img"
        />
      </div>

      <div className="login-form">
        <div className="btn-handler">
          <Link to="/login/admin" className="handler-btn">Admin Log in</Link>
          <Link to="/login/team" className="handler-btn">Team Member Log in</Link>
        </div>
      </div>
    </div>
  );
}
