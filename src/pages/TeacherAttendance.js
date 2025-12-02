import React, { useEffect, useState } from "react";
import "../styles/TeacherAttendance.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";
import TeacherHeader from "../components/TeacherHeader";
import FiltersBar from "../components/FiltersBar";
import DataTable from "../components/DataTable";
import { students as attendanceStudents } from "../data/students";
import { getAllAttendance } from "../api/attendanceApi";

export default function TeacherAttendance() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(attendanceStudents);

  useEffect(() => {
    let mounted = true;
    getAllAttendance()
      .then((list) => {
        if (!mounted) return;
        setRows(Array.isArray(list) ? list : attendanceStudents);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <TeacherLayout active="attendance" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <TeacherHeader
            title="Attendance — G2 Faith"
            headerClassName="attendance-header header-box"
          />

          <FiltersBar>
            <select>
              <option>Date</option>
            </select>
            <select>
              <option>Grade-2 Faith</option>
            </select>
            <button className="mark-all-btn">Mark All Present</button>
          </FiltersBar>

          <DataTable
            tableClassName="attendance-table"
            columns={[
              { key: "name", label: "Student Name" },
              { key: "status", label: "Status", render: () => (
                <select>
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              ) },
              { key: "remarks", label: "Remarks", render: () => (
                <input type="text" placeholder="Add remark..." />
              ) }
            ]}
            data={rows}
          />
        </div>
    </TeacherLayout>
  );
}
