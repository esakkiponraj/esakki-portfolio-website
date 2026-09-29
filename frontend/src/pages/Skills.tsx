import './public.css';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Skills() {
  const { skillCategories } = usePortfolioData();

  return (
    <div className="pub-page">
      <div className="pub-container">
        <motion.div
          className="pub-header center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pub-eyebrow">What I Bring</span>
          <h1 className="pub-title">Skills & Expertise</h1>
          <hr className="pub-rule" />
        </motion.div>

        <div className="pub-grid-2">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              className="pub-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 4, height: 18, background: '#345474', borderRadius: 2 }} />
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1rem', fontWeight: 700, color: '#202A35', margin: 0 }}>
                  {cat.category}
                </h3>
              </div>
              {cat.skills.map(s => (
                <div key={s.name} className="pub-skill-row">
                  <div className="pub-skill-name-row">
                    <span className="pub-skill-name">{s.name}</span>
                    <span className="pub-skill-pct">{s.level}%</span>
                  </div>
                  <div className="pub-skill-track">
                    <motion.div
                      className="pub-skill-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
