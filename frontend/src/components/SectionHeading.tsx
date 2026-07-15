import { motion } from 'framer-motion';

interface Props {
  eyebrow: string;
  title: string;
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, center = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      <span className="font-mono text-sm tracking-widest text-accent uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
        {title}
      </h2>
      <div className={`h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mt-4 ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
