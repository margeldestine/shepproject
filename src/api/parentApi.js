const BASE_URL = "http://localhost:8080/api/parent";

export async function getParentData() {
  const res = await fetch(BASE_URL);
  return res.json();
}

