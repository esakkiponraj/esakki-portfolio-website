import './public.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProfilePhoto from '../components/ProfilePhoto';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { handleResumeDownload } from '../utils/downloadResume';

const techStack = [
  'React', 'Next.js', 'Node.js', 'Express', 'MongoDB',
  'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Git', 'Figma', 'Prisma', 'REST APIs',
];

export default function About() {
  const { personalInfo, stats, photoReady } = usePortfolioData();

  return (
    <div className="pub-page">
      <div className="pub-container">
        {/* Header */}
        <motion.div
          className="pub-header"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pub-eyebrow">Get To Know Me</span>
          <h1 className="pub-title">About Me</h1>
          <hr className="pub-rule" />
        </motion.div>

        {/* Photo + summary */}
        <div className="pub-about-grid">
          <motion.div
            className="pub-about-photo"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
          >
            <ProfilePhoto src={personalInfo.photo} alt={personalInfo.name} className="w-full" loading={!photoReady} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {personalInfo.status && (
              <div className="pub-status-badge">
                <span className="pub-status-dot" />
                {personalInfo.status}
              </div>
            )}
            <h2 className="pub-about-summary-title">Professional Summary</h2>
            <p className="pub-about-summary-body">{personalInfo.summary}</p>
            <p className="pub-about-summary-body">
              Currently pursuing a Bachelor's in Computer Science and Engineering at SCAD College
              of Engineering & Technology (expected 2027), I've spent the past two years building
              production features across four internships — from civic-tech apps to enterprise
              analytics dashboards — while staying deeply involved in Agile teams, code reviews,
              and sprint planning.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <NavLink to="/experience" className="hp-cta-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem', borderRadius: 8, background: '#345474', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                View Experience <FiArrowRight size={13} />
              </NavLink>
              <a
                href={personalInfo.resumeUrl}
                download="Esakki_Ponraj_Resume.pdf"
                onClick={(e) => handleResumeDownload(e, personalInfo.resumeUrl)}
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem', borderRadius: 8, border: '1.5px solid #345474', color: '#345474', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats band */}
        <motion.div
          className="pub-stats-band"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          {stats.map(s => (
            <div key={s.label} className="pub-stat-item">
              <div className="pub-stat-value">{s.value}{s.suffix}</div>
              <div className="pub-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Tech stack */}
        <div className="pub-header center" style={{ marginBottom: '1.5rem' }}>
          <span className="pub-eyebrow">What I Work With</span>
          <h2 className="pub-title" style={{ fontSize: '1.5rem' }}>Tech Stack</h2>
          <hr className="pub-rule" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
          {techStack.map(tech => (
            <span key={tech} className="pub-tag" style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
