import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ParentProfileCard({ active }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log("=== PARENT PROFILE CARD DEBUG ===");
  console.log("Full user object:", user);
  console.log("studentFirstName:", user?.studentFirstName);
  console.log("studentLastName:", user?.studentLastName);
  console.log("=== END DEBUG ===");

  const displayName = user?.studentFirstName && user?.studentLastName
    ? `${user.studentFirstName} ${user.studentLastName}`
    : "Student Name";

  const isActive = (key) => (active === key ? "active" : "");

  return (
    <div className="profile-card">
      <div className="profile-avatar" />
      <h4>{displayName}</h4>
      <div className="profile-actions">
        <button className={`pill ${isActive("behavior")}`} onClick={() => navigate("/behavior")}>Behavior</button>
        <button className={`pill ${isActive("attendance")}`} onClick={() => navigate("/attendance")}>Attendance</button>
        <button className={`pill ${isActive("grades")}`} onClick={() => navigate("/grades")}>View Grades</button>
        <button className={`pill ${isActive("forms")}`} onClick={() => navigate("/forms")}>Forms</button>
      </div>
    </div>
  );
}
