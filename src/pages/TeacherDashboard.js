import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import TopRightActions from "../components/TopRightActions";
import "./TeacherDashboard.css";

export default function TeacherDashboard() {
  const [activeSubject, setActiveSubject] = useState("Science");
  const navigate = useNavigate();

  const subjects = [
    { name: "Science", schedule: "MWF • 7:30 - 8:30 AM", tag: "SCI" },
    { name: "Mathematics", schedule: "TTh • 9:00 - 10:00 AM", tag: "MATH" },
    { name: "Reading", schedule: "MWF • 10:15 - 11:30 AM", tag: "REA" },
    { name: "Language", schedule: "MWF • 1:00 - 2:00 PM", tag: "LANG" },
  ];

  const sections = [
    {
      subject: "Science",
      list: [
        {
          id: "G2Faith",
          name: "G2 - Faith (Science)",
          room: "Rm 204",
          schedule: "Mon - Fri • 7:30 - 8:30 AM",
        },
        {
          id: "G2Hope",
          name: "G2 - Hope (Science)",
          room: "Rm 205",
          schedule: "Mon - Fri • 7:30 - 8:30 AM",
        },
      ],
    },
    {
      subject: "Mathematics",
      list: [
        {
          id: "G2FaithMath",
          name: "G2 - Faith (Math)",
          room: "Rm 204",
          schedule: "TTh • 9:00 - 10:00 AM",
        },
      ],
    },
  ];

  const handleOpenSection = (sectionId) => {
    navigate(`/teacher-attendance/${sectionId}`);
  };

  return (
    <div className="teacher-dashboard-container">
      <aside className="teacher-sidebar">
        <div className="sidebar-header">
          <h1>SHEP</h1>
          <p>Teacher Dashboard</p>
        </div>

        <div className="teacher-info">
          <div className="avatar" />
          <div>
            <p className="teacher-name">Francaryllese Dacabaleam</p>
            <p className="teacher-role">Teacher</p>
          </div>
        </div>

        <div className="subjects-list">
          <h2>Subjects Handled</h2>
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
