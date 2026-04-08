import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { defaultProfileValues, calculateProfileCompletion } from '../services/userService';
import { validateProfile } from '../utils/validation';

const genderOptions = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
const stateOptions = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];
const educationOptions = [
  'School Student',
  'Undergraduate',
  'Postgraduate',
  'Diploma',
  'Vocational Training',
  'Graduate',
  'Other',
];
const occupationOptions = [
  'Student',
  'Homemaker',
  'Job Seeker',
  'Salaried Employee',
  'Self Employed',
  'Farmer',
  'Skilled Worker',
  'Other',
];
const categoryOptions = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Minority'];
const disabilityOptions = ['No', 'Yes'];

export default function ProfileForm() {
  const navigate = useNavigate();
  const { profile, saveProfile, user, loading } = useAuth();
  const [formData, setFormData] = useState(defaultProfileValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Show spinner while AuthContext is still hydrating the profile
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-emerald-500 animate-spin"
            role="status"
            aria-label="Loading profile"
          />
          <p className="text-sm font-medium text-slate-500">Loading profile…</p>
        </div>
      </div>
    );
  }

  // Pre-fill form from saved profile or logged-in user name
  useEffect(() => {
    setFormData((current) => ({
      ...current,
      ...defaultProfileValues,
      ...profile,
      fullName: profile?.fullName || user?.name || '',
    }));
  }, [profile, user]);

  // Compute live completion percentage using reusable helper
  const completion = calculateProfileCompletion(formData);
  const displayCompletion = Math.min(completion, 100);

  function handleChange(event) {
    const { name, value } = event.target;
    setIsSaved(false);
    setSubmitError('');

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear individual field error on change
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validateProfile(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    try {
      setIsSubmitting(true);
      await saveProfile(formData);
      setIsSaved(true);
      // Redirect to dashboard after a brief success moment
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (error) {
      setSubmitError(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="grid gap-10 xl:grid-cols-[0.85fr_1.15fr]">
        {/* Left sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Profile matching
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Build the profile Sahay will use for eligibility checks.
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600">
              These details help the app recommend more relevant schemes and
              explain why a person may qualify.
            </p>
          </div>

          {/* Completion card */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Form completion</p>
                <p className="mt-2 text-sm text-slate-600">
                  A fuller profile gives stronger recommendations.
                </p>
              </div>
              <div
                className={`text-3xl font-bold ${
                  displayCompletion === 100 ? 'text-emerald-600' : 'text-slate-900'
                }`}
              >
                {displayCompletion}%
              </div>
            </div>
            <div className="mt-5 h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${displayCompletion}%` }}
              />
            </div>
          </div>

          {/* Next steps card */}
          <div className="glass-card p-8">
            <p className="text-sm font-semibold text-slate-900">What happens next</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>1. Save your profile.</p>
              <p>2. Get redirected to the dashboard.</p>
              <p>3. See personalized scheme recommendations.</p>
            </div>
            <Link to="/dashboard" className="secondary-button mt-6">
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Main form card */}
        <div className="glass-card p-8 sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Profile form</h2>
              <p className="mt-2 text-sm text-slate-600">
                All fields are securely connected to the backend APIs.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              API Connected
            </span>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Full name */}
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="label-text">
                  Full name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input-field ${errors.fullName ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-rose-600">{errors.fullName}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="label-text">
                  Age <span className="text-rose-500">*</span>
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className={`input-field ${errors.age ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}`}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <p className="mt-2 text-sm text-rose-600">{errors.age}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="label-text">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select gender</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="label-text">
                  State <span className="text-rose-500">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`input-field ${errors.state ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}`}
                >
                  <option value="">Select state</option>
                  {stateOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-2 text-sm text-rose-600">{errors.state}</p>
                )}
              </div>

              {/* District */}
              <div>
                <label htmlFor="district" className="label-text">
                  District
                </label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  value={formData.district}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter district"
                />
              </div>

              {/* Education */}
              <div>
                <label htmlFor="education" className="label-text">
                  Education <span className="text-rose-500">*</span>
                </label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={`input-field ${errors.education ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}`}
                >
                  <option value="">Select education</option>
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.education && (
                  <p className="mt-2 text-sm text-rose-600">{errors.education}</p>
                )}
              </div>

              {/* Occupation */}
              <div>
                <label htmlFor="occupation" className="label-text">
                  Occupation <span className="text-rose-500">*</span>
                </label>
                <select
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={`input-field ${errors.occupation ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}`}
                >
                  <option value="">Select occupation</option>
                  {occupationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.occupation && (
                  <p className="mt-2 text-sm text-rose-600">{errors.occupation}</p>
                )}
              </div>

              {/* Annual income */}
              <div>
                <label htmlFor="annualIncome" className="label-text">
                  Annual income (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="annualIncome"
                  name="annualIncome"
                  type="number"
                  min="0"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className={`input-field ${errors.annualIncome ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}`}
                  placeholder="e.g. 250000"
                />
                {errors.annualIncome && (
                  <p className="mt-2 text-sm text-rose-600">{errors.annualIncome}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="label-text">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select category</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Disability status */}
              <div className="sm:col-span-2">
                <label htmlFor="disabilityStatus" className="label-text">
                  Disability status
                </label>
                <select
                  id="disabilityStatus"
                  name="disabilityStatus"
                  value={formData.disabilityStatus}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select status</option>
                  {disabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Success banner */}
            {isSaved && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <svg
                  className="h-4 w-4 flex-shrink-0 text-emerald-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Profile saved! Redirecting to dashboard…
              </div>
            )}

            {/* Error banner */}
            {submitError && (
              <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <svg
                  className="h-4 w-4 flex-shrink-0 text-rose-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                {submitError}
              </div>
            )}

            <button
              type="submit"
              className="primary-button w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving profile…' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
