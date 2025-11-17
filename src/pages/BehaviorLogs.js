import React, { useState } from "react";
import "./BehaviorLogs.css";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import Modal from "../components/Modal";
import ModalActions from "../components/ModalActions";
import SimpleTable from "../components/SimpleTable";
import BackButton from "../components/BackButton";

export default function Behavior() {

  const [showModal, setShowModal] = useState(false);

  const columns = [
    { key: "date", label: "Date" },
    { key: "student", label: "Student" },
    { key: "incident", label: "Incident" },
    { key: "action", label: "Action Taken" }
  ];

  const data = [
    { date: "Sep 19, 2025", student: "Francis Abelgas", incident: "Left class without permission", action: "Counseled" },
    { date: "Sep 20, 2025", student: "Danise Bianca Catamco", incident: "Disturbing other students", action: "Warning Issued" }
  ];

  return (
    <>
    <TeacherLayout active="behavior-logs" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <TeacherHeader
            title="Behavior — G2 Faith"
            buttonLabel="Add Behavior"
            onButtonClick={() => setShowModal(true)}
          />

          <SimpleTable columns={columns} data={data} tableClassName="attendance-table" />
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
