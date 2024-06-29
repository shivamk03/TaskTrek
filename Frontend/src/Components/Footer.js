import React from "react";
import { Link } from "react-router-dom";
import logo from "../imageComponents/logo.svg";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#contact-us">Contact us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Products</h4>
          <ul>
            <li><a href="#product1">TaskTrek Basic</a></li>
            <li><a href="#product2">TaskTrek Pro</a></li>
            <li><a href="#product3">TaskTrek Enterprise</a></li>
            <li><a href="#product4">TaskTrek Mobile</a></li>
            <li><a href="#product5">TaskTrek Desktop</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="/">Technical support</a></li>
            <li><a href="/">Documentation</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#my-account">My account</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 TaskTrek</p>
        <div className="footer-links">
          <a href="#privacy-policy">Privacy policy</a>
          <a href="#terms">Terms</a>
          <a href="#language">English</a>
        </div>
      </div>
    </footer>
  );
}
