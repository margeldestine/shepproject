import { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./AuthBox.css";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";


function AuthBox() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();


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
    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
    "& .MuiInputLabel-root.Mui-error": { color: "#ff7777ff" },
    "& .MuiFormHelperText-root.Mui-error": { color: "#ff7777ff" },
  };

  const validateEmail = (value) => {
    const emailRegex =
      /^(?![._-])(?!.*[._-]{2})[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "Email is required.";
    if (!emailRegex.test(value)) return "Invalid email format.";
    if (isSignUp && !value.toLowerCase().endsWith("@gmail.com")) {
      return "Email must be a valid address account (eg. user@gmail.com)";
    }
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

  const validateName = (value) => {
    if (!value || value.trim() === "") return "Name is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = isSignUp ? validateConfirmPassword(confirmPassword) : "";
    const nameErr = isSignUp ? (validateName(firstName) || validateName(lastName)) : "";

    setEmailError(emailErr);
    setPasswordError(passErr);
    setConfirmError(confirmErr);
    setNameError(nameErr);

    if (emailErr || passErr || confirmErr || nameErr) return;

    if (isSignUp) {
      try {
        const tempData = {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          role: "TEACHER"
        };
        localStorage.setItem("tempUser", JSON.stringify(tempData));
        navigate("/role-choice");
      } catch (err) {
        const msg = err?.message || "Registration failed. Please try again.";
        setPasswordError(msg);
      }
      return;
    }

    try {
      const authData = await login(email, password);
      console.log("Login response:", authData);
      loginUser(authData);
      const role = (authData?.role || "").trim().toUpperCase();
      if (role === "PARENT") {
        console.log("Routing to parent dashboard");
        navigate("/dashboard");
      } else if (role === "TEACHER") {
        console.log("Routing to teacher dashboard");
        navigate("/teacher");
      } else {
        console.log("Role unclear, routing to role selection");
        navigate("/role-selection");
      }
    } catch (err) {
      const msg = err?.message || "Login failed. Please check your credentials.";
      setPasswordError(msg);
    }
  };


  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setNameError("");
  };

  return (
    <div className="landing-right">
      <h2>{isSignUp ? "Create an Account" : "Sign In to Continue"}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={textFieldStyles}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={textFieldStyles}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
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
