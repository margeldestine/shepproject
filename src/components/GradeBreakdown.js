import React, { useState, useEffect } from 'react';
import { createGrade, getStudentSubjectBreakdown } from '../api/gradesApi';
import "../styles/GradeBreakdown.css";
import "../styles/TeacherAttendance.css";

const CATEGORIES = [
  { id: 'QUIZZES', label: 'QUIZZES', weight: 0.3 },
  { id: 'EXAMS', label: 'EXAMS', weight: 0.3 },
  { id: 'PERFORMANCE', label: 'PERFORMANCE TASKS', weight: 0.3 },
  { id: 'ASSIGNMENTS', label: 'ASSIGNMENTS', weight: 0.1 },
];

export default function GradeBreakdown({ 
  studentId, 
  studentName,
  subjectId,
  subjectName, 
  sectionName, 
  quarter, 
  savedGrades = [],
  onClose,
  onQuarterChange,
  readOnly = false,
  hideSubjectInfo = false
}) {
  
  const [allAssessments, setAllAssessments] = useState(savedGrades);
  const [assessments, setAssessments] = useState({
    QUIZZES: [],
    EXAMS: [],
    PERFORMANCE: [],
    ASSIGNMENTS: [],
  });
  const [addingTo, setAddingTo] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', date: '', score: '', maxScore: 100 });
  const [notice, setNotice] = useState({ text: "", type: "" });

  // Helper to parse date from various formats (ISO or SQL timestamp)
  const parseDate = (val) => {
    if (!val) return '';
    const s = String(val);
    // Handle "YYYY-MM-DD HH:mm:ss" -> "YYYY-MM-DD"
    if (s.includes('T')) return s.split('T')[0];
    if (s.includes(' ')) return s.split(' ')[0];
    return s;
  };

  const fetchGrades = async () => {
    if (!studentId || !subjectId || !quarter) return;
    
    try {
      const grades = await getStudentSubjectBreakdown(studentId, subjectId, quarter);
      
      // Group grades by category
      const grouped = {
        QUIZZES: [],
        EXAMS: [],
        PERFORMANCE: [],
        ASSIGNMENTS: [],
      };
      
      const currentQuarter = String(quarter);

      grades.forEach(grade => {
        // If the API returns all quarters, filter here (just in case)
        if (String(grade.grading_period || grade.gradingPeriod) !== currentQuarter) return;

        let name = grade.assessment_name || grade.assessmentName || grade.name || "";
        
        // Determine category from prefix or name (Robust persistence check)
        let category = null;
        if (name.startsWith('[QUIZ]')) { category = 'QUIZZES'; name = name.replace('[QUIZ] ', '').replace('[QUIZ]', ''); }
        else if (name.startsWith('[EXAM]')) { category = 'EXAMS'; name = name.replace('[EXAM] ', '').replace('[EXAM]', ''); }
        else if (name.startsWith('[PERF]')) { category = 'PERFORMANCE'; name = name.replace('[PERF] ', '').replace('[PERF]', ''); }
        else if (name.startsWith('[ASG]')) { category = 'ASSIGNMENTS'; name = name.replace('[ASG] ', '').replace('[ASG]', ''); }

        const item = {
          id: grade.grade_id || grade.gradeId || grade.id,
          name: name,
          // Prefer explicitly saved date, fallback to creation time
          date: parseDate(
            grade.date || 
            grade.grade_date || 
            grade.assessment_date || 
            grade.date_recorded || 
            grade.recorded_at || 
            grade.submitted_at || 
            grade.created_at || 
            grade.gradeDate || 
            grade.assessmentDate || 
            grade.dateRecorded || 
            grade.createdAt
          ),
          score: grade.grade_value || grade.gradeValue || grade.score || 0,
          maxScore: 100
        };
        
        if (category) {
          grouped[category].push(item);
        } else {
          // Fallback to keyword matching (User requested logic)
          const lowerName = name.toLowerCase();
          if (lowerName.includes('quiz')) {
            grouped.QUIZZES.push(item);
          } else if (lowerName.includes('exam')) {
            grouped.EXAMS.push(item);
          } else if (lowerName.includes('task') || lowerName.includes('project') || lowerName.includes('lab') || lowerName.includes('report') || lowerName.includes('performance')) {
            grouped.PERFORMANCE.push(item);
          } else if (lowerName.includes('assignment') || lowerName.includes('homework')) {
            grouped.ASSIGNMENTS.push(item);
          }
        }
      });
      
      setAssessments(grouped);
    } catch (error) {
      console.error('Failed to load grades:', error);
    }
  };

  useEffect(() => {
    if (notice.text && (notice.type === 'error' || notice.type === 'success')) {
      const t = setTimeout(() => setNotice({ text: "", type: "" }), 2000);
      return () => clearTimeout(t);
    }
  }, [notice.text, notice.type]);

  useEffect(() => {
    fetchGrades();
  }, [studentId, subjectId, quarter]);


  const handleAddItemClick = (catId) => {
    if (readOnly) return;
    setAddingTo(catId);
    setNewItem({ 
      name: `${catId === 'QUIZZES' ? 'Quiz' : catId === 'EXAMS' ? 'Exam' : catId === 'PERFORMANCE' ? 'Task' : 'Assignment'} ${(assessments[catId]?.length || 0) + 1}`, 
      date: new Date().toISOString().split('T')[0], 
      score: '', 
      maxScore: 100 
    });
  };

  const handleSaveItem = async () => {
    if (!addingTo) return;
    
    // Validation: Check if score is greater than 100
    const scoreVal = parseFloat(newItem.score);
    if (scoreVal > 100) {
      setNotice({ text: "Invalid score. You cannot enter grades above 100.", type: "error" });
      return;
    }
    
    // Prefix the name with category tag for persistence
    let prefix = "";
    if (addingTo === 'QUIZZES') prefix = "[QUIZ] ";
    else if (addingTo === 'EXAMS') prefix = "[EXAM] ";
    else if (addingTo === 'PERFORMANCE') prefix = "[PERF] ";
    else if (addingTo === 'ASSIGNMENTS') prefix = "[ASG] ";

    const fullName = prefix + newItem.name;
    
    // Format date for various backend expectations
    const dateOnly = newItem.date; // YYYY-MM-DD
    const sqlDate = newItem.date ? `${newItem.date} 00:00:00` : null; // YYYY-MM-DD HH:mm:ss
    
    console.log('Saving grade with date:', newItem.date);

    try {
      const gradeData = {
        student_id: studentId,
        subject_id: subjectId,
        grading_period: quarter,
        grade_value: parseFloat(newItem.score) || 0,
        teacher_id: parseInt(localStorage.getItem('userId')) || 1,
        assessment_name: fullName,
        // Send multiple formats and field names to ensure backend captures the user-selected date
        // Priority 1: SQL Timestamp format (matches Attendance)
        created_at: sqlDate, 
        date_recorded: sqlDate, 
        grade_date: sqlDate,
        assessment_date: sqlDate,
        recorded_at: sqlDate,
        submitted_at: sqlDate,
        // Priority 2: CamelCase versions
        createdAt: sqlDate,
        dateRecorded: sqlDate,
        gradeDate: sqlDate,
        assessmentDate: sqlDate,
        // Priority 3: Simple Date format
        date: dateOnly, 
        dateOnly: dateOnly
      };
      
      console.log('Grade payload:', gradeData);
      
      await createGrade(gradeData);
      
      // Reload grades from backend to ensure consistency
      await fetchGrades();
      
      setAddingTo(null);
      setNotice({ text: "Grade saved successfully.", type: "success" });
    } catch (error) {
      console.error('Failed to save grade:', error);
      setNotice({ text: 'Failed to save grade. Please try again.', type: 'error' });
    }
  };

  const calculateSubtotal = (items) => {
    if (!items.length) return 0;
    // Step 1: Calculate the category average (Sum of all items / Number of items)
    const totalScore = items.reduce((acc, item) => acc + (parseFloat(item.score) || 0), 0);
    return (totalScore / items.length).toFixed(1);
  };

  const calculateFinal = () => {
    let total = 0;
    CATEGORIES.forEach(cat => {
      const items = assessments[cat.id] || [];
      if (items.length) {
        const sub = parseFloat(calculateSubtotal(items));
        total += sub * cat.weight;
      }
    });
    return total.toFixed(2);
  };

  return (
    <div className="grade-breakdown-overlay">
      <div className="grade-breakdown-container">
        {notice.text && !readOnly && (
          <div className={`notice-bar ${notice.type === 'error' ? 'notice-error' : notice.type === 'success' ? 'notice-success' : ''}`}>
            {notice.text}
          </div>
        )}
        <button className="close-breakdown-btn" onClick={onClose}>
          ← Back to Class Grades
        </button>

        <div className="breakdown-header">
          <h2>{studentName}</h2>
          <div className={`breakdown-meta ${hideSubjectInfo ? 'meta-right' : ''}`}>
            {!hideSubjectInfo && <span>{subjectName} - {sectionName}</span>}
            <select 
              className="quarter-select" 
              value={quarter} 
              onChange={(e) => onQuarterChange(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4].map(q => (
                <option key={q} value={q}>Q{q}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="breakdown-content">
          {CATEGORIES.map(cat => {
            const items = assessments[cat.id] || [];
            const subtotal = calculateSubtotal(items);
            const isAdding = !readOnly && addingTo === cat.id;
            
            return (
              <div key={cat.id} className="breakdown-category">
                <div className="category-header-row">
                  <div className="category-title">{cat.label}</div>
                </div>
                
                <table className="breakdown-table">
                  <thead>
                    <tr>
                      <th>Assessment Name</th>
                      <th>Date</th>
                      <th className="score-col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td className="score-col">{item.score}</td>
                      </tr>
                    ))}
                    
                    {isAdding && (
                      <tr className="adding-row">
                        <td>
                          <input 
                            autoFocus
                            type="text" 
                            className="inline-input"
                            value={newItem.name}
                            onChange={e => setNewItem({...newItem, name: e.target.value})}
                            placeholder="Name"
                          />
                        </td>
                        <td>
                          <input 
                            type="date" 
                            className="inline-input"
                            value={newItem.date}
                            onChange={e => setNewItem({...newItem, date: e.target.value})}
                          />
                        </td>
                        <td className="score-col">
                          <input 
                            type="number" 
                            className="inline-input score-input"
                            value={newItem.score}
                            onChange={e => {
                              const val = e.target.value;
                              // Allow only positive numbers
                              if (val === '' || /^\d*\.?\d*$/.test(val)) {
                                setNewItem({...newItem, score: val});
                              }
                            }}
                            onKeyDown={(e) => {
                              // Block 'e', 'E', '+', '-'
                              if (['e', 'E', '+', '-'].includes(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                {!readOnly && (
                  isAdding ? (
                    <div className="add-actions">
                      <button className="save-btn" onClick={handleSaveItem}>Save</button>
                      <button className="cancel-btn" onClick={() => setAddingTo(null)}>Cancel</button>
                    </div>
                  ) : (
                    <button className="add-item-btn" onClick={() => handleAddItemClick(cat.id)}>
                      + Add {cat.id === 'QUIZZES' ? 'quiz' : cat.label.slice(0, -1).toLowerCase()}
                    </button>
                  )
                )}

                <div className="subtotal-row">
                  Subtotal: {subtotal}%
                </div>
              </div>
            );
          })}

          <div className="final-average">
            Quarter Average (Q{quarter}): {calculateFinal()}%
          </div>
        </div>
      </div>
    </div>
  );
}
