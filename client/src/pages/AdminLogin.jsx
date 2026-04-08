import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMessage('');
    setIsError(false);

    if (!email || !password) {
      setStatusMessage('Email and password are required.');
      setIsError(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post('/admin/login', { email, password });
      const data = res.data;
      // Store admin token
      window.localStorage.setItem('sahay_admin_token', data.adminToken);
      window.localStorage.setItem('sahay_admin', JSON.stringify(data.admin));
      setStatusMessage(data.message || 'Admin login successful');
      setIsError(false);
      navigate('/admin-dashboard');
    } catch (err) {
      setStatusMessage(err?.message || 'Invalid admin credentials');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="mx-auto max-w-md">
        <div className="glass-card p-8 sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white shadow-lg">
            🛡️
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-600">
            Access the admin panel to manage schemes and users.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="admin-email" className="label-text">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@sahay.com"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="label-text">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
              />
            </div>

            {statusMessage && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  isError
                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                {statusMessage}
              </div>
            )}

            <button type="submit" className="primary-button w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login as Admin'}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            Demo credentials: admin@sahay.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
