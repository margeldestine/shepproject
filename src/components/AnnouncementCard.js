
import React from "react";

export default function AnnouncementCard({
  item,
  onDetails,
  onEdit,
  variant = "default",
  showEdit = true,
  detailsLabel = "Details",
}) {
  const formatDate = (value) => {
    if (!value) return "";
    const s = typeof value === "string" ? value : String(value);
    const iso = s.includes(" ") && !s.includes("T") ? s.replace(" ", "T") : s;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return s;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  if (variant === "dashboard") {
    return (
      <article className="card">
        <h3>{item.title}</h3>
        <small>{formatDate(item.date)}</small>
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
      <p className="announcement-date">{formatDate(item.date)}</p>
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
