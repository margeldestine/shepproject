import React from "react";
import "./AnnouncementModal.css";

function AnnouncementModal({ open, title, date, description, onClose }) {
  if (!open) return null;

  return (
    <div className="announce-modal-backdrop" role="dialog" aria-modal="true">
      <div className="announce-modal">
        <div className="announce-modal-header">
          <h3>{title}</h3>
          <small>{date}</small>
        </div>
        <div className="announce-modal-body">
          <p>{description}</p>
        </div>
        <div className="announce-modal-actions">
          <button className="back-pill" onClick={onClose}>‹ Back</button>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementModal;