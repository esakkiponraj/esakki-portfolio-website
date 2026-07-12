import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bgdark text-white flex items-center justify-center">
        <p className="text-white/50">Checking session...</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
