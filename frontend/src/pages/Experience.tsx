import SectionHeading from '../components/SectionHeading';
import TimelineItem from '../components/TimelineItem';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Experience() {
  const { experience } = usePortfolioData();

  return (
    <div className="section-container max-w-3xl">
      <SectionHeading eyebrow="Where I've Worked" title="Experience" />
      <div className="mt-10">
        {experience.map((e, i) => (
          <TimelineItem
            key={e.company + e.duration}
            title={e.role}
            subtitle={`${e.company} · ${e.location}`}
            meta={e.duration}
            points={e.responsibilities}
            isLast={i === experience.length - 1}
            delay={i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
