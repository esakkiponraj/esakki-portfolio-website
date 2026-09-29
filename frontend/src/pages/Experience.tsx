import './public.css';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Experience() {
  const { experience } = usePortfolioData();

  return (
    <div className="pub-page">
      <div className="pub-container-narrow">
        <motion.div
          className="pub-header"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pub-eyebrow">Where I've Worked</span>
          <h1 className="pub-title">Experience</h1>
          <hr className="pub-rule" />
        </motion.div>

        <div className="pub-timeline">
          {experience.map((e, i) => (
            <motion.div
              key={e.company + e.duration}
              className="pub-timeline-item"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="pub-timeline-dot" />
              <span className="pub-timeline-meta">{e.duration}</span>
              <h3 className="pub-timeline-title">{e.role}</h3>
              <p className="pub-timeline-sub">{e.company} · {e.location}</p>
              {e.responsibilities && e.responsibilities.length > 0 && (
                <ul className="pub-timeline-points">
                  {e.responsibilities.map((r, j) => (
                    <li key={j} className="pub-timeline-point">{r}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
