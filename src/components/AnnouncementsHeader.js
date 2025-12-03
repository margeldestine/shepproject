import React from "react";

export default function AnnouncementsHeader({
  title,
  onCreateNew,
  buttonText = "New Announcement",
  buttonClassName,
  className = "header-box",
}) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <button className={buttonClassName} onClick={onCreateNew}>
        {buttonText}
      </button>
    </div>
  );
}
