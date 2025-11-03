import React, { useState } from "react";
import "./Forms.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";

function Forms() {
  const navigate = useNavigate();
  const [eventsOpen, setEventsOpen] = useState(true);
  const [showMeeting, setShowMeeting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [response, setResponse] = useState(null);

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />
      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>
        <div className="about-actions">
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
    </div>
  );
}

export default Forms;
