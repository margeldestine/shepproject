import LandingContent from "../components/LandingContent";
import "../styles/Landing.css";
import shepbg from "../assets/shepbg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const authData = await login(email, password);
      loginUser(authData);
      if (authData.role === "PARENT") {
        navigate("/dashboard");
      } else if (authData.role === "TEACHER") {
        navigate("/teacher");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="landing-background"
      style={{ backgroundImage: `url(${shepbg})` }}
    >
      <div className="overlay">
        <main className="landing-container">
          <LandingContent />
          <div className="landing-right">
            <div className="login-card">
              <h2>Sign In to Continue</h2>
              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-btn">Login</button>
              </form>
              <p className="toggle-text">
                Don't have an account?
                <span onClick={() => navigate('/role-selection')}> Sign Up</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Landing;
