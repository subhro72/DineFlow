import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-border">
      <div className="w-full px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-sora font-700 text-xl text-charcoal tracking-tight hover:text-forest transition-colors"
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }}
        >
          Dine<span className="text-terracotta">Flow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-forest'
                  : 'text-sage hover:text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-sage hover:text-charcoal transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-forest text-warm-white px-4 py-2 rounded-xl hover:bg-forest-dark transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-sage hover:text-charcoal"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-warm-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium text-left transition-colors ${
                isActive(link.path) ? 'text-forest' : 'text-sage hover:text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border pt-4 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-sage hover:text-charcoal text-left"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium bg-forest text-warm-white px-4 py-2 rounded-xl text-center hover:bg-forest-dark transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
