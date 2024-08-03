import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Login.css";
import Spinner from "./Spinner";

export default function SetNewPassword() {
  const [spinnerState, setSpinnerState] = useState("false");
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const user = searchParams.get("user");
  const expiry = searchParams.get("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = document.getElementById("n-password").value;
    const confirmPassword = document.getElementById("c-password").value;
    if (password != confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    document.getElementById("login-container").style.filter = "blur(3.0px)";
    setSpinnerState("true");

    try {
      const response = await fetch(
        `http://localhost:8080/general/setNewPassword/${expiry}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user, password: password }),
        }
      );
      if (response.status != 200) {
        setSpinnerState("false");
        document.getElementById("login-container").style.filter = "";
        alert(
          "Unable to process request, please try again later or refill password reset request"
        );
        return;
      } else {
        alert("Password changed successfully");
        setSpinnerState("false");
        document.getElementById("login-container").style.filter = "";
        navigate("/login");
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
          <h2>Change Password</h2>
          <form action="/" method="post" className="login-form">
            <label htmlFor="email">Enter new Password</label>
            <input
              type="password"
              name="n-password"
              id="n-password"
              className="login-fields"
            />
            <label htmlFor="password">Confirm Password</label>
            <input
              type="text"
              name="c-password"
              id="c-password"
              className="login-fields"
            />
            <input
              type="submit"
              value="Ok"
              className="login-fields"
              id="login-submit"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </>
  );
}
