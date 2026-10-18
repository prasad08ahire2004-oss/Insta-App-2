
import React from "react";
import "../style/Footer.scss";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo and navigation links */}
        <div className="footer-top">

          {/* Logo and tagline */}
          <div className="footer-brand">

            <a href="/" className="logo" aria-label="Connectly home">

              <span className="logo-icon" aria-hidden="true">

                <svg viewBox="0 0 40 40" width="36" height="36">

                  <circle
                    cx="15"
                    cy="20"
                    r="7"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.6"
                  />

                  <circle
                    cx="25"
                    cy="20"
                    r="7"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.6"
                    opacity="0.85"
                  />

                </svg>

              </span>

              <span className="logo-text">Connectly</span>

            </a>

            <p className="footer-tagline">
              Bringing people closer, one moment at a time.
            </p>

          </div>

          {/* Footer navigation */}
          <nav aria-label="Footer navigation">

            <ul className="footer-links">

              <li><a href="/">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">About</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Get Started</a></li>

            </ul>

          </nav>

        </div>

        {/* Copyright */}
        <p className="footer-copyright">
          &copy; 2026 Connectly. All rights reserved.
        </p>

      </div>
      
    </footer>
  );
}

export default Footer;