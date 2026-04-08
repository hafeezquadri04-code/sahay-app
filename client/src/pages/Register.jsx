import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateRegister } from '../utils/validation';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
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

    const validationErrors = validateRegister(formData);
    setErrors(validationErrors);
    setStatusMessage('');
    setIsError(false);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await register(formData);
      setStatusMessage(response.message);
      setIsError(false);
      navigate('/profile');
    } catch (error) {
      setStatusMessage(error.message || 'Unable to register right now.');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-xl">
          <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">
            Create your Sahay account
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Start building a profile for smarter scheme discovery.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Register once, complete your profile, and use the dashboard to track relevant opportunities tailored to your situation.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Profile-led experience</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Collect the fields that matter for eligibility and recommendations.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Backend API Connected</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Your account will be securely saved to MongoDB using real APIs.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card mx-auto w-full max-w-xl p-8 sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Register</h2>
            <p className="mt-2 text-sm text-slate-600">
              Create your new account.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="label-text">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name}</p>}
            </div>

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

            <div className="grid gap-5 sm:grid-cols-2">
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

              <div>
                <label htmlFor="confirmPassword" className="label-text">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Repeat password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-rose-600">{errors.confirmPassword}</p>
                )}
              </div>
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
              {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-slate-900 hover:text-emerald-600">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
