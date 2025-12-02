import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Clock } from "lucide-react";
import TopRightActions from "../components/TopRightActions";
import "../styles/TeacherDashboard.css";

import { subjects, sections } from "../data/teacherDashboard";
import { teacherDashboardCopy } from "../data/copy";
import { useAuth } from "../context/AuthContext";

export default function TeacherDashboard() {
  const [activeSubject, setActiveSubject] = useState("Science");
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  const displayName = (user?.firstName || user?.lastName)
    ? `${user?.firstName || ""}${user?.firstName && user?.lastName ? " " : ""}${user?.lastName || ""}`.trim()
    : user?.name || user?.email || "Teacher";
  const displayRole = location.pathname.startsWith("/teacher")
    ? "Teacher"
    : (user?.role || "TEACHER").toString().toUpperCase().includes("TEACH")
    ? "Teacher"
    : "Parent";

  const handleOpenSection = (sectionId) => {
    navigate(`/teacher-attendance/${sectionId}`);
  };

  return (
    <div className="teacher-dashboard-container">
      <aside className="teacher-sidebar">
        <div className="sidebar-header">
          <h1>SHEP</h1>
          <p>{teacherDashboardCopy.headerTitle}</p>
        </div>

        <div className="teacher-info">
          <div className="avatar" />
          <div>
            <p className="teacher-name">{displayName}</p>
            <p className="teacher-role">{displayRole}</p>
          </div>
        </div>

        <div className="subjects-list">
          <h2>{teacherDashboardCopy.subjectsHeader}</h2>
          {subjects.map((subj) => (
            <button
              key={subj.name}
              onClick={() => setActiveSubject(subj.name)}
              className={`subject-btn ${
                activeSubject === subj.name ? "active" : ""
              }`}
            >
              <div>
                <p>{subj.name}</p>
                <p className="schedule">{subj.schedule}</p>
              </div>
              <span className="subject-tag">{subj.tag}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="teacher-main">
        <TopRightActions />

        <div className="sections-container">
          <h2>
            Sections • Schedule — {activeSubject.toUpperCase().slice(0, 3)}
          </h2>

          <div className="sections-list">
            {sections
              .filter((s) => s.subject === activeSubject)
              .flatMap((s) => s.list)
              .map((section) => (
                <div key={section.id} className="section-card">
                  <h3>{section.name}</h3>
                  <p>{section.room}</p>
                  <div className="schedule-info">
                    <Clock size={14} />
                    <span>{section.schedule}</span>
                  </div>
                  <button
                    className="open-btn"
                    onClick={() => handleOpenSection(section.id)}
                  >
                    Open
                  </button>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
