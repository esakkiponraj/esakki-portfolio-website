import './public.css';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Education() {
  const { education } = usePortfolioData();

  return (
    <div className="pub-page">
      <div className="pub-container-narrow">
        <motion.div
          className="pub-header"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pub-eyebrow">My Academic Journey</span>
          <h1 className="pub-title">Education</h1>
          <hr className="pub-rule" />
        </motion.div>

        <div className="pub-timeline">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              className="pub-timeline-item"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="pub-timeline-dot" />
              <span className="pub-timeline-meta">{e.duration}</span>
              <h3 className="pub-timeline-title">{e.degree}</h3>
              <p className="pub-timeline-sub">{e.institution} · {e.grade}</p>
              {e.description && (
                <ul className="pub-timeline-points">
                  <li className="pub-timeline-point">{e.description}</li>
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
