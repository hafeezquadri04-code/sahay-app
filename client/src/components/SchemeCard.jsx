import { Link } from 'react-router-dom';

export default function SchemeCard({ scheme }) {
  return (
    <article className="glass-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
          {scheme.category}
        </span>
        <span className="text-xs font-medium text-slate-500">{scheme.benefitHighlight}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
        {scheme.name}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">{scheme.shortDescription}</p>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Eligibility snapshot
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{scheme.eligibilitySummary}</p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 pt-2">
        <p className="text-sm font-medium text-slate-500">{scheme.targetAudience}</p>

        <Link
          to={`/schemes/${scheme.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600"
        >
          View details
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}
