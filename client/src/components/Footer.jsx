import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Schemes', to: '/schemes' },
  { label: 'Profile', to: '/profile' },
  { label: 'Dashboard', to: '/dashboard' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="page-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <p className="text-lg font-bold text-white">Sahay</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              A hackathon-ready social impact platform that helps people discover
              schemes, scholarships, health programs, and skill opportunities in one place.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Explore
            </p>
            <div className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Focus Areas
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Scholarships and education aid</p>
              <p>Health protection and insurance</p>
              <p>Skilling and livelihood support</p>
              <p>Profile-based recommendations</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{new Date().getFullYear()} Sahay. Built for social impact discovery.</p>
          <p>Demo-friendly frontend foundation with reusable React components.</p>
        </div>
      </div>
    </footer>
  );
}
