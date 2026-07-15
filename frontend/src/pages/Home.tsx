import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import ProfilePhoto from '../components/ProfilePhoto';
import SectionHeading from '../components/SectionHeading';
import AnimatedCounter from '../components/AnimatedCounter';
import GlassCard from '../components/GlassCard';
import ProjectCard from '../components/ProjectCard';
import { services } from '../data/profile';
import { usePortfolioData } from '../context/PortfolioDataContext';

function useTypingEffect(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Home() {
  const { personalInfo, stats, projects } = usePortfolioData();
  const typed = useTypingEffect(personalInfo.taglines);

  return (
    <div>
      {/* HERO */}
      <section className="section-container grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-accent mb-4">Hi, my name is</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-4">
            {personalInfo.name}
          </h1>
          <div className="text-xl md:text-2xl text-fg/70 h-8 mb-6 font-mono">
            {typed}
            <span className="animate-pulse text-accent">|</span>
          </div>
          <p className="text-fg/60 max-w-lg mb-8 leading-relaxed">{personalInfo.summary}</p>

          <div className="flex flex-wrap gap-4">
            <a href={personalInfo.resumeUrl} download className="btn-primary">
              <FiDownload /> Download Resume
            </a>
            <NavLink to="/contact" className="btn-outline">
              Hire Me
            </NavLink>
            <NavLink to="/projects" className="btn-outline">
              View Projects <FiArrowRight />
            </NavLink>
          </div>

          <div className="flex gap-4 mt-8">
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-accent transition-colors" aria-label="GitHub"><FiGithub /></a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:text-accent transition-colors" aria-label="LinkedIn"><FiLinkedin /></a>
            <a href={personalInfo.socials.email} className="p-3 rounded-full glass hover:text-accent transition-colors" aria-label="Email"><FiMail /></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <ProfilePhoto src={personalInfo.photo} alt={personalInfo.name} className="w-64 sm:w-72 md:w-80 mx-auto" />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="section-container">
        <div className="glass rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-container">
        <SectionHeading eyebrow="What I Do" title="Services" />
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <GlassCard key={s.title} delay={i * 0.1}>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-fg/60 text-sm">{s.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-container">
        <SectionHeading eyebrow="Recent Work" title="Featured Projects" />
        <div className="grid md:grid-cols-3 gap-6">
          {projects.filter((p) => p.category.includes('featured')).map((p, i) => (
            <ProjectCard key={p.name} {...p} delay={i * 0.1} />
          ))}
        </div>
        <div className="text-center mt-10">
          <NavLink to="/projects" className="btn-outline">
            View All Projects <FiArrowRight />
          </NavLink>
        </div>
      </section>

      {/* WHY HIRE ME */}
      <section className="section-container">
        <SectionHeading eyebrow="Why Work With Me" title="Why Hire Me" />
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard>
            <h3 className="font-display font-semibold mb-2">Real Internship Experience</h3>
            <p className="text-fg/60 text-sm">Four full-stack internships across MERN and Next.js/PostgreSQL stacks, working in real Agile teams.</p>
          </GlassCard>
          <GlassCard delay={0.1}>
            <h3 className="font-display font-semibold mb-2">End-to-End Ownership</h3>
            <p className="text-fg/60 text-sm">Comfortable across the stack — from responsive UIs to APIs to database design.</p>
          </GlassCard>
          <GlassCard delay={0.2}>
            <h3 className="font-display font-semibold mb-2">Fast, Clear Communicator</h3>
            <p className="text-fg/60 text-sm">Collaborates well in sprint planning and code reviews, with a focus on clean, maintainable code.</p>
          </GlassCard>
        </div>
      </section>

      {/* CURRENT LEARNING */}
      <section className="section-container pb-32">
        <SectionHeading eyebrow="Always Growing" title="Currently Learning" />
        <div className="glass rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <p className="text-fg/70">
            Deepening expertise in system design, GraphQL, and cloud deployment — building on a foundation of
            React, Next.js, Node.js, MongoDB, and PostgreSQL.
          </p>
        </div>
      </section>
    </div>
  );
}
