import React from "react";
import { LogOut, Settings } from "lucide-react";
import "./TeacherAttendance.css";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/TeacherLayout";

export default function TeacherAttendance() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <TeacherLayout active="attendance" containerClassName="teacher-attendance-container">
      <div className="attendance-container">
          <h2 className="attendance-header header-box">Attendance — G2 Faith</h2>

          <div className="filters">
            <select>
              <option>Date</option>
            </select>
            <select>
              <option>Grade-2 Faith</option>
            </select>
            <button className="mark-all-btn">Mark All Present</button>
          </div>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Dela Cruz</td>
                <td>
                  <select>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                  </select>
                </td>
                <td>
                  <input type="text" placeholder="Add remark..." />
                </td>
              </tr>
              <tr>
                <td>Maria Santos</td>
                <td>
                  <select>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                  </select>
                </td>
                <td>
                  <input type="text" placeholder="Add remark..." />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </TeacherLayout>
  );
}
