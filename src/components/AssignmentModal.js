import React from "react";
import Modal from "./Modal";

export default function AssignmentModal({ open, assignment, onClose }) {
  if (!open || !assignment) return null;
  return (
    <Modal
      open={open}
      title={assignment.title}
      onClose={onClose}
      overlayClassName="assignment-modal-overlay"
      modalClassName="assignment-modal"
      headerClassName="reminders-header"
    >
      <div className="reminders-content">
        <p><strong>Due:</strong> {assignment.due}</p>
        <p><strong>Subject:</strong> {assignment.subject}</p>
        <p>{assignment.description}</p>
      </div>
    </Modal>
  );
}