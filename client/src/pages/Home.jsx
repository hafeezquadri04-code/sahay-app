import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedSchemeCategories, getSchemes } from '../services/schemeService';
import Loader from '../components/Loader';

const howItWorks = [
  {
    title: 'Build your profile',
    description: 'Tell Sahay about your education, income, location, and goals in one simple form.',
  },
  {
    title: 'Discover matching schemes',
    description: 'Get curated welfare schemes, scholarships, health programs, and skilling options.',
  },
  {
    title: 'Take action faster',
    description: 'Read eligibility, documents, and application steps without searching across multiple portals.',
  },
];

const whyUseSahay = [
  {
    title: 'One view of opportunities',
    description: 'Bring scattered public welfare information into a single, beginner-friendly experience.',
  },
  {
    title: 'Profile-driven guidance',
    description: 'Surface the schemes that are more relevant for students, workers, families, and job seekers.',
  },
  {
    title: 'Hackathon demo ready',
    description: 'Clean visuals, practical flows, and mock services that can connect to your backend later.',
  },
];

export default function Home() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [featuredSchemes, setFeaturedSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      setIsLoading(true);
      setError(null);
      try {
        const [categories, schemes] = await Promise.all([
          getFeaturedSchemeCategories(),
          getSchemes(),
        ]);

        if (isMounted) {
          setFeaturedCategories(categories);
          setFeaturedSchemes(schemes.slice(0, 3));
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load home data', err);
        if (isMounted) setError(err?.message || 'Failed to load content');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="pb-16 pt-8 md:pb-24">
      <section className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
              Social impact discovery for real people
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find the right government support without the confusion.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Sahay helps users discover welfare schemes, scholarships, health programs,
              and skill opportunities based on their profile, location, and life stage.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/schemes" className="primary-button">
                Explore Schemes
              </Link>
              <Link to="/profile" className="secondary-button">
                Build Your Profile
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="glass-card p-5">
                <p className="text-3xl font-bold text-slate-900">50+</p>
                <p className="mt-2 text-sm text-slate-600">Scheme categories that can be plugged in</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-3xl font-bold text-slate-900">3 min</p>
                <p className="mt-2 text-sm text-slate-600">To complete a profile and start matching</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-3xl font-bold text-slate-900">1 hub</p>
                <p className="mt-2 text-sm text-slate-600">For scholarships, health, skills, and support</p>
              </div>
            </div>
          </div>

          <div className="glass-card overflow-hidden p-6 sm:p-8">
            <div className="rounded-3xl bg-slate-900 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Demo snapshot
              </p>
              <h2 className="mt-3 text-2xl font-bold">What Sahay can surface in one glance</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Education support</p>
                  <p className="mt-2 text-2xl font-bold">Scholarships</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Security for families</p>
                  <p className="mt-2 text-2xl font-bold">Health cover</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Career growth</p>
                  <p className="mt-2 text-2xl font-bold">Skill programs</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Better outcomes</p>
                  <p className="mt-2 text-2xl font-bold">Profile matching</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {isLoading ? (
                <Loader />
              ) : featuredSchemes.length > 0 ? (
                featuredSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{scheme.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{scheme.eligibilitySummary}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {scheme.category}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-600">No featured schemes available.</div>
              )}
              {error && (
                <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-24">
        <div className="max-w-2xl">
          <h2 className="section-title">How it works</h2>
          <p className="section-copy">
            A simple three-step flow that is easy to explain in a hackathon demo and easy for users to understand.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <div key={item.title} className="glass-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-bold text-emerald-700">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="section-title">Why use Sahay</h2>
            <p className="section-copy">
              Built for clarity, trust, and quick discovery so people spend less time searching and more time applying.
            </p>
            <Link to="/dashboard" className="secondary-button mt-8">
              Preview Dashboard
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {whyUseSahay.map((item) => (
              <div key={item.title} className="glass-card p-6">
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="section-title">Featured scheme categories</h2>
            <p className="section-copy">
              Highlight key opportunity areas for students, workers, families, and communities.
            </p>
          </div>

          <Link to="/schemes" className="secondary-button">
            Browse all schemes
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredCategories.map((category) => (
            <div key={category.name} className="glass-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {category.count} opportunities
              </p>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">{category.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
