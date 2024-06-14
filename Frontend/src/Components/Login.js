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
      const response = await fetch("http://localhost:8080/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (response.status == 404) {
        alert("Please enter the correct creadentials");
        console.log("Not found");
        navigate("/signup");
      } else {
        const json = await response.json();
        navigate("/home");
      }
      localStorage.setItem("logged",true);
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
        <h2>Welcome to TaskTrek</h2>
        <p className="para">To get started, please sign in</p>
        <form action="/" method="post" className="login-form">
          <label htmlFor="email">Email Address</label>
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
          <p>Don't have an account? Please Sign up</p>
          <Link to="/signup" className="signup-btn">
            Sign up
          </Link>
        </form>
      </div>
    </div>
  );
}
