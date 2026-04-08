import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Wraps a route element and redirects unauthenticated users to /login.
 *
 * Props:
 *   - requireAdmin: if true, user must have role === 'admin'
 *
 * While the AuthContext is still loading (hydrating from localStorage),
 * a lightweight spinner is shown so the page never flashes incorrectly.
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // AuthContext is still reading from localStorage – avoid a premature redirect.
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner ring */}
          <div
            className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-emerald-500 animate-spin"
            role="status"
            aria-label="Loading"
          />
          <p className="text-sm font-medium text-slate-500">Checking session…</p>
        </div>
      </div>
    );
  }

  // Not authenticated – redirect to login and remember where the user wanted to go.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin role check
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
