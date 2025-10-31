import "./Attendance.css";
import "./Dashboard.css"; // reuse shared layout styles
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";

function Attendance() {
  const navigate = useNavigate();

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      {/* Top bar */}
      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>

        <div className="top-actions">
          <button className="icon-btn" aria-label="Notifications">🔔</button>
          <button className="icon-btn" aria-label="Settings">⚙️</button>
        </div>
      </header>

      {/* Main grid (attendance layout) */}
      <main className="attendance-panel">
        {/* ===== LEFT SIDEBAR ===== */}
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

        {/* ===== RIGHT CONTENT ===== */}
        <section className="attendance-content-enter">
          <div className="att-shell">
            <div className="att-header">
              <strong>Report on Learner's Attendance Record</strong>
              <span>● ● ●</span>
            </div>

            <div className="att-body">
              {/* Calendar */}
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
                  {/* Week 1 (starts on Monday) */}
                  <div className="day" />
                  <div className="day">1</div>
                  <div className="day">2</div>
                  <div className="day">3</div>
                  <div className="day">4</div>
                  <div className="day">5</div>
                  <div className="day">6</div>
                  {/* Week 2 */}
                  <div className="day">7</div>
                  <div className="day">8</div>
                  <div className="day">9</div>
                  <div className="day">10</div>
                  <div className="day">11</div>
                  <div className="day active">12</div>
                  <div className="day">13</div>
                  {/* Week 3 */}
                  <div className="day">14</div>
                  <div className="day">15</div>
                  <div className="day">16</div>
                  <div className="day">17</div>
                  <div className="day">18</div>
                  <div className="day">19</div>
                  <div className="day">20</div>
                  {/* Week 4 */}
                  <div className="day">21</div>
                  <div className="day">22</div>
                  <div className="day">23</div>
                  <div className="day">24</div>
                  <div className="day">25</div>
                  <div className="day">26</div>
                  <div className="day">27</div>
                  {/* Week 5 */}
                  <div className="day">28</div>
                  <div className="day">29</div>
                  <div className="day">30</div>
                  <div className="day" />
                  <div className="day" />
                  <div className="day" />
                  <div className="day" />
                </div>
              </div>

              {/* Status */}
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
    </div>
  );
}

export default Attendance;