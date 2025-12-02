import { useNavigate } from "react-router-dom";
import "../styles/About.css";
import "../styles/Dashboard.css";
import ParentTopbar from "../components/ParentTopbar";
import { parentUser } from "../data/users";
import BackButton from "../components/BackButton";
import { aboutCopy } from "../data/copy";

import campusHero from "../assets/campus-hero.png";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {}
      <ParentTopbar userName={parentUser.name} showReminders onOpenReminders={() => navigate("/dashboard")} />

      {}
      <div className="hero-content">
        <h1>{aboutCopy.title}</h1>
        <p>
          {aboutCopy.blurb}
        </p>
      </div>

      {}
      <section className="about-band">
        <div className="band-inner">
          <div className="vm-block">
            <span className="pill pill-yellow">VISION</span>
            <p className="line strong">{aboutCopy.vision}</p>
            <p className="line">
              <span className="strong">TOP</span> Philippine University in{" "}
              <span className="strong">2025</span>
            </p>
          </div>

          <div className="vm-block">
            <span className="pill pill-yellow">MISSION</span>
            <p className="line strong">{aboutCopy.mission}</p>
          </div>
        </div>
      </section>

      {}
      <section className="about-section">
        <div className="about-container">
          <h2>{aboutCopy.sectionTitle}</h2>
          <p className="blurb">
            {aboutCopy.sectionBlurb}
          </p>
        </div>

        {}
        <BackButton className="back-pill" onClick={() => navigate(-1)}>
          ‹ Back
        </BackButton>
      </section>
    </div>
  );
}
