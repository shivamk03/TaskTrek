import React from "react";
import "./css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/contact">Contact us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Products</h4>
          <ul>
            <li><a href="#product1">TaskTrek Basic</a></li>
            <li><a href="#product2">TaskTrek Pro</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="/">Technical support</a></li>
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
