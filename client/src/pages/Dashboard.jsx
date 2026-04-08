import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getRecommendedSchemes } from '../services/schemeService';

export default function Dashboard() {
  const { isAuthenticated, profile, profileCompletion, user } = useAuth();
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRecommendations() {
      setIsLoading(true);
      setError(null);
      try {
        const nextSchemes = await getRecommendedSchemes(profile);
        if (isMounted) setRecommendedSchemes(nextSchemes);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load recommendations', err);
        if (isMounted) setRecommendedSchemes([]);
        setError(err?.message || 'Failed to load recommendations');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadRecommendations();

    return () => {
      isMounted = false;
    };
  }, [profile]);

  const summaryCards = [
    {
      label: 'Total recommended schemes',
      value: String(recommendedSchemes.length).padStart(2, '0'),
      tone: 'bg-emerald-50 text-emerald-800',
    },
    {
      label: 'Profile completion',
      value: `${profileCompletion}%`,
      tone: 'bg-sky-50 text-sky-800',
    },
    {
      label: 'Applications tracked',
      value: '03',
      tone: 'bg-amber-50 text-amber-800',
    },
  ];

  return (
    <div className="page-shell py-10 md:py-16">
      <section className="glass-card p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Welcome {isAuthenticated ? user?.name || 'back' : 'to Sahay'}.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Review your current progress, explore suggested schemes, and take quick actions to improve your matches.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Current snapshot
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {profile?.state
                ? `${profile.state}${profile.district ? `, ${profile.district}` : ''}`
                : 'Complete your profile to add location insights.'}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {profile?.occupation || 'Occupation not added yet'}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {profile?.education || 'Education details pending'}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.label} className="glass-card p-6">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${card.tone}`}>
              {card.label}
            </span>
            <p className="mt-5 text-4xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Recent recommendations</h2>
              <p className="mt-2 text-sm text-slate-600">
                Based on your saved profile and available data.
              </p>
            </div>
            <Link to="/schemes" className="secondary-button">
              Browse all
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-28 animate-pulse rounded-3xl bg-slate-100" />
              ))
            ) : (
              recommendedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {scheme.category}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">{scheme.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {scheme.eligibilitySummary}
                      </p>
                    </div>
                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
            {error && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-slate-900">Quick actions</h2>
            <div className="mt-6 flex flex-col gap-4">
              <Link to="/profile" className="primary-button">
                Complete Profile
              </Link>
              <Link to="/schemes" className="secondary-button">
                Browse Schemes
              </Link>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-slate-900">Profile insight</h2>
            <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              <p>
                Income: {profile?.annualIncome ? `Rs. ${Number(profile.annualIncome).toLocaleString()}` : 'Not added'}
              </p>
              <p>Category: {profile?.category || 'Not added'}</p>
              <p>Disability status: {profile?.disabilityStatus || 'Not added'}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Save your profile details to make this dashboard more personalized and to improve recommendation quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
