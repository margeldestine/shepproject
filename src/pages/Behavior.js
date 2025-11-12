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

  // New states for specific reminder details modal
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  // Open specific reminder detail modal
  const openDetail = (reminder) => {
    setSelectedReminder(reminder);
    setDetailOpen(true);
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

      {/* Reminders Modal */}
      {remindersOpen && (
        <div className="reminders-modal-overlay" onClick={() => setRemindersOpen(false)}>
          <div className="reminders-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reminders-header">
              <h2>Reminders</h2>
              <button className="close-btn" onClick={() => setRemindersOpen(false)}>×</button>
            </div>
            
            <div className="reminders-content">
              {/* Assignments Section */}
              <div className="reminder-section">
                <h3>Assignments</h3>
                <div className="reminder-item yellow" onClick={() => openDetail({
                  title: "Assignment in English",
                  date: "Due Sep 26, 2025 — 11:59 PM",
                  description: "Short Story Writing",
                  fullDetails: "Assignment in English\n\nWrite a short story (500–800 words) based on the theme 'Unexpected Friendship'. Submission via Google Classroom."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in English</strong>
                    <span>Due Sep 26, 2025 (Friday)</span>
                    <small>📖 English - Short Story Writing</small>
                  </div>
                </div>

                <div className="reminder-item yellow" onClick={() => openDetail({
                  title: "Assignment in Science",
                  date: "Due Sep 26, 2025 — 11:59 PM",
                  description: "Parts of a Plant",
                  fullDetails: "Assignment in Science\n\nCreate a labeled diagram of a flowering plant and explain each part. Submission: Science class drop box."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in Science</strong>
                    <span>Due Sep 26, 2025 (Friday)</span>
                    <small>🔬 Science - Parts of a Plant</small>
                  </div>
                </div>

                <div className="reminder-item yellow" onClick={() => openDetail({
                  title: "Assignment in Filipino",
                  date: "Due Oct 1, 2025 — 11:59 PM",
                  description: "Aking Paboritang Pagkain",
                  fullDetails: "Assignment in Filipino\n\nWrite a short essay about your favorite Filipino food and explain why you like it. Submission via Google Classroom."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in Filipino</strong>
                    <span>Due Oct 1, 2025 (Wednesday)</span>
                    <small>🇵🇭 Filipino - Aking Paboritang Pagkain</small>
                  </div>
                </div>

                <div className="reminder-item yellow" onClick={() => openDetail({
                  title: "Assignment in English",
                  date: "Due Oct 2, 2025 — 11:59 PM",
                  description: "My Favorite Animal",
                  fullDetails: "Assignment in English\n\nWrite a descriptive paragraph about your favorite animal. Include habitat, diet, and fun facts. Submission via Google Classroom."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in English</strong>
                    <span>Due Oct 2, 2025 (Thursday)</span>
                    <small>📖 English - My Favorite Animal</small>
                  </div>
                </div>
              </div>

              {/* Alerts Section */}
              <div className="reminder-section">
                <h3>Alerts</h3>
                <div className="reminder-item red" onClick={() => openDetail({
                  title: "Attendance Alert",
                  date: "3 Absences in October",
                  description: "Your Child has 3 Recorded Absences in October.",
                  fullDetails: "Attendance Alert\n\nYour child has 3 recorded absences in October. Please ensure all absences are accounted for with proper documentation and communicate with the teacher if any issues arise."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Attendance Alert</strong>
                    <span>Your Child has 3 Recorded Absences in October.</span>
                  </div>
                </div>
                <div className="reminder-item blue" onClick={() => openDetail({
                  title: "Permission Slip Due",
                  date: "Due in 2 Days",
                  description: "Submit signed permission slip",
                  fullDetails: "Please submit your child's signed permission slip before the deadline to ensure participation in upcoming school activities."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Permission Slip Due in 2 Days!</strong>
                    <span>Please submit your child's signed permission slip before the deadline.</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events Section */}
              <div className="reminder-section">
                <h3>Upcoming Events</h3>
                <div className="reminder-item red" onClick={() => openDetail({
                  title: "September 9",
                  date: "Sergio Osmeña Day",
                  description: "",
                  fullDetails: "September 9 - Sergio Osmeña Day\n\nNational holiday observed to honor the legacy of Sergio Osmeña. School will be closed on this day."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>September 9</strong>
                    <span>Sergio Osmeña Day</span>
                  </div>
                </div>
                <div className="reminder-item red" onClick={() => openDetail({
                  title: "September 23",
                  date: "Faculty-Admin Day",
                  description: "",
                  fullDetails: "September 23 - Faculty-Admin Day\n\nFaculty and administration activities are scheduled. Students will have no classes on this day."
                })}>
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>September 23</strong>
                    <span>Faculty-Admin Day</span>
                  </div>
                </div>
              </div>

              {/* Announcements Section */}
              <div className="reminder-section">
                <h3>Recent Announcements</h3>
                {announcements.slice(0, 3).map((item) => (
                  <div
                    className="reminder-item gray"
                    key={item.id}
                    onClick={() => openDetail({
                      title: item.title,
                      date: item.date,
                      description: item.preview,
                      fullDetails: item.preview
                    })}
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

      {/* Detail Modal */}
      {detailOpen && selectedReminder && (
        <div className="reminders-modal-overlay" onClick={() => setDetailOpen(false)}>
          <div className="reminders-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reminders-header">
              <h2>{selectedReminder.title}</h2>
              <button className="close-btn" onClick={() => setDetailOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="reminders-content">
              <p><strong>Date:</strong> {selectedReminder.date}</p>
              <p><strong>Description:</strong> {selectedReminder.description}</p>
              <p><strong>Full Details:</strong></p>
              <p style={{ whiteSpace: "pre-wrap", backgroundColor: "#f8f8f8", padding: "1rem", borderRadius: "8px" }}>
                {selectedReminder.fullDetails}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Behavior;
