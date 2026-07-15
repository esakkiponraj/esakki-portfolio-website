import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
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

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <div className="section-container">
      <SectionHeading eyebrow="My Work" title="Projects" />

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              active === f.value
                ? 'bg-primary text-white shadow-glow'
                : 'glass text-fg/60 hover:text-fg'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-fg/50">No projects in this category yet.</p>
      ) : (
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.name} {...p} delay={i * 0.08} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
