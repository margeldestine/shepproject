import React from "react";
import { X } from "lucide-react";
import "./CloseButton.css";

export default function CloseButton({ onClick, icon, size = 20, ariaLabel = "Close", className = "", style }) {
  const iconEl = icon ? icon : <X size={size} />;

  return (
    <button
      type="button"
      className={`shep-close-btn ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      style={style}
    >
      {iconEl}
    </button>
  );
}