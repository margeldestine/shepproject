const BASE_URL = "http://localhost:8080/api/teacher";

export async function getTeacherData() {
  const res = await fetch(BASE_URL);
  return res.json();
}

