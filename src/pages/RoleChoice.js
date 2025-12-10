import { useNavigate } from "react-router-dom";
import shepbg from "../assets/shepbg.png";
import "../styles/RoleSelection.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function RoleChoice() {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleSelection = async (selectedRole) => {
    if (!user || !user.userId) {
      setError("User not logged in. Please register first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      localStorage.setItem("selectedRole", selectedRole);
      
      // First, get the current user data from backend
      const getUserResponse = await fetch(`http://localhost:8080/api/user/getAllUsers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!getUserResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const allUsers = await getUserResponse.json();
      const currentUser = allUsers.find(u => u.user_id === user.userId);

      if (!currentUser) {
        throw new Error("User not found");
      }

      // Now update with the full user data
      const updateResponse = await fetch(`http://localhost:8080/api/user/updateUser?uid=${user.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.email,
          password: currentUser.password, // Keep existing encrypted password
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
          role: selectedRole,
          created_at: currentUser.created_at
        })
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update role");
      }

      // Update user in context with new role
      loginUser({
        ...user,
        role: selectedRole
      });
      
      navigate("/parent-id", { state: { role: selectedRole } });
    } catch (e) {
      setError(e?.message || "Failed to update role");
      setLoading(false);
    }
  };

  const handleParentClick = () => {
    try { localStorage.setItem("selectedRole", "PARENT"); } catch {}
    navigate("/parent-id", { state: { role: "PARENT" } });
  };

  const handleTeacherClick = () => {
    try { localStorage.setItem("selectedRole", "TEACHER"); } catch {}
    navigate("/parent-id", { state: { role: "TEACHER" } });
  };

  return (
    <div className="role-selection-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="role-overlay"></div>
      <div className="role-container">
        <h2>Which best describes you?</h2>
        {error && <p className="error-text" style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <div className="role-buttons">
          <button 
            className="role-btn" 
            onClick={handleTeacherClick}
            disabled={loading}
          >
            {loading ? "Updating..." : "Staff/Teacher"}
          </button>
          <button 
            className="role-btn" 
            onClick={handleParentClick}
            disabled={loading}
          >
            {loading ? "Updating..." : "Parent/Guardian"}
          </button>
        </div>
        <p className="role-text">
          Already have an account? <a href="/" className="role-link">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default RoleChoice;
