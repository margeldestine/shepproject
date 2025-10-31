import "./Behavior.css";
import "./Dashboard.css"; // reuse shared layout styles
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";

function Behavior() {
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

      {/* Main grid (behavior layout) */}
      <main className="behavior-panel">
        {/* ===== LEFT SIDEBAR ===== */}
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

        {/* ===== RIGHT CONTENT ===== */}
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
    </div>
  );
}

export default Behavior;