import { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

interface Props {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  link?: string;
  delay?: number;
}

export default function ProjectCard({ name, description, technologies, features, link, delay = 0 }: Props) {
  // Mouse-driven tilt: rotates gently toward the cursor position within the card.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springPx = useSpring(px, { stiffness: 300, damping: 25 });
  const springPy = useSpring(py, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(springPy, [0, 1], [6, -6]);
  const rotateY = useTransform(springPx, [0, 1], [-6, 6]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="glass glow-border rounded-2xl p-6 flex flex-col h-full hover:shadow-glow transition-shadow duration-300"
    >
      <h3 className="text-xl font-display font-semibold mb-2">{name}</h3>
      <p className="text-fg/70 text-sm mb-4">{description}</p>

      <ul className="space-y-1.5 mb-4">
        {features.map((f) => (
          <li key={f} className="text-fg/60 text-sm flex gap-2">
            <span className="text-accent mt-1">▹</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-5 mt-auto">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-accent border border-primary/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-accent hover:text-fg transition-colors"
        >
          <FiExternalLink /> Visit Live Site
        </a>
      )}
    </motion.div>
  );
}
