import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentUser } from "../data/users";
import { getStudentData } from "../api/studentApi";

export default function ParentProfileCard({ active }) {
  const navigate = useNavigate();
  const [name, setName] = useState(studentUser.name);
  useEffect(() => {
    let mounted = true;
    getStudentData()
      .then((data) => {
        if (!mounted) return;
        const n = data?.name || studentUser.name;
        setName(n);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);
  const isActive = (key) => (active === key ? "active" : "");

  return (
    <div className="profile-card">
      <div className="profile-avatar" />
      <h4>{name}</h4>
      <div className="profile-actions">
        <button className={`pill ${isActive("behavior")}`} onClick={() => navigate("/behavior")}>Behavior</button>
        <button className={`pill ${isActive("attendance")}`} onClick={() => navigate("/attendance")}>Attendance</button>
        <button className={`pill ${isActive("grades")}`} onClick={() => navigate("/grades")}>View Grades</button>
        <button className={`pill ${isActive("forms")}`} onClick={() => navigate("/forms")}>Forms</button>
      </div>
    </div>
  );
}
