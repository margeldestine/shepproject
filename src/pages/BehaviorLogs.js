import React, { useEffect, useState } from "react";
import "../styles/BehaviorLogs.css";
import "../styles/TeacherForms.css";
import "../styles/Add.css";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import SimpleTable from "../components/SimpleTable";
import { BehaviorLogs, BehaviorLogsColumns } from "../data/behaviorLogs";
import { getAllBehaviorLogs, createBehaviorLog, updateBehaviorLog, deleteBehaviorLog } from "../api/behaviorLogsApi";
import { getStudentData } from "../api/studentApi";

export default function Behavior() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    studentId: "",
    incident: "",
    actionTaken: ""
  });
  const [editFormData, setEditFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    studentId: "",
    incident: "",
    actionTaken: ""
  });

  const getBehaviorId = (src) => {
    if (!src) return undefined;
    const cand = [
      src.behavior_log_id,
      src.behaviorLogId,
      src.id,
      src.log_id,
      src.behavior_id,
      src.behaviorId,
      src.bl_id,
    ].find((v) => v !== undefined && v !== null);
    const num = cand != null ? Number(cand) : undefined;
    return Number.isFinite(num) ? num : cand;
  };

  const getStudentId = (src) => {
    if (!src) return undefined;
    const cand = [
      src.student_id,
      src.studentId,
      src.student?.student_id,
      src.student?.id,
      src.student?.studentId,
    ].find((v) => v !== undefined && v !== null);
    const num = cand != null ? Number(cand) : undefined;
    return Number.isFinite(num) ? num : cand;
  };

  useEffect(() => {
    let mounted = true;
    
    // Fetch behavior logs
    getAllBehaviorLogs()
      .then((list) => {
        if (!mounted) return;
        console.log('Behavior logs loaded:', list);
        
        // Format the data to match table columns
        const formattedData = list.map(log => ({
          id: getBehaviorId(log),
          date: log.incident_date,
          student: log.student ? `${log.student.first_name} ${log.student.last_name}` : 'Unknown',
          incident: log.description,
          action: log.type,
          __raw: log,
        }));
        
        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error loading behavior logs:', error);
        const fallback = BehaviorLogs.map((log) => ({
          id: log.id,
          date: log.date,
          student: log.student,
          incident: log.incident,
          action: log.action,
          __raw: log,
        }));
        setData(fallback);
      });

    // Fetch students for dropdown
    getStudentData()
      .then((list) => {
        if (!mounted) return;
        console.log('Students loaded:', list);
        setStudents(list);
      })
      .catch((error) => {
        console.error('Error loading students:', error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveBehavior = async (e) => {
    e.preventDefault();

    if (!formData.studentId) {
      alert('Please select a student');
      return;
    }

    try {
      const behaviorLogData = {
        student_id: parseInt(formData.studentId),
        incident_date: formData.date,
        description: formData.incident,
        type: formData.actionTaken,
        recorded_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      console.log('Saving behavior log:', behaviorLogData);
      
      const result = await createBehaviorLog(behaviorLogData);
      console.log('Behavior log saved:', result);

      alert('Behavior log saved successfully!');
      
      // Refresh the data
      const updatedLogs = await getAllBehaviorLogs();
      const formattedData = updatedLogs.map(log => ({
        date: log.incident_date,
        student: log.student ? `${log.student.first_name} ${log.student.last_name}` : 'Unknown',
        incident: log.description,
        action: log.type
      }));
      setData(formattedData);

      // Reset form and close modal
      setFormData({
        date: new Date().toISOString().split('T')[0],
        studentId: "",
        incident: "",
        actionTaken: ""
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error saving behavior log:', error);
      alert('Failed to save behavior log: ' + error.message);
    }
  };

  const openEdit = (row) => {
    const raw = row.__raw || {};
    const studentId = getStudentId(raw) ?? "";
    setEditFormData({
      date: raw.incident_date || row.date || new Date().toISOString().split('T')[0],
      studentId: String(studentId || ""),
      incident: raw.description || row.incident || "",
      actionTaken: raw.type || row.action || "",
    });
    setShowEditModal(row);
  };

  const handleUpdateBehavior = async (e) => {
    e.preventDefault();
    if (!showEditModal) return;
    try {
      const derivedStudentId = editFormData.studentId || getStudentId(showEditModal.__raw);
      const sid = Number(derivedStudentId);
      if (!sid) {
        alert('Missing student id for this behavior log');
        return;
      }
      const payload = {
        student_id: sid,
        incident_date: editFormData.date,
        description: editFormData.incident,
        type: editFormData.actionTaken,
        recorded_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };
      const id = getBehaviorId(showEditModal.__raw) ?? getBehaviorId(showEditModal);
      if (id == null) throw new Error("Missing behavior log id");
      await updateBehaviorLog(id, payload);
      const updatedLogs = await getAllBehaviorLogs();
      const formattedData = updatedLogs.map(log => ({
        id: getBehaviorId(log),
        date: log.incident_date,
        student: log.student ? `${log.student.first_name} ${log.student.last_name}` : 'Unknown',
        incident: log.description,
        action: log.type,
        __raw: log,
      }));
      setData(formattedData);
      setShowEditModal(null);
      alert('Behavior log updated successfully!');
    } catch (error) {
      console.error('Error updating behavior log:', error);
      alert('Failed to update behavior log: ' + (error?.message || 'Unknown error'));
    }
  };

  const handleDeleteBehavior = async (row) => {
    const id = getBehaviorId(row.__raw) ?? getBehaviorId(row);
    if (id == null) return;
    const ok = window.confirm('Delete this behavior log?');
    if (!ok) return;
    try {
      await deleteBehaviorLog(id);
      const updatedLogs = await getAllBehaviorLogs();
      const formattedData = updatedLogs.map(log => ({
        id: getBehaviorId(log),
        date: log.incident_date,
        student: log.student ? `${log.student.first_name} ${log.student.last_name}` : 'Unknown',
        incident: log.description,
        action: log.type,
        __raw: log,
      }));
      setData(formattedData);
      alert('Behavior log deleted.');
    } catch (error) {
      console.error('Error deleting behavior log:', error);
      alert('Failed to delete behavior log: ' + (error?.message || 'Unknown error'));
    }
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
            columns={[
              { ...BehaviorLogsColumns[0], width: '14%' },
              { ...BehaviorLogsColumns[1], width: '22%' },
              { ...BehaviorLogsColumns[2], width: '38%' },
              { ...BehaviorLogsColumns[3], width: '18%' },
              {
                key: "actions",
                label: "Options",
                width: '8%',
                align: 'center',
                render: (row) => (
                  <div className="actions-cell">
                    <button
                      className="edit-btn"
                      onClick={(e) => { e.stopPropagation(); openEdit(row); }}
                    >
                      Edit
                    </button>
                    <button
                      className="view-btn"
                      onClick={(e) => { e.stopPropagation(); handleDeleteBehavior(row); }}
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
            data={data}
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
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Student Name</label>
              <select 
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a student</option>
                {students.map(student => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Incident</label>
              <textarea 
                name="incident"
                placeholder="Incident" 
                rows={3}
                value={formData.incident}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Action Taken</label>
              <textarea 
                name="actionTaken"
                placeholder="Action Taken" 
                rows={3}
                value={formData.actionTaken}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

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

      {showEditModal && (
        <Modal
          open={!!showEditModal}
          title="Edit Behavior"
          onClose={() => setShowEditModal(null)}
          overlayClassName="action-modal-overlay"
          modalClassName="action-modal"
          headerClassName="modal-header"
        >
          <form className="modal-form" onSubmit={handleUpdateBehavior}>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={editFormData.date}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                value={(showEditModal?.__raw?.student
                  ? `${showEditModal.__raw.student.first_name} ${showEditModal.__raw.student.last_name}`
                  : showEditModal?.student || 'Unknown')}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Incident</label>
              <textarea
                name="incident"
                rows={3}
                value={editFormData.incident}
                onChange={handleEditInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Action Taken</label>
              <textarea
                name="actionTaken"
                rows={3}
                value={editFormData.actionTaken}
                onChange={handleEditInputChange}
                required
              ></textarea>
            </div>

            <div className="modal-actions modal-actions-reverse">
              <button
                type="button"
                className="action-btn action-btn-sm"
                onClick={() => setShowEditModal(null)}
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
