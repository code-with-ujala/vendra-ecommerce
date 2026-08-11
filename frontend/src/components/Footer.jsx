import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-logo">
          <h2>Vendra</h2>
          <p>Modern shopping, made simple.</p>
        </div>

        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/return">Return Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Vendra. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;