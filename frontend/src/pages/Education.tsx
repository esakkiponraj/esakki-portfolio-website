import SectionHeading from '../components/SectionHeading';
import TimelineItem from '../components/TimelineItem';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Education() {
  const { education } = usePortfolioData();

  return (
    <div className="section-container max-w-3xl">
      <SectionHeading eyebrow="My Academic Journey" title="Education" />
      <div className="mt-10">
        {education.map((e, i) => (
          <TimelineItem
            key={e.degree}
            title={e.degree}
            subtitle={`${e.institution} · ${e.grade}`}
            meta={e.duration}
            points={[e.description]}
            isLast={i === education.length - 1}
            delay={i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
