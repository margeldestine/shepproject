import React from "react";
import "./Dashboard.css";
import shepbg from "../assets/shepbg.png";
import { useNavigate } from "react-router-dom";
import ParentTopbar from "../components/ParentTopbar";
import ParentLayout from "../components/ParentLayout";
import BackButton from "../components/BackButton";

function FormDetail({ title = "Form Detail" }) {
  const navigate = useNavigate();
  return (
    <div className="dash-bg" style={{ backgroundImage: `url(${shepbg})` }}>
      <div className="dash-overlay" />

      <ParentTopbar userName="Ritchie Marie" />

      {}
      <ParentLayout active="forms">
        <div className="cards">
          <article className="card" style={{ gridColumn: "1 / -1" }}>
            <h3>{title}</h3>
            <p className="desc">Placeholder content — the detailed form will be implemented next.</p>
            <BackButton className="read-btn" onClick={() => navigate("/forms")}>
              Back to Forms
            </BackButton>
          </article>
        </div>
      </ParentLayout>
    </div>
  );
}

export default FormDetail;