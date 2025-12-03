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
      try { data = await res.json(); } catch { data = null; }
      const message = (data && (data.message || data.error)) || "Login failed";
      throw new Error(message);
    }
    const data = await res.json();
    console.log('Login response:', data); // DEBUG - check what backend returns
    return data;
  } catch (e) {
    throw new Error("Failed to reach authentication API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
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
    throw new Error("Failed to reach authentication API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
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
      try { data = await res.json(); } catch { data = null; }
      const message = (data && (data.message || data.error)) || "Role update failed";
      throw new Error(message);
    }
    return res.json();
  } catch (e) {
    throw new Error("Failed to update role. Check backend connection.");
  }
}