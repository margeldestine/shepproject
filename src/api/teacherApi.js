const BASE_URL = "http://localhost:8080/api/teacher";

export async function getTeacherByUserId(userId) {
  const res = await fetch(`${BASE_URL}/getTeacherByUserId/${userId}`);
  if (!res.ok) {
    throw new Error('Teacher not found');
  }
  return res.json();
}