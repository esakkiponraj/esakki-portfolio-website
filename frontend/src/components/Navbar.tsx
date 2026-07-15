import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/education', label: 'Education' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ onHireMe }: { onHireMe: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { personalInfo } = usePortfolioData();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="section-container !py-0 flex items-center justify-between">
        <NavLink to="/" className="font-display font-bold text-lg tracking-tight">
          Esakki<span className="text-accent">.</span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-fg/70 hover:text-fg'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-accent rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-fg/10 transition-colors"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <a href={personalInfo.resumeUrl} download className="btn-outline !px-4 !py-2 text-sm">
            Resume
          </a>
          <button onClick={onHireMe} className="btn-primary !px-4 !py-2 text-sm">
            Hire Me
          </button>
        </div>

        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-3 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-primary/20 text-accent' : 'text-fg/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onHireMe();
                }}
                className="btn-primary justify-center mt-2"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
