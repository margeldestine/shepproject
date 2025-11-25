import React, { useState } from "react";
import "./BehaviorLogs.css";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import Modal from "../components/Modal";
import ModalActions from "../components/ModalActions";
import SimpleTable from "../components/SimpleTable";
import BackButton from "../components/BackButton";
import { BehaviorLogs, BehaviorLogsColumns } from "../data/behaviorLogs";

export default function Behavior() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <TeacherLayout active="behavior-logs" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <TeacherHeader
            title="Behavior — G2 Faith"
            buttonLabel="Add Behavior"
            onButtonClick={() => setShowModal(true)}
          />

          <SimpleTable columns={BehaviorLogsColumns} data={BehaviorLogs} tableClassName="attendance-table" />
        </div>
      </TeacherLayout>

      {showModal && (
        <Modal
          open={showModal}
          title="Add Behavior"
          onClose={() => setShowModal(false)}
          overlayClassName="behavior-modal-overlay"
          modalClassName="behavior-modal"
          headerClassName="modal-header"
        >
          <form className="modal-form">
            <input type="date" placeholder="Date" />
            <input type="text" placeholder="Student Name" />
            <textarea placeholder="Incident"></textarea>
            <textarea placeholder="Action Taken"></textarea>

            <ModalActions>
              <BackButton type="button" className="back-btn" onClick={() => setShowModal(false)}>
                Back
              </BackButton>
              <button type="submit" className="save-btn">Save</button>
            </ModalActions>
          </form>
        </Modal>
      )}
    </>
  );
}