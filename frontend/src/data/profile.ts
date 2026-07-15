// ============================================================
// All portfolio content lives here. Edit this file to update
// anything on the site — no need to touch component code.
// (Later, this file gets replaced by data fetched from the
// admin CMS backend — see backend/README.md)
// ============================================================

<<<<<<< HEAD
// Imported (not referenced as a raw "/src/..." string) so Vite bundles,
// hashes, and cache-optimizes it correctly in production builds — this
// is what lets the photo render instantly on first paint instead of
// depending entirely on the backend profile fetch to complete first.
import profilePhoto from '../assets/profile.jpg';

=======
>>>>>>> b88448106517b65e870144745704448afacf9667
export const personalInfo = {
  name: "Esakki Ponraj M",
  title: "Full Stack Developer",
  taglines: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Backend Developer",
  ],
  email: "mesakkiponraj@gmail.com",
  phone: "+91 9342520682",
  location: "Cheranmahadevi, Tirunelveli, Tamil Nadu, India",
  status: "Available For Work",
  summary:
    "Full Stack Developer with practical experience in Next.js, React.js, Node.js, PostgreSQL, and MongoDB. Proficient in developing scalable web applications, RESTful APIs, and responsive user interfaces. Experienced in collaborating within agile teams, following best practices in code quality, version control, and agile methodologies to deliver reliable, high-quality solutions.",
<<<<<<< HEAD
  photo: profilePhoto,
=======
  photo: "/src/assets/profile.jpg",
>>>>>>> b88448106517b65e870144745704448afacf9667
  resumeUrl: "/resume.pdf",
  socials: {
    github: "#", // TODO: add your GitHub profile URL
    linkedin: "#", // TODO: add your LinkedIn profile URL
    email: "mailto:mesakkiponraj@gmail.com",
  },
};

export const stats = [
  { label: "Internships Completed", value: 4, suffix: "" },
  { label: "Live Projects", value: 3, suffix: "+" },
  { label: "Certifications", value: 2, suffix: "" },
  { label: "Years Coding", value: 2, suffix: "+" },
];

export const education = [
  {
    degree: "Bachelor of Computer Science and Engineering",
    institution: "SCAD College of Engineering & Technology",
    duration: "2023 – 2027",
    grade: "CGPA: 7.60",
    description:
      "Pursuing a comprehensive curriculum in computer science fundamentals, software engineering, and full-stack web development.",
  },
  {
    degree: "Higher Secondary Education",
    institution: "Sivanthi Matric. Hr. Sec. School",
    duration: "2022 – 2023",
    grade: "Score: 65%",
    description: "Completed higher secondary education with a focus on core academics.",
  },
];

export const experience = [
  {
    role: "Full-Stack Developer Intern – IBM Cognos Analytics",
    company: "Adroit Technologies Innovative Solutions Pvt. Ltd.",
    location: "Remote",
    duration: "March 2026 – April 2026",
    responsibilities: [
      "Developed responsive user interfaces using React.js and integrated RESTful APIs for seamless data communication",
      "Built server-side functionality using Node.js and MongoDB, ensuring efficient data management and application performance",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Infosys Springboard",
    location: "Remote",
    duration: "November 2025 – January 2026",
    responsibilities: [
      "Collaborated with a team to build CleanStreet: Civic Issue Reporting & Tracking App using React.js, Node.js, MongoDB, and RESTful APIs",
      "Developed responsive front-end, scalable server-side logic, and managed database operations for efficient civic issue tracking",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Digisailor",
    location: "Tirunelveli, India",
    duration: "January 2025 – February 2025",
    responsibilities: [
      "Developed and deployed full-stack applications using Next.js, Node.js, PostgreSQL, and Prisma with RESTful APIs",
      "Collaborated in Agile teams for sprint planning, code reviews, and maintaining code quality and scalability",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "NeuralSchema Infotech Pvt. Ltd.",
    location: "Tirunelveli, India",
    duration: "December 2024 – January 2025",
    responsibilities: [
      "Built full-stack web applications using React.js, Tailwind CSS, Node.js, Express.js, and MongoDB",
      "Designed responsive UIs, implemented RESTful APIs, and optimized performance through debugging and code optimization",
    ],
  },
];

export type ProjectCategory = "frontend" | "backend" | "fullstack" | "featured";

export const projects: {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
<<<<<<< HEAD
  image?: string;
  link?: string;
  githubLink?: string;
=======
  link?: string;
>>>>>>> b88448106517b65e870144745704448afacf9667
  category: ProjectCategory[];
}[] = [
  {
    name: "Admission Website — SCAD College of Engineering",
    description:
      "A complete admission management system with online forms, real-time validation, and academic program comparison, plus a staff-facing admin dashboard.",
    technologies: ["Next.js", "Node.js", "Tailwind CSS"],
    features: [
      "Online admission forms with real-time validation",
      "Academic program comparison tool",
      "Admin dashboard to review applications and monitor metrics",
      "Direct applicant communication from the dashboard",
    ],
    link: "https://scaddigital.org",
    category: ["fullstack", "featured"],
  },
  {
    name: "360° Virtual Campus Tour — SCAD College",
    description:
      "An interactive virtual campus experience using 360-degree panoramic visuals with smooth, intuitive navigation controls.",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "360-degree panoramic navigation",
      "Optimized loading for high-quality images",
      "Smooth cross-device performance",
    ],
    link: "https://scad-campustour.org",
    category: ["frontend", "featured"],
  },
  {
    name: "CSE Symposium Event Website",
    description:
      "A responsive event platform with online registration and automated email confirmations for a college-level technical symposium.",
    technologies: ["Next.js", "Node.js", "Tailwind CSS"],
    features: [
      "Online event registration with automated email confirmation",
      "Event schedule and speaker profile sections",
      "Venue information and interactive layout",
    ],
    category: ["fullstack"],
  },
];

export const skillCategories: {
  category: string;
  skills: { name: string; level: number }[];
}[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript", level: 88 },
      { name: "HTML / CSS", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "RESTful APIs", level: 85 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "Prisma", level: 75 },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Python", level: 70 },
      { name: "Java", level: 65 },
      { name: "C", level: 60 },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "Figma", level: 70 },
      { name: "IBM Cognos Analytics", level: 65 },
    ],
  },
];

export const certificates = [
  {
    type: "course",
    title: "NPTEL Cybersecurity & Privacy",
    organization: "NPTEL",
    description: "Certification covering core cybersecurity and privacy principles.",
  },
  {
    type: "course",
    title: "Typing Higher & Typing Lower",
    organization: "Government Technical Examination",
    description: "Certified proficiency in typing speed and accuracy.",
  },
];

export const achievements = [
  {
    title: "3rd Place & Cash Prize — Non-Technical Event",
    description: "Secured 3rd place at GCE, Tirunelveli in a non-technical event.",
  },
  {
    title: "Paper Presentations",
    description: "Presented papers at GCE, NEC, and AAA College of Engineering.",
  },
  {
    title: "Hackathons & Coding Competitions",
    description: "Active participant in technical workshops, hackathons, and college-level coding competitions.",
  },
];

export const languages = ["English", "Tamil"];

export const services = [
  { title: "Frontend Development", description: "Building fast, responsive interfaces with React and Next.js." },
  { title: "Backend Development", description: "Designing reliable server-side logic with Node.js and Express." },
  { title: "REST APIs", description: "Building clean, well-documented APIs for web and mobile clients." },
  { title: "Database Design", description: "Structuring data with MongoDB and PostgreSQL for scale and speed." },
  { title: "Responsive UI Design", description: "Interfaces that work smoothly across every screen size." },
  { title: "Performance Optimization", description: "Debugging and tuning applications for real-world speed." },
];
