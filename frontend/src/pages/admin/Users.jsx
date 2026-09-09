import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import Modal from '../../components/common/Modal';
import { USERS as INITIAL } from '../../utils/mockData';

export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState(INITIAL);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setUsers(prev => prev.filter(u => (u._id || u.id) !== (deleteTarget._id || deleteTarget.id)));
    setDeleteTarget(null);
  };

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return d;
    }
  };

  const initials = (name) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const AVATAR_COLORS = ['bg-forest', 'bg-terracotta', 'bg-sage', 'bg-[#8B5E3C]', 'bg-[#6B4E9B]', 'bg-[#4E7F9B]'];

  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-56">
        <AdminTopbar
          title="Users"
          subtitle={`${users.length} registered accounts`}
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />

        <main className="flex-1 p-6">
          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-warm-white text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
            />
          </div>

          <div className="bg-warm-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-ivory/60">
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">User</th>
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden md:table-cell">Email</th>
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5">Role</th>
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden lg:table-cell">Registered</th>
                    <th className="text-right text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16 text-sage text-sm">
                        No users match your search.
                      </td>
                    </tr>
                  ) : filtered.map((user, i) => (
                    <tr key={user._id || user.id} className="hover:bg-ivory/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-warm-white text-xs font-semibold shrink-0`}>
                            {initials(user.name)}
                          </div>
                          <span className="text-sm font-medium text-charcoal">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-sage">{user.email}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-xl border ${
                          user.role === 'admin' || user.role === 'Admin'
                            ? 'text-forest bg-forest/8 border-forest/20'
                            : 'text-sage bg-sage/8 border-sage/20'
                        }`}>
                          {user.role === 'admin' || user.role === 'Admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-sage">{formatDate(user.registeredAt || user.createdAt)}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end">
                          <button
                            onClick={() => setDeleteTarget(user)}
                            disabled={user.role === 'admin' || user.role === 'Admin'}
                            className="text-xs font-medium text-terracotta hover:text-terracotta-dark border border-terracotta/30 hover:border-terracotta px-3 py-1.5 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title={user.role === 'admin' || user.role === 'Admin' ? 'Cannot delete admin users' : 'Delete user'}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User count summary */}
          <div className="mt-4 flex gap-4 text-xs text-sage">
            <span>{users.filter(u => u.role === 'admin' || u.role === 'Admin').length} admins</span>
            <span>·</span>
            <span>{users.filter(u => u.role === 'user' || u.role === 'User').length} users</span>
          </div>
        </main>
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete User"
      >
        <p className="text-sm text-sage mb-5">
          Are you sure you want to permanently delete{' '}
          <strong className="text-charcoal">{deleteTarget?.name}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setDeleteTarget(null)}
            className="text-sm font-medium text-sage hover:text-charcoal border border-border px-4 py-2 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="text-sm font-medium bg-terracotta hover:bg-terracotta-dark text-warm-white px-4 py-2 rounded-xl transition-colors"
          >
            Delete User
          </button>
        </div>
      </Modal>
    </div>
  );
}
