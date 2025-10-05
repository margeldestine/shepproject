import "./LandingContent.css";
import hero from "../assets/hero-illustration.png";

function LandingContent() {
  return (
    <section
      className="landing-left"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1>WELCOME</h1>
      <h3>School-to-Home Engagement Platform</h3>
      <p>
        Connecting students, parents, and teachers for better communication and collaboration.
      </p>
      <img src={hero} alt="SHEP hero" />
    </section>
  );
}

export default LandingContent;
