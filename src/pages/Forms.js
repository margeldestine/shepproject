import React, { useState } from "react";
import "./Forms.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Bell } from "lucide-react"; // added Bell icon
import { announcements } from "../data/announcements";

function Forms() {
  const navigate = useNavigate();
  const [eventsOpen, setEventsOpen] = useState(true);
  const [showMeeting, setShowMeeting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [response, setResponse] = useState(null);
  const [remindersOpen, setRemindersOpen] = useState(false); 
  const [selectedReminder, setSelectedReminder] = useState(null);

 // Assignment modal state
 const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
 const [selectedAssignment, setSelectedAssignment] = useState(null);

 // Detail modal state for alerts, events, announcements
 const [detailModalOpen, setDetailModalOpen] = useState(false);
 const [selectedDetail, setSelectedDetail] = useState(null);

 const handleSignOut = () => navigate("/");
 const handleSettings = () => navigate("/settings");

 const openAssignmentDetails = (assignment) => {
   setSelectedAssignment(assignment);
   setAssignmentModalOpen(true);
 };

 const openDetailModal = (item) => {
   setSelectedDetail(item);
   setDetailModalOpen(true);
 };

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />
      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>
        <div className="about-actions">
          {/* Reminders Button */}
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
            onClick={() => navigate("/settings")}
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
            onClick={() => navigate("/")}
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

      <main className="forms-panel">
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>Francaryllese Dacabelam</h4>
            <div className="profile-actions">
              <button className="pill" onClick={() => navigate("/behavior")}>Behavior</button>
              <button className="pill" onClick={() => navigate("/attendance")}>Attendance</button>
              <div className="profile-actions">
                <button className="pill" onClick={() => navigate("/grades")}>View Grades</button>
              </div>
              <button className="pill" onClick={() => {}}>Forms</button>
            </div>
          </div>
        </aside>

        <section className="forms-content-enter">
          <div className="forms-shell">
            <div className="forms-header">
              <strong>Parental Consent and Authorization Forms</strong>
              <span>● ● ●</span>
            </div>

            <div className="forms-card">
              <div
                className={`category ${eventsOpen ? "open" : ""}`}
                onClick={() => setEventsOpen((v) => !v)}
                role="button"
                aria-expanded={eventsOpen}
              >
                <div className="left">
                  <span className="star">★</span>
                  <span>Events</span>
                </div>
                <span className="arrow">›</span>
              </div>

              {eventsOpen && (
                <>
                  <div
                    className="subitem"
                    onClick={() => {
                      setShowMeeting((v) => {
                        const next = !v;
                        if (next) {
                          setShowConfirm(false);
                          setResponse(null);
                        }
                        return next;
                      });
                    }}
                    role="button"
                    aria-label="Open PTA Meeting form"
                    title="PTA Meeting"
                  >
                    <span>PTA Meeting</span>
                    <span className="arrow">›</span>
                  </div>

                  {showMeeting && (
                    <>
                      {!showConfirm ? (
                        <div className="meeting-panel">
                          <div className="meeting-header">Meeting Details</div>
                          <div className="meeting-body">
                            <div className="meeting-grid">
                              <div className="field">
                                <label>Appointed By</label>
                                <div className="box">Teacher Ritchie Dela Cruz</div>
                              </div>
                              <div className="field">
                                <label>Date</label>
                                <div className="box">October 7, 2025</div>
                              </div>
                              <div className="field">
                                <label>Time</label>
                                <div className="box">9:00 AM – 12:00 PM</div>
                              </div>
                              <div className="field">
                                <label>Location</label>
                                <div className="box">Elementary Department, Room 204</div>
                              </div>
                              <div className="field" style={{ gridColumn: "1 / -1" }}>
                                <label>Purpose</label>
                                <div className="box">Address student's behavior in school.</div>
                              </div>
                            </div>
                            <div className="meeting-footer">
                              <button className="next-btn" onClick={() => setShowConfirm(true)}>Next ›</button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="confirm-panel fade-enter">
                          <div className="confirm-header">Meeting Confirmation Form</div>
                          <div className="confirm-body">
                            <p>
                              <strong>Dear Parent,</strong><br/>
                              You are invited! We would be delighted to have you at our upcoming parent-teacher conference on October 7, 2025 at 9 AM.
                              This conference will take 3 hours of your time and will be held at your child’s classroom. I’ll share updates on your child’s progress, and you’re welcome to bring any questions or concerns for us to discuss. Feel free to bring them up, and I’ll make sure to provide the best answers and solutions.
                              Your confirmation means a lot to me. Please kindly complete your response no later than October 6, 2025. I am looking forward to our meeting!
                            </p>
                            <div className="checklist">
                              <div className="label">Please check one:</div>
                              <div className="check-row">
                                <input
                                  id="resp-yes"
                                  type="checkbox"
                                  checked={response === "yes"}
                                  onChange={() => setResponse(response === "yes" ? null : "yes")}
                                />
                                <label htmlFor="resp-yes">I will attend the conference at this time.</label>
                              </div>
                              <div className="check-row">
                                <input
                                  id="resp-no"
                                  type="checkbox"
                                  checked={response === "no"}
                                  onChange={() => setResponse(response === "no" ? null : "no")}
                                />
                                <label htmlFor="resp-no">I am unable to make it at the scheduled time.</label>
                              </div>
                            </div>
                            <div className="attach-row">
                              <button className="attach-btn">Attach e-signature here</button>
                            </div>
                            <div className="submit-row">
                              <button className="submit-btn">Submit ›</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              <button className="back-btn" onClick={() => navigate("/dashboard")}>Back</button>
            </div>
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

export default Forms;
