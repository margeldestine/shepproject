import React from "react";
import Modal from "./Modal";

export default function DetailModal({ open, detail, onClose }) {
  if (!open || !detail) return null;
  return (
    <Modal
      open={open}
      title={detail.title}
      onClose={onClose}
      overlayClassName="assignment-modal-overlay"
      modalClassName="assignment-modal"
      headerClassName="reminders-header"
    >
      <div className="reminders-content">
        {detail.date && (
          <p><strong>Date:</strong> {detail.date}</p>
        )}
        <p>{detail.description}</p>
      </div>
    </Modal>
  );
}