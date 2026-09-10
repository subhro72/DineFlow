
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const { user, isLoggedIn, logout } = useAuth();

  const links = [
    {
      label: 'Home',
      path: '/',
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      ),
    },
    {
      label: 'Menu',
      path: '/menu',
      icon: (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M7 3v8" />
          <path d="M4 3v5a3 3 0 0 0 6 0V3" />
          <path d="M7 11v10" />
          <path d="M17 3v18" />
          <path d="M17 3c2.2 1.8 3 4.2 3 7 0 2.8-1.2 4-3 4" />
        </svg>
      ),
    },
  ];

  const isAdmin = user?.role === 'Admin';

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setProfileOpen(false);
    navigate('/login');
  };

  const getFirstName = () => {
    if (!user?.name) {
      return isAdmin ? 'Admin' : 'User';
    }

    return user.name.split(' ')[0];
  };

  return (
    <nav className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-border">
      <div className="w-full px-4 md:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link
          to={isAdmin ? '/admin-dashboard' : '/'}
          className="font-sora font-700 text-xl text-charcoal tracking-tight hover:text-forest transition-colors"
          style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700
          }}
          onClick={() => {
            setProfileOpen(false);
            setMenuOpen(false);
          }}
        >
          Dine<span className="text-terracotta">Flow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">

          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`group flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-forest font-semibold bg-forest/8'
                  : 'text-charcoal hover:text-forest hover:bg-forest/5 hover:-translate-y-0.5'
              }`}
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {link.icon}
              </span>

              {link.label}
            </Link>
          ))}

          {/* Admin Dashboard */}
          {isAdmin && (
            <Link
              to="/admin-dashboard"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/admin-dashboard')
                  ? 'text-forest font-semibold bg-forest/8'
                  : 'text-charcoal hover:text-forest hover:bg-forest/5 hover:-translate-y-0.5'
              }`}
            >
              Dashboard
            </Link>
          )}

        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center gap-3">

          {isLoggedIn ? (
            <div
              ref={profileRef}
              className="relative flex items-center gap-3"
            >

              {/* Greeting */}
              <span className="text-sm font-medium text-charcoal">
                Hello, {getFirstName()}!
              </span>

              {/* Profile Button */}
              <button
                type="button"
                onClick={() =>
                  setProfileOpen(prev => !prev)
                }
                className="w-10 h-10 rounded-full bg-forest text-warm-white flex items-center justify-center hover:bg-forest-dark transition-colors"
                aria-label="Open profile"
                aria-expanded={profileOpen}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                  />
                  <path
                    d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-12 w-72 bg-warm-white border border-border rounded-xl shadow-lg overflow-hidden z-50">

                  {/* Profile Header */}
                  <div className="px-5 py-4 bg-ivory border-b border-border">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-forest text-warm-white flex items-center justify-center shrink-0">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle
                            cx="12"
                            cy="8"
                            r="4"
                          />
                          <path
                            d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-charcoal truncate">
                          {user?.name || 'User'}
                        </p>

                        <p className="text-xs text-sage">
                          {user?.role || 'User'}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* User Details */}
                  <div className="px-5 py-4 space-y-4">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-sage mb-1">
                        Name
                      </p>

                      <p className="text-sm font-medium text-charcoal">
                        {user?.name || 'Not available'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-sage mb-1">
                        Email
                      </p>

                      <p className="text-sm text-charcoal break-all">
                        {user?.email || 'Not available'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-sage mb-1">
                        Role
                      </p>

                      <p className="text-sm font-medium text-charcoal">
                        {user?.role || 'User'}
                      </p>
                    </div>

                  </div>

                  {/* Logout */}
                  <div className="border-t border-border p-3">

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line
                          x1="21"
                          y1="12"
                          x2="9"
                          y2="12"
                        />
                      </svg>

                      Logout
                    </button>

                  </div>

                </div>
              )}

            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-charcoal hover:text-forest transition-colors px-4 py-2"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="text-sm font-medium bg-forest text-warm-white px-4 py-2 rounded-xl hover:bg-forest-dark transition-colors inline-block"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-charcoal hover:text-forest transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-warm-white border-t border-border px-6 py-4 flex flex-col gap-3">

          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`group flex items-center gap-2 text-sm font-medium text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-forest font-semibold bg-forest/8'
                  : 'text-charcoal hover:text-forest hover:bg-forest/5'
              }`}
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {link.icon}
              </span>

              {link.label}
            </Link>
          ))}

          {/* Mobile Admin Dashboard */}
          {isAdmin && (
            <Link
              to="/admin-dashboard"
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive('/admin-dashboard')
                  ? 'text-forest font-semibold bg-forest/8'
                  : 'text-charcoal hover:text-forest hover:bg-forest/5'
              }`}
            >
              Dashboard
            </Link>
          )}

          <div className="border-t border-border pt-4 flex flex-col gap-3">

            {isLoggedIn ? (
              <>
                {/* Mobile User Info */}
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-forest text-warm-white flex items-center justify-center shrink-0">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                      />
                      <path
                        d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-charcoal">
                      Hello, {getFirstName()}!
                    </p>

                    <p className="text-xs text-sage truncate">
                      {user?.email}
                    </p>
                  </div>

                </div>

                {/* Mobile User Details */}
                <div className="bg-ivory border border-border rounded-xl p-4 space-y-3">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-sage">
                      Name
                    </p>

                    <p className="text-sm font-medium text-charcoal mt-1">
                      {user?.name || 'Not available'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-sage">
                      Email
                    </p>

                    <p className="text-sm text-charcoal break-all mt-1">
                      {user?.email || 'Not available'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-sage">
                      Role
                    </p>

                    <p className="text-sm font-medium text-charcoal mt-1">
                      {user?.role || 'User'}
                    </p>
                  </div>

                </div>

                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium bg-forest text-warm-white px-4 py-2.5 rounded-xl hover:bg-forest-dark transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line
                      x1="21"
                      y1="12"
                      x2="9"
                      y2="12"
                    />
                  </svg>

                  Logout
                </button>

              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-charcoal hover:text-forest text-left"
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
              </>
            )}

          </div>
        </div>
      )}

    </nav>
  );
}

