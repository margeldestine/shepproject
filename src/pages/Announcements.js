import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./Announcements.css";
import { useNavigate } from "react-router-dom";

export default function Announcements() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const announcements = [
    {
      id: 1,
      title: "Assignment in English",
      date: "Due Sep 26, 2025 — 11:59 PM",
      description: "Short Story Writing",
      fullDetails:
        "Assignment in English\n\nWrite a short story (500–800 words) based on the theme 'Unexpected Friendship'. Submission via Google Classroom.",
    },
    {
      id: 2,
      title: "Assignment in Science",
      date: "Due Sep 27, 2025 — 11:59 PM",
      description: "Parts of a Plant",
      fullDetails:
        "Assignment in Science\n\nCreate a labeled diagram of a flowering plant and explain each part. Submission: Science class drop box.",
    },
    {
      id: 3,
      title: "Assignment in Math",
      date: "Due Sep 29, 2025 — 11:59 PM",
      description: "Problem Solving Exercise",
      fullDetails:
        "Assignment in Math\n\nAnswer the problem-solving set on fractions and decimals. Submission: Google Classroom.",
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
          <button onClick={() => navigate("/class-announcements")}>Class Announcements</button>
          <button onClick={() => navigate("/teacher-forms")}>Forms</button>
          <button className="active" onClick={() => navigate("/announcements")}>Announcements</button>
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

        <div className="announcements-container">
          <div className="header-box">
            <h2>Announcements</h2>
            <button onClick={() => setShowNewModal(true)}>New Announcement</button>
          </div>

          <div className="announcements-grid">
            {announcements.map((item) => (
              <div className="announcement-card" key={item.id}>
                <h3 className="announcement-title">{item.title}</h3>
                <p className="announcement-date">{item.date}</p>
                <p className="announcement-desc">{item.description}</p>
                <div className="announcement-actions">
                  <button className="details-btn" onClick={() => setSelectedAnnouncement(item)}>Details</button>
                  <button className="edit-btn" onClick={() => setEditAnnouncement(item)}>Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Modal */}
        {selectedAnnouncement && (
          <div className="announcement-modal-overlay">
            <div className="announcement-modal">
              <div className="modal-header">
                <h3>{selectedAnnouncement.title}</h3>
                <button className="close-modal-btn" onClick={() => setSelectedAnnouncement(null)}>
                  <X size={20} />
                </button>
              </div>
              <p className="modal-date">{selectedAnnouncement.date}</p>
              <pre className="modal-details">{selectedAnnouncement.fullDetails}</pre>
            </div>
          </div>
        )}

        {/* New Announcement Modal */}
        {showNewModal && (
          <div className="announcement-modal-overlay">
            <div className="announcement-modal">
              <div className="modal-header">
                <h3>New Announcement</h3>
                <button className="close-modal-btn" onClick={() => setShowNewModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <input type="text" placeholder="Title" />
              <textarea placeholder="Details"></textarea>
              <button className="edit-btn" style={{ marginTop: "10px" }}>Create</button>
            </div>
          </div>
        )}

        {/* Edit Announcement Modal */}
        {editAnnouncement && (
          <div className="announcement-modal-overlay">
            <div className="announcement-modal">
              <div className="modal-header">
                <h3>Edit Announcement</h3>
                <button className="close-modal-btn" onClick={() => setEditAnnouncement(null)}>
                  <X size={20} />
                </button>
              </div>
              <input type="text" defaultValue={editAnnouncement.title} />
              <textarea defaultValue={editAnnouncement.fullDetails}></textarea>
              <button className="edit-btn" style={{ marginTop: "10px" }}>Save</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
