import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";


function Dashboard() {

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

      {/* Main grid */}
      <main className="dash-grid">
        {/* ===== LEFT COLUMN ===== */}
        <section className="dash-main">
          {/* Text-only hero */}
          <div className="hero">
            <div className="hero-text">
              <h1>
                Connecting Schools, Parents, Teachers, and
                <br /> Students in One Platform
              </h1>
              <p>
                Easily manage events, track engagement, and stay in control of privacy. <br />Support student success every step of the way. 
              </p>
              <button
                className="about-btn-plain"
                onClick={() => navigate("/about")}
              >
                About
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="section-header">
            <h2>Announcements &amp; Updates</h2>
            <button className="see-all">See All</button>
          </div>

          <div className="cards">
            <article className="card">
              <h3><br />
                Parent-Teacher Meeting
              </h3>
              <small>September 15, 2025</small>
              <br />
              <p className="desc">
                We invite all parents to do our quarterly Parent Teacher Meeting to
                discuss student progress.
              </p>
              <br />
              <button className="read-btn">Read More</button>
            </article>

            <article className="card">
              <h3><br />
                Annual Science Fair
              </h3>
              <small>November 18, 2025</small>
              <br />
              <p className="desc">
                We proudly present our students' innovative projects. Come celebrate their curiosity, creativity, and scientific discoveries.
              </p>
              <br />
              <button className="read-btn">Read More</button>
            </article>

            <article className="card">
              <h3><br />
                Curriculum Night
              </h3>
              <small>October 2, 2025</small>
              <br />
              <p className="desc">
                Join us for an evening to explore the curriculum, meet our dedicated teachers, and learn about the educational journey ahead for your child this year.
              </p>
              <br />
              <button className="read-btn">Read More</button>
            </article>
          </div>
        </section>

        {/* ===== RIGHT SIDEBAR ===== */}
        <aside className="dash-side">
          <div className="profile-card">
            <div className="profile-avatar" />
            <h4>Francaryllese Dacabelam</h4>

            <div className="profile-actions">
              <button className="pill">Behavior</button>
              <button className="pill">Attendance</button>
              <button className="pill">Grades</button>
              <button className="pill">Forms</button>
            </div>
          </div>

          <div className="events-card">
            <h4>Upcoming Events</h4>

            <div className="event">
              <div className="event-dot red" />
              <div className="event-body">
                <strong>September 9</strong>
                <span>Sergio Osmeña Day</span>
              </div>
            </div>

            <div className="event">
              <div className="event-dot green" />
              <div className="event-body">
                <strong>September 23</strong>
                <span>Faculty Admin Day</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Dashboard;
