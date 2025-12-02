const BASE_URL = "http://localhost:8080/api/student";

export async function getStudentData() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createStudent(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

