import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function Login() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Check your connection to the backend.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bgdark text-white flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-display font-bold mb-1">Admin Login</h1>
        <p className="text-white/50 text-sm mb-6">Sign in to manage your portfolio content.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="text-sm text-white/70 mb-1.5 block">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg pl-10 pr-4 py-2.5 outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-white/70 mb-1.5 block">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 focus:border-accent rounded-lg pl-10 pr-4 py-2.5 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </motion.form>
    </div>
  );
}
