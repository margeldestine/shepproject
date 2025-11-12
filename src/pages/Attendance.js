import "./Attendance.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { LogOut, Settings, Bell, X } from "lucide-react";
import { announcements } from "../data/announcements";

function Attendance() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

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

      <main className="attendance-panel">
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>Francaryllese Dacabelam</h4>
            <div className="profile-actions">
              <button className="pill" onClick={() => navigate("/behavior")}>Behavior</button>
              <button className="pill active" onClick={() => {}}>Attendance</button>
              <button className="pill" onClick={() => navigate("/grades")}>View Grades</button>
              <button className="pill" onClick={() => navigate("/forms")}>Forms</button>
            </div>
          </div>
        </aside>

        <section className="attendance-content-enter">
          <div className="att-shell">
            <div className="att-header">
              <strong>Report on Learner's Attendance Record</strong>
              <span>● ● ●</span>
            </div>

            <div className="att-body">
              <div className="calendar-card">
                <div className="calendar-top">
                  <span>‹</span>
                  <span>September 2025</span>
                  <span>›</span>
                </div>
                <div className="calendar-grid">
                  {['SUN','MON','TUE','WED','THU','FRI','SAT'].map((d) => (
                    <div className="weekday" key={d}>{d}</div>
                  ))}
                  <div className="day" />
                  <div className="day">1</div>
                  <div className="day">2</div>
                  <div className="day">3</div>
                  <div className="day">4</div>
                  <div className="day">5</div>
                  <div className="day">6</div>
                  <div className="day">7</div>
                  <div className="day">8</div>
                  <div className="day">9</div>
                  <div className="day">10</div>
                  <div className="day">11</div>
                  <div className="day active">12</div>
                  <div className="day">13</div>
                  <div className="day">14</div>
                  <div className="day">15</div>
                  <div className="day">16</div>
                  <div className="day">17</div>
                  <div className="day">18</div>
                  <div className="day">19</div>
                  <div className="day">20</div>
                  <div className="day">21</div>
                  <div className="day">22</div>
                  <div className="day">23</div>
                  <div className="day">24</div>
                  <div className="day">25</div>
                  <div className="day">26</div>
                  <div className="day">27</div>
                  <div className="day">28</div>
                  <div className="day">29</div>
                  <div className="day">30</div>
                  <div className="day" />
                  <div className="day" />
                  <div className="day" />
                  <div className="day" />
                </div>
              </div>

              <div className="status-card">
                <div className="status-title">Attendance Status</div>
                <div className="status-row">
                  <span className="status-key">Date:</span>
                  <span className="status-value">September 12, 2025</span>
                </div>
                <div className="status-row">
                  <span className="status-key">Status:</span>
                  <span className="status-value">Present ✅</span>
                </div>
                <div className="status-row">
                  <span className="status-key">Remarks:</span>
                  <span className="status-value">No remarks yet</span>
                </div>
              </div>
            </div>

            <button className="back-btn" onClick={() => navigate("/dashboard")}>Back</button>
          </div>
        </section>
      </main>

      {remindersOpen && (
        <div className="reminders-modal-overlay" onClick={() => setRemindersOpen(false)}>
          <div className="reminders-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reminders-header">
              <h2>Reminders</h2>
              <button className="close-btn" onClick={() => setRemindersOpen(false)}>×</button>
            </div>
            
            <div className="reminders-content">
              <div className="reminder-section">
                <h3>Assignments</h3>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in English</strong>
                    <span>Due Sep 26, 2025 (Friday)</span>
                    <small>📖 English - Short Story Writing</small>
                  </div>
                </div>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in Science</strong>
                    <span>Due Sep 26, 2025 (Friday)</span>
                    <small>🔬 Science - Parts of a Plant</small>
                  </div>
                </div>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in Filipino</strong>
                    <span>Due Oct 1, 2025 (Wednesday)</span>
                    <small>🇵🇭 Filipino - Aking Paboritang Pagkain</small>
                  </div>
                </div>
                <div className="reminder-item yellow">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Assignment in English</strong>
                    <span>Due Oct 2, 2025 (Thursday)</span>
                    <small>📖 English - My Favorite Animal</small>
                  </div>
                </div>
              </div>

              <div className="reminder-section">
                <h3>Alerts</h3>
                <div className="reminder-item red">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Attendance Alert</strong>
                    <span>Your Child has 3 Recorded Absences in October.</span>
                  </div>
                </div>
                <div className="reminder-item blue">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>Permission Slip Due in 2 Days!</strong>
                    <span>Please submit your child's signed permission slip before the deadline.</span>
                  </div>
                </div>
              </div>

              <div className="reminder-section">
                <h3>Upcoming Events</h3>
                <div className="reminder-item red">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>September 9</strong>
                    <span>Sergio Osmeña Day</span>
                  </div>
                </div>
                <div className="reminder-item red">
                  <div className="reminder-bar" />
                  <div className="reminder-body">
                    <strong>September 23</strong>
                    <span>Faculty-Admin Day</span>
                  </div>
                </div>
              </div>

              <div className="reminder-section">
                <h3>Recent Announcements</h3>
                {announcements.slice(0, 3).map((item) => (
                  <div className="reminder-item gray" key={item.id}>
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
    </div>
  );
}

export default Attendance;
