import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import StatCard from '../../components/admin/StatCard';
import { MENU_ITEMS, USERS } from '../../utils/mockData';

const RECENT_ACTIVITY = [
  { id: 1, action: 'New user registered', detail: 'Vivienne Hartley joined', time: '2 min ago', type: 'user' },
  { id: 2, action: 'Menu item updated', detail: 'Wagyu Beef Tenderloin — price revised to $68', time: '18 min ago', type: 'menu' },
  { id: 3, action: 'Item marked unavailable', detail: 'Truffle Mushroom Risotto', time: '1 hr ago', type: 'menu' },
  { id: 4, action: 'New user registered', detail: 'Theodore Ashford joined', time: '3 hr ago', type: 'user' },
  { id: 5, action: 'Menu item added', detail: 'Sommelier Wine Selection — $18', time: '5 hr ago', type: 'menu' },
  { id: 6, action: 'User removed', detail: 'guest@test.com deleted', time: 'Yesterday', type: 'delete' },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const availableItems = MENU_ITEMS.filter(i => i.available).length;
  const adminCount = USERS.filter(u => u.role === 'admin').length;

  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-56">
        <AdminTopbar
          title="Dashboard"
          subtitle="Good morning, Eleanor"
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />

        <main className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Menu Items"
              value={MENU_ITEMS.length}
              change="+2 this week"
              positive
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              }
            />
            <StatCard
              label="Available Items"
              value={availableItems}
              change={`${availableItems}/${MENU_ITEMS.length} active`}
              positive
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              }
            />
            <StatCard
              label="Registered Users"
              value={USERS.length}
              change="+1 today"
              positive
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              }
            />
            <StatCard
              label="Admin Users"
              value={adminCount}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-warm-white border border-border rounded-xl">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-semibold text-charcoal" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Recent Activity
                </h2>
              </div>
              <div className="divide-y divide-border">
                {RECENT_ACTIVITY.map(item => (
                  <div key={item.id} className="flex items-start gap-4 px-5 py-3.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      item.type === 'user' ? 'bg-forest/10 text-forest' :
                      item.type === 'delete' ? 'bg-terracotta/10 text-terracotta' :
                      'bg-sage/10 text-sage'
                    }`}>
                      {item.type === 'user' ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                      ) : item.type === 'delete' ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-charcoal">{item.action}</div>
                      <div className="text-xs text-sage truncate">{item.detail}</div>
                    </div>
                    <div className="text-xs text-sage whitespace-nowrap">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick summary */}
            <div className="flex flex-col gap-4">
              <div className="bg-warm-white border border-border rounded-xl p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-sage mb-4">Menu Breakdown</div>
                {(['Starters', 'Mains', 'Pasta', 'Desserts', 'Drinks']).map(cat => {
                  const count = MENU_ITEMS.filter(i => i.category === cat).length;
                  const pct = Math.round((count / MENU_ITEMS.length) * 100);
                  return (
                    <div key={cat} className="mb-3 last:mb-0">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-charcoal font-medium">{cat}</span>
                        <span className="text-sage">{count}</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forest rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-forest rounded-xl p-5 text-warm-white">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">System Status</div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium">All systems operational</span>
                </div>
                <div className="text-xs text-white/50">Last checked: just now</div>
                <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
                  99.9% uptime this month
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
