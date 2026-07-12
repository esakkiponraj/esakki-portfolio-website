// Run with: npm run seed
// Creates the admin login (from .env) and pre-fills the database with
// content matching the resume, so the CMS has real data to start from
// instead of empty collections.
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Achievement = require('../models/Achievement');
const SocialLink = require('../models/SocialLink');
const ContactInfo = require('../models/ContactInfo');

async function seed() {
  await connectDB();

  // --- Admin ---
  const adminEmail = (process.env.ADMIN_EMAIL || 'mesakkiponraj@gmail.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123';

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await Admin.create({ email: adminEmail, passwordHash });
    console.log(`Admin created: ${adminEmail} (password from .env — change it after first login)`);
  } else {
    console.log('Admin already exists, skipping.');
  }

  // --- Profile (singleton) ---
  const profileExists = await Profile.findOne();
  if (!profileExists) {
    await Profile.create({
      name: 'Esakki Ponraj M',
      title: 'Full Stack Developer',
      taglines: ['Full Stack Developer', 'MERN Stack Developer', 'React Developer', 'Backend Developer'],
      summary:
        'Full Stack Developer with practical experience in Next.js, React.js, Node.js, PostgreSQL, and MongoDB. Proficient in developing scalable web applications, RESTful APIs, and responsive user interfaces.',
      email: 'mesakkiponraj@gmail.com',
      phone: '+91 9342520682',
      location: 'Cheranmahadevi, Tirunelveli, Tamil Nadu, India',
      status: 'Available For Work',
    });
    console.log('Profile seeded.');
  }

  // --- Contact Info (singleton) ---
  const contactInfoExists = await ContactInfo.findOne();
  if (!contactInfoExists) {
    await ContactInfo.create({
      phone: '+91 9342520682',
      email: 'mesakkiponraj@gmail.com',
      address: 'Cheranmahadevi, Tirunelveli, Tamil Nadu, India',
    });
    console.log('Contact info seeded.');
  }

  // --- Education ---
  if ((await Education.countDocuments()) === 0) {
    await Education.insertMany([
      {
        degree: 'Bachelor of Computer Science and Engineering',
        institution: 'SCAD College of Engineering & Technology',
        duration: '2023 – 2027',
        grade: 'CGPA: 7.60',
        order: 0,
      },
      {
        degree: 'Higher Secondary Education',
        institution: 'Sivanthi Matric. Hr. Sec. School',
        duration: '2022 – 2023',
        grade: 'Score: 65%',
        order: 1,
      },
    ]);
    console.log('Education seeded.');
  }

  // --- Experience ---
  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany([
      {
        role: 'Full-Stack Developer Intern – IBM Cognos Analytics',
        company: 'Adroit Technologies Innovative Solutions Pvt. Ltd.',
        location: 'Remote',
        duration: 'March 2026 – April 2026',
        responsibilities: [
          'Developed responsive user interfaces using React.js and integrated RESTful APIs for seamless data communication',
          'Built server-side functionality using Node.js and MongoDB, ensuring efficient data management and application performance',
        ],
        order: 0,
      },
      {
        role: 'Full-Stack Developer Intern',
        company: 'Infosys Springboard',
        location: 'Remote',
        duration: 'November 2025 – January 2026',
        responsibilities: [
          'Collaborated with a team to build CleanStreet: Civic Issue Reporting & Tracking App using React.js, Node.js, MongoDB, and RESTful APIs',
          'Developed responsive front-end, scalable server-side logic, and managed database operations',
        ],
        order: 1,
      },
      {
        role: 'Full-Stack Developer Intern',
        company: 'Digisailor',
        location: 'Tirunelveli, India',
        duration: 'January 2025 – February 2025',
        responsibilities: [
          'Developed and deployed full-stack applications using Next.js, Node.js, PostgreSQL, and Prisma with RESTful APIs',
          'Collaborated in Agile teams for sprint planning, code reviews, and maintaining code quality',
        ],
        order: 2,
      },
      {
        role: 'Full-Stack Developer Intern',
        company: 'NeuralSchema Infotech Pvt. Ltd.',
        location: 'Tirunelveli, India',
        duration: 'December 2024 – January 2025',
        responsibilities: [
          'Built full-stack web applications using React.js, Tailwind CSS, Node.js, Express.js, and MongoDB',
          'Designed responsive UIs, implemented RESTful APIs, and optimized performance',
        ],
        order: 3,
      },
    ]);
    console.log('Experience seeded.');
  }

  // --- Projects ---
  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        name: 'Admission Website — SCAD College of Engineering',
        description:
          'A complete admission management system with online forms, real-time validation, and academic program comparison, plus a staff-facing admin dashboard.',
        technologies: ['Next.js', 'Node.js', 'Tailwind CSS'],
        features: [
          'Online admission forms with real-time validation',
          'Academic program comparison tool',
          'Admin dashboard to review applications and monitor metrics',
        ],
        liveLink: 'https://scaddigital.org',
        category: ['fullstack', 'featured'],
        order: 0,
      },
      {
        name: '360° Virtual Campus Tour — SCAD College',
        description:
          'An interactive virtual campus experience using 360-degree panoramic visuals with smooth navigation controls.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        features: ['360-degree panoramic navigation', 'Optimized loading for high-quality images'],
        liveLink: 'https://scad-campustour.org',
        category: ['frontend', 'featured'],
        order: 1,
      },
      {
        name: 'CSE Symposium Event Website',
        description:
          'A responsive event platform with online registration and automated email confirmations.',
        technologies: ['Next.js', 'Node.js', 'Tailwind CSS'],
        features: ['Online event registration with automated email confirmation', 'Event schedule and speaker profile sections'],
        category: ['fullstack'],
        order: 2,
      },
    ]);
    console.log('Projects seeded.');
  }

  // --- Skills ---
  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany([
      { name: 'React.js', category: 'Frontend', level: 90, order: 0 },
      { name: 'Next.js', category: 'Frontend', level: 85, order: 1 },
      { name: 'JavaScript', category: 'Frontend', level: 88, order: 2 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 88, order: 3 },
      { name: 'Node.js', category: 'Backend', level: 85, order: 0 },
      { name: 'Express.js', category: 'Backend', level: 80, order: 1 },
      { name: 'MongoDB', category: 'Database', level: 82, order: 0 },
      { name: 'PostgreSQL', category: 'Database', level: 78, order: 1 },
      { name: 'Prisma', category: 'Database', level: 75, order: 2 },
      { name: 'Git', category: 'Tools', level: 85, order: 0 },
      { name: 'Figma', category: 'Tools', level: 70, order: 1 },
    ]);
    console.log('Skills seeded.');
  }

  // --- Certificates ---
  if ((await Certificate.countDocuments()) === 0) {
    await Certificate.insertMany([
      {
        type: 'course',
        title: 'NPTEL Cybersecurity & Privacy',
        organization: 'NPTEL',
        description: 'Certification covering core cybersecurity and privacy principles.',
        order: 0,
      },
      {
        type: 'course',
        title: 'Typing Higher & Typing Lower',
        organization: 'Government Technical Examination',
        description: 'Certified proficiency in typing speed and accuracy.',
        order: 1,
      },
    ]);
    console.log('Certificates seeded.');
  }

  // --- Achievements ---
  if ((await Achievement.countDocuments()) === 0) {
    await Achievement.insertMany([
      { title: '3rd Place & Cash Prize — Non-Technical Event', description: 'Secured 3rd place at GCE, Tirunelveli.', order: 0 },
      { title: 'Paper Presentations', description: 'Presented papers at GCE, NEC, and AAA College of Engineering.', order: 1 },
      { title: 'Hackathons & Coding Competitions', description: 'Active participant in workshops, hackathons, and coding competitions.', order: 2 },
    ]);
    console.log('Achievements seeded.');
  }

  // --- Social Links ---
  if ((await SocialLink.countDocuments()) === 0) {
    await SocialLink.insertMany([
      { platform: 'email', url: 'mailto:mesakkiponraj@gmail.com' },
      // TODO: add real GitHub / LinkedIn URLs here or via the admin panel
      { platform: 'github', url: '#' },
      { platform: 'linkedin', url: '#' },
    ]);
    console.log('Social links seeded (add real GitHub/LinkedIn URLs via the admin panel).');
  }

  console.log('\nSeed complete.');
  console.log(`Admin login → email: ${adminEmail} | password: ${adminPassword}`);
  console.log('Change the password after your first login.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
