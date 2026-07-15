import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import SkillBar from '../components/SkillBar';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Skills() {
  const { skillCategories } = usePortfolioData();

  return (
    <div className="section-container">
      <SectionHeading eyebrow="What I Bring" title="Skills & Expertise" />
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((cat, i) => (
          <GlassCard key={cat.category} delay={i * 0.08}>
            <h3 className="font-display font-semibold text-lg mb-5">{cat.category}</h3>
            {cat.skills.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
