import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";
export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const response = await fetch("http://localhost:8080/team/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });
      if (response.status == 404) {
        alert("Please enter the correct creadentials");
        navigate("/login/team");
      } else {
        const json = await response.json();
        localStorage.setItem("team-user",json.username);
        localStorage.setItem("team-pass",json.password);
        localStorage.setItem("logged",true);
        navigate("/dashteam");
      }
    } catch (e) {
      console.log(e);
    }
  };
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
        <h2>Team Member Log in</h2>
        <p className="para">To get started, please sign in</p>
        <form action="/" method="post" className="login-form">
          <label htmlFor="email">Username</label>
          <input type="text" name="email" id="email" className="login-fields" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="login-fields"
          />
          <input
            type="submit"
            value="Sign in"
            className="login-fields"
            id="login-submit"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
