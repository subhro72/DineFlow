import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  {
    label: 'Dashboard',
    path: '/admin-dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Menu Items',
    path: '/admin/menu-items',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    ),
  },
  {
    label: 'Users',
    path: '/admin/users',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ sidebarOpen = true, onClose }) {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path || (path === '/admin/menu-items' && (location.pathname === '/admin/menu-items/add' || location.pathname.startsWith('/admin/menu-items/edit')));

  return (
    <>
      {sidebarOpen && onClose && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-56 bg-charcoal flex flex-col z-40 transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-5 h-16 flex items-center border-b border-white/10">
          <Link
            to="/"
            className="font-sora text-lg font-bold text-warm-white"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Dine<span className="text-terracotta">Flow</span>
          </Link>
        </div>

        <div className="px-3 py-2 mt-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/30 px-2 mb-3">
            Management
          </div>
          <nav className="flex flex-col gap-0.5">
            {NAV.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left w-full ${
                  isActive(item.path)
                    ? 'bg-forest text-warm-white'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto px-3 pb-5">
          <div className="border-t border-white/10 pt-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors w-full"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Back to Site
            </Link>
          </div>
          <div className="mt-4 px-3 py-3 rounded-xl bg-white/5">
            <div className="text-xs font-semibold text-white/80">Eleanor Whitmore</div>
            <div className="text-xs text-white/40 mt-0.5">Super Admin</div>
          </div>
        </div>
      </aside>
    </>
  );
}
