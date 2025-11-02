import "./Grades.css";
import "./Dashboard.css"; // reuse shared layout styles
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import { subjectSlug } from "../data/subjectDetails";

function Grades() {
  const navigate = useNavigate();

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

      {/* Top bar */}
      <header className="dash-topbar">
        <div className="user-chip">
          <div className="avatar" />
          <span>Ritchie Marie</span>
        </div>

        <div className="about-actions">
          <button className="icon" aria-label="Settings" onClick={() => navigate("/settings")}>⚙️</button>
        </div>
      </header>

      {/* Main grid (grades layout) */}
      <main className="grades-panel">
        {/* ===== LEFT SIDEBAR ===== */}
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

        {/* ===== RIGHT CONTENT ===== */}
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
    </div>
  );
}

export default Grades;