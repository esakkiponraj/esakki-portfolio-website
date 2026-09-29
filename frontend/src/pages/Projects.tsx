import './public.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiGithub } from 'react-icons/fi';
import { ProjectCategory } from '../data/profile';
import { usePortfolioData } from '../context/PortfolioDataContext';

const filters: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Featured', value: 'featured' },
];

export default function Projects() {
  const { projects } = usePortfolioData();
  const [active, setActive] = useState<ProjectCategory | 'all'>('all');

  const filtered = active === 'all' ? projects : projects.filter(p => p.category.includes(active));

  return (
    <div className="pub-page">
      <div className="pub-container">
        <motion.div
          className="pub-header center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pub-eyebrow">My Work</span>
          <h1 className="pub-title">Projects</h1>
          <hr className="pub-rule" />
        </motion.div>

        {/* Filter pills */}
        <div className="pub-filters">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`pub-filter-btn${active === f.value ? ' active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6B7480' }}>No projects in this category yet.</p>
        ) : (
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}
            className="pub-projects-grid-resp">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="pub-card"
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}
                >
                  {/* Image */}
                  {p.image ? (
                    <div style={{ width: '100%', height: 180, overflow: 'hidden', background: '#EDF3F9', flexShrink: 0 }}>
                      <img src={p.image} alt={`${p.name} preview`} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }} />
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: 180, background: '#d6e8f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '1.6rem', color: '#345474', opacity: 0.35, fontWeight: 700 }}>{'</>'}</span>
                    </div>
                  )}

                  {/* Body */}
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '0.975rem', fontWeight: 700, color: '#202A35', margin: '0 0 0.4rem' }}>{p.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#6B7480', lineHeight: 1.65, margin: '0 0 1rem', flex: 1 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {p.technologies.map(t => (
                        <span key={t} className="pub-tag">{t}</span>
                      ))}
                    </div>
                    {(p.link || p.githubLink) && (
                      <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #EDF3F9', paddingTop: '0.75rem' }}>
                        {p.link && (
                          <a href={p.link} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600, color: '#345474', textDecoration: 'none' }}>
                            <FiArrowRight size={12} /> Visit Site
                          </a>
                        )}
                        {p.githubLink && (
                          <a href={p.githubLink} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600, color: '#345474', textDecoration: 'none' }}>
                            <FiGithub size={12} /> Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
