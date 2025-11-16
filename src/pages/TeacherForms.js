import React, { useState } from "react";
import { LogOut, Settings, X } from "lucide-react";
import "./TeacherForms.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import ModalActions from "../components/ModalActions";
import TeacherHeader from "../components/TeacherHeader";
import DataTable from "../components/DataTable";

export default function TeacherForms() {
  const navigate = useNavigate();

  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);

  const handleSignOut = () => navigate("/");
  const handleSettings = () => navigate("/settings");

  const forms = [
    { title: "Parent-Teacher Meeting Form", category: "Meeting", status: "Active", responses: 12 },
    { title: "Student Progress Report", category: "Report", status: "Closed", responses: 30 },
    { title: "Behavior Evaluation Form", category: "Behavior", status: "Active", responses: 15 },
    { title: "Learning Materials Request", category: "Request", status: "Pending", responses: 8 },
    { title: "Classroom Observation Form", category: "Observation", status: "Active", responses: 20 },
  ];

  return (
    <TeacherLayout active="forms" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <TeacherHeader
            title="Teacher Forms — G2 Faith"
            buttonLabel="Create New Form"
            onButtonClick={() => setShowNewFormModal(true)}
          />

          <DataTable
            tableClassName="attendance-table"
            columns={[
              { key: "title", label: "Form Title" },
              { key: "category", label: "Category" },
              { key: "status", label: "Status" },
              { key: "responses", label: "Responses" },
              { key: "action", label: "Action", render: (row) => (
                <>
                  <button className="view-btn" onClick={() => setShowViewModal(row)}>View</button>
                  <button className="edit-btn" onClick={() => setShowEditModal(row)}>Edit</button>
                </>
              ) }
            ]}
            data={forms}
          />
        </div>

        {}
        {showNewFormModal && (
          <Modal
            open={showNewFormModal}
            title="Create New Form"
            onClose={() => setShowNewFormModal(false)}
            overlayClassName="form-modal-overlay"
            modalClassName="form-modal"
            headerClassName="modal-header"
          >
            <div className="modal-content">
              <label>Title</label>
              <input type="text" placeholder="Form title" />
              <label>Category</label>
              <input type="text" placeholder="Category" />
              <label>Status</label>
              <input type="text" placeholder="Status" />
              <ModalActions>
                <BackButton className="back-btn" onClick={() => setShowNewFormModal(false)}>Cancel</BackButton>
                <button className="save-btn">Save</button>
              </ModalActions>
            </div>
          </Modal>
        )}

        {}
        {showViewModal && (
          <Modal
            open={!!showViewModal}
            title="View Form"
            onClose={() => setShowViewModal(null)}
            overlayClassName="form-modal-overlay"
            modalClassName="form-modal"
            headerClassName="modal-header"
          >
            <div className="modal-content">
              <p><strong>Title:</strong> {showViewModal.title}</p>
              <p><strong>Category:</strong> {showViewModal.category}</p>
              <p><strong>Status:</strong> {showViewModal.status}</p>
              <p><strong>Responses:</strong> {showViewModal.responses}</p>
            </div>
          </Modal>
        )}

        {}
        {showEditModal && (
          <Modal
            open={!!showEditModal}
            title="Edit Form"
            onClose={() => setShowEditModal(null)}
            overlayClassName="form-modal-overlay"
            modalClassName="form-modal"
            headerClassName="modal-header"
          >
            <div className="modal-content">
              <label>Title</label>
              <input type="text" defaultValue={showEditModal.title} />
              <label>Category</label>
              <input type="text" defaultValue={showEditModal.category} />
              <label>Status</label>
              <input type="text" defaultValue={showEditModal.status} />
              <ModalActions>
                <BackButton className="back-btn" onClick={() => setShowEditModal(null)}>Cancel</BackButton>
                <button className="save-btn">Save</button>
              </ModalActions>
            </div>
          </Modal>
        )}

    </TeacherLayout>
  );
}
