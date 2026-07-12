import { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

// A clearly-visible, boxed portrait. No orbiting badges, no busy halo —
// instead it comes alive through interaction: it tilts gently toward
// the cursor and a soft light sweeps across it as you move over it,
// with a slow ambient "breathing" glow behind the frame at rest.
export default function ProfilePhoto({ src, alt, className = '' }: Props) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springPx = useSpring(px, { stiffness: 200, damping: 22 });
  const springPy = useSpring(py, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(springPy, [0, 1], [8, -8]);
  const rotateY = useTransform(springPx, [0, 1], [-8, 8]);
  const shineX = useTransform(springPx, [0, 1], ['-30%', '130%']);

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
    <div
      className={`relative ${className}`}
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slow ambient glow behind the frame — subtle, not a halo */}
      <div className="absolute -inset-3 md:-inset-4 rounded-[1.75rem] bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent animate-glow" />

      {/* The photo box itself — tilts toward the cursor */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative rounded-3xl overflow-hidden border-2 border-fg/10 shadow-xl bg-card aspect-[4/5]"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />

        {/* Light sweep that follows the cursor across the photo */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ left: shineX }}
        />
      </motion.div>

      {/* Static corner accents — a framed look, no motion */}
      <span className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
      <span className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-secondary rounded-br-2xl" />
    </div>
  );
}
