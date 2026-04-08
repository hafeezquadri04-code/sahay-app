import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSchemeById } from '../services/schemeService';

// ─── Small display helpers ────────────────────────────────────────────────────

const categoryColors = {
  Scholarship: 'bg-sky-50 text-sky-700 border-sky-200',
  Health: 'bg-rose-50 text-rose-700 border-rose-200',
  Skills: 'bg-violet-50 text-violet-700 border-violet-200',
  Livelihood: 'bg-amber-50 text-amber-700 border-amber-200',
  'Disability Support': 'bg-teal-50 text-teal-700 border-teal-200',
};

function CategoryBadge({ category }) {
  const colorClass =
    categoryColors[category] || 'bg-emerald-50 text-emerald-700 border-emerald-200';
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${colorClass}`}
    >
      {category}
    </span>
  );
}

function InfoCard({ title, children, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg" aria-hidden="true">{icon}</span>}
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-sm leading-7 text-slate-600">
          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
            {idx + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="page-shell py-10 md:py-16">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-card space-y-6 p-8 sm:p-10">
          <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-4/6 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-40 animate-pulse rounded-3xl bg-slate-100" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-60 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-48 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

// ─── Not found fallback ───────────────────────────────────────────────────────

function SchemeNotFound() {
  return (
    <div className="page-shell py-10 md:py-16">
      <div className="glass-card mx-auto max-w-2xl overflow-hidden">
        <div className="h-2 w-full bg-gradient-to-r from-slate-300 to-slate-200" />
        <div className="px-10 py-12 text-center">
          <span className="text-5xl" aria-hidden="true">🔍</span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
            Scheme not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
            The scheme you&apos;re looking for isn&apos;t in our current dataset. It may have
            been removed or the link may be incorrect.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/schemes" className="primary-button min-w-[160px]">
              ← Browse Schemes
            </Link>
            <Link to="/dashboard" className="secondary-button min-w-[160px]">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SchemeDetails() {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applyState, setApplyState] = useState('idle'); // idle | applied
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadScheme() {
      setIsLoading(true);
      setApplyState('idle');
      setError(null);
      try {
        const nextScheme = await getSchemeById(id);
        if (isMounted) setScheme(nextScheme);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load scheme', err);
        if (isMounted) setScheme(null);
        setError(err?.message || 'Failed to load scheme');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadScheme();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) return <LoadingSkeleton />;
  if (error)
    return (
      <div className="page-shell py-10 md:py-16">
        <div className="glass-card mx-auto max-w-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Error loading scheme</h1>
          <p className="mt-3 text-sm text-slate-600">{error}</p>
          <div className="mt-6">
            <Link to="/schemes" className="secondary-button">
              ← Browse Schemes
            </Link>
          </div>
        </div>
      </div>
    );

  if (!scheme) return <SchemeNotFound />;

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">

        {/* ── Main content panel ─────────────────────────────────────────── */}
        <div className="glass-card p-8 sm:p-10">

          {/* Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <CategoryBadge category={scheme.category} />
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                {scheme.name}
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {scheme.description}
              </p>
            </div>

            {/* Target audience chip */}
            <div className="flex-shrink-0 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 sm:max-w-[200px]">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Best for
              </p>
              <p className="mt-2 font-medium text-slate-800">{scheme.targetAudience}</p>
            </div>
          </div>

          {/* Info cards grid */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <InfoCard title="Eligibility" icon="✅">
              <BulletList items={scheme.eligibility} />
            </InfoCard>

            <InfoCard title="Benefits" icon="🎁">
              <BulletList items={scheme.benefits} />
            </InfoCard>

            <InfoCard title="Required Documents" icon="📄">
              <BulletList items={scheme.requiredDocuments} />
            </InfoCard>

            <InfoCard title="Application Process" icon="🗂️">
              <NumberedList items={scheme.applicationProcess} />
            </InfoCard>
          </div>
        </div>

        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside className="space-y-6">

          {/* Apply card */}
          <div className="glass-card p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Eligibility summary
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {scheme.eligibilitySummary}
            </p>

            {applyState === 'idle' ? (
              <button
                type="button"
                id="apply-btn"
                onClick={() => setApplyState('applied')}
                className="primary-button mt-8 w-full"
              >
                Apply Now
              </button>
            ) : (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-500 text-lg" aria-hidden="true">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Application noted
                    </p>
                    <p className="mt-1 text-sm leading-6 text-emerald-700">
                      You have successfully recorded your interest in this scheme.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setApplyState('idle')}
                  className="secondary-button mt-4 w-full text-xs"
                >
                  Reset
                </button>
              </div>
            )}

            {/* Benefit highlight pill */}
            {scheme.benefitHighlight && (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-slate-400 text-sm" aria-hidden="true">⚡</span>
                <p className="text-sm font-medium text-slate-700">
                  {scheme.benefitHighlight}
                </p>
              </div>
            )}
          </div>

          {/* Next steps card */}
          <div className="glass-card p-8">
            <p className="text-sm font-semibold text-slate-900">Next steps</p>
            <ul className="mt-4 space-y-2.5">
              {[
                'Complete your profile to improve matching confidence.',
                'Double-check state-specific eligibility before applying.',
                'Keep your documents ready for faster submission.',
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2.5 text-sm leading-7 text-slate-600"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <Link to="/profile" className="secondary-button text-center">
                Complete Profile
              </Link>
              <Link to="/schemes" className="secondary-button text-center">
                Browse More Schemes
              </Link>
            </div>
          </div>

          {/* Back navigation */}
          <Link
            to="/schemes"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all schemes
          </Link>
        </aside>
      </div>
    </div>
  );
}
