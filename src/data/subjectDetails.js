export const subjectDetails = {
  filipino: {
    title: "Filipino",
    items: [
      { item: "Quiz on Filipino Grammar", date: "9/18/2025", grade: 28, range: "0–30", remarks: "PASSED" },
      { item: "Quiz on Filipino Vocabulary", date: "9/20/2025", grade: 13, range: "0–30", remarks: "FAILED" },
      { item: "Oral on Filipino Culture", date: "9/23/2025", grade: 29, range: "0–30", remarks: "PASSED" },
    ],
  },
  english: {
    title: "English",
    items: [
      { item: "Reading Comprehension Quiz", date: "9/10/2025", grade: 25, range: "0–30", remarks: "PASSED" },
      { item: "Grammar Exercise", date: "9/14/2025", grade: 27, range: "0–30", remarks: "PASSED" },
      { item: "Vocabulary Quiz", date: "9/22/2025", grade: 24, range: "0–30", remarks: "PASSED" },
    ],
  },
  mathematics: {
    title: "Mathematics",
    items: [
      { item: "Algebra Quiz", date: "9/09/2025", grade: 26, range: "0–30", remarks: "PASSED" },
      { item: "Geometry Exercise", date: "9/16/2025", grade: 23, range: "0–30", remarks: "PASSED" },
      { item: "Statistics Quiz", date: "9/24/2025", grade: 28, range: "0–30", remarks: "PASSED" },
    ],
  },
  science: {
    title: "Science",
    items: [
      { item: "Biology Lab", date: "9/08/2025", grade: 27, range: "0–30", remarks: "PASSED" },
      { item: "Chemistry Quiz", date: "9/15/2025", grade: 25, range: "0–30", remarks: "PASSED" },
      { item: "Physics Exercise", date: "9/26/2025", grade: 26, range: "0–30", remarks: "PASSED" },
    ],
  },
  "araling-panlipunan": {
    title: "Araling Panlipunan",
    items: [
      { item: "History Quiz", date: "9/12/2025", grade: 26, range: "0–30", remarks: "PASSED" },
      { item: "Geography Exercise", date: "9/18/2025", grade: 25, range: "0–30", remarks: "PASSED" },
    ],
  },
  esp: {
    title: "EsP",
    items: [
      { item: "Values Reflection", date: "9/07/2025", grade: 29, range: "0–30", remarks: "PASSED" },
      { item: "Community Service Log", date: "9/21/2025", grade: 28, range: "0–30", remarks: "PASSED" },
    ],
  },
  tle: {
    title: "TLE",
    items: [
      { item: "Practical Task", date: "9/11/2025", grade: 30, range: "0–30", remarks: "PASSED" },
      { item: "Written Exam", date: "9/25/2025", grade: 27, range: "0–30", remarks: "PASSED" },
    ],
  },
  rhgp: {
    title: "RHGP",
    items: [
      { item: "Health Awareness Quiz", date: "9/05/2025", grade: 30, range: "0–30", remarks: "PASSED" },
      { item: "Guidance Interview", date: "9/19/2025", grade: 30, range: "0–30", remarks: "PASSED" },
    ],
  },
};

export const subjectSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-");