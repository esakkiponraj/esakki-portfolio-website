import { useState, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HireMeModal from '../components/HireMeModal';
import Particles from '../components/Particles';
import GridBackground from '../components/GridBackground';
import CursorGlow from '../components/CursorGlow';
import ScrollProgressBar from '../components/ScrollProgressBar';
import { useTheme } from '../context/ThemeContext';

// Dark theme: cool blue/cyan particles on the near-black background.
// Light theme: softer, lower-contrast blue/slate particles so they stay
// a subtle ambient touch rather than a distraction on a white page.
const PARTICLE_COLORS = {
  dark: ['#2563EB', '#38BDF8', '#06B6D4'],
  light: ['#93C5FD', '#38BDF8', '#94A3B8'],
};

export default function MainLayout({ children }: { children: ReactNode }) {
  const [hireMeOpen, setHireMeOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-bgdark text-fg overflow-x-hidden relative">
      <ScrollProgressBar />
      <GridBackground />
      <CursorGlow />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          className=""
          particleColors={PARTICLE_COLORS[theme]}
          particleCount={140}
          particleSpread={12}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onHireMe={() => setHireMeOpen(true)} />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
        <HireMeModal open={hireMeOpen} onClose={() => setHireMeOpen(false)} />
        <ToastContainer theme={theme} position="bottom-right" />
      </div>
    </div>
  );
}
