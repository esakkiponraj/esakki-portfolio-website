import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ProfileEditor from './admin/pages/ProfileEditor';
import ContactInfoEditor from './admin/pages/ContactInfoEditor';
import ProjectsManager from './admin/pages/ProjectsManager';
import SkillsManager from './admin/pages/SkillsManager';
import CertificatesManager from './admin/pages/CertificatesManager';
import EducationManager from './admin/pages/EducationManager';
import ExperienceManager from './admin/pages/ExperienceManager';
import AchievementsManager from './admin/pages/AchievementsManager';
import SocialLinksManager from './admin/pages/SocialLinksManager';
import MessagesManager from './admin/pages/MessagesManager';
import TestimonialsManager from './admin/pages/TestimonialsManager';
import BlogsManager from './admin/pages/BlogsManager';

// Wraps every protected admin page with auth-checking + the admin sidebar layout.
function Protected({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public portfolio site */}
      <Route
        path="/*"
        element={
          <ThemeProvider>
            <PortfolioDataProvider>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </MainLayout>
            </PortfolioDataProvider>
          </ThemeProvider>
        }
      />

      {/* Admin CMS — not linked anywhere on the public site */}
      <Route
        path="/admin/*"
        element={
          <AdminAuthProvider>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="" element={<Protected><Dashboard /></Protected>} />
              <Route path="profile" element={<Protected><ProfileEditor /></Protected>} />
              <Route path="projects" element={<Protected><ProjectsManager /></Protected>} />
              <Route path="skills" element={<Protected><SkillsManager /></Protected>} />
              <Route path="certificates" element={<Protected><CertificatesManager /></Protected>} />
              <Route path="education" element={<Protected><EducationManager /></Protected>} />
              <Route path="experience" element={<Protected><ExperienceManager /></Protected>} />
              <Route path="achievements" element={<Protected><AchievementsManager /></Protected>} />
              <Route path="social-links" element={<Protected><SocialLinksManager /></Protected>} />
              <Route path="contact-info" element={<Protected><ContactInfoEditor /></Protected>} />
              <Route path="messages" element={<Protected><MessagesManager /></Protected>} />
              <Route path="testimonials" element={<Protected><TestimonialsManager /></Protected>} />
              <Route path="blogs" element={<Protected><BlogsManager /></Protected>} />
            </Routes>
          </AdminAuthProvider>
        }
      />
    </Routes>
  );
}
