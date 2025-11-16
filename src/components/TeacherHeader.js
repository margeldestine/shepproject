import React from "react";

export default function TeacherHeader({
  title,
  buttonLabel,
  onButtonClick,
  headerClassName = "header-box",
  containerElement = "div",
}) {
  // Render exactly like existing markup to avoid visual changes.
  if (containerElement === "h2") {
    // No button in this variant; match original h2.header-box usage.
    return <h2 className={headerClassName}>{title}</h2>;
  }

  // Default container is a div with an h2 title; button rendered only if provided.
  return (
    <div className={headerClassName}>
      <h2>{title}</h2>
      {buttonLabel && onButtonClick ? (
        <button onClick={onButtonClick}>{buttonLabel}</button>
      ) : null}
    </div>
  );
}