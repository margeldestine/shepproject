import React from "react";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";

function FormDetail({ title = "Form Detail" }) {
  const navigate = useNavigate();
  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      {/* Top bar remains visible */}
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

      {/* Keep layout consistent; simple placeholder content */}
      <main className="dash-grid">
        <section className="dash-main">
          <div className="cards">
            <article className="card" style={{ gridColumn: "1 / -1" }}>
              <h3>{title}</h3>
              <p className="desc">Placeholder content — the detailed form will be implemented next.</p>
              <button className="read-btn" onClick={() => navigate("/forms")}>Back to Forms</button>
            </article>
          </div>
        </section>
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>Francaryllese Dacabelam</h4>
            <div className="profile-actions">
              <button className="pill" onClick={() => navigate("/behavior")}>Behavior</button>
              <button className="pill" onClick={() => navigate("/attendance")}>Attendance</button>
              <button className="pill" onClick={() => navigate("/grades")}>View Grades</button>
              <button className="pill active" onClick={() => navigate("/forms")}>Forms</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default FormDetail;