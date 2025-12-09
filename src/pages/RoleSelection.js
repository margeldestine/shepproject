import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import shepbg from "../assets/shepbg.png";
import "../styles/RoleSelection.css";
import { useState } from "react";
 

function RoleSelection() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const temp = { firstName, lastName, email, password };
      try { localStorage.setItem("tempUser", JSON.stringify(temp)); } catch {}
      navigate("/role-choice");
    } catch (e) {
      setError(e?.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-selection-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="role-overlay"></div>
      <div className="register-card">
        <div className="register-left">
          <h1 className="welcome-title">WELCOME</h1>
          <h3 className="welcome-subtitle">School-to-Home Engagement Platform</h3>
          <p className="welcome-desc">
            Connecting students, parents, and teachers for better communication and collaboration.
          </p>
        </div>

        <div className="register-right">
          <h2>Create an Account</h2>
          <div className="form-fields">
            
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
            />

            {error && <p className="error-text">{error}</p>}
            <Button
              className="register-btn"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
          <p className="role-text">
            Already have an account? <a href="/" className="role-link">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
