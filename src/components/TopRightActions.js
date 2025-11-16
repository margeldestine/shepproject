// c:\Users\Margel\Desktop\shepproject\src\components\TopRightActions.js
import React, { memo } from "react";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopRightActions() {
  const navigate = useNavigate();
  const handleSettings = () => navigate("/settings");
  const handleSignOut = () => navigate("/");

  return (
    <div
      className="top-right-actions"
      style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
    >
      <button
        onClick={handleSettings}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", padding: "0.5rem" }}
      >
        <Settings size={16} />
        <span>Settings</span>
      </button>
      <button
        onClick={handleSignOut}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", padding: "0.5rem" }}
      >
        <LogOut size={16} />
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default memo(TopRightActions);