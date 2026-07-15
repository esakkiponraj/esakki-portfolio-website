import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiFolder, FiCode, FiBriefcase, FiMail, FiExternalLink } from 'react-icons/fi';
import { adminApi } from '../services/adminApi';

interface Counts {
  projects: number;
  skills: number;
  experience: number;
  messages: number;
  unreadMessages: number;
}

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [projects, skills, experience, messages] = await Promise.all([
          adminApi.get('/projects'),
          adminApi.get('/skills'),
          adminApi.get('/experience'),
          adminApi.get('/messages'),
        ]);
        setCounts({
          projects: projects.data.count,
          skills: skills.data.count,
          experience: experience.data.count,
          messages: messages.data.count,
          unreadMessages: messages.data.data.filter((m: any) => !m.read).length,
        });
      } catch {
        // dashboard is non-critical — fail silently, cards just won't populate
      }
    })();
  }, []);

  const cards = [
    { label: 'Projects', value: counts?.projects, icon: FiFolder, to: '/admin/projects' },
    { label: 'Skills', value: counts?.skills, icon: FiCode, to: '/admin/skills' },
    { label: 'Experience Entries', value: counts?.experience, icon: FiBriefcase, to: '/admin/experience' },
    { label: 'Unread Messages', value: counts?.unreadMessages, icon: FiMail, to: '/admin/messages' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-1">Dashboard</h1>
      <p className="text-white/50 mb-8">Overview of your portfolio content.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <NavLink key={label} to={to} className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow block">
            <Icon className="text-accent text-2xl mb-3" />
            <p className="text-3xl font-display font-bold">{value ?? '—'}</p>
            <p className="text-white/50 text-sm mt-1">{label}</p>
          </NavLink>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display font-semibold mb-3">Quick Links</h2>
        <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm">
          <FiExternalLink /> View Live Portfolio
        </a>
      </div>
    </div>
  );
}
