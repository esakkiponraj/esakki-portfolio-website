import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminApi } from '../services/adminApi';

interface AdminUser {
  id: string;
  email: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = 'portfolio_admin_token';
const USER_KEY = 'portfolio_admin_user';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  // Instant render — do not block with "Checking session..." if token exists
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verify() {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) return;

      try {
        const { data } = await adminApi.get('/auth/me');
        setAdmin(data.admin);
        localStorage.setItem(USER_KEY, JSON.stringify(data.admin));
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setToken(null);
          setAdmin(null);
        }
      }
    }
    verify();
  }, []);

  async function login(email: string, password: string) {
    const { data } = await adminApi.post('/auth/login', { email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    if (data.admin) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.admin));
    }
    setToken(data.token);
    setAdmin(data.admin);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    try {
      sessionStorage.removeItem('portfolio_admin_gate_unlocked');
    } catch {
      // ignore
    }
    setToken(null);
    setAdmin(null);
  }

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

export { TOKEN_KEY };
