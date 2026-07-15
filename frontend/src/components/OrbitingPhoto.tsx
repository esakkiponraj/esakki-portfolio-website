import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiPostgresql, SiTailwindcss } from 'react-icons/si';

interface Props {
  src: string;
  alt: string;
  size?: number; // diameter of the photo itself, in px
  duration?: number; // seconds per full orbit
}

// The skills shown orbiting the photo — matches the core stack from the resume.
const ORBIT_SKILLS = [
  { Icon: SiReact, label: 'React', color: '#61DAFB' },
  { Icon: SiNextdotjs, label: 'Next.js', color: '#EDEDED' },
  { Icon: SiNodedotjs, label: 'Node.js', color: '#5FA04E' },
  { Icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
  { Icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
  { Icon: SiTailwindcss, label: 'Tailwind CSS', color: '#38BDF8' },
];

export default function OrbitingPhoto({ src, alt, size = 220, duration = 22 }: Props) {
  const radius = size / 2 + 44;
  const badgeSize = 44;
  const containerSize = radius * 2 + badgeSize;

  return (
    <div className="relative mx-auto" style={{ width: containerSize, height: containerSize }} aria-hidden="false">
      {/* Ambient glow behind everything */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-25 blur-2xl animate-glow" />

      {/* Orbit ring — rotates as a whole */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {ORBIT_SKILLS.map(({ Icon, label, color }, i) => {
          const angle = (i / ORBIT_SKILLS.length) * 2 * Math.PI - Math.PI / 2;
          const x = containerSize / 2 + radius * Math.cos(angle) - badgeSize / 2;
          const y = containerSize / 2 + radius * Math.sin(angle) - badgeSize / 2;
          return (
            <motion.div
              key={label}
              className="absolute rounded-xl glass flex items-center justify-center shadow-glow"
              style={{ left: x, top: y, width: badgeSize, height: badgeSize }}
              // Counter-rotate at the same speed so the icon itself stays upright
              // while still traveling around the orbit with the parent.
              animate={{ rotate: -360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
              title={label}
            >
              <Icon size={20} style={{ color }} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center photo */}
      <div
        className="absolute rounded-full overflow-hidden border-4 border-fg/10 shadow-glow"
        style={{
          width: size,
          height: size,
          left: (containerSize - size) / 2,
          top: (containerSize - size) / 2,
        }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
