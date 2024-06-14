import React from "react";
import { Link } from "react-router-dom";
import logo from "../imageComponents/logo.svg";
import "./css/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-social">
        <p>Follow us </p>
        <Link path="/">
          <img
            src={require("../imageComponents/instagram.png")}
            alt=""
            className="social-logo"
          />
        </Link>
        <Link path="/">
          <img
            src={require("../imageComponents/facebook.png")}
            alt=""
            className="social-logo"
          />
        </Link>
        <Link path="/">
          <img
            src={require("../imageComponents/twitter.png")}
            alt=""
            className="social-logo"
          />
        </Link>
      </div>
      <div className="footer-links">
        <img src={logo} alt="" className="footer-logo" />
        <div className="footer-link-div">
          <Link path="/" className="footer-link-items">
            Terms of Services
          </Link>
          <Link path="/" className="footer-link-items">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
