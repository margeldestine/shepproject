import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/SubjectDetails.css";
import "../styles/Dashboard.css";
import shepbg from '../assets/shepbg.png';
import { subjectDetails } from '../data/subjectDetails';
import ParentTopbar from "../components/ParentTopbar";
import { parentUser, studentUser } from "../data/users";
import { subjectCopy } from "../data/copy";
import ParentProfileCard from "../components/ParentProfileCard";
import BackButton from "../components/BackButton";
import { upcomingEvents } from "../data/reminders";

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const details = subjectDetails[subjectId];

  if (!details) {
    return (
      <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
        <div className="dash-overlay" />

        <ParentTopbar userName={parentUser.name} />

        <main className="subject-panel">
          <aside className="dash-side">
            <ParentProfileCard active="grades" />

            <div className="events-card">
              <h4>Reminders</h4>
              {upcomingEvents.slice(0, 1).map((ev, idx) => (
                <div className="event" key={idx}>
                  <div className="event-dot red" />
                  <div className="event-body">
                    <strong>{ev.date}</strong>
                    <span>{ev.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="subject-content-enter">
            <div className="subject-shell">
              <div className="subject-header">
                <strong>{subjectCopy?.notFoundTitle || 'Subject Not Found'}</strong>
                <span>● ● ●</span>
              </div>

              <div className="subject-card">
                <p>We couldn't find details for this subject.</p>
              </div>

              <BackButton onClick={() => navigate('/grades')} />
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName={parentUser.name} />

      <main className="subject-panel">
  
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>{studentUser.name}</h4>

            <div className="profile-actions">
              <button className="pill" onClick={() => navigate('/behavior')}>Behavior</button>
              <button className="pill" onClick={() => navigate('/attendance')}>Attendance</button>
              <button className="pill active" onClick={() => {}}>View Grades</button>
              <button className="pill" onClick={() => navigate('/forms')}>Forms</button>
            </div>
          </div>

        </aside>

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
            <BackButton onClick={() => navigate('/grades')} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubjectDetails;
