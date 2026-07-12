import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import AnimatedCounter from '../components/AnimatedCounter';
import ProfilePhoto from '../components/ProfilePhoto';
import { usePortfolioData } from '../context/PortfolioDataContext';

const techStack = [
  'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Next.js',
  'TypeScript', 'Tailwind CSS', 'Git', 'GitHub', 'Figma', 'Prisma',
];

export default function About() {
  const { personalInfo, stats } = usePortfolioData();

  return (
    <div className="section-container">
      <SectionHeading eyebrow="Get To Know Me" title="About Me" center={false} />

      <div className="grid lg:grid-cols-3 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto lg:mx-0 w-64 sm:w-72"
        >
          <ProfilePhoto src={personalInfo.photo} alt={personalInfo.name} />
        </motion.div>

        <div className="lg:col-span-2">
          <h3 className="text-2xl font-display font-bold mb-4">Professional Summary</h3>
          <p className="text-fg/70 leading-relaxed mb-6">{personalInfo.summary}</p>
          <p className="text-fg/70 leading-relaxed">
            Currently pursuing a Bachelor's in Computer Science and Engineering at SCAD College of Engineering
            & Technology (expected 2027), I've spent the past two years building production features across
            four internships — from civic-tech apps to enterprise analytics dashboards — while staying deeply
            involved in Agile teams, code reviews, and sprint planning.
          </p>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        {stats.map((s) => (
          <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>

      <SectionHeading eyebrow="What I Work With" title="Tech Stack" />
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {techStack.map((tech) => (
          <GlassCard key={tech} className="!p-3 !rounded-xl">
            <span className="font-mono text-sm">{tech}</span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
