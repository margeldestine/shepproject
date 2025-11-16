// c:\Users\Margel\Desktop\shepproject\src\components\ParentTopbar.js
import React from "react";
import { Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ParentTopbar({ userName = "Ritchie Marie", showReminders = false, onOpenReminders }) {
  const navigate = useNavigate();
  const openReminders = () => onOpenReminders && onOpenReminders();
  const openSettings = () => navigate("/settings");
  const signOut = () => navigate("/");

  return (
    <header className="dash-topbar">
      <div className="user-chip">
        <div className="avatar" />
        <span>{userName}</span>
      </div>

      <div className="about-actions">
        {showReminders && (
          <button
            onClick={openReminders}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", padding: "0.5rem" }}
          >
            <Bell size={16} />
            <span>Reminders</span>
          </button>
        )}

        <button
          onClick={openSettings}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", padding: "0.5rem" }}
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>

        <button
          onClick={signOut}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", padding: "0.5rem" }}
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
}