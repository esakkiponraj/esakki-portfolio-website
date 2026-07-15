import { ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = '', delay = 0 }: Props) {
  // Mouse-driven tilt: rotates gently toward the cursor position within the card.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springPx = useSpring(px, { stiffness: 300, damping: 25 });
  const springPy = useSpring(py, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(springPy, [0, 1], [7, -7]);
  const rotateY = useTransform(springPx, [0, 1], [-7, 7]);

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
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`glass glow-border rounded-2xl p-6 transition-shadow duration-300 hover:shadow-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}
