// c:\Users\Margel\Desktop\shepproject\src\components\Modal.js
import React from "react";

export default function Modal({
  open,
  title,
  onClose,
  overlayClassName = "modal-overlay",
  modalClassName = "modal",
  headerClassName = "modal-header",
  children
}) {
  if (!open) return null;

  return (
    <div className={overlayClassName} onClick={onClose} role="dialog" aria-modal="true">
      <div className={modalClassName} onClick={(e) => e.stopPropagation()}>
        <div className={headerClassName}>
          <h3>{title}</h3>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}