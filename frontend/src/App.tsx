import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

// Public pages — statically imported so navbar navigation is instant (no chunk fetch, no spinner)
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

// Lazy-loaded Admin CMS pages — keeps the public site ultra-lightweight
const AdminGatekeeper = lazy(() => import('./admin/components/AdminGatekeeper'));
const AdminAuthProvider = lazy(() => import('./admin/context/AdminAuthContext').then(m => ({ default: m.AdminAuthProvider })));
const ProtectedRoute = lazy(() => import('./admin/components/ProtectedRoute'));
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'));
const Login = lazy(() => import('./admin/pages/Login'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const ProfileEditor = lazy(() => import('./admin/pages/ProfileEditor'));
const ContactInfoEditor = lazy(() => import('./admin/pages/ContactInfoEditor'));
const ProjectsManager = lazy(() => import('./admin/pages/ProjectsManager'));
const SkillsManager = lazy(() => import('./admin/pages/SkillsManager'));
const CertificatesManager = lazy(() => import('./admin/pages/CertificatesManager'));
const EducationManager = lazy(() => import('./admin/pages/EducationManager'));
const ExperienceManager = lazy(() => import('./admin/pages/ExperienceManager'));
const AchievementsManager = lazy(() => import('./admin/pages/AchievementsManager'));
const SocialLinksManager = lazy(() => import('./admin/pages/SocialLinksManager'));
const MessagesManager = lazy(() => import('./admin/pages/MessagesManager'));
const TestimonialsManager = lazy(() => import('./admin/pages/TestimonialsManager'));
const BlogsManager = lazy(() => import('./admin/pages/BlogsManager'));

const PageLoader = () => (
  <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2.5px solid #D6E4F0', borderTopColor: '#345474', animation: 'spin 0.7s linear infinite' }} />
  </div>
);

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
    <>
      <ScrollToTop />
      <Routes>
        {/* Public portfolio site */}
        <Route
          path="/*"
          element={
            <ThemeProvider>
              <PortfolioDataProvider>
                <MainLayout>
                  <Suspense fallback={<PageLoader />}>
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
                  </Suspense>
                </MainLayout>
              </PortfolioDataProvider>
            </ThemeProvider>
          }
        />

        {/* Admin CMS — Encrypted by AdminGatekeeper security gateway */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminGatekeeper>
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
              </AdminGatekeeper>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
