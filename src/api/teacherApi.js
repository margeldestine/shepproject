const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8080";
const BASE_URL = `${API_ROOT}/api/teacher`;

export async function getTeacherData() {
  try {
    const res = await fetch(BASE_URL, { mode: "cors" });
    return res.json();
  } catch (e) {
    throw new Error("Failed to reach teacher API. Start backend on " + API_ROOT + " or set REACT_APP_API_URL.");
  }
}
