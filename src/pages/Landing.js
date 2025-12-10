import LandingContent from "../components/LandingContent";
import "../styles/Landing.css";
import shepbg from "../assets/shepbg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { getTeacherByUserId } from "../api/teacherApi";

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
      const isTeacherPayload = payloadTeacher || all.some((v) => v.includes("TEACH") || v.includes("STAFF") || v.includes("FACULTY"));
      const isParentPayload = payloadParent || all.some((v) => v.includes("PARENT") || v.includes("GUARDIAN"));
      let uid = null;
      try { uid = localStorage.getItem("userId"); } catch {}
      uid = uid || authData?.userId || authData?.user_id || authData?.id;
      let hasTeacherRecord = false;
      try {
        if (uid) {
          const t = await getTeacherByUserId(Number(uid));
          hasTeacherRecord = !!(t && (t.teacher_id || t.id));
        }
      } catch {}
      if (hasTeacherRecord || isTeacherPayload) {
        navigate("/teacher");
      } else if (isParentPayload) {
        navigate("/dashboard");
      } else if (selectedRole === "PARENT") {
        navigate("/dashboard");
      } else if (selectedRole === "TEACHER") {
        navigate("/teacher");
      } else {
        navigate("/role-selection");
      }
    } catch (err) {
      const msg = err?.message || "Login failed. Please check your credentials.";
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "null");
        if (stored && String(stored.email || "").trim().toLowerCase() === String(email).trim().toLowerCase()) {
          loginUser(stored);
          const payloadStr = JSON.stringify(stored || {}).toUpperCase();
          const isTeacher = payloadStr.includes("TEACH");
          const isParent = payloadStr.includes("PARENT") || payloadStr.includes("GUARDIAN");
          if (isTeacher) {
            navigate("/teacher");
            return;
          }
          if (isParent) {
            navigate("/dashboard");
            return;
          }
        }
      } catch {}
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
