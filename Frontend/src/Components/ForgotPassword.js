import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    try {
      const response = await fetch(
        "http://localhost:8080/general/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email }),
        }
      );
      if (response.status != 200) {
        alert("Some error occurred, Please try again.");
      }
      else{
        alert("Reset Link is sent to the email if registered with us.")
      }
      navigate("/login");

    } catch (e) {
      alert("Some error Occurred");
      console.log(e);
    }
  };
  return (
    <>
      {/* {spinnerState === "true" ? <Spinner /> : ""} */}
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
          <p className="para">
            Link will be sent to your registered email address to reset password
          </p>
          <form action="/" method="post" className="login-form">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="email"
              id="email"
              className="login-fields"
            />

            <input
              type="submit"
              value="Send"
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
