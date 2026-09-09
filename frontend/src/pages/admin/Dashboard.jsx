
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import StatCard from '../../components/admin/StatCard';
import api from '../../services/api';

const RECENT_ACTIVITY = [
  { id: 1, action: 'New user registered', detail: 'Recent registration', time: 'Recently', type: 'user' },
  { id: 2, action: 'Menu management active', detail: 'Menu data is connected to the backend', time: 'Now', type: 'menu' },
  { id: 3, action: 'System status', detail: 'Backend API connection active', time: 'Now', type: 'menu' },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const [menuResponse, usersResponse] = await Promise.all([
          api.get('/menu-items'),
          api.get('/users'),
        ]);

        setMenuItems(menuResponse.data.menuItems || []);
        setUsers(usersResponse.data.users || []);
      } catch (error) {
        console.error('Dashboard data error:', error);

        setError(
          error.response?.data?.message ||
          'Failed to load dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalMenuItems = menuItems.length;

  const availableItems = menuItems.filter(
    item => item.availability === true
  ).length;

  const adminCount = users.filter(
    user => user.role === 'Admin'
  ).length;

  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-56">
        <AdminTopbar
          title="Dashboard"
          subtitle="Good morning, Eleanor"
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />

        <main className="flex-1 p-6">

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-terracotta/20 bg-terracotta/5 px-4 py-3 text-sm text-terracotta">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            <StatCard
              label="Total Menu Items"
              value={loading ? '...' : totalMenuItems}
              change="Live from database"
              positive
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              }
            />

            <StatCard
              label="Available Items"
              value={loading ? '...' : availableItems}
              change={
                loading
                  ? 'Loading...'
                  : `${availableItems}/${totalMenuItems} active`
              }
              positive
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              }
            />

            <StatCard
              label="Registered Users"
              value={loading ? '...' : users.length}
              change="Live from database"
              positive
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              }
            />

            <StatCard
              label="Admin Users"
              value={loading ? '...' : adminCount}
              change="Current admin accounts"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                  />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
            />

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-warm-white border border-border rounded-xl">
              <div className="px-5 py-4 border-b border-border">
                <h2
                  className="text-sm font-semibold text-charcoal"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  Recent Activity
                </h2>
              </div>

              <div className="divide-y divide-border">
                {RECENT_ACTIVITY.map(item => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 px-5 py-3.5"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        item.type === 'user'
                          ? 'bg-forest/10 text-forest'
                          : item.type === 'delete'
                            ? 'bg-terracotta/10 text-terracotta'
                            : 'bg-sage/10 text-sage'
                      }`}
                    >
                      {item.type === 'user' ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      ) : item.type === 'delete' ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-charcoal">
                        {item.action}
                      </div>

                      <div className="text-xs text-sage truncate">
                        {item.detail}
                      </div>
                    </div>

                    <div className="text-xs text-sage whitespace-nowrap">
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary */}
            <div className="flex flex-col gap-4">

              {/* Menu Breakdown */}
              <div className="bg-warm-white border border-border rounded-xl p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-sage mb-4">
                  Menu Breakdown
                </div>

                {[
                  'Starter',
                  'Main Course',
                  'Dessert',
                  'Beverage',
                ].map(category => {

                  const count = menuItems.filter(
                    item => item.category === category
                  ).length;

                  const percentage =
                    totalMenuItems > 0
                      ? Math.round((count / totalMenuItems) * 100)
                      : 0;

                  return (
                    <div
                      key={category}
                      className="mb-3 last:mb-0"
                    >
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-charcoal font-medium">
                          {category}
                        </span>

                        <span className="text-sage">
                          {loading ? '...' : count}
                        </span>
                      </div>

                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forest rounded-full transition-all"
                          style={{
                            width: `${loading ? 0 : percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* System Status */}
              <div className="bg-forest rounded-xl p-5 text-warm-white">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
                  System Status
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                  <span className="text-sm font-medium">
                    {error
                      ? 'Backend connection issue'
                      : loading
                        ? 'Checking system...'
                        : 'All systems operational'}
                  </span>
                </div>

                <div className="text-xs text-white/50">
                  Backend API connected
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
                  DineFlow Management System
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

