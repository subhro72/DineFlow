import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MenuCard from '../components/menu/MenuCard';
import { getMenuItems } from '../services/menuService';

const ALL_CATS = [
  'All',
  'Starter',
  'Main Course',
  'Dessert',
  'Beverage'
];

export default function Menu() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getMenuItems();

        setMenuItems(data.menuItems || []);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Failed to load menu items.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Search and category filtering
  const filtered = menuItems.filter(item => {
    const matchesCat =
      category === 'All' || item.category === category;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      {/* Page header */}
      <div className="bg-warm-white border-b border-border">
        <div className="w-full px-4 md:px-6 lg:px-8 py-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">
            Our Menu
          </div>

          <h1
            className="text-3xl font-bold text-charcoal mb-2"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Explore the Collection
          </h1>

          <p className="text-sage text-sm">
            Seasonal ingredients, timeless technique.
          </p>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8 py-8 flex-1">

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sage"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              placeholder="Search dishes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-warm-white text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {ALL_CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-colors ${
                category === cat
                  ? 'bg-forest text-warm-white border-forest'
                  : 'bg-warm-white text-sage border-border hover:border-forest/40 hover:text-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <div className="w-8 h-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin mx-auto mb-4" />

            <p className="text-sm text-sage">
              Loading menu...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-terracotta"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>

            <h3
              className="text-base font-semibold text-charcoal mb-2"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Unable to load menu
            </h3>

            <p className="text-sm text-terracotta">
              {error}
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {/* Results count */}
            <div className="text-xs text-sage mb-6">
              {filtered.length}{' '}
              {filtered.length === 1 ? 'dish' : 'dishes'} found
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-border/40 flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-sage"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>

                <h3
                  className="text-base font-semibold text-charcoal mb-2"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  No results found
                </h3>

                <p className="text-sm text-sage">
                  Try adjusting your search or category filter.
                </p>

                <button
                  onClick={() => {
                    setSearch('');
                    setCategory('All');
                  }}
                  className="mt-4 text-sm text-forest font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map(item => (
                  <MenuCard
                    key={item._id}
                    item={item}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>

      <Footer />
    </div>
  );
}