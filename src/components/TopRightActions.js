import React, { memo } from "react";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./TopRightActions.css";

function TopRightActions() {
  const navigate = useNavigate();
  const handleSettings = () => navigate("/settings");
  const handleSignOut = () => navigate("/");

  return (
    <div
      className="top-right-actions"
      style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
    >
      <button onClick={handleSettings}>
        <Settings size={16} />
        <span>Settings</span>
      </button>
      <button onClick={handleSignOut}>
        <LogOut size={16} />
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default memo(TopRightActions);