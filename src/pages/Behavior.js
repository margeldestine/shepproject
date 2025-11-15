import "./Behavior.css";
import "./Dashboard.css"; // reuse shared layout styles
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { LogOut, Settings, Bell, X } from "lucide-react";
import { announcements } from "../data/announcements";

function Behavior() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);

  // Detail modal state for alerts, events, announcements
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const openAssignmentDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setAssignmentModalOpen(true);
  };

  // Assignment modal state
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const openDetailModal = (item) => {
    setSelectedDetail(item);
    setDetailModalOpen(true);
  };

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      {/* Top bar */}
      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>

        <div className="about-actions">
          <button
            onClick={() => setRemindersOpen(true)}
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
            <Bell size={16} />
            <span>Reminders</span>
          </button>

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
      </header>

      {/* Main grid (behavior layout) */}
      <main className="behavior-panel">
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>Francaryllese Dacabelam</h4>

            <div className="profile-actions">
              <button className="pill active" onClick={() => {}}>Behavior</button>
              <button className="pill" onClick={() => navigate("/attendance")}>Attendance</button>
              <button className="pill" onClick={() => navigate("/grades")}>View Grades</button>
              <button className="pill" onClick={() => navigate("/forms")}>Forms</button>
            </div>
          </div>
        </aside>

        <section className="behavior-content-enter">
          <div className="record-shell">
            <div className="record-header">
              <strong>Behavior Record</strong>
              <span>● ● ●</span>
            </div>
            <div className="record-card">
              <div className="record-title">September 19, 2025</div>
              <div className="record-meta">Incident: Left class without permission</div>
              <div className="record-body">
                <p>
                  Teacher's remarks: Francaryllese was reminded of classroom discipline and proper protocols.
                  The matter has been addressed through counseling.
                </p>
                <p>Action: Counseled</p>
              </div>
            </div>
            <button className="back-btn" onClick={() => navigate("/dashboard")}>Back</button>
          </div>
        </section>
      </main>

      {/* REMINDERS MODAL */}
      {remindersOpen && (
        <div
          className="reminders-modal-overlay"
          onClick={() => setRemindersOpen(false)}
        >
          <div
            className="reminders-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reminders-header">
              <h2>Reminders</h2>
              <button
                className="close-btn"
                onClick={() => setRemindersOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="reminders-content">
              {/* ASSIGNMENTS */}
              <div className="reminder-section">
                <h3>Assignments</h3>

                <div
                  className="reminder-item yellow"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAssignmentDetails({
                      title: "Assignment in English",
                      due: "Sep 26, 2025 — 11:59 PM",
                      subject: "English - Short Story Writing",
                      description:
                        "Write a short story (500–800 words) based on the theme 'Unexpected Friendship'. Submission via Google Classroom.",
                    });
                  }}
                >
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in English</strong>
                    <span>Due Sep 26, 2025 (Friday)</span>
                    <small>📖 English - Short Story Writing</small>
                  </div>
                </div>

                <div
                  className="reminder-item yellow"
                  onClick={(e) => {
                    e.stopPropagation();
                    openAssignmentDetails({
                      title: "Assignment in Science",
                      due: "Sep 27, 2025 — 11:59 PM",
                      subject: "Science - Flowering Plant Diagram",
                      description:
                        "Create a labeled diagram of a flowering plant and explain each part. Submission: Science class drop box.",
                    });
                  }}
                >
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in Science</strong>
                    <span>Due Sep 27, 2025 (Saturday)</span>
                    <small>🔬 Science - Flowering Plant Diagram</small>
                  </div>
                </div>
              </div>

              {/* ALERTS */}
              <div className="reminder-section">
                <h3>Alerts</h3>
                <div
                  className="reminder-item red"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetailModal({
                      title: "Attendance Alert",
                      date: "October 2025",
                      description:
                        "Your Child has 3 Recorded Absences in October.",
                    });
                  }}
                >
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Attendance Alert</strong>
                    <span>Your Child has 3 Recorded Absences in October.</span>
                  </div>
                </div>
              </div>

              {/* EVENTS */}
              <div className="reminder-section">
                <h3>Upcoming Events</h3>
                <div
                  className="reminder-item blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetailModal({
                      title: "Sergio Osmeña Day",
                      date: "September 9, 2025",
                      description:
                        "School holiday: Sergio Osmeña Day celebration, observed annually on November 19 in honor of Sergio Osmeña, the fourth President of the Philippines. The day commemorates his contributions to Philippine history, particularly his role in leading the country during World War II and his efforts in restoring the Philippine Commonwealth government. Schools and government offices typically observe this holiday with educational activities, ceremonies, and reflections on his legacy.",
                    });
                  }}
                >
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>September 9</strong>
                    <span>Sergio Osmeña Day</span>
                  </div>
                </div>
              </div>

              {/* ANNOUNCEMENTS */}
              <div className="reminder-section">
                <h3>Recent Announcements</h3>
                {announcements &&
                  announcements
                    .filter(
                      (item) => item.title === "Parent-Teacher Meeting"
                    )
                    .slice(0, 1)
                    .map((item) => (
                      <div
                        className="reminder-item gray"
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailModal({
                            title: "Parent-Teacher Meeting", 
                            date: "September 9, 2025",
                            description: "Join us for our quarterly Parent-Teacher Meeting where we will discuss student progress, address concerns, and share upcoming plans for the term. Your participation strengthens the partnership between home and school."
                          })
                        }}
                      >
                        <div className="reminder-bar" />
                        <div className="reminder-body">
                          <strong>{item.title}</strong>
                          <span>{item.date}</span>
                          <small>{item.preview}</small>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGNMENT DETAIL MODAL */}
      {assignmentModalOpen && selectedAssignment && (
        <div
          className="assignment-modal-overlay"
          onClick={() => setAssignmentModalOpen(false)}
        >
          <div
            className="assignment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reminders-header">
              <h2>{selectedAssignment.title}</h2>
              <button
                className="close-btn"
                onClick={() => setAssignmentModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="reminders-content">
              <p>
                <strong>Due:</strong> {selectedAssignment.due}
              </p>
              <p>
                <strong>Subject:</strong> {selectedAssignment.subject}
              </p>
              <p>{selectedAssignment.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR ALERTS, EVENTS, ANNOUNCEMENTS */}
      {detailModalOpen && selectedDetail && (
        <div
          className="assignment-modal-overlay"
          onClick={() => setDetailModalOpen(false)}
        >
          <div
            className="assignment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reminders-header">
              <h2>{selectedDetail.title}</h2>
              <button
                className="close-btn"
                onClick={() => setDetailModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="reminders-content">
              {selectedDetail.date && (
                <p>
                  <strong>Date:</strong> {selectedDetail.date}
                </p>
              )}
              <p>{selectedDetail.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Behavior;
