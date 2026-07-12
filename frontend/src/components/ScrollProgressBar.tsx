import { motion, useScroll, useSpring } from 'framer-motion';

// A thin gradient bar pinned to the very top of the viewport that fills
// left-to-right as the person scrolls down the page.
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-primary via-secondary to-accent"
      style={{ scaleX }}
    />
  );
}
