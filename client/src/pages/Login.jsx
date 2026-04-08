import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateLogin } from '../utils/validation';

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    setStatusMessage('');
    setIsError(false);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await login(formData);
      setStatusMessage(response.message);
      setIsError(false);
      navigate('/dashboard');
    } catch (error) {
      setStatusMessage(error.message || 'Unable to sign in right now.');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-xl">
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            Welcome back to Sahay
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Sign in to see your personalized opportunities.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Securely log in to manage your profile, explore matched schemes, and track your applications.
          </p>
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Personalize Your Matches</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Once you log in, head to the profile form to unlock stronger scheme recommendations in the dashboard.
            </p>
          </div>
        </div>

        <div className="glass-card mx-auto w-full max-w-xl p-8 sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Login</h2>
            <p className="mt-2 text-sm text-slate-600">
              Continue with your email and password.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="label-text">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="label-text">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Minimum 6 characters"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-rose-600">{errors.password}</p>
              )}
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
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            New to Sahay?{' '}
            <Link to="/register" className="font-semibold text-slate-900 hover:text-emerald-600">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
