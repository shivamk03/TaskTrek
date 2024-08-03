import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

export default function SignupAdmin() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const company = document.getElementById("company").value;
    try {
      const response = await fetch("http://localhost:8080/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company:company,username: email, password: password }),
      });
      if (response.status == 404) {
        alert("Please enter the correct creadentials");
        console.log("Not found");
        navigate("/signup/admin");
      } else {
        alert("Admin registered, Please Log in");
        navigate("/login/admin");
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
        <h2>Admin Sign up</h2>
        <p className="para">
          Get Started with your TaskTrek journey. With a user-friendly
          interface, the app simplifies task delegation and enhances team
          collaboration, ensuring projects are completed on time and to the
          highest standards.
        </p>
        <form action="/" method="post" className="login-form">
          <label htmlFor="email">Email Address/Username</label>
          <input type="text" name="email" id="email" className="login-fields" />
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            id="company"
            className="login-fields"
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            className="login-fields"
          />
          <input
            type="submit"
            value="Sign up"
            className="login-fields"
            id="login-submit"
            onClick={handleSubmit}
          />
          <p>Already have an account? Please <Link to="/login" className="signup-btn">
            Sign in
          </Link></p>
          
        </form>
      </div>
    </div>
  );
}
