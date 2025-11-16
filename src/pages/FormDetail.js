import React from "react";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import ParentTopbar from "../components/ParentTopbar";
import ParentProfileCard from "../components/ParentProfileCard";

function FormDetail({ title = "Form Detail" }) {
  const navigate = useNavigate();
  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName="Ritchie Marie" />

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
          <ParentProfileCard active="forms" />
        </aside>
      </main>
    </div>
  );
}

export default FormDetail;