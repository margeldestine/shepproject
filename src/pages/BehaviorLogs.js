import React, { useEffect, useState } from "react";
import "../styles/BehaviorLogs.css";
import "../styles/Add.css";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import SimpleTable from "../components/SimpleTable";
import { BehaviorLogs, BehaviorLogsColumns } from "../data/behaviorLogs";
import { getAllBehaviorLogs, createBehaviorLog } from "../api/behaviorLogsApi";
import { getStudentData } from "../api/studentApi";

export default function Behavior() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    studentId: "",
    incident: "",
    actionTaken: ""
  });

  useEffect(() => {
    let mounted = true;
    
    // Fetch behavior logs
    getAllBehaviorLogs()
      .then((list) => {
        if (!mounted) return;
        console.log('Behavior logs loaded:', list);
        
        // Format the data to match table columns
        const formattedData = list.map(log => ({
          date: log.incident_date,
          student: log.student ? `${log.student.first_name} ${log.student.last_name}` : 'Unknown',
          incident: log.description,
          action: log.type
        }));
        
        setData(formattedData);
      })
      .catch((error) => {
        console.error('Error loading behavior logs:', error);
        setData(BehaviorLogs);
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
    </>
  );
}