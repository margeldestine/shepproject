const createAnnouncement = ({ id, title, date, preview, full }) => {
  if (typeof id !== "number") throw new Error("announcement id must be a number");
  if (!title || !date || !preview || !full) throw new Error("announcement has missing fields");
  return { id, title, date, preview, full };
};

export const announcements = [
  createAnnouncement({
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "September 15, 2025",
    preview: "Quarterly meeting to discuss student progress.",
    full: "Join the quarterly Parent-Teacher Meeting to discuss student progress, address concerns, and share upcoming plans for the term.",
  }),
  createAnnouncement({
    id: 2,
    title: "First Grading Exams",
    date: "September 28–30, 2025",
    preview: "Schedule and coverage for first grading examinations.",
    full: "First grading examinations will be held September 28–30. Detailed coverage per subject will be posted by teachers.",
  }),
  createAnnouncement({
    id: 3,
    title: "Science Fair",
    date: "October 12, 2025",
    preview: "School-wide science fair details and registration.",
    full: "The annual Science Fair is on October 12. Projects can be individual or group; registration closes October 5.",
  }),
  createAnnouncement({
    id: 4,
    title: "Reading Week",
    date: "October 20–24, 2025",
    preview: "Activities and recommended reading list.",
    full: "Reading Week runs October 20–24 with daily activities and a recommended reading list for all grade levels.",
  }),
  createAnnouncement({
    id: 5,
    title: "Math Challenge",
    date: "November 3, 2025",
    preview: "Registration opens for inter-class math challenge.",
    full: "Students may register for the inter-class Math Challenge. Eliminations begin November 10.",
  }),
  createAnnouncement({
    id: 6,
    title: "Founder's Day",
    date: "December 6, 2025",
    preview: "Program and participation guidelines.",
    full: "Founder's Day program details including student participation guidelines will be released next week.",
  }),
];