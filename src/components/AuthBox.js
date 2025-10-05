import { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./AuthBox.css";
import { useNavigate } from "react-router-dom";


function AuthBox() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const navigate = useNavigate();


  const textFieldStyles = {
    input: { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "#ffd6d6" },
      "&.Mui-focused fieldset": { borderColor: "white" },
      "&.Mui-error fieldset": { borderColor: "#ff7777ff" },
    },

    "& .MuiInputLabel-root": { color: "#f5f5dc" },
    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
    "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // when field is focused
    "& .MuiInputLabel-root.Mui-error": { color: "#ff7777ff" }, // when invalid
    "& .MuiFormHelperText-root.Mui-error": { color: "#ff7777ff" },
  };

  const validateEmail = (value) => {
    const emailRegex =
      /^(?![._-])(?!.*[._-]{2})[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "Email is required.";
    if (!emailRegex.test(value)) return "Invalid email format.";
    return "";
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!value) return "Password is required.";
    if (!passwordRegex.test(value))
      return "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    return "";
  };

  const validateConfirmPassword = (value) => {
    if (!value) return "Please confirm your password.";
    if (value !== password) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const emailErr = validateEmail(email);
  const passErr = validatePassword(password);
  const confirmErr = isSignUp ? validateConfirmPassword(confirmPassword) : "";

  setEmailError(emailErr);
  setPasswordError(passErr);
  setConfirmError(confirmErr);

  if (emailErr || passErr || confirmErr) return;

  if (isSignUp) {
    // ✅ Go to Role Selection page after successful registration
    navigate("/role-selection");
  } else {
    // ✅ For login, maybe go to dashboard
    navigate("/dashboard");
  }
};


  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
  };

  return (
    <div className="landing-right">
      <h2>{isSignUp ? "Create an Account" : "Sign In to Continue"}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={textFieldStyles}
          />
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={textFieldStyles}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={textFieldStyles}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
        {isSignUp && (
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={textFieldStyles}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmError}
            helperText={confirmError}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "#f5f5f5",
            color: "#800000",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#e5e5e5" },
          }}
        >
          {isSignUp ? "Register" : "Login"}
        </Button>
      </form>
      <p className="toggle-text">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <span onClick={handleToggle}>
          {isSignUp ? " Sign In" : " Sign Up"}
        </span>
      </p>
    </div>
  );
}

export default AuthBox;
