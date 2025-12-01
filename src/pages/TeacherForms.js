import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import Modal from "../components/Modal";
import TeacherHeader from "../components/TeacherHeader";
import DataTable from "../components/DataTable";
import "../styles/Add.css"; 

export default function TeacherForms() {
  const navigate = useNavigate();

  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);

  const forms = [
    { title: "Parent-Teacher Meeting Form", category: "Meeting", status: "Active", responses: 12 },
    { title: "Student Progress Report", category: "Report", status: "Closed", responses: 30 },
    { title: "Behavior Evaluation Form", category: "Behavior", status: "Active", responses: 15 },
    { title: "Learning Materials Request", category: "Request", status: "Pending", responses: 8 },
    { title: "Classroom Observation Form", category: "Observation", status: "Active", responses: 20 },
  ];

  const handleSave = (closeModal) => {
    alert("Form saved!");
    if (closeModal) closeModal();
  };

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
            {
              key: "action",
              label: "Action",
              render: (row) => (
                <>
                  <button className="table-action-btn" onClick={() => setShowViewModal(row)}>View</button>
                  <button className="table-action-btn-dark" onClick={() => setShowEditModal(row)}>Edit</button>
                </>
              ),
            },
          ]}
          data={forms}
        />
      </div>

      {/* New Form Modal */}
      {showNewFormModal && (
        <Modal
          open={showNewFormModal}
          title="Create New Form"
          onClose={() => setShowNewFormModal(false)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <div className="modal-content">
            <label>Title</label>
            <input type="text" placeholder="Form title" />
            <label>Category</label>
            <input type="text" placeholder="Category" />
            <label>Status</label>
            <input type="text" placeholder="Status" />

            <div className="modal-actions">
              <button
                className="action-btn action-btn-sm"
                onClick={() => setShowNewFormModal(false)}
              >
                Back
              </button>
              <button
                className="action-btn-dark action-btn-sm"
                onClick={() => handleSave(() => setShowNewFormModal(false))}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Form Modal */}
      {showViewModal && (
        <Modal
          open={!!showViewModal}
          title="View Form"
          onClose={() => setShowViewModal(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <div className="modal-content">
            <label>Title</label>
            <input type="text" value={showViewModal.title} readOnly />
            <label>Category</label>
            <input type="text" value={showViewModal.category} readOnly />
            <label>Status</label>
            <input type="text" value={showViewModal.status} readOnly />
            <label>Responses</label>
            <input type="text" value={showViewModal.responses} readOnly />

            <div className="modal-actions">
              <button
                className="action-btn action-btn-sm"
                onClick={() => setShowViewModal(null)}
              >
                Back
              </button>
            </div>
          </div>
        </Modal>
      )}


      {showEditModal && (
        <Modal
          open={!!showEditModal}
          title="Edit Form"
          onClose={() => setShowEditModal(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <div className="modal-content">
            <label>Title</label>
            <input type="text" defaultValue={showEditModal.title} />
            <label>Category</label>
            <input type="text" defaultValue={showEditModal.category} />
            <label>Status</label>
            <input type="text" defaultValue={showEditModal.status} />

            <div className="modal-actions">
              <button
                className="action-btn action-btn-sm"
                onClick={() => setShowEditModal(null)}
              >
                Back
              </button>
              <button
                className="action-btn-dark action-btn-sm"
                onClick={() => handleSave(() => setShowEditModal(null))}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </TeacherLayout>
  );
}
