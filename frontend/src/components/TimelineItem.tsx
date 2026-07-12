import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle: string;
  meta: string;
  points?: string[];
  isLast?: boolean;
  delay?: number;
}

export default function TimelineItem({ title, subtitle, meta, points, isLast, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative pl-10 pb-10"
    >
      {!isLast && <span className="absolute left-[7px] top-4 bottom-0 w-px bg-fg/10" />}
      <span className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-bgdark border-2 border-accent shadow-glowCyan" />

      <p className="font-mono text-xs text-accent mb-1">{meta}</p>
      <h3 className="text-lg font-display font-semibold">{title}</h3>
      <p className="text-fg/60 text-sm mb-3">{subtitle}</p>

      {points && (
        <ul className="space-y-1.5">
          {points.map((p) => (
            <li key={p} className="text-fg/70 text-sm flex gap-2">
              <span className="text-secondary mt-1">▹</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
