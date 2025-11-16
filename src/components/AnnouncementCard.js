// c:\Users\Margel\Desktop\shepproject\src\components\AnnouncementCard.js
import React from "react";

// Generic AnnouncementCard with a variant for dashboard styling
export default function AnnouncementCard({
  item,
  onDetails,
  onEdit,
  variant = "default",
  showEdit = true,
  detailsLabel = "Details",
}) {
  if (variant === "dashboard") {
    return (
      <article className="card">
        <h3>{item.title}</h3>
        <small>{item.date}</small>
        <p className="desc">{item.preview}</p>
        <button className="read-btn" onClick={onDetails}>
          {detailsLabel || "Read More"}
        </button>
      </article>
    );
  }

  return (
    <div className="announcement-card">
      <h3 className="announcement-title">{item.title}</h3>
      <p className="announcement-date">{item.date}</p>
      <p className="announcement-desc">{item.preview}</p>
      <div className="announcement-actions">
        <button className="read-more-btn" onClick={onDetails}>{detailsLabel}</button>
        {showEdit && (
          <button className="edit-btn" onClick={onEdit}>Edit</button>
        )}
      </div>
    </div>
  );
}