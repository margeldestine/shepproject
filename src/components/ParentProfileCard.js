import React from "react";
import { useNavigate } from "react-router-dom";

export default function ParentProfileCard({ active }) {
  const navigate = useNavigate();
  const isActive = (key) => (active === key ? "active" : "");

  return (
    <div className="profile-card">
      <div className="profile-avatar" />
      <h4>Francaryllese Dacabelam</h4>
      <div className="profile-actions">
        <button className={`pill ${isActive("behavior")}`} onClick={() => navigate("/behavior")}>Behavior</button>
        <button className={`pill ${isActive("attendance")}`} onClick={() => navigate("/attendance")}>Attendance</button>
        <button className={`pill ${isActive("grades")}`} onClick={() => navigate("/grades")}>View Grades</button>
        <button className={`pill ${isActive("forms")}`} onClick={() => navigate("/forms")}>Forms</button>
      </div>
    </div>
  );
}