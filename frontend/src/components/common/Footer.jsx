import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="w-full px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div
              className="font-sora text-2xl font-bold mb-4"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Dine<span className="text-terracotta">Flow</span>
            </div>
            <p className="text-sage text-sm leading-relaxed max-w-xs">
              Premium restaurant management software designed for discerning establishments. Streamline operations, delight guests.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Navigation</div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Menu', path: '/menu' },
                { label: 'Sign In', path: '/login' },
                { label: 'Register', path: '/register' },
              ].map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-sm text-sage hover:text-warm-white transition-colors text-left"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Contact</div>
            <div className="flex flex-col gap-3 text-sm text-sage">
              <span>hello@dineflow.co</span>
              <span>+1 (800) 346-3569</span>
              <span>24 Culinary Square<br />New York, NY 10001</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sage text-xs">© 2026 DineFlow. All rights reserved.</span>
          <div className="flex gap-6 text-xs text-sage">
            <span className="hover:text-warm-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-warm-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
