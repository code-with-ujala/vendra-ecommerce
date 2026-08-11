import React from "react";
import "../styles/about.css";


const About = () => {
  return (
    <section className="about">
      <div className="about-container">

        <img
          src="/dp.jpg"
          alt="ujala chinchakhede"
          className="about-image"
        />

        <h2 className="about-title">About Me</h2>

        <h3 className="about-name">
          Ujala Chinchakhede
          <span>@theshivanshvasu</span>
        </h3>

        <p className="about-description">
          <strong>Join the community and grow together!</strong>
          Welcome to my platform where we build, deploy, and scale highly
          engineered systems.
        </p>

        <div className="social-links">
          <a
            href="https://theshivanshvasu.com"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            🌐 Website
          </a>

          <a
            href="https://youtube.com/@shivanshvasu"
            target="_blank"
            rel="noreferrer"
            className="social-btn youtube"
          >
            📺 YouTube
          </a>

          <a
            href="https://instagram.com/theshivanshvasuofficial"
            target="_blank"
            rel="noreferrer"
            className="social-btn instagram"
          >
            📸 Instagram
          </a>

          <a
            href="https://www.linkedin.com/in/theshivanshvasu"
            target="_blank"
            rel="noreferrer"
            className="social-btn linkedin"
          >
            💼 LinkedIn
          </a>

          <a
            href="https://x.com/theshivanshvasu"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            ✖️ X
          </a>

          <a
            href="https://whatsapp.com/channel/0029VbAWGE5ICVfcjjKTAS0B"
            target="_blank"
            rel="noreferrer"
            className="social-btn whatsapp"
          >
            💬 WhatsApp
          </a>

          <a
            href="https://linktr.ee/shivanshvasu"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            🔗 Linktree
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;