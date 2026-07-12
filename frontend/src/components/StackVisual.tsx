import { motion } from 'framer-motion';

// Signature visual: three floating translucent layers representing
// the real architecture Esakki builds — Frontend, API, Database —
// instead of a generic blob/gradient hero graphic.
const layers = [
  { label: 'React / Next.js', sub: 'Frontend Layer', color: 'from-accent/30 to-accent/5', border: 'border-accent/40', offset: 0 },
  { label: 'Node.js / Express', sub: 'API Layer', color: 'from-secondary/30 to-secondary/5', border: 'border-secondary/40', offset: 40 },
  { label: 'MongoDB / PostgreSQL', sub: 'Database Layer', color: 'from-primary/30 to-primary/5', border: 'border-primary/40', offset: 80 },
];

export default function StackVisual() {
  return (
    <div className="relative w-full max-w-md h-80 mx-auto select-none" aria-hidden="true">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          initial={{ opacity: 0, y: 30, rotate: -4 + i * 2 }}
          animate={{ opacity: 1, y: 0, rotate: -4 + i * 2 }}
          transition={{ duration: 0.7, delay: i * 0.15 }}
          className={`absolute left-1/2 -translate-x-1/2 w-full glass rounded-2xl border ${layer.border} bg-gradient-to-br ${layer.color} shadow-glow`}
          style={{ top: layer.offset, zIndex: layers.length - i }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="px-6 py-5"
          >
            <p className="font-mono text-xs text-white/50 uppercase tracking-wider">{layer.sub}</p>
            <p className="font-display font-semibold text-lg mt-1">{layer.label}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
