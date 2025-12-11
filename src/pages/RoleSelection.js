import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import shepbg from "../assets/shepbg.png";
import "../styles/RoleSelection.css";
import { useState } from "react";
import { isEmailTaken } from "../api/authApi";
 

function RoleSelection() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^(?![._-])(?!.*[._-]{2})[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "Email is required.";
    if (!emailRegex.test(value)) return "Invalid email format.";
    if (!String(value).toLowerCase().endsWith("@cit.edu")) return "Invalid email. Use institutional email ending with @cit.edu";
    return "";
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,12}$/;
    if (!value) return "Password is required.";
    if (!passwordRegex.test(value)) return "Password must be 8–12 chars with uppercase, lowercase, number, and symbol.";
    return "";
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    if (emailErr) return;
    try {
      const taken = await isEmailTaken(email);
      if (taken) {
        setEmailError("Email already registered. Please sign in or use another email.");
        return;
      }
    } catch {}
    const passErr = validatePassword(password);
    setPasswordError(passErr);
    if (passErr) return;
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
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              fullWidth
              margin="normal"
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              fullWidth
              margin="normal"
              error={!!passwordError}
              helperText={passwordError}
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
