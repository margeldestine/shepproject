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
      const extracted = [];
      if (authData?.role) extracted.push(authData.role);
      if (Array.isArray(authData?.roles)) extracted.push(
        ...authData.roles.map((r) => (typeof r === "string" ? r : r?.name))
      );
      if (Array.isArray(authData?.authorities)) extracted.push(
        ...authData.authorities.map((a) => (typeof a === "string" ? a : a?.authority))
      );
      const all = extracted.filter(Boolean).map((v) => String(v).trim().toUpperCase());
      let selectedRole = "";
      try { selectedRole = String(localStorage.getItem("selectedRole") || "").trim().toUpperCase(); } catch {}
      const payloadStr = JSON.stringify(authData || {}).toUpperCase();
      const payloadTeacher = payloadStr.includes("TEACH");
      const payloadParent = payloadStr.includes("PARENT") || payloadStr.includes("GUARDIAN");
      const isTeacher = selectedRole === "TEACHER" || payloadTeacher || all.some((v) => v.includes("TEACH") || v.includes("STAFF") || v.includes("FACULTY"));
      const isParent = selectedRole === "PARENT" || (!isTeacher && (payloadParent || all.some((v) => v.includes("PARENT") || v.includes("GUARDIAN"))));
      if (isTeacher) {
        navigate("/teacher");
      } else if (isParent) {
        navigate("/dashboard");
      } else {
        navigate("/role-selection");
      }
    } catch (err) {
      const msg = err?.message || "Login failed. Please check your credentials.";
      setError(msg);
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
                <span onClick={() => navigate('/signup')}> Sign Up</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Landing;
