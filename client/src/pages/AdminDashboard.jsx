import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const adminToken = window.localStorage.getItem('sahay_admin_token');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }

    async function loadDashboard() {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data.stats);
        setSchemes(res.data.schemes || []);
      } catch (err) {
        setError(err?.message || 'Failed to load admin dashboard');
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [navigate]);

  function handleLogout() {
    window.localStorage.removeItem('sahay_admin_token');
    window.localStorage.removeItem('sahay_admin');
    navigate('/admin-login');
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-red-50 hover:text-red-600"
        >
          Admin Logout
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {stats && (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="glass-card p-6">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Total Users
            </span>
            <p className="mt-5 text-4xl font-bold text-slate-900">
              {String(stats.totalUsers).padStart(2, '0')}
            </p>
          </div>
          <div className="glass-card p-6">
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-800">
              Total Schemes
            </span>
            <p className="mt-5 text-4xl font-bold text-slate-900">
              {String(stats.totalSchemes).padStart(2, '0')}
            </p>
          </div>
          <div className="glass-card p-6">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              Active Applications
            </span>
            <p className="mt-5 text-4xl font-bold text-slate-900">
              {String(stats.activeApplications).padStart(2, '0')}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 glass-card p-8">
        <h2 className="text-2xl font-bold text-slate-900">Active Schemes</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Scheme Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {schemes.map((scheme) => (
                <tr key={scheme.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{scheme.name}</td>
                  <td className="px-4 py-3">{scheme.category}</td>
                  <td className="px-4 py-3 text-right">{scheme.applicationsCount}</td>
                </tr>
              ))}
              {schemes.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-10 text-center text-slate-400">
                    No schemes loaded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 glass-card p-8">
        <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/schemes" className="primary-button">
            View All Schemes
          </Link>
          <Link to="/" className="secondary-button">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}