import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";
import Spinner from "./Spinner";

export default function Login() {
  const [spinnerState, setSpinnerState] = useState("false");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("login-container").style.filter = "blur(3.0px)";
    setSpinnerState("true");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const response = await fetch("http://localhost:8080/general/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });
      if (response.status == 404) {
        setSpinnerState("false");
        document.getElementById("login-container").style.filter = "";
        alert("Please enter the correct creadentials");
        navigate("/login");
      } else {
        const json = await response.json();
        if (json.userType === "admin") {
          localStorage.setItem("Authorization", `Bearer ${json.token}`);
          localStorage.setItem("logged", true);
          setSpinnerState("false");
        document.getElementById("login-container").style.filter = "";
          navigate("/dashadmin/");
        } else {
          localStorage.setItem("team-user", json.member.username);
          localStorage.setItem("logged", true);
          setSpinnerState("false");
          document.getElementById("login-container").style.filter = "";
          navigate("/dashteam");
        }
      }
    } catch (e) {
      alert("Some error Occurred");
      setSpinnerState("false");
      document.getElementById("login-container").style.filter = "";
      console.log(e);
    }
  };
  return (
    <>
      {spinnerState === "true" ? <Spinner /> : ""}
      <div className="login-container" id="login-container">
        <div className="login-image-container">
          <img
            src={require("../imageComponents/login.png")}
            alt=""
            className="login-img"
          />
        </div>
        <div className="login-form">
          <h2>Log in with your credentials</h2>
          <p className="para">
            To get started, please sign in and manage your tasks.
          </p>
          <form action="/" method="post" className="login-form">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="email"
              id="email"
              className="login-fields"
            />
            <div className="forgot-btn-container">

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="login-fields"
              />
            <Link to ="/forgot" className="forgot-btn">Forgot Password</Link>
              </div>
            <input
              type="submit"
              value="Sign in"
              className="login-fields"
              id="login-submit"
              onClick={handleSubmit}
            />
            <p>Don't have an account? Please <Link to="/signup/admin" className="signup-btn">
              Sign up
            </Link></p>
            
          </form>
        </div>
      </div>
    </>
  );
}
