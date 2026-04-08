import { useDeferredValue, useEffect, useState } from 'react';
import SchemeCard from '../components/SchemeCard';
import { getSchemeCategories, getSchemes } from '../services/schemeService';

export default function Schemes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const nextCategories = await getSchemeCategories();
        if (isMounted) setCategories(nextCategories);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load categories', err);
        if (isMounted) setCategories(['All']);
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadSchemes() {
      setIsLoading(true);
      setError(null);
      try {
        const nextSchemes = await getSchemes({
          search: deferredSearchTerm,
          category: selectedCategory,
        });

        if (isMounted) setSchemes(nextSchemes);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load schemes', err);
        if (isMounted) setSchemes([]);
        setError(err?.message || 'Failed to load schemes');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadSchemes();

    return () => {
      isMounted = false;
    };
  }, [deferredSearchTerm, selectedCategory]);

  return (
    <div className="page-shell py-10 md:py-16">
      <div className="max-w-3xl">
        <p className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          Explore welfare schemes
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Discover scholarships, health support, skilling programs, and livelihood opportunities.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Browse schemes and connect them to real APIs to find tailored programs for your needs.
        </p>
      </div>

      <div className="glass-card mt-10 p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_16rem]">
          <div>
            <label htmlFor="search" className="label-text">
              Search schemes
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="input-field"
              placeholder="Search by scheme name, category, or description"
            />
          </div>

          <div>
            <label htmlFor="category" className="label-text">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="input-field"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-700">
          {isLoading ? 'Loading schemes...' : `${schemes.length} schemes found`}
        </p>
        <p className="text-sm text-slate-500">Use the search and filter to narrow results.</p>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          <p className="font-semibold">⚠️ {error}</p>
          <p className="mt-1 text-rose-600">Check if the backend server is running on port 5000.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-3xl bg-white/70 shadow-sm" />
          ))}
        </div>
      ) : schemes.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      ) : (
        <div className="glass-card mt-8 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
            📋
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">No schemes matched your filters</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Try clearing the search term or switching to a broader category.
          </p>
          <button
            type="button"
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
