import React from "react";

export default function FiltersBar({ children, className = "filters" }) {
  return <div className={className}>{children}</div>;
}