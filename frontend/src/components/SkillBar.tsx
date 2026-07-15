import { motion } from 'framer-motion';

interface Props {
  name: string;
  level: number;
}

export default function SkillBar({ name, level }: Props) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-medium text-fg/90">{name}</span>
        <span className="text-accent font-mono text-sm">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-fg/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </div>
  );
}
