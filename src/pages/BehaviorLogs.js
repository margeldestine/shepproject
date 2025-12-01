import React, { useState } from "react";
import "../styles/BehaviorLogs.css";
import "../styles/Add.css"; // <-- Add.css for reusable modal/buttons
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import SimpleTable from "../components/SimpleTable";
import { BehaviorLogs, BehaviorLogsColumns } from "../data/behaviorLogs";

export default function Behavior() {
  const [showModal, setShowModal] = useState(false);

  const handleSaveBehavior = (e) => {
    e.preventDefault();
    alert("Behavior saved!");
    setShowModal(false);
  };

  return (
    <>
      <TeacherLayout
        active="behavior-logs"
        containerClassName="teacher-attendance-container"
      >
        <div className="attendance-container">
          <TeacherHeader
            title="Behavior — G2 Faith"
            buttonLabel="Add Behavior"
            onButtonClick={() => setShowModal(true)}
          />

          <SimpleTable
            columns={BehaviorLogsColumns}
            data={BehaviorLogs}
            tableClassName="attendance-table"
          />
        </div>
      </TeacherLayout>

      {showModal && (
        <Modal
          open={showModal}
          title="Add Behavior"
          onClose={() => setShowModal(false)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <form className="modal-form" onSubmit={handleSaveBehavior}>
            <div className="form-group">
              <label>Date</label>
              <input type="date" required />
            </div>
            <div className="form-group">
              <label>Student Name</label>
              <input type="text" placeholder="Student Name" required />
            </div>
            <div className="form-group">
              <label>Incident</label>
              <textarea placeholder="Incident" rows={3} required></textarea>
            </div>
            <div className="form-group">
              <label>Action Taken</label>
              <textarea placeholder="Action Taken" rows={3} required></textarea>
            </div>

            {/* Modal actions using Add.css */}
            <div className="modal-actions modal-actions-reverse">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setShowModal(false)}
              >
                Back
              </button>
              <button type="submit" className="action-btn-dark action-btn-sm">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
