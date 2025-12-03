import React, { useEffect, useState } from "react";
import "../styles/TeacherAttendance.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import FiltersBar from "../components/FiltersBar";
import DataTable from "../components/DataTable";
import { students as attendanceStudents } from "../data/students";
import { getStudentData } from "../api/studentApi";
import { createAttendance } from "../api/attendanceApi";
import { getTeacherByUserId } from "../api/teacherApi";

export default function TeacherAttendance() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchTeacherId = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log('Retrieved userId from localStorage:', userId);
        
        if (!userId) {
          console.error('No userId found in localStorage');
          alert('Please log in first');
          return;
        }
        
        const teacher = await getTeacherByUserId(parseInt(userId));
        console.log('Teacher response:', teacher);
        
        if (mounted) {
          setTeacherId(teacher.teacher_id);
          console.log('Set teacherId to:', teacher.teacher_id);
        }
      } catch (error) {
        console.error('Error fetching teacher:', error);
        alert('Could not find teacher record. Please contact administrator.');
      }
    };

    fetchTeacherId();

    getStudentData()
      .then((list) => {
        if (!mounted) return;
        console.log('Students loaded from API:', list);
        
        const formattedStudents = list.map(student => ({
          id: student.student_id,
          name: `${student.first_name} ${student.last_name}`,
          studentNumber: student.student_number,
          gradeLevel: student.grade_level
        }));
        
        console.log('Formatted students:', formattedStudents);
        setRows(formattedStudents);
        
        const initialData = {};
        formattedStudents.forEach(student => {
          initialData[student.id] = {
            status: "Present",
            remarks: ""
          };
        });
        setAttendanceData(initialData);
      })
      .catch((error) => {
        console.error('Error loading students:', error);
        alert('Failed to load students. Using fallback data.');
        setRows(attendanceStudents);
        
        const initialData = {};
        attendanceStudents.forEach(student => {
          initialData[student.id] = {
            status: "Present",
            remarks: ""
          };
        });
        setAttendanceData(initialData);
      });
    
    return () => {
      mounted = false;
    };
  }, []);

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status: newStatus
      }
    }));
  };

  const handleRemarksChange = (studentId, newRemarks) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks: newRemarks
      }
    }));
  };

  const handleSaveAttendance = async () => {
  if (!teacherId) {
    alert('Teacher ID not found. Please make sure you are logged in.');
    return;
  }

  if (rows.length === 0) {
    alert('No students found. Please add students first.');
    return;
  }

  try {
    // FIX: Create timestamp in local timezone without conversion to UTC
    const timestamp = selectedDate + ' 00:00:00';
    
    console.log('=== SAVING ATTENDANCE ===');
    console.log('Teacher ID:', teacherId);
    console.log('Selected Date:', selectedDate);
    console.log('Timestamp:', timestamp);
    console.log('Number of students:', rows.length);
    
    const attendancePromises = rows.map(student => {
      const attendanceRecord = {
        student_id: student.id,
        teacher_id: teacherId,
        attendance_date: timestamp,
        status: attendanceData[student.id]?.status || "Present"
      };
      
      console.log('Sending attendance record:', attendanceRecord);
      return createAttendance(attendanceRecord);
    });

    const results = await Promise.all(attendancePromises);
    console.log('Attendance save results:', results);
    alert('Attendance saved successfully for ' + rows.length + ' students on ' + selectedDate + '!');
  } catch (error) {
    console.error('Error saving attendance:', error);
    alert('Failed to save attendance: ' + error.message);
  }
};

  return (
    <TeacherLayout active="attendance" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <TeacherHeader
            title="Attendance — G2 Faith"
            headerClassName="attendance-header header-box"
          />

          <FiltersBar>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setTimeout(() => window.location.reload(), 50); }}
            />
            <select>
              <option>Grade-2 Faith</option>
            </select>
            <button className="mark-all-btn" onClick={handleSaveAttendance}>Save</button>
          </FiltersBar>

          <DataTable
            tableClassName="attendance-table"
            columns={[
              { key: "name", label: "Student Name" },
              { key: "status", label: "Status", render: (row) => (
                <select 
                  value={attendanceData[row.id]?.status || "Present"}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                >
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              ) },
              { key: "remarks", label: "Remarks", render: (row) => (
                <input 
                  type="text" 
                  placeholder="Add remark..." 
                  value={attendanceData[row.id]?.remarks || ""}
                  onChange={(e) => handleRemarksChange(row.id, e.target.value)}
                />
              ) }
            ]}
            data={rows}
          />
        </div>
    </TeacherLayout>
  );
}
