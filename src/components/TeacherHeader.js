import React from "react";

export default function TeacherHeader({
  title,
  buttonLabel,
  onButtonClick,
  headerClassName = "header-box",
  containerElement = "div",
}) {

  if (containerElement === "h2") {
    return <h2 className={headerClassName}>{title}</h2>;
  }

  return (
    <div className={headerClassName}>
      <h2>{title}</h2>
      {buttonLabel && onButtonClick ? (
        <button onClick={onButtonClick}>{buttonLabel}</button>
      ) : null}
    </div>
  );
}