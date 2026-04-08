import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[75vh] items-center justify-center py-16 md:py-24">
      <div className="glass-card mx-auto w-full max-w-2xl overflow-hidden">
        {/* Decorative top band */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />

        <div className="px-10 pb-12 pt-10 text-center sm:px-14">
          {/* Large 404 display */}
          <p
            className="select-none text-[6rem] font-extrabold leading-none tracking-tight text-slate-100 sm:text-[9rem]"
            aria-hidden="true"
            style={{
              WebkitTextStroke: '2px #e2e8f0',
            }}
          >
            404
          </p>

          {/* Badge */}
          <span className="-mt-4 inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-600">
            Page not found
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Looks like this page doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-8 text-slate-600">
            The route you visited isn&apos;t part of the current Sahay frontend. It may
            have moved, or you may have followed a broken link.
          </p>

          {/* Action buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="primary-button min-w-[140px]">
              ← Go Home
            </Link>
            <Link to="/schemes" className="secondary-button min-w-[140px]">
              Browse Schemes
            </Link>
          </div>

          {/* Helpful links */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <p className="mb-4 text-sm font-semibold text-slate-500">
              Or jump to one of these:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Login', to: '/login' },
                { label: 'Register', to: '/register' },
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Profile', to: '/profile' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition duration-150 hover:border-slate-400 hover:text-slate-900"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
