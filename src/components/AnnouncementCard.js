// c:\Users\Margel\Desktop\shepproject\src\components\AnnouncementCard.js
import React from "react";

export default function AnnouncementCard({ item, onDetails, onEdit }) {
  return (
    <div className="announcement-card">
      <h3 className="announcement-title">{item.title}</h3>
      <p className="announcement-date">{item.date}</p>
      <p className="announcement-desc">{item.preview}</p>
      <div className="announcement-actions">
        <button className="details-btn" onClick={onDetails}>Details</button>
        <button className="edit-btn" onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
}