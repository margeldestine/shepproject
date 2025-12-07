import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import Modal from "../components/Modal";
import TeacherHeader from "../components/TeacherHeader";
import DataTable from "../components/DataTable";
import { forms } from "../data/forms";
import { getAllForms, createForm, updateForm, deleteForm } from "../api/formsApi";
import { getTeacherByUserId } from "../api/teacherApi";
import "../styles/Add.css"; 

export default function TeacherForms() {
  const navigate = useNavigate();

  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(null);
  const [data, setData] = useState([]);
  const [teacherId, setTeacherId] = useState(null);
  
  const [newFormData, setNewFormData] = useState({
    title: "",
    dueDate: "",
    details: ""
  });

  const [editFormData, setEditFormData] = useState({
    formId: null,
    title: "",
    dueDate: "",
    details: ""
  });

  useEffect(() => {
    let mounted = true;
    
    // Fetch teacher ID
    const fetchTeacherId = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('No userId found in localStorage');
          return;
        }
        
        const teacher = await getTeacherByUserId(parseInt(userId));
        if (mounted) {
          setTeacherId(teacher.teacher_id);
        }
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    // Fetch forms
    const fetchForms = async () => {
      try {
        const list = await getAllForms();
        if (mounted) {
          console.log('Forms loaded:', list);
          
          const formattedData = list.map(form => ({
            form_id: form.form_id,
            title: form.title,
            category: "Form",
            status: "Active",
            responses: form.signatures ? form.signatures.length : 0,
            due_date: form.due_date,
            created_at: form.created_at,
            details: form.details || form.description || ""
          }));
          
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error loading forms:', error);
        setData(forms);
      }
    };

    fetchTeacherId();
    fetchForms();

    return () => {
      mounted = false;
    };
  }, []);

  const handleNewFormChange = (e) => {
    const { name, value } = e.target;
    setNewFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveNewForm = async (e) => {
    e.preventDefault();

    if (!teacherId) {
      alert('Teacher ID not found. Please log in again.');
      return;
    }

    if (!newFormData.title || !newFormData.dueDate) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const formData = {
        teacher_id: teacherId,
        title: newFormData.title,
        due_date: newFormData.dueDate + ' 00:00:00',
        details: newFormData.details
      };

      console.log('Creating form:', formData);
      
      const result = await createForm(formData);
      console.log('Form created:', result);

      alert('Form created successfully!');
      
      // Refresh the data
      const updatedForms = await getAllForms();
      const formattedData = updatedForms.map(form => ({
        form_id: form.form_id,
        title: form.title,
        category: "Form",
        status: "Active",
        responses: form.signatures ? form.signatures.length : 0,
        due_date: form.due_date,
        created_at: form.created_at,
        details: form.details || form.description || ""
      }));
      setData(formattedData);

      // Reset form and close modal
      setNewFormData({ title: "", dueDate: "", details: "" });
      setShowNewFormModal(false);
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form: ' + error.message);
    }
  };

  const handleSaveEditForm = async (e) => {
    e.preventDefault();

    if (!editFormData.title || !editFormData.dueDate) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const formData = {
        title: editFormData.title,
        due_date: editFormData.dueDate + ' 00:00:00',
        details: editFormData.details
      };

      console.log('Updating form:', editFormData.formId, formData);
      
      const result = await updateForm(editFormData.formId, formData);
      console.log('Form updated:', result);

      alert('Form updated successfully!');
      
      // Refresh the data
      const updatedForms = await getAllForms();
      const formattedData = updatedForms.map(form => ({
        form_id: form.form_id,
        title: form.title,
        category: "Form",
        status: "Active",
        responses: form.signatures ? form.signatures.length : 0,
        due_date: form.due_date,
        created_at: form.created_at,
        details: form.details || form.description || ""
      }));
      setData(formattedData);

      // Close modal
      setShowEditModal(null);
    } catch (error) {
      console.error('Error updating form:', error);
      alert('Failed to update form: ' + error.message);
    }
  };

  const openEditModal = (row) => {
    const dueDateStr = row.due_date ? new Date(row.due_date).toISOString().split('T')[0] : "";
    setEditFormData({
      formId: row.form_id,
      title: row.title,
      dueDate: dueDateStr,
      details: row.details || ""
    });
    setShowEditModal(row);
  };

  return (
    <TeacherLayout active="forms" containerClassName="teacher-attendance-container" showBackButton={true}>
      <div className="attendance-container">
        <TeacherHeader
          title="Teacher Forms — G2 Faith"
          buttonLabel="Create New Form"
          onButtonClick={() => setShowNewFormModal(true)}
        />

        <DataTable
          tableClassName="attendance-table"
          columns={[
            { key: "title", label: "Form Title", width: "19%", align: "left" },
            { key: "category", label: "Category", width: "9%", align: "left" },
            { key: "details", label: "Details", width: "24%", align: "left" },
            { key: "status", label: "Status", width: "14%", align: "left" },
            { key: "responses", label: "Responses", width: "17%", align: "center" },
            {
              key: "action",
              label: "Action",
              width: "17%",
              align: "center",
              render: (row) => (
                <div className="table-actions">
                  <button className="table-action-btn" onClick={() => setShowViewModal(row)}>View</button>
                  <button className="table-action-btn-dark" onClick={() => openEditModal(row)}>Edit</button>
                </div>
              ),
            },
          ]}
          data={data}
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
          <form className="modal-form" onSubmit={handleSaveNewForm}>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                name="title"
                placeholder="Form title" 
                value={newFormData.title}
                onChange={handleNewFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input 
                type="date" 
                name="dueDate"
                value={newFormData.dueDate}
                onChange={handleNewFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea 
                name="details"
                placeholder="Form details"
                rows={4}
                value={newFormData.details}
                onChange={handleNewFormChange}
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setShowNewFormModal(false)}
              >
                Back
              </button>
              <button
                type="submit"
                className="action-btn-dark action-btn-sm"
              >
                Save
              </button>
            </div>
          </form>
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
            <label>Details</label>
            <textarea value={showViewModal.details || ""} readOnly rows={4}></textarea>

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

      {/* Edit Form Modal */}
      {showEditModal && (
        <Modal
          open={!!showEditModal}
          title="Edit Form"
          onClose={() => setShowEditModal(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <form className="modal-form" onSubmit={handleSaveEditForm}>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                name="title"
                value={editFormData.title}
                onChange={handleEditFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input 
                type="date" 
                name="dueDate"
                value={editFormData.dueDate}
                onChange={handleEditFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea 
                name="details"
                rows={4}
                value={editFormData.details}
                onChange={handleEditFormChange}
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setShowEditModal(null)}
              >
                Back
              </button>
              <button
                type="submit"
                className="action-btn-dark action-btn-sm"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </TeacherLayout>
  );
}
