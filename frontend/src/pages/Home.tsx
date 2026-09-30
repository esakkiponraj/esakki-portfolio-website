import './homepage.css';
import { NavLink } from 'react-router-dom';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi';
import {
  FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaHtml5, FaCss3Alt,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiMongodb, SiPostgresql, SiExpress, SiTailwindcss, SiJavascript, SiTypescript,
} from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { services } from '../data/profile';
import { usePortfolioData } from '../context/PortfolioDataContext';
import ProfilePhoto from '../components/ProfilePhoto';

/* ─── Typing effect ─────────────────────────────────────────── */
function useTypingEffect(words: string[], speed = 80, pause = 1600) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

/* ─── Animated stat counter ─────────────────────────────────── */
function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <>{count}{suffix}</>;
}

/* ─── Tech strip items ─────────────────────────────────────── */
const TECH_ITEMS = [
  { label: 'React.js', Icon: FaReact },
  { label: 'Next.js', Icon: SiNextdotjs },
  { label: 'JavaScript', Icon: SiJavascript },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'Node.js', Icon: FaNodeJs },
  { label: 'Express.js', Icon: SiExpress },
  { label: 'MongoDB', Icon: SiMongodb },
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'Tailwind CSS', Icon: SiTailwindcss },
  { label: 'HTML5', Icon: FaHtml5 },
  { label: 'CSS3', Icon: FaCss3Alt },
  { label: 'Git', Icon: FaGitAlt },
];

/* ─── Nav links ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: false },
  { to: '/skills', label: 'Skills', end: false },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/certificates', label: 'Certificates', end: false },
  { to: '/education', label: 'Education', end: false },
  { to: '/experience', label: 'Experience', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

/* ─── Section heading ───────────────────────────────────────── */
function HPHeading({ eyebrow, title, center = true }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`hp-heading-wrap ${center ? 'center' : ''}`}
    >
      <span className="hp-eyebrow">{eyebrow}</span>
      <h2 className="hp-heading">{title}</h2>
      <hr className="hp-rule" />
    </motion.div>
  );
}

/* ─── SERVICE ICON MAP ──────────────────────────────────────── */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'Frontend Development': <FaReact />,
  'Backend Development': <FaNodeJs />,
  'REST APIs': <FaDatabase />,
  'Database Design': <SiMongodb />,
  'Responsive UI Design': <SiTailwindcss />,
  'Performance Optimization': <FaGitAlt />,
};

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { personalInfo, stats, projects, skillCategories, loading } = usePortfolioData();
  const typed = useTypingEffect(personalInfo.taglines);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 20;
          setScrolled((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featuredProjects = projects.filter((p) => p.category.includes('featured'));

  /* Derive a flat skill list for the tech strip; fall back to TECH_ITEMS when loading */
  const allSkillNames = skillCategories.flatMap((cat) => cat.skills.map((s) => s.name));

  return (
    <div className="hp-root">
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <header className={`hp-header ${scrolled ? 'is-scrolled' : ''}`}>
        {/* ── Full-width bar (Always on mobile; hides on desktop when scrolled) ── */}
        <div className={`hp-nav-bar ${scrolled ? 'is-scrolled hide-on-desktop-scroll' : ''}`}>
          <div className="hp-nav-inner">
            <NavLink to="/" className="hp-nav-logo">Esakki<span>.</span></NavLink>

            <ul className="hp-nav-links">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end}
                    className={({ isActive }) => `hp-nav-link${isActive ? ' active' : ''}`}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hp-nav-actions">
              <a href={personalInfo.resumeUrl} download id="nav-resume-download" className="hp-btn-ghost">
                <FiDownload size={13} /> Resume
              </a>
              <NavLink to="/contact" className="hp-btn-solid" id="nav-hire-me">Hire Me</NavLink>
            </div>

            <button className="hp-nav-hamburger" onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle mobile menu" id="nav-mobile-toggle">
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Floating pill (after scroll — strictly desktop/laptop only via .hp-floating-nav) ── */}
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hp-floating-nav"
            style={{
              background: '#ffffff',
              border: '1px solid #D6E4F0',
              borderRadius: 100,
              boxShadow: '0 4px 24px rgba(52,84,116,0.14)',
              padding: '0.45rem 1.25rem',
              alignItems: 'center',
              gap: '0.5rem',
              pointerEvents: 'auto',
              maxWidth: 920,
              width: '100%',
            }}
          >
            <NavLink to="/" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1rem', color: '#202A35', textDecoration: 'none', marginRight: '0.75rem', whiteSpace: 'nowrap' }}>
              Esakki<span style={{ color: '#345474' }}>.</span>
            </NavLink>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              {NAV_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end}
                  style={({ isActive }) => ({
                    padding: '0.3rem 0.65rem', fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#345474' : '#6B7480',
                    textDecoration: 'none', borderRadius: 100,
                    background: isActive ? '#EDF3F9' : 'transparent',
                    transition: 'color 0.2s, background 0.2s',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginLeft: '0.5rem' }}>
              <a href={personalInfo.resumeUrl} download
                style={{ padding: '0.32rem 0.75rem', fontSize: '0.78rem', fontWeight: 600, color: '#345474', border: '1px solid #B8D0E8', borderRadius: 100, textDecoration: 'none', background: '#EDF3F9', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <FiDownload size={11} /> Resume
              </a>
              <NavLink to="/contact"
                style={{ padding: '0.32rem 0.85rem', fontSize: '0.78rem', fontWeight: 600, color: '#fff', background: '#345474', borderRadius: 100, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Hire Me
              </NavLink>
            </div>
          </motion.div>
        )}

        {/* ── Mobile slide-down panel ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                position: 'fixed',
                top: '64px',
                left: '1rem',
                right: '1rem',
                background: '#fff',
                border: '1px solid #D6E4F0',
                borderRadius: 12,
                padding: '1rem',
                boxShadow: '0 8px 32px rgba(52,84,116,0.14)',
                zIndex: 55,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                pointerEvents: 'auto',
              }}
            >
              {NAV_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `hp-nav-mobile-link${isActive ? ' active' : ''}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <a href={personalInfo.resumeUrl} download
                className="hp-cta-secondary"
                style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                <FiDownload size={13} /> Download Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="hp-hero" aria-label="Introduction">
        <div className="hp-hero-grid">
          {/* LEFT: text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {personalInfo.status && (
              <div className="hp-hero-badge">
                <span className="hp-hero-badge-dot" />
                {personalInfo.status}
              </div>
            )}

            <h1 className="hp-hero-name" id="hero-name">
              {loading && !personalInfo.name ? (
                <span className="hp-skeleton" style={{ display: 'block', height: '3.4rem', width: '80%' }} />
              ) : (
                personalInfo.name
              )}
            </h1>

            <p className="hp-hero-role" id="hero-role">
              {typed}
              <span className="hp-hero-cursor" aria-hidden="true" />
            </p>

            <p className="hp-hero-summary" id="hero-summary">
              {loading && !personalInfo.summary ? (
                <>
                  <span className="hp-skeleton" style={{ display: 'block', height: '1rem', marginBottom: '0.4rem' }} />
                  <span className="hp-skeleton" style={{ display: 'block', height: '1rem', width: '90%', marginBottom: '0.4rem' }} />
                  <span className="hp-skeleton" style={{ display: 'block', height: '1rem', width: '75%' }} />
                </>
              ) : (
                personalInfo.summary
              )}
            </p>

            <div className="hp-hero-cta">
              <NavLink to="/projects" className="hp-cta-primary" id="hero-view-projects">
                View Projects <FiArrowRight size={14} />
              </NavLink>
              <a
                href={personalInfo.resumeUrl}
                download
                className="hp-cta-secondary"
                id="hero-download-resume"
              >
                <FiDownload size={14} /> Download Resume
              </a>
            </div>

            <div className="hp-hero-socials">
              {personalInfo.socials.github && personalInfo.socials.github !== '#' && (
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hp-social-link"
                  aria-label="GitHub profile"
                >
                  <FiGithub size={17} />
                </a>
              )}
              {personalInfo.socials.linkedin && personalInfo.socials.linkedin !== '#' && (
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hp-social-link"
                  aria-label="LinkedIn profile"
                >
                  <FiLinkedin size={17} />
                </a>
              )}
            </div>
          </motion.div>

          {/* RIGHT: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hp-hero-photo-wrap"
          >
            <div className="hp-hero-photo-inner">
              <ProfilePhoto
                src={personalInfo.photo}
                alt={`${personalInfo.name} profile photo`}
                className="w-full"
              />
              {/* floating status card */}
              <div className="hp-hero-float-card">
                <span className="hp-hero-badge-dot" />
                Available for opportunities
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STRIP ─────────────────────────────────────────── */}
      <div className="hp-tech-strip-wrapper">
        <p className="hp-tech-strip-label">Technologies I work with</p>
        <div className="hp-tech-strip">
          {TECH_ITEMS.map(({ label, Icon }) => (
            <motion.span
              key={label}
              className="hp-tech-pill"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Icon />
              {label}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── STATS BAND ─────────────────────────────────────────── */}
      <div className="hp-stats-band">
        <div className="hp-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="hp-stat-item">
              <div className="hp-stat-value">
                <AnimatedStat value={s.value} suffix={s.suffix} />
              </div>
              <div className="hp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <div className="hp-services-wrapper">
        <div className="hp-section">
          <HPHeading eyebrow="What I Do" title="Services" />
          <div className="hp-services-grid">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="hp-service-card"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="hp-service-icon">
                  {SERVICE_ICONS[s.title] ?? <FaReact />}
                </div>
                <h3 className="hp-service-title">{s.title}</h3>
                <p className="hp-service-desc">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED PROJECTS ──────────────────────────────────── */}
      <div className="hp-projects-wrapper">
        <div className="hp-section">
        <HPHeading eyebrow="Recent Work" title="Featured Projects" />
        {featuredProjects.length === 0 && loading ? (
          <div className="hp-projects-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="hp-project-card">
                <div className="hp-skeleton" style={{ height: '180px' }} />
                <div className="hp-project-body">
                  <div className="hp-skeleton" style={{ height: '1rem', marginBottom: '0.5rem' }} />
                  <div className="hp-skeleton" style={{ height: '0.875rem', width: '80%', marginBottom: '0.5rem' }} />
                  <div className="hp-skeleton" style={{ height: '0.875rem', width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="hp-projects-grid">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.name}
                className="hp-project-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {p.image ? (
                  <div className="hp-project-img">
                    <img src={p.image} alt={`${p.name} preview`} loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <div className="hp-project-img-fallback">
                    <span className="hp-project-img-fallback-icon">{'</>'}</span>
                  </div>
                )}
                <div className="hp-project-body">
                  <h3 className="hp-project-title">{p.name}</h3>
                  <p className="hp-project-desc">{p.description}</p>
                  <div className="hp-project-tags">
                    {p.technologies.map((t) => (
                      <span key={t} className="hp-project-tag">{t}</span>
                    ))}
                  </div>
                  {(p.link || p.githubLink) && (
                    <div className="hp-project-links">
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="hp-project-link">
                          <FiArrowRight size={13} /> Visit Site
                        </a>
                      )}
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="hp-project-link">
                          <FiGithub size={13} /> Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#6B7480' }}>No featured projects yet.</p>
        )}

        <div className="hp-view-all-wrap">
          <NavLink to="/projects" className="hp-cta-secondary" id="home-view-all-projects">
            View All Projects <FiArrowRight size={14} />
          </NavLink>
        </div>
        </div>
      </div>

      {/* ── WHY HIRE ME ────────────────────────────────────────── */}
      <div className="hp-why-wrapper">
        <div className="hp-section">
          <HPHeading eyebrow="Why Work With Me" title="Why Hire Me" />
          <div className="hp-why-grid">
            {[
              {
                n: '01',
                title: 'Real Internship Experience',
                desc: 'Four full-stack internships across MERN and Next.js/PostgreSQL stacks, working in real Agile teams.',
              },
              {
                n: '02',
                title: 'End-to-End Ownership',
                desc: 'Comfortable across the stack — from responsive UIs to REST APIs to database design and deployment.',
              },
              {
                n: '03',
                title: 'Fast, Clear Communicator',
                desc: 'Collaborates well in sprint planning and code reviews, with a focus on clean, maintainable code.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.n}
                className="hp-why-card"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="hp-why-num">{card.n}</div>
                <h3 className="hp-why-title">{card.title}</h3>
                <p className="hp-why-desc">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CURRENTLY LEARNING BAND ─────────────────────────────── */}
      <div className="hp-learning-band">
        <div className="hp-learning-inner">
          <span className="hp-learning-eyebrow">Always Growing</span>
          <h2 className="hp-learning-heading">Currently Learning</h2>
          <p className="hp-learning-text">
            Deepening expertise in system design, GraphQL, and cloud deployment — building on a
            strong foundation of React, Next.js, Node.js, MongoDB, and PostgreSQL.
          </p>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <div>
            <p className="hp-footer-logo">Esakki<span>.</span></p>
            <p className="hp-footer-tagline">
              {personalInfo.title} building scalable, responsive web applications.
            </p>
          </div>

          <div>
            <p className="hp-footer-col-title">Quick Links</p>
            <div className="hp-footer-links">
              <NavLink to="/about" className="hp-footer-link">About</NavLink>
              <NavLink to="/projects" className="hp-footer-link">Projects</NavLink>
              <NavLink to="/skills" className="hp-footer-link">Skills</NavLink>
              <NavLink to="/contact" className="hp-footer-link">Contact</NavLink>
            </div>
          </div>

          <div>
            <p className="hp-footer-col-title">Connect</p>
            <div className="hp-footer-socials">
              {personalInfo.socials.github && personalInfo.socials.github !== '#' && (
                <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer"
                  className="hp-footer-social" aria-label="GitHub">
                  <FiGithub size={16} />
                </a>
              )}
              {personalInfo.socials.linkedin && personalInfo.socials.linkedin !== '#' && (
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer"
                  className="hp-footer-social" aria-label="LinkedIn">
                  <FiLinkedin size={16} />
                </a>
              )}
              {personalInfo.socials.email && (
                <a href={personalInfo.socials.email} className="hp-footer-social" aria-label="Email">
                  <FiMail size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="hp-footer-bottom">
          © {new Date().getFullYear()} Designed & Developed by {personalInfo.name}
        </div>
      </footer>
    </div>
  );
}
