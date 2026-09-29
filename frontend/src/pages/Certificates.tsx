import './public.css';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../context/PortfolioDataContext';

function isImageUrl(url: string) {
  return /\.(jpe?g|png|gif|webp)(\?.*)?$/i.test(url);
}

function CertFile({ fileUrl, title }: { fileUrl?: string; title: string }) {
  if (!fileUrl) return null;
  if (isImageUrl(fileUrl)) {
    return (
      <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="pub-cert-img-link">
        <img src={fileUrl} alt={`${title} certificate`} loading="lazy" />
      </a>
    );
  }
  return (
    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="pub-cert-link">
      View Certificate ↗
    </a>
  );
}

export default function Certificates() {
  const { certificates, achievements, experience } = usePortfolioData();

  const certs = certificates as any[];
  const internshipCerts = certs.filter(c => c.type === 'internship');
  const courseCerts = certs.filter(c => c.type === 'course' || !c.type);
  const achievementCerts = certs.filter(c => c.type === 'achievement');

  return (
    <div className="pub-page">
      <div className="pub-container">
        <motion.div
          className="pub-header"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pub-eyebrow">Recognition</span>
          <h1 className="pub-title">Certificates & Achievements</h1>
          <hr className="pub-rule" />
        </motion.div>

        {/* INTERNSHIPS */}
        <div className="pub-section-label">Internships</div>
        <div className="pub-grid-2" style={{ marginBottom: '2.5rem' }}>
          {experience.map((exp, i) => (
            <motion.div key={exp.company} className="pub-card"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <span className="pub-meta">{exp.duration}</span>
              <h4 className="pub-sub-heading">{exp.role}</h4>
              <p className="pub-body" style={{ marginTop: '0.2rem' }}>{exp.company} · {exp.location}</p>
            </motion.div>
          ))}
          {internshipCerts.map((c: any, i: number) => (
            <motion.div key={c._id ?? c.title} className="pub-card-pale"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <h4 className="pub-sub-heading">{c.title}</h4>
              <p className="pub-body" style={{ marginBottom: '0.4rem' }}>{c.organization}</p>
              <p className="pub-body">{c.description}</p>
              <CertFile fileUrl={c.fileUrl} title={c.title} />
            </motion.div>
          ))}
        </div>

        {/* COURSES & CERTIFICATIONS */}
        <div className="pub-section-label">Courses & Certifications</div>
        <div className="pub-grid-2" style={{ marginBottom: '2.5rem' }}>
          {courseCerts.map((c: any, i: number) => (
            <motion.div key={c._id ?? c.title} className="pub-card"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <h4 className="pub-sub-heading">{c.title}</h4>
              <p className="pub-body" style={{ marginBottom: '0.4rem', color: '#345474', fontWeight: 600, fontSize: '0.8rem' }}>{c.organization}</p>
              <p className="pub-body">{c.description}</p>
              <CertFile fileUrl={c.fileUrl} title={c.title} />
            </motion.div>
          ))}
        </div>

        {/* ACHIEVEMENTS */}
        <div className="pub-section-label">Achievements</div>
        <div className="pub-grid-3">
          {achievements.map((a, i) => (
            <motion.div key={a.title} className="pub-card-pale"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <div style={{ width: 36, height: 36, background: '#345474', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', marginBottom: '0.85rem' }}>🏆</div>
              <h4 className="pub-sub-heading">{a.title}</h4>
              <p className="pub-body" style={{ marginTop: '0.3rem' }}>{a.description}</p>
            </motion.div>
          ))}
          {achievementCerts.map((c: any, i: number) => (
            <motion.div key={c._id ?? c.title} className="pub-card"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.07 }}
            >
              <h4 className="pub-sub-heading">{c.title}</h4>
              <p className="pub-body" style={{ marginBottom: '0.4rem', color: '#345474', fontWeight: 600, fontSize: '0.8rem' }}>{c.organization}</p>
              <p className="pub-body">{c.description}</p>
              <CertFile fileUrl={c.fileUrl} title={c.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
