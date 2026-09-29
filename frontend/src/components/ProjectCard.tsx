import { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

interface Props {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  image?: string;
  link?: string;
  githubLink?: string;
  delay?: number;
}

export default function ProjectCard({ name, description, technologies, features, image, link, githubLink, delay = 0 }: Props) {
  // Mouse-driven tilt: rotates gently toward the cursor position within the card.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springPx = useSpring(px, { stiffness: 300, damping: 25 });
  const springPy = useSpring(py, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(springPy, [0, 1], [4, -4]);
  const rotateY = useTransform(springPx, [0, 1], [-4, 4]);

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
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="hp-project-card"
    >
      {image ? (
        <div className="hp-project-img">
          <img
            src={image}
            alt={`${name} preview`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="hp-project-img-fallback">
          <span className="hp-project-img-fallback-icon">{'</>'}</span>
        </div>
      )}

      <div className="hp-project-body">
        <h3 className="hp-project-title">{name}</h3>
        <p className="hp-project-desc">{description}</p>

        <div className="hp-project-tags">
          {technologies.map((tech) => (
            <span key={tech} className="hp-project-tag">{tech}</span>
          ))}
        </div>

        {(link || githubLink) && (
          <div className="hp-project-links">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hp-project-link"
              >
                <FiExternalLink size={14} /> Visit Site
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hp-project-link"
              >
                <FiGithub size={14} /> View Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
