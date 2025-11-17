import React from "react";

export default function SettingsCard({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="settings-box">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onAction}>{actionLabel}</button>
    </div>
  );
}