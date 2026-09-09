import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import MenuCard from '../components/menu/MenuCard';
import { MENU_ITEMS, HERO_IMAGE, CATEGORIES } from '../utils/mockData';

const FEATURED = MENU_ITEMS.filter(i => i.available).slice(0, 3);

const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      </svg>
    ),
    title: 'Smart Menu Management',
    desc: 'Update items, pricing, and availability across all channels instantly — no downtime, no confusion.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Guest-Centric Profiles',
    desc: 'Know your guests. Preferences, dietary notes, visit history — all in one elegant dashboard.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Real-Time Analytics',
    desc: 'Track covers, revenue, and popular dishes with beautiful, actionable reporting built for owners.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Reservation Flow',
    desc: 'A refined booking experience that reflects your brand — from online widget to floor-plan management.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '580px' }}>
        <div className="absolute inset-0 bg-charcoal">
          <img
            src={HERO_IMAGE}
            alt="Elegant plated dish"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        </div>
        <div className="relative w-full px-4 md:px-6 lg:px-8 py-24 flex flex-col justify-center" style={{ minHeight: '580px' }}>
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 text-terracotta text-xs font-semibold uppercase tracking-widest mb-5 border border-terracotta/30 px-3 py-1.5 rounded-xl">
              Premium Restaurant SaaS
            </div>
            <h1
              className="text-warm-white leading-tight mb-6"
              style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700 }}
            >
              Elevate Every Dining Experience
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              DineFlow gives exceptional restaurants the tools to operate beautifully — from first reservation to final course.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/register')}
                className="bg-terracotta hover:bg-terracotta-dark text-warm-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="border border-white/40 hover:border-white/70 text-warm-white text-sm font-medium px-6 py-3 rounded-xl transition-colors"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-warm-white border-y border-border">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
          {[
            { num: '2,400+', label: 'Restaurants' },
            { num: '18M', label: 'Covers Served' },
            { num: '98%', label: 'Uptime SLA' },
            { num: '4.9★', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label} className="text-center md:px-8">
              <div className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                {stat.num}
              </div>
              <div className="text-xs text-sage uppercase tracking-wider">{stat.label}</div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map(item => <MenuCard key={item._id} item={item} />)}
        </div>
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
            <div className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">Explore</div>
            <h2 className="text-3xl font-bold text-charcoal" style={{ fontFamily: 'Sora, sans-serif' }}>
              Browse by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
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
                  <div className="text-warm-white font-semibold text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {cat.name}
                  </div>
                  <div className="text-white/60 text-xs">{cat.count} dishes</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full px-4 md:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-2">Why DineFlow</div>
          <h2 className="text-3xl font-bold text-charcoal" style={{ fontFamily: 'Sora, sans-serif' }}>
            Built for Premium Hospitality
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BENEFITS.map(b => (
            <div key={b.title} className="flex gap-5 p-6 bg-warm-white border border-border rounded-xl hover:border-forest/30 hover:shadow-sm transition-all">
              <div className="w-11 h-11 rounded-xl bg-forest/8 flex items-center justify-center text-forest shrink-0 mt-0.5">
                {b.icon}
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {b.title}
                </h3>
                <p className="text-sm text-sage leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-forest text-warm-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-white/70 mb-8 text-base leading-relaxed">
            Join over 2,400 restaurants already using DineFlow to deliver exceptional guest experiences.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate('/register')}
              className="bg-terracotta hover:bg-terracotta-dark text-warm-white text-sm font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Start Free Trial
            </button>
            <button className="border border-white/30 hover:border-white/60 text-warm-white text-sm font-medium px-8 py-3 rounded-xl transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
