import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Schemes', to: '/schemes' },
  { label: 'Chatbot', to: '/chatbot' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' },
];

function getNavItemClass(isActive) {
  return [
    'rounded-full px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
      : 'text-slate-600 hover:bg-white hover:text-slate-900',
  ].join(' ');
}

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="page-shell">
        <nav className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow-lg shadow-slate-900/20">
              S
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">Sahay</p>
              <p className="text-xs font-medium text-slate-500">
                Welfare discovery made simple
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                end={link.to === '/'}
                to={link.to}
                className={({ isActive }) => getNavItemClass(isActive)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated && (
              <button
                type="button"
                onClick={logout}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Logout
              </button>
            )}

            <Link
              to={isAuthenticated ? '/dashboard' : '/login'}
              className="primary-button"
            >
              {isAuthenticated ? 'Open Dashboard' : 'Try Demo Login'}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-900 hover:text-slate-900 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {isMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </nav>

        {isMenuOpen && (
          <div className="pb-4 lg:hidden">
            <div className="glass-card space-y-3 p-4">
              {user?.name && (
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                  Signed in as {user.name}
                </div>
              )}

              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  end={link.to === '/'}
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      'block rounded-2xl px-4 py-3 text-sm font-semibold transition',
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="primary-button flex w-full"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Try Demo Login'}
              </Link>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={logout}
                  className="secondary-button flex w-full"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
