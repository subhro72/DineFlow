import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MenuCard from '../components/menu/MenuCard';

import { HERO_IMAGE } from '../utils/mockData';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BENEFITS = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      </svg>
    ),
    title: 'Smart Menu Management',
    desc: 'Manage dishes, prices, availability, and images from one place.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h6M7 16h4" />
      </svg>
    ),
    title: 'Simple Admin Dashboard',
    desc: 'Get a quick overview of your menu and registered users.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 11a8 8 0 0 1 16 0" />
        <path d="M4 11v5a2 2 0 0 0 2 2h1" />
        <path d="M20 11v5a2 2 0 0 1-2 2h-1" />
        <path d="M9 18h6" />
      </svg>
    ),
    title: 'Easy Guest Experience',
    desc: 'Let customers browse the menu and view detailed dishes without logging in.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    ),
    title: 'Secure Authentication',
    desc: 'Separate admin and user access with protected routes and JWT authentication.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  const { user, isLoggedIn } = useAuth();

  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [menuError, setMenuError] = useState('');

  // Fetch real menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoadingMenu(true);
        setMenuError('');

        const response = await api.get('/menu-items');

        if (response.data.success) {
          setMenuItems(response.data.menuItems || []);
        }
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
        setMenuError('Unable to load menu items right now.');
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Only show available dishes as Signature Dishes
  const featuredItems = menuItems
    .filter((item) => item.availability === true)
    .slice(0, 3);

  // Build category information from real backend menu items
  const categoryNames = [
    'Starter',
    'Main Course',
    'Dessert',
    'Beverage',
  ];

  const categoryImages = {
    Starter:
      'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=800&q=80',

    'Main Course':
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',

    Dessert:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',

    Beverage:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80',
  };

  const categories = categoryNames.map((category) => {
    const count = menuItems.filter(
      (item) =>
        item.category === category &&
        item.availability === true
    ).length;

    return {
      name: category,
      count,
      image: categoryImages[category],
    };
  });

  // Decide the primary CTA based on authentication state
  const getPrimaryCta = () => {
    if (!isLoggedIn) {
      return {
        label: 'Start Free Trial',
        action: () => navigate('/register'),
      };
    }

    if (user?.role === 'Admin') {
      return {
        label: 'Go to Dashboard',
        action: () => navigate('/admin-dashboard'),
      };
    }

    return {
      label: 'Browse Menu',
      action: () => navigate('/menu'),
    };
  };

  const primaryCta = getPrimaryCta();

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '580px' }}
      >
        <div className="absolute inset-0 bg-charcoal">
          <img
            src={HERO_IMAGE}
            alt="Elegant plated dish"
            className="w-full h-full object-cover opacity-50"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        </div>

        <div
          className="relative w-full px-4 md:px-6 lg:px-8 py-24 flex flex-col justify-center"
          style={{ minHeight: '580px' }}
        >
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 text-terracotta text-xs font-semibold uppercase tracking-widest mb-5 border border-terracotta/30 px-3 py-1.5 rounded-xl">
              Premium Restaurant SaaS
            </div>

            <h1
              className="text-warm-white leading-tight mb-6"
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 700,
              }}
            >
              Elevate Every Dining Experience
            </h1>

            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              DineFlow gives exceptional restaurants the tools to operate
              beautifully — from first reservation to final course.
            </p>

            <div className="flex flex-wrap gap-3">
              {/* Dynamic Primary CTA */}
              <button
                onClick={primaryCta.action}
                className="bg-terracotta hover:bg-terracotta-dark text-warm-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {primaryCta.label}
              </button>

              {/* Secondary Browse Menu button */}
              {primaryCta.label !== 'Browse Menu' && (
                <button
                  onClick={() => navigate('/menu')}
                  className="border border-white/40 hover:border-white/70 text-warm-white text-sm font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  Browse Menu
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="bg-warm-white border-y border-border">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
          {[
            {
              title: 'Menu Management',
              desc: 'Manage dishes, prices, and availability',
            },
            {
              title: 'Role-Based Access',
              desc: 'Separate Admin and User permissions',
            },
            {
              title: 'Cloud Image Storage',
              desc: 'Secure menu images with Cloudinary',
            },
            {
              title: 'Secure Authentication',
              desc: 'JWT-based protected access',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="text-center md:px-8"
            >
              <div
                className="text-sm font-semibold text-charcoal mb-1"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {feature.title}
              </div>

              <div className="text-xs text-sage leading-relaxed">
                {feature.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="w-full px-4 md:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">
              Signature Dishes
            </div>

            <h2
              className="text-3xl font-bold text-charcoal"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              From Our Kitchen
            </h2>
          </div>

          <button
            onClick={() => navigate('/menu')}
            className="hidden md:block text-sm text-forest font-medium hover:text-forest-dark transition-colors"
          >
            View Full Menu →
          </button>
        </div>

        {loadingMenu ? (
          <div className="text-center py-12 text-sage">
            Loading our signature dishes...
          </div>
        ) : menuError ? (
          <div className="text-center py-12 text-sage">
            {menuError}
          </div>
        ) : featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <MenuCard
                key={item._id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-sage">
            No signature dishes available right now.
          </div>
        )}

        <div className="mt-8 md:hidden">
          <button
            onClick={() => navigate('/menu')}
            className="w-full text-center text-sm text-forest font-medium border border-forest/30 py-3 rounded-xl hover:bg-forest/5 transition-colors"
          >
            View Full Menu →
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-warm-white border-y border-border py-16">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">
              Explore
            </div>

            <h2
              className="text-3xl font-bold text-charcoal"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Browse by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate('/menu')}
                className="group relative rounded-xl overflow-hidden border border-border hover:border-forest/40 transition-all"
                style={{ height: '160px' }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className="text-warm-white font-semibold text-sm"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {cat.name}
                  </div>

                  <div className="text-white/60 text-xs">
                    {cat.count} dishes
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full px-4 md:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">
            Why DineFlow
          </div>

          <h2
            className="text-3xl font-bold text-charcoal"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Built for Smarter Restaurant Management
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="flex gap-5 p-6 bg-warm-white border border-border rounded-xl hover:border-forest/30 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-forest/8 flex items-center justify-center text-forest shrink-0 mt-0.5">
                {b.icon}
              </div>

              <div>
                <h3
                  className="font-semibold text-charcoal mb-2"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  {b.title}
                </h3>

                <p className="text-sm text-sage leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      {/* CTA Banner */}
<section className="bg-forest text-warm-white py-16">
  <div className="max-w-3xl mx-auto px-6 text-center">
    <h2
      className="text-3xl font-bold mb-4"
      style={{ fontFamily: 'Sora, sans-serif' }}
    >
      Ready to Experience DineFlow?
    </h2>

    <p className="text-white/70 mb-8 text-base leading-relaxed">
      Explore the menu or manage your restaurant from one simple platform.
    </p>

    <div className="flex justify-center">
      <button
        onClick={primaryCta.action}
        className="bg-terracotta hover:bg-terracotta-dark text-warm-white text-sm font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        {primaryCta.label}
      </button>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}

