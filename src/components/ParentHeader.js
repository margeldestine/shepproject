import React from "react";

export default function ParentHeader({
  title,
  rightText = "● ● ●",
  headerClassName = "parent-section-header",
}) {
  return (
    <div className={headerClassName}>
      <strong>{title}</strong>
      <span>{rightText}</span>
    </div>
  );
}