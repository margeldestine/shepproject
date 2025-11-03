import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./ClassAnnouncements.css";
import { useNavigate } from "react-router-dom";

export default function ClassAnnouncements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const announcements = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      description:
        "We invite all parents to our quarterly meeting to discuss student progress.",
      date: "Sep 15, 2025",
      fullDetails:
        "Dear Parents,\n\nWe are pleased to invite you to our upcoming Parent-Teacher Meeting on September 15, 2025. During this session, we will discuss your child’s academic progress and provide updates about classroom activities and learning outcomes.\n\nYour participation is highly valued as it strengthens the collaboration between home and school.\n\nThank you,\nG2-Faith Class Adviser",
    },
    {
      id: 2,
      title: "Upcoming Class Activity",
      description:
        "Our next class activity will involve hands-on experiments in science and teamwork activities.",
      date: "Oct 25, 2025",
      fullDetails:
        "Our next class activity will take place on October 25, 2025. The activity aims to provide hands-on learning experiences aligned with our science curriculum. More information, including materials to bring and time slots, will be announced soon.\n\nThank you for your support!",
    },
    {
      id: 3,
      title: "Quarterly Exams",
      description:
        "Please be reminded that the quarterly exams will begin next week. Review your lessons well!",
      date: "Nov 3, 2025",
      fullDetails:
        "The Quarterly Exams for all subjects will start on November 3, 2025. A detailed schedule will be provided soon. Students are encouraged to review their notes, assignments, and handouts.\n\nLet’s aim for the best results — study hard and good luck!",
    },
    {
      id: 4,
      title: "Field Trip Announcement",
      description:
        "We’re excited to announce our upcoming educational field trip to the Science Discovery Center.",
      date: "Nov 18, 2025",
      fullDetails:
        "We’re thrilled to announce that our class will visit the Science Discovery Center on November 18, 2025. This activity supports experiential learning and helps students connect lessons to real-world science.\n\nPlease submit signed consent forms by November 10.",
    },
    {
      id: 5,
      title: "Christmas Rehearsal",
      description:
        "Our class will perform a short skit during the school’s Christmas program. Rehearsals start soon!",
      date: "Dec 5, 2025",
      fullDetails:
        "The school’s Christmas Program is fast approaching! Our class will perform a heartwarming short skit. Rehearsals will begin on December 5, 2025, after class hours.\n\nWe encourage everyone to participate and showcase your creativity and teamwork!",
    },
  ];

  return (
    <div className="teacher-attendance-container">
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

        <div className="sidebar-links">
          <button onClick={() => navigate("/teacher-attendance/1")}>Attendance</button>
          <button onClick={() => navigate("/teacher-grades")}>Grades</button>
          <button onClick={() => navigate("/behavior-logs")}>Behavior Logs</button>
          <button className="active" onClick={() => navigate("/class-announcements")}>
            Class Announcements
          </button>
          <button onClick={() => navigate("/teacher-forms")}>Forms</button>
          <button onClick={() => navigate("/announcements")}>Announcements</button>
        </div>
      </aside>

      <main className="teacher-main">
        <div
          className="top-right-actions"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={handleSettings}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "inherit",
              padding: "0.5rem",
            }}
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>

          <button
            onClick={handleSignOut}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "inherit",
              padding: "0.5rem",
            }}
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>

        <div className="announcements-container">
          <div className="header-box">
            <h2>Class Specific Announcements</h2>
            <button>New Announcement</button>
          </div>

          <div className="announcements-grid">
            {announcements.map((item) => (
              <div className="announcement-card" key={item.id}>
                <div className="announcement-header">
                  <h3>{item.title}</h3>
                  <span className="announcement-date">{item.date}</span>
                </div>
                <p className="announcement-desc">{item.description}</p>
                <button
                  className="read-more-btn"
                  onClick={() => setSelectedAnnouncement(item)}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedAnnouncement && (
          <div className="announcement-modal-overlay">
            <div className="announcement-modal">
              <div className="modal-header">
                <h3>{selectedAnnouncement.title}</h3>
                <button
                  className="close-modal-btn"
                  onClick={() => setSelectedAnnouncement(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <p className="modal-date">{selectedAnnouncement.date}</p>
              <pre className="modal-details">{selectedAnnouncement.fullDetails}</pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
