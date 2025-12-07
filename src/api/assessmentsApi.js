const BASE_URL = "http://localhost:8080/api/grades";

export async function getDetailedGrades(studentId, subjectId, quarter) {
  const res = await fetch(
    `${BASE_URL}/student/${studentId}/subject/${subjectId}/quarter/${quarter}`
  );
  if (!res.ok) throw new Error("Failed to fetch detailed grades");
  return res.json();
}

export async function calculateQuarterGrade(studentId, subjectId, quarter) {
  const res = await fetch(
    `${BASE_URL}/calculate/${studentId}/${subjectId}/${quarter}`
  );
  if (!res.ok) throw new Error("Failed to calculate grade");
  return res.json();
}

export async function createAssessment(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create assessment");
  return res.json();
}