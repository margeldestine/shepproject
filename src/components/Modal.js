// c:\Users\Margel\Desktop\shepproject\src\components\Modal.js
import React from "react";
import { createPortal } from "react-dom";
import CloseButton from "./CloseButton";

export default function Modal({
  open,
  title,
  onClose,
  overlayClassName = "modal-overlay",
  modalClassName = "modal",
  headerClassName = "modal-header",
  children,
  closeIcon,
  closeOnOverlayClick = true,
}) {
  if (!open) return null;

  const overlay = (
    <div
      className={overlayClassName}
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div className={modalClassName} onClick={(e) => e.stopPropagation()}>
        <div className={headerClassName}>
          <h3>{title}</h3>
          <CloseButton onClick={onClose} icon={closeIcon} />
        </div>
        {children}
      </div>
    </div>
  );

  // Render the modal overlay at the document body level to avoid clipping
  // from page containers with overflow/positioning.
  return typeof document !== "undefined"
    ? createPortal(overlay, document.body)
    : overlay;
}