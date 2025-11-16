import React from "react";
import Modal from "./Modal";

export default function AssignmentModal({ open, assignment, onClose }) {
  if (!open || !assignment) return null;
  const formatDue = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "long",
      });
    } catch (e) {
      return iso;
    }
  };
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
        <p><strong>Due:</strong> {formatDue(assignment.due)}</p>
        <p><strong>Subject:</strong> {assignment.subject}</p>
        <p>{assignment.description}</p>
      </div>
    </Modal>
  );
}