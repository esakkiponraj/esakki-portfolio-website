import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Footer() {
  const { personalInfo } = usePortfolioData();
  return (
    <footer className="border-t border-fg/10 mt-20">
      <div className="section-container !py-12 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-display font-bold text-lg mb-2">
            Esakki<span className="text-accent">.</span>
          </p>
          <p className="text-fg/60 text-sm max-w-xs">{personalInfo.title} building scalable, responsive web applications.</p>
        </div>

        <div>
          <p className="font-medium mb-3 text-sm text-fg/80">Quick Links</p>
          <div className="flex flex-col gap-2 text-sm text-fg/60">
            <NavLink to="/about" className="hover:text-accent transition-colors">About</NavLink>
            <NavLink to="/projects" className="hover:text-accent transition-colors">Projects</NavLink>
            <NavLink to="/contact" className="hover:text-accent transition-colors">Contact</NavLink>
          </div>
        </div>

        <div>
          <p className="font-medium mb-3 text-sm text-fg/80">Connect</p>
          <div className="flex gap-3">
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass hover:text-accent transition-colors" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass hover:text-accent transition-colors" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={personalInfo.socials.email} className="p-2.5 rounded-full glass hover:text-accent transition-colors" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-fg/10 py-5 text-center text-fg/40 text-xs">
        © {new Date().getFullYear()} Designed & Developed by {personalInfo.name}
      </div>
    </footer>
  );
}
