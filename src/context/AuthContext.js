import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStudentData } from '../api/studentApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
  }, []);

  const loginUser = (authData) => {
    let prev = null;
    try { prev = JSON.parse(localStorage.getItem('user') || 'null'); } catch { prev = null; }
    const userIdValue = authData.userId || authData.user_id || authData.id || (prev && (prev.userId || prev.user_id || prev.id));
    const userData = {
      userId: userIdValue,
      email: authData.email || authData.user?.email || (prev && prev.email),
      firstName: authData.firstName || authData.user?.firstName || authData.firstname || authData.first_name || (prev && prev.firstName),
      lastName: authData.lastName || authData.user?.lastName || authData.lastname || authData.last_name || (prev && prev.lastName),
      role: (authData.role || authData.user?.role || (prev && prev.role) || "").toString(),
      parentId: authData.parentId || authData.parent_id || (prev && (prev.parentId || prev.parent_id)),
      studentId: authData.studentId || authData.student_id || authData.student?.id || authData.student?.student_id || (prev && (prev.studentId || prev.student_id)),
      studentNumber: authData.studentNumber || authData.student_number || authData.student?.student_number || (prev && (prev.studentNumber || prev.student_number)),
      studentFirstName: authData.studentFirstName || authData.student_first_name || authData.student?.first_name || authData.student?.firstName || (prev && prev.studentFirstName),
      studentLastName: authData.studentLastName || authData.student_last_name || authData.student?.last_name || authData.student?.lastName || (prev && prev.studentLastName),
      studentGradeLevel: authData.studentGradeLevel || authData.student_grade_level || authData.student?.gradeLevel || authData.student?.grade_level || (prev && prev.studentGradeLevel),
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userIdValue) {
      localStorage.setItem('userId', userIdValue.toString());
    }

    const roleValue = (userData.role || '').toString().toUpperCase();
    const needsStudentName = roleValue.includes('PARENT') && !userData.studentFirstName && !userData.studentLastName;
    const sid = userData.studentId;
    const snum = (userData.studentNumber || '').toString().trim();
    if (needsStudentName && (sid || snum)) {
      (async () => {
        try {
          const list = await getStudentData();
          const match = Array.isArray(list)
            ? list.find(s => {
                const sidMatch = sid ? Number(s.student_id || s.id) === Number(sid) : false;
                const snMatch = snum ? String(s.student_number || '').trim() === snum : false;
                return sidMatch || snMatch;
              })
            : null;
          if (match) {
            const enriched = {
              ...userData,
              studentFirstName: match.first_name || match.studentFirstName || userData.studentFirstName,
              studentLastName: match.last_name || match.studentLastName || userData.studentLastName,
              studentGradeLevel: match.grade_level || match.studentGradeLevel || userData.studentGradeLevel,
            };
            setUser(enriched);
            localStorage.setItem('user', JSON.stringify(enriched));
          }
        } catch {}
      })();
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('selectedRole');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
