import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { usePortfolioData } from '../context/PortfolioDataContext';

function isImageUrl(url: string) {
  return /\.(jpe?g|png|gif|webp)(\?.*)?$/i.test(url);
}

// Renders whatever was uploaded in the admin "Certificate File" field —
// as an inline photo when it's an image, or a "View Certificate" link
// for PDFs. Renders nothing if no file was attached.
function CertificateFile({ fileUrl, title }: { fileUrl?: string; title: string }) {
  if (!fileUrl) return null;
  if (isImageUrl(fileUrl)) {
    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 rounded-xl overflow-hidden border border-fg/10 hover:border-accent/50 transition-colors"
      >
        <img src={fileUrl} alt={`${title} certificate`} className="w-full h-40 object-cover" loading="lazy" />
      </a>
    );
  }
  return (
    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-accent text-xs underline mt-2 inline-block">
      View Certificate
    </a>
  );
}

export default function Certificates() {
  const { certificates, achievements, experience } = usePortfolioData();

  // The admin "Certificates" form tags every entry with a type
  // (internship / course / achievement) — split them out here so each
  // one lands under the matching heading instead of all piling into
  // "Courses & Certifications".
  const certs = certificates as any[];
  const internshipCerts = certs.filter((c) => c.type === 'internship');
  const courseCerts = certs.filter((c) => c.type === 'course' || !c.type);
  const achievementCerts = certs.filter((c) => c.type === 'achievement');

  return (
    <div className="section-container">
      <SectionHeading eyebrow="Recognition" title="Certificates & Achievements" />

      {/* INTERNSHIPS */}
      <h3 className="text-xl font-display font-semibold mb-6">Internships</h3>
      <div className={`grid md:grid-cols-2 gap-6 ${internshipCerts.length > 0 ? 'mb-6' : 'mb-14'}`}>
        {experience.map((exp, i) => (
          <GlassCard key={exp.company} delay={i * 0.08}>
            <p className="font-mono text-xs text-accent mb-1">{exp.duration}</p>
            <h4 className="font-display font-semibold">{exp.role}</h4>
            <p className="text-fg/60 text-sm">{exp.company} · {exp.location}</p>
          </GlassCard>
        ))}
      </div>
      {internshipCerts.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {internshipCerts.map((c, i) => (
            <GlassCard key={c._id ?? c.title} delay={i * 0.08}>
              <h4 className="font-display font-semibold">{c.title}</h4>
              <p className="text-fg/60 text-sm mb-2">{c.organization}</p>
              <p className="text-fg/50 text-sm">{c.description}</p>
              <CertificateFile fileUrl={c.fileUrl} title={c.title} />
            </GlassCard>
          ))}
        </div>
      )}

      {/* COURSES & CERTIFICATIONS */}
      <h3 className="text-xl font-display font-semibold mb-6">Courses & Certifications</h3>
      <div className="grid md:grid-cols-2 gap-6 mb-14">
        {courseCerts.map((c, i) => (
          <GlassCard key={c._id ?? c.title} delay={i * 0.08}>
            <h4 className="font-display font-semibold">{c.title}</h4>
            <p className="text-fg/60 text-sm mb-2">{c.organization}</p>
            <p className="text-fg/50 text-sm">{c.description}</p>
            <CertificateFile fileUrl={c.fileUrl} title={c.title} />
          </GlassCard>
        ))}
      </div>

      {/* ACHIEVEMENTS */}
      <h3 className="text-xl font-display font-semibold mb-6">Achievements</h3>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {achievements.map((a, i) => (
          <GlassCard key={a.title} delay={i * 0.08}>
            <h4 className="font-display font-semibold mb-2">{a.title}</h4>
            <p className="text-fg/50 text-sm">{a.description}</p>
          </GlassCard>
        ))}
      </div>
      {achievementCerts.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {achievementCerts.map((c, i) => (
            <GlassCard key={c._id ?? c.title} delay={i * 0.08}>
              <h4 className="font-display font-semibold">{c.title}</h4>
              <p className="text-fg/60 text-sm mb-2">{c.organization}</p>
              <p className="text-fg/50 text-sm">{c.description}</p>
              <CertificateFile fileUrl={c.fileUrl} title={c.title} />
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
