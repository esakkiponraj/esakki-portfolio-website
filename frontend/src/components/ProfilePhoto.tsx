import { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Pass true while the live API photo URL is still being confirmed.
   *  A neutral skeleton is shown instead of the stale cached/static photo. */
  loading?: boolean;
}

// A clearly-visible, boxed portrait. No orbiting badges, no busy halo —
// instead it comes alive through interaction: it tilts gently toward
// the cursor and a soft light sweeps across it as you move over it,
// with a slow ambient "breathing" glow behind the frame at rest.
export default function ProfilePhoto({ src, alt, className = '', loading = false }: Props) {
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
      {/* The photo box itself — tilts toward the cursor */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 aspect-[4/5]"
      >
        {loading ? (
          /* Neutral skeleton — same dimensions as the photo, no old image shown */
          <div
            aria-label="Loading photo…"
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #E2EAF1 25%, #EDF3F9 50%, #E2EAF1 75%)',
              backgroundSize: '200% 100%',
              animation: 'profilePhotoShimmer 1.4s ease-in-out infinite',
            }}
          />
        ) : (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              style={{ display: 'block' }}
            />
          </motion.div>
        )}

        {/* Light sweep that follows the cursor across the photo */}
        {!loading && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            style={{ left: shineX }}
          />
        )}
      </motion.div>

      {/* Thin accent corner brackets */}
      <span className="absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 border-slate-700 rounded-tl-lg" />
      <span className="absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 border-slate-400 rounded-br-lg" />

      <style>{`
        @keyframes profilePhotoShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
