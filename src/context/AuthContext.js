import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const loginUser = (authData) => {
    const extracted = [];
    if (authData?.role) extracted.push(authData.role);
    if (Array.isArray(authData?.roles)) extracted.push(
      ...authData.roles.map((r) => (typeof r === "string" ? r : r?.name))
    );
    if (Array.isArray(authData?.authorities)) extracted.push(
      ...authData.authorities.map((a) => (typeof a === "string" ? a : a?.authority))
    );
    const all = extracted.filter(Boolean).map((v) => String(v).trim().toUpperCase());
    let selectedRole = "";
    try { selectedRole = String(localStorage.getItem("selectedRole") || "").trim().toUpperCase(); } catch {}
    const payloadStr = JSON.stringify(authData || {}).toUpperCase();
    const payloadTeacher = payloadStr.includes("TEACH");
    const payloadParent = payloadStr.includes("PARENT") || payloadStr.includes("GUARDIAN");
    const rolePref = selectedRole === "TEACHER" || payloadTeacher || all.some((v) => v.includes("TEACH") || v.includes("STAFF") || v.includes("FACULTY"))
      ? "TEACHER"
      : selectedRole === "PARENT" || payloadParent || all.some((v) => v.includes("PARENT") || v.includes("GUARDIAN"))
      ? "PARENT"
      : String(extracted[0] || "").trim().toUpperCase();
    const normalized = {
      ...authData,
      role: rolePref
    };
    setUser(normalized);
    localStorage.setItem("authUser", JSON.stringify(normalized));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
