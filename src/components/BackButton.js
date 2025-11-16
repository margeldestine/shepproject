import React from "react";

export default function BackButton({ onClick, children = "Back", className = "back-btn", ...props }) {
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}