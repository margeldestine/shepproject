import React from "react";

export default function FiltersBar({ children, className = "filters" }) {
  // Render a simple wrapper preserving the exact class name and markup
  return <div className={className}>{children}</div>;
}