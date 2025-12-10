const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api/auth`;

export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });
    
    if (!res.ok) {
      let data = null;
      try { 
        data = await res.json(); 
      } catch { 
        data = null; 
      }
      const message = (data && (data.message || data.error)) || "Login failed";
      throw new Error(message);
    }
    
    const data = await res.json();
    console.log('Login response:', data);
    return data;
  } catch (e) {
    // If it's a network error (cannot connect to backend)
    if (e.message.includes("fetch") || e.name === "TypeError") {
      throw new Error("Failed to reach authentication API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
    }
    // Otherwise, re-throw the original error (like "Invalid credentials")
    throw e;
  }
}

export async function register(payload) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
    });
    
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    
    if (!res.ok) {
      const message = (data && (data.message || data.error)) || "Registration failed";
      throw new Error(message);
    }
    
    return data;
  } catch (e) {
    // If it's a network error (cannot connect to backend)
    if (e.message.includes("fetch") || e.name === "TypeError") {
      throw new Error("Failed to reach authentication API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
    }
    // Otherwise, re-throw the original error
    throw e;
  }
}

export async function updateUserRole(userId, role) {
  try {
    const res = await fetch(`${BASE_URL}/update-role?userId=${userId}&role=${role}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    
    if (!res.ok) {
      let data = null;
      try { 
        data = await res.json(); 
      } catch { 
        data = null; 
      }
      const message = (data && (data.message || data.error)) || "Role update failed";
      throw new Error(message);
    }
    
    return res.json();
  } catch (e) {
    if (e.message.includes("fetch") || e.name === "TypeError") {
      throw new Error("Failed to update role. Check backend connection.");
    }
    throw e;
  }
}

export async function registerTeacher(payload) {
  try {
    const res = await fetch(`${BASE_URL}/register-teacher`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (!res.ok) {
      const message = (data && (data.message || data.error)) || "Teacher registration failed";
      throw new Error(message);
    }
    return data;
  } catch (e) {
    if (e.message.includes("fetch") || e.name === "TypeError") {
      throw new Error("Failed to reach authentication API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
    }
    throw e;
  }
}

export async function registerParent(payload) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "cors",
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (!res.ok) {
      const message = (data && (data.message || data.error)) || "Parent registration failed";
      throw new Error(message);
    }
    return data;
  } catch (e) {
    if (e.message.includes("fetch") || e.name === "TypeError") {
      throw new Error("Failed to reach authentication API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
    }
    throw e;
  }
}

export async function validateStudentNumber(student_number) {
  try {
    const res = await fetch(`${BASE_URL}/validate-student-number`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_number }),
      mode: "cors",
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (!res.ok) {
      const message = (data && (data.message || data.error)) || "Validation failed";
      const err = new Error(message);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } catch (e) {
    if (e.message.includes("fetch") || e.name === "TypeError") {
      throw new Error("Failed to reach authentication API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
    }
    throw e;
  }
}
