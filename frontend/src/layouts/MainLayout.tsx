import { useState, useEffect, ReactNode } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HireMeModal from '../components/HireMeModal';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { AnimatePresence, motion } from 'framer-motion';
import { handleResumeDownload } from '../utils/downloadResume';
import '../pages/public.css';

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

function PublicNavbar() {
  const { personalInfo } = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Floating appearance on scroll */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`pub-nav-header ${scrolled ? 'is-scrolled' : ''}`}>
      {/* Full-width strip (always on mobile; hides on desktop when scrolled) */}
      <div className={`pub-nav-bar ${scrolled ? 'is-scrolled hide-on-desktop-scroll' : ''}`}>
        <nav
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 2rem',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <NavLink
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.15rem', color: '#202A35', textDecoration: 'none', letterSpacing: '-0.02em' }}
          >
            Esakki<span style={{ color: '#345474' }}>.</span>
          </NavLink>

          <div className="pub-nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            {NAV_LINKS.map(l => (
              <NavLink
                key={l.to} to={l.to} end={l.end}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={({ isActive }) => ({
                  position: 'relative', padding: '0.4rem 0.7rem', fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#345474' : '#6B7480', textDecoration: 'none', borderRadius: 6,
                  transition: 'color 0.2s',
                })}
                className="pub-nav-link"
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="pub-nav-actions-desktop" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <a
              href={personalInfo.resumeUrl}
              download="Esakki_Ponraj_Resume.pdf"
              onClick={(e) => handleResumeDownload(e, personalInfo.resumeUrl)}
              style={{ padding: '0.38rem 0.85rem', fontSize: '0.85rem', fontWeight: 500, color: '#345474', border: '1px solid #345474', borderRadius: 6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', transition: 'background 0.2s,color 0.2s' }}
              className="pub-btn-ghost"
            >
              <FiDownload size={13} /> Resume
            </a>
            <NavLink to="/contact" style={{ padding: '0.38rem 0.85rem', fontSize: '0.85rem', fontWeight: 600, color: '#fff', background: '#345474', border: '1px solid #345474', borderRadius: 6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', transition: 'background 0.2s' }}
              className="pub-btn-solid">
              Hire Me
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Floating pill after scroll — strictly desktop/laptop only */}
      {scrolled && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pub-floating-nav"
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
            {NAV_LINKS.map(l => (
              <NavLink
                key={l.to} to={l.to} end={l.end}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={({ isActive }) => ({
                  padding: '0.3rem 0.65rem', fontSize: '0.82rem', fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#345474' : '#6B7480', textDecoration: 'none', borderRadius: 100,
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
            <a
              href={personalInfo.resumeUrl}
              download="Esakki_Ponraj_Resume.pdf"
              onClick={(e) => handleResumeDownload(e, personalInfo.resumeUrl)}
              style={{ padding: '0.32rem 0.75rem', fontSize: '0.78rem', fontWeight: 600, color: '#345474', border: '1px solid #B8D0E8', borderRadius: 100, textDecoration: 'none', background: '#EDF3F9', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <FiDownload size={11} /> Resume
            </a>
            <NavLink to="/contact"
              style={{ padding: '0.32rem 0.85rem', fontSize: '0.78rem', fontWeight: 600, color: '#fff', background: '#345474', borderRadius: 100, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Hire Me
            </NavLink>
          </div>
        </motion.div>
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        style={{
          position: 'fixed', top: '1rem', right: '1rem',
          background: '#fff', border: '1px solid #D6E4F0',
          borderRadius: 8, padding: '0.4rem 0.5rem',
          cursor: 'pointer', color: '#202A35', zIndex: 60,
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(52,84,116,0.1)',
          pointerEvents: 'auto',
        }}
        className="pub-hamburger"
      >
        {open ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'fixed', top: '64px', left: '1rem', right: '1rem',
              background: '#fff', border: '1px solid #D6E4F0',
              borderRadius: 12, padding: '1rem',
              boxShadow: '0 8px 32px rgba(52,84,116,0.14)',
              zIndex: 55, display: 'flex', flexDirection: 'column', gap: '0.2rem',
              pointerEvents: 'auto',
            }}
          >
            {NAV_LINKS.map(l => (
              <NavLink key={l.to} to={l.to} end={l.end}
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={({ isActive }) => ({
                  padding: '0.55rem 0.75rem', fontSize: '0.9rem', fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#345474' : '#6B7480',
                  background: isActive ? '#EDF3F9' : 'transparent',
                  borderRadius: 8, textDecoration: 'none',
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={personalInfo.resumeUrl}
              download="Esakki_Ponraj_Resume.pdf"
              onClick={(e) => handleResumeDownload(e, personalInfo.resumeUrl)}
              style={{ marginTop: '0.5rem', padding: '0.6rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#345474', border: '1.5px solid #345474', borderRadius: 8, textDecoration: 'none' }}
            >
              <FiDownload size={13} style={{ display: 'inline', marginRight: 4 }} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PublicFooter() {
  const { personalInfo } = usePortfolioData();
  return (
    <footer className="pub-footer">
      <div className="pub-footer-inner">
        <div>
          <p className="pub-footer-logo">Esakki<span>.</span></p>
          <p className="pub-footer-tagline">{personalInfo.title} building scalable, responsive web applications.</p>
        </div>
        <div>
          <p className="pub-footer-col-title">Quick Links</p>
          <div className="pub-footer-links">
            <NavLink to="/about" className="pub-footer-link">About</NavLink>
            <NavLink to="/projects" className="pub-footer-link">Projects</NavLink>
            <NavLink to="/skills" className="pub-footer-link">Skills</NavLink>
            <NavLink to="/contact" className="pub-footer-link">Contact</NavLink>
          </div>
        </div>
        <div>
          <p className="pub-footer-col-title">Connect</p>
          <div className="pub-footer-socials">
            {personalInfo.socials.github && personalInfo.socials.github !== '#' && (
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="pub-footer-social" aria-label="GitHub"><FiGithub size={15} /></a>
            )}
            {personalInfo.socials.linkedin && personalInfo.socials.linkedin !== '#' && (
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="pub-footer-social" aria-label="LinkedIn"><FiLinkedin size={15} /></a>
            )}
            {personalInfo.socials.email && (
              <a href={personalInfo.socials.email} className="pub-footer-social" aria-label="Email"><FiMail size={15} /></a>
            )}
          </div>
        </div>
      </div>
      <div className="pub-footer-bottom">
        © {new Date().getFullYear()} Designed & Developed by {personalInfo.name}
      </div>
    </footer>
  );
}

export default function MainLayout({ children }: { children: ReactNode }) {
  const [hireMeOpen, setHireMeOpen] = useState(false);
  const location = useLocation();

  // Home has its own self-contained nav/footer/background
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return (
      <>
        {children}
        <HireMeModal open={hireMeOpen} onClose={() => setHireMeOpen(false)} />
        <ToastContainer theme="light" position="bottom-right" />
      </>
    );
  }

  return (
    <div className="pub-page">
      <PublicNavbar />
      <main style={{ paddingTop: 76 }}>
        {children}
      </main>
      <PublicFooter />
      <HireMeModal open={hireMeOpen} onClose={() => setHireMeOpen(false)} />
      <ToastContainer theme="light" position="bottom-right" />
    </div>
  );
}
