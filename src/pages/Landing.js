import LandingContent from "../components/LandingContent";
import AuthBox from "../components/AuthBox";
import "../styles/Landing.css";
import shepbg from "../assets/shepbg.png";

function Landing() {
  return (
    <div
      className="landing-background"
      style={{ backgroundImage: `url(${shepbg})` }}
    >
      <div className="overlay">
        <main className="landing-container">
          <LandingContent />
          <AuthBox />
        </main>
      </div>
    </div>
  );
}

export default Landing;
