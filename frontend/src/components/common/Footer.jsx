
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Footer() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const isAdmin = user?.role === 'Admin';

  const guestLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Sign In', path: '/login' },
    { label: 'Register', path: '/register' },
  ];

  const userLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="w-full px-4 md:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="font-sora text-2xl font-bold mb-4"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Dine<span className="text-terracotta">Flow</span>
            </div>

            <p className="text-sage text-sm leading-relaxed max-w-xs">
              Premium restaurant management software designed for
              discerning establishments. Streamline operations,
              delight guests.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">
              Navigation
            </div>

            <div className="flex flex-col gap-3">

              {/* Guest Navigation */}
              {!isLoggedIn &&
                guestLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-sage hover:text-warm-white transition-colors text-left"
                  >
                    {link.label}
                  </Link>
                ))}

              {/* Logged-in User Navigation */}
              {isLoggedIn &&
                userLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-sage hover:text-warm-white transition-colors text-left"
                  >
                    {link.label}
                  </Link>
                ))}

              {/* Admin Dashboard */}
              {isAdmin && (
                <Link
                  to="/admin-dashboard"
                  className="text-sm text-sage hover:text-warm-white transition-colors text-left"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Logout */}
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm text-sage hover:text-warm-white transition-colors text-left"
                >
                  Logout
                </button>
              )}

            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">
              Contact
            </div>

            <div className="flex flex-col gap-3 text-sm text-sage">
              <span>DineFlow Support</span>

              <span>
                Kolkata, West Bengal, India
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <span className="text-sage text-xs">
            © 2026 DineFlow. All rights reserved.
          </span>

          <div className="flex gap-6 text-xs text-sage">

            <Link
              to="/privacy-policy"
              className="hover:text-warm-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="hover:text-warm-white transition-colors"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}

