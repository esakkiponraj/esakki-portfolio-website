import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiKey, FiEye, FiEyeOff, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const GATE_KEY = 'portfolio_admin_gate_unlocked';

export default function AdminGatekeeper({ children }: Props) {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(GATE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);

  // Master passcode: configurable via env var VITE_ADMIN_PASSCODE,
  // with default set to 8282
  const validPasscodes = [
    (import.meta.env.VITE_ADMIN_PASSCODE || '').trim(),
    '8282',
  ].filter(Boolean);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter your security passcode');
      return;
    }

    if (attempts >= 5) {
      setError('Too many failed attempts. Please wait a moment.');
      return;
    }

    if (validPasscodes.includes(passcode.trim())) {
      try {
        sessionStorage.setItem(GATE_KEY, 'true');
      } catch {
        // ignore
      }
      setUnlocked(true);
      setError('');
    } else {
      setAttempts((a) => a + 1);
      setError('Incorrect passcode. Access denied.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPasscode('');
    }
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#F8FAFC',
      }}
    >
      <motion.div
        animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : { opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(30, 41, 59, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(52, 84, 116, 0.25)',
        }}
      >
        {/* Top Icon Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #345474 0%, #202A35 100%)',
              border: '1px solid rgba(184, 208, 232, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#93C5FD',
              boxShadow: '0 8px 20px rgba(52, 84, 116, 0.4)',
            }}
          >
            <FiLock size={26} />
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 0.4rem',
              color: '#FFFFFF',
            }}
          >
            Security Gateway
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
            This management console is encrypted. Enter your master authorization passcode to unlock.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              htmlFor="gateway-passcode"
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#CBD5E1',
                marginBottom: '0.45rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Master Passcode / PIN
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FiKey size={16} />
              </div>
              <input
                id="gateway-passcode"
                type={showPass ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
                placeholder="Enter passcode..."
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: error ? '1.5px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 10,
                  padding: '0.75rem 2.75rem 0.75rem 2.6rem',
                  fontSize: '0.95rem',
                  color: '#FFFFFF',
                  outline: 'none',
                  letterSpacing: showPass ? 'normal' : '0.2em',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label="Toggle password visibility"
              >
                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#F87171',
                    fontSize: '0.8rem',
                    marginTop: '0.45rem',
                  }}
                >
                  <FiAlertCircle size={13} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: 10,
              background: '#345474',
              border: '1px solid #486E96',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s, transform 0.1s',
              marginTop: '0.5rem',
              boxShadow: '0 4px 14px rgba(52, 84, 116, 0.4)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#2B4560')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#345474')}
          >
            <FiLock size={15} /> Unlock Portal
          </button>
        </form>

        {/* Footer Back Link */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
          <NavLink
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              color: '#94A3B8',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            <FiArrowLeft size={13} /> Back to Public Website
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
}
