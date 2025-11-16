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
    preview: "We invite all parents to attend our quarterly Parent-Teacher Meeting to discuss student progress. This meeting provides an opportunity ",
    full: "We invite all parents to attend our quarterly Parent-Teacher Meeting to discuss student progress. This meeting provides an opportunity for parents and teachers to come together, review each student’s academic performance, behavior, and overall development. Participants can address any concerns, celebrate achievements, set goals for the upcoming term, and strengthen the partnership between home and school to support every student’s growth and success. Active participation is encouraged to ensure that each child receives the guidance and support they need to thrive both academically and personally.",
  }),
  createAnnouncement({
    id: 2,
    title: "First Grading Exams",
    date: "September 28–30, 2025",
    preview: "The first grading examinations are scheduled to take place from September 28 to September 30. Teachers will provide detailed coverage for each subject, outlining the",
    full: "The first grading examinations are scheduled to take place from September 28 to September 30. Teachers will provide detailed coverage for each subject, outlining the specific topics and areas that will be included in the exams. Students are encouraged to review these guidelines thoroughly to plan their study time effectively, and parents are invited to support their children in preparing for the assessments. This advance notice ensures that both students and parents are well-informed and ready for a smooth and organized examination period.",
  }),
  createAnnouncement({
    id: 3,
    title: "Science Fair",
    date: "October 12, 2025",
    preview: "The annual Science Fair is scheduled for October 12, providing students with the opportunity to showcase their creativity, critical thinking, and scientific skills.",
    full: "The annual Science Fair is scheduled for October 12, providing students with the opportunity to showcase their creativity, critical thinking, and scientific skills. Participants may work on their projects individually or in groups, allowing for collaboration and shared learning experiences. All students interested in presenting their projects must complete registration by October 5 to ensure proper organization and preparation for the event.",
  }),
  createAnnouncement({
    id: 4,
    title: "Reading Week",
    date: "October 20–24, 2025",
    preview: "Reading Week will take place from October 20 to October 24 and is designed to promote a love for reading among students of all grade levels. Throughout the week, there will",
    full: "Reading Week will take place from October 20 to October 24 and is designed to promote a love for reading among students of all grade levels. Throughout the week, there will be a variety of daily activities, including storytelling sessions, book discussions, and interactive reading challenges, aimed at engaging students in fun and educational ways. A recommended reading list will be provided for each grade level to guide students in exploring different genres and authors.",
  }),
  createAnnouncement({
    id: 5,
    title: "Math Challenge",
    date: "November 3, 2025",
    preview: "Students are invited to register for the inter-class Math Challenge, an exciting competition designed to test problem-solving skills, speed, and mathematical reasoning.",
    full: "Students are invited to register for the inter-class Math Challenge, an exciting competition designed to test problem-solving skills, speed, and mathematical reasoning. Registration is open to all interested students who wish to represent their class and showcase their abilities. The elimination rounds will begin on November 10, where participants will compete to advance to the next stages of the challenge. This event encourages healthy competition, teamwork, and the development of critical thinking skills, while providing an engaging and fun opportunity for students to apply their knowledge of mathematics in a competitive setting.",
  }),
  createAnnouncement({
    id: 6,
    title: "Founder's Day",
    date: "December 6, 2025",
    preview: "Program and participation guidelines.",
    full: "Founder's Day program details including student participation guidelines will be released next week.",
  }),
];