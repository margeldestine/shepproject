import { useNavigate } from "react-router-dom";
import "./About.css";
import "./Dashboard.css";
import ParentTopbar from "../components/ParentTopbar";

import campusHero from "../assets/campus-hero.png"; // your campus hero image

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Top bar */}
      <ParentTopbar userName="Ritchie Marie" showReminders onOpenReminders={() => navigate("/dashboard")} />

      {/* ===== HERO CONTENT (no separate section) ===== */}
      <div className="hero-content">
        <h1>Cebu Institute of Technology - University</h1>
        <p>
          a private, non-sectarian academic institution founded in 1946 that
          provides quality education from basic to higher learning, with a
          strong focus on science, technology, innovation, and values-driven
          development.
        </p>
      </div>

      {/* ===== VISION / MISSION BAND ===== */}
      <section className="about-band">
        <div className="band-inner">
          <div className="vm-block">
            <span className="pill pill-yellow">VISION</span>
            <p className="line strong">WE ENVISION TO BE A</p>
            <p className="line">
              <span className="strong">TOP</span> Philippine University in{" "}
              <span className="strong">2025</span>
            </p>
          </div>

          <div className="vm-block">
            <span className="pill pill-yellow">MISSION</span>
            <p className="line strong">We GEAR for Life.</p>
          </div>
        </div>
      </section>

      {/* ===== SH-EP DESCRIPTION ===== */}
      <section className="about-section">
        <div className="about-container">
          <h2>School-to-Home-Engagement Platform</h2>
          <p className="blurb">
            a parent-centric portal that consolidates student data (academic,
            behavioral, and event-related) into one secure, user-friendly
            platform. It provides parents with timely, centralized updates that
            improve transparency and ensure they stay informed about their
            child's education.
          </p>
        </div>

        {/* Back pill */}
        <button className="back-pill" onClick={() => navigate(-1)}>
          ‹&nbsp;Back
        </button>
      </section>
    </div>
  );
}