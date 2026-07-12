import { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiUser, FiBriefcase, FiCode, FiAward, FiBook, FiFolder,
  FiLink, FiMail, FiMessageSquare, FiFileText, FiLogOut, FiMenu, FiX, FiPhone,
} from 'react-icons/fi';
import { useAdminAuth } from '../context/AdminAuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/profile', label: 'Profile', icon: FiUser },
  { to: '/admin/projects', label: 'Projects', icon: FiFolder },
  { to: '/admin/skills', label: 'Skills', icon: FiCode },
  { to: '/admin/certificates', label: 'Certificates', icon: FiAward },
  { to: '/admin/education', label: 'Education', icon: FiBook },
  { to: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { to: '/admin/achievements', label: 'Achievements', icon: FiAward },
  { to: '/admin/social-links', label: 'Social Links', icon: FiLink },
  { to: '/admin/contact-info', label: 'Contact Info', icon: FiPhone },
  { to: '/admin/messages', label: 'Messages', icon: FiMessageSquare },
  { to: '/admin/testimonials', label: 'Testimonials', icon: FiMail },
  { to: '/admin/blogs', label: 'Blogs', icon: FiFileText },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-bgdark text-white flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 glass border-r border-white/10 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <span className="font-display font-bold text-lg">
            Admin<span className="text-accent">.</span>
          </span>
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary/20 text-accent' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <p className="text-xs text-white/40 px-3 mb-2 truncate">{admin?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="lg:hidden glass border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-20">
          <span className="font-display font-bold">Admin</span>
          <button onClick={() => setMobileOpen(true)}>
            <FiMenu />
          </button>
        </header>
        <main className="p-6 lg:p-10 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
