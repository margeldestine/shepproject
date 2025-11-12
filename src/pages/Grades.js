import "./Grades.css";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { subjectSlug } from "../data/subjectDetails";
import { LogOut, Settings, Bell } from "lucide-react";
import React, { useState } from "react";
import { announcements } from "../data/announcements";

function Grades() {
  const navigate = useNavigate();
  const [remindersOpen, setRemindersOpen] = useState(false);

  const rows = [
    { area: "Filipino", q1: 93, q2: 95, q3: 97, q4: 94, final: 95, remark: "PASSED" },
    { area: "English", q1: 93, q2: 98, q3: 90, q4: 97, final: 95, remark: "PASSED" },
    { area: "Mathematics", q1: 93, q2: 95, q3: 98, q4: 96, final: 95, remark: "PASSED" },
    { area: "Science", q1: 93, q2: 95, q3: 96, q4: 95, final: 95, remark: "PASSED" },
    { area: "Araling Panlipunan", q1: 93, q2: 96, q3: 97, q4: 93, final: 95, remark: "PASSED" },
    { area: "EsP", q1: 97, q2: 97, q3: 97, q4: 98, final: 97, remark: "PASSED" },
    { area: "TLE", q1: 97, q2: 99, q3: 96, q4: 95, final: 97, remark: "PASSED" },
    { area: "RHGP", q1: 100, q2: 100, q3: 100, q4: 96, final: 100, remark: "PASSED" },
  ];

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

      <main className="grades-panel">
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>Francaryllese Dacabelam</h4>
            <div className="profile-actions">
              <button className="pill" onClick={() => navigate("/behavior")}>Behavior</button>
              <button className="pill" onClick={() => navigate("/attendance")}>Attendance</button>
              <button className="pill active" onClick={() => {}}>View Grades</button>
              <button className="pill" onClick={() => navigate("/forms")}>Forms</button>
            </div>
          </div>
        </aside>
        <section className="grades-content-enter">
          <div className="grades-shell">
            <div className="grades-header">
              <strong>Learner's Academic Performance</strong>
              <span>● ● ●</span>
            </div>
            <div className="grades-card">
              <p className="click-hint">Tip: Click any subject to view details</p>
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Learning Areas</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                    <th>Q4</th>
                    <th>Final Grade</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.area}
                      onClick={() => navigate(`/grades/${subjectSlug(r.area)}`)}
                      title={`View ${r.area} details`}
                    >
                      <td>
                        <span className="subject-name">
                          <span className="chev">›</span>
                          {r.area}
                        </span>
                      </td>
                      <td>{r.q1}</td>
                      <td>{r.q2}</td>
                      <td>{r.q3}</td>
                      <td>{r.q4}</td>
                      <td>{r.final}</td>
                      <td className="remark-pass">{r.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        {/* Assignments */}
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

        {/* Alerts */}
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

        {/* Upcoming Events */}
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

        {/* Recent Announcements */}
        <div className="reminder-section">
          <h3>Recent Announcements</h3>
          <div className="reminder-item gray">
            <div className="reminder-bar" />
            <div className="reminder-body">
              <strong>Parent-Teacher Meeting</strong>
              <span>September 15, 2025</span>
              <small>We invite all parents to our quarterly Parent Teacher Meeting to discuss student progress.</small>
            </div>
          </div>
          <div className="reminder-item gray">
            <div className="reminder-bar" />
            <div className="reminder-body">
              <strong>Parent-Teacher Meeting</strong>
              <span>September 15, 2025</span>
              <small>We invite all parents to our quarterly Parent Teacher Meeting to discuss student progress.</small>
            </div>
          </div>
          <div className="reminder-item gray">
            <div className="reminder-bar" />
            <div className="reminder-body">
              <strong>Parent-Teacher Meeting</strong>
              <span>September 15, 2025</span>
              <small>We invite all parents to our quarterly Parent Teacher Meeting to discuss student progress.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Grades;
