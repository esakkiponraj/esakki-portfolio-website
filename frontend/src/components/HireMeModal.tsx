import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiPhone, FiMail, FiMapPin, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function HireMeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { personalInfo } = usePortfolioData();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl p-8 max-w-md w-full relative shadow-glow"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-fg/10 transition-colors"
              aria-label="Close"
            >
              <FiX />
            </button>

            <h3 className="text-2xl font-display font-bold mb-1">Let's Work Together</h3>
            <p className="text-fg/60 text-sm mb-6">Reach out through any of the channels below.</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-fg/80">
                <FiMail className="text-accent" /> {personalInfo.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-fg/80">
                <FiPhone className="text-accent" /> {personalInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-fg/80">
                <FiMapPin className="text-accent" /> {personalInfo.location}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={personalInfo.socials.email} className="btn-primary flex-1 justify-center text-sm">
                <FiMail /> Email
              </a>
              <a href={`tel:${personalInfo.phone}`} className="btn-outline flex-1 justify-center text-sm">
                <FiPhone /> Call
              </a>
              <a href={personalInfo.resumeUrl} download className="btn-outline flex-1 justify-center text-sm">
                <FiDownload /> Resume
              </a>
            </div>

            <div className="flex gap-3 mt-5 justify-center">
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass hover:text-accent transition-colors">
                <FiGithub />
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass hover:text-accent transition-colors">
                <FiLinkedin />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
