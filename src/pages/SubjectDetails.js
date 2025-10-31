import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubjectDetails.css';
import '../pages/Dashboard.css';
import shepbg from '../assets/shepbg.png';
import { subjectDetails } from '../data/subjectDetails';

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const details = subjectDetails[subjectId];

  if (!details) {
    return (
      <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
        <div className="dash-overlay" />

        {/* Top bar stays visible */}
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

        {/* Grid with sidebar and right content */}
        <main className="subject-panel">
          <aside className="dash-side">
            <div className="profile-card">
              <div className="profile-avatar" />
              <h4>Francaryllese Dacabelam</h4>

              <div className="profile-actions">
                <button className="pill" onClick={() => navigate('/behavior')}>Behavior</button>
                <button className="pill" onClick={() => navigate('/attendance')}>Attendance</button>
                <button className="pill active" onClick={() => {}}>View Grades</button>
                <button className="pill" onClick={() => navigate('/forms')}>Forms</button>
              </div>
            </div>

            <div className="events-card">
              <h4>Reminders</h4>
              <div className="event">
                <div className="event-dot red" />
                <div className="event-body">
                  <strong>September 30</strong>
                  <span>Assignment in Science</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="subject-content-enter">
            <div className="subject-shell">
              <div className="subject-header">
                <strong>{'Subject Not Found'}</strong>
                <span>● ● ●</span>
              </div>

              <div className="subject-card">
                <p>We couldn't find details for this subject.</p>
              </div>

              <button className="back-btn" onClick={() => navigate('/grades')}>Back</button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      {/* Top bar stays visible */}
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

      {/* Main grid with sidebar intact */}
      <main className="subject-panel">
        {/* LEFT SIDEBAR (unchanged) */}
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>Francaryllese Dacabelam</h4>

            <div className="profile-actions">
              <button className="pill" onClick={() => navigate('/behavior')}>Behavior</button>
              <button className="pill" onClick={() => navigate('/attendance')}>Attendance</button>
              <button className="pill active" onClick={() => {}}>View Grades</button>
              <button className="pill" onClick={() => navigate('/forms')}>Forms</button>
            </div>
          </div>

        </aside>

        {/* RIGHT CONTENT ONLY updates */}
        <section className="subject-content-enter">
          <div className="subject-shell">
            <div className="subject-header">
              <strong>{details.title}</strong>
              <span>● ● ●</span>
            </div>

            <div className="subject-card">
              <table className="subject-table">
                <thead>
                  <tr>
                    <th>Grade Item</th>
                    <th>Date</th>
                    <th>Grade</th>
                    <th>Range</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {details.items.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.item}</td>
                      <td>{row.date}</td>
                      <td>{row.grade}</td>
                      <td>{row.range}</td>
                      <td className={row.remarks === 'FAILED' ? 'remark-fail' : 'remark-pass'}>{row.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="back-btn" onClick={() => navigate('/grades')}>Back</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubjectDetails;