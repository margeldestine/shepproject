import React, { memo } from "react";
import { LogOut, Settings, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./TopRightActions.css";

function TopRightActions({
  showBackButton = false,
  backTo = "/teacher",
  onNavigateAttempt
}) {
  const navigate = useNavigate();
  const handleSettings = () => navigate("/settings");
  const handleSignOut = () => navigate("/");

  const navigateWithCheck = (path) => {
  if (onNavigateAttempt) {
    onNavigateAttempt(path);
  } else {
    navigate(path);
  }
};

  return (
    <div
      className="top-right-actions"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
    >
      {showBackButton && (
        <button onClick={() => navigateWithCheck(backTo)} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      )}
      
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "auto" }}>
        <button onClick={handleSettings}>
          <Settings size={16} />
          <span>Settings</span>
        </button>
        <button onClick={handleSignOut}>
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}

export default memo(TopRightActions);