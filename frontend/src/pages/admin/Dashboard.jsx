
import { useAuth } from "../../context/AuthContext";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import StatCard from '../../components/admin/StatCard';
import api from '../../services/api';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-56">
        <AdminTopbar
          title="Dashboard"
          subtitle={`Hello ${user?.name || "User"}`}
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
              // change="Live from database"
              // positive
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
              // change="Live from database"
              // positive
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

            {/* Recently Added Menu Items */}
            <div className="lg:col-span-2 bg-warm-white border border-border rounded-xl">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2
                  className="text-sm font-semibold text-charcoal"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  Recently Added
                </h2>

                <button
                  onClick={() => navigate('/admin/menu-items')}
                  className="text-xs text-forest font-medium hover:text-forest-dark transition-colors"
                >
                  View All →
                </button>
              </div>

              <div className="divide-y divide-border">
                {loading ? (
                  <div className="px-5 py-8 text-center text-xs text-sage">
                    Loading recent menu items...
                  </div>
                ) : menuItems.length === 0 ? (
                  <div className="px-5 py-8 text-center text-xs text-sage">
                    No menu items added yet.
                  </div>
                ) : (
                  menuItems.slice(0, 5).map(item => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 px-5 py-3.5"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-ivory border border-border shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-sage">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-charcoal truncate">
                          {item.name}
                        </div>

                        <div className="text-xs text-sage">
                          {item.category}
                        </div>
                      </div>

                      <div className="text-sm font-semibold text-charcoal whitespace-nowrap">
                        ₹{Number(item.price).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

