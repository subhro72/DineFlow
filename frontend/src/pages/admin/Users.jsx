
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import Modal from '../../components/common/Modal';
import api from '../../services/api';

export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // FETCH USERS
  // ==========================================

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/users');

        setUsers(response.data.users || []);
      } catch (error) {
        console.error('Fetch users error:', error);

        setError(
          error.response?.data?.message ||
          'Failed to load users.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // ==========================================
  // DELETE USER
  // ==========================================

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const id = deleteTarget._id;

    try {
      setDeletingId(id);
      setDeleteError('');

      await api.delete(`/users/${id}`);

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error('Delete user error:', error);

      setDeleteError(
        error.response?.data?.message ||
        'Failed to delete user.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) return '—';

    try {
      return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      return date;
    }
  };

  // ==========================================
  // INITIALS
  // ==========================================

  const initials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  // ==========================================
  // AVATAR COLORS
  // ==========================================

  const AVATAR_COLORS = [
    'bg-forest',
    'bg-terracotta',
    'bg-sage',
    'bg-[#8B5E3C]',
    'bg-[#6B4E9B]',
    'bg-[#4E7F9B]',
  ];

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen bg-ivory">

        <AdminSidebar
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col lg:ml-56">

          <AdminTopbar
            title="Users"
            subtitle="Loading users..."
            onMenuToggle={() =>
              setSidebarOpen((o) => !o)
            }
          />

          <main className="flex-1 flex items-center justify-center">

            <div className="text-center">

              <div className="w-8 h-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin mx-auto mb-4" />

              <p className="text-sm text-sage">
                Loading users...
              </p>

            </div>

          </main>

        </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ivory">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-56">

        <AdminTopbar
          title="Users"
          subtitle={`${users.length} registered accounts`}
          onMenuToggle={() =>
            setSidebarOpen((o) => !o)
          }
        />

        <main className="flex-1 p-6">

          {/* ==========================================
              ERROR
          ========================================== */}

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta text-sm">
              {error}
            </div>
          )}

          {/* ==========================================
              SEARCH
          ========================================== */}

          <div className="relative mb-6 max-w-sm">

            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sage"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-warm-white text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
            />

          </div>

          {/* ==========================================
              USERS TABLE
          ========================================== */}

          <div className="bg-warm-white border border-border rounded-xl overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-border bg-ivory/60">

                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">
                      User
                    </th>

                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden md:table-cell">
                      Email
                    </th>

                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5">
                      Role
                    </th>

                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden lg:table-cell">
                      Registered
                    </th>

                    <th className="text-right text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-border">

                  {filtered.length === 0 ? (

                    <tr>

                      <td
                        colSpan={5}
                        className="text-center py-16 text-sage text-sm"
                      >
                        No users match your search.
                      </td>

                    </tr>

                  ) : (

                    filtered.map((user, i) => {

                      const isAdmin =
                        user.role === 'admin' ||
                        user.role === 'Admin';

                      return (

                        <tr
                          key={user._id}
                          className="hover:bg-ivory/40 transition-colors"
                        >

                          {/* USER */}

                          <td className="px-5 py-3.5">

                            <div className="flex items-center gap-3">

                              <div
                                className={`w-8 h-8 rounded-full ${
                                  AVATAR_COLORS[
                                    i % AVATAR_COLORS.length
                                  ]
                                } flex items-center justify-center text-warm-white text-xs font-semibold shrink-0`}
                              >
                                {initials(user.name)}
                              </div>

                              <span className="text-sm font-medium text-charcoal">
                                {user.name}
                              </span>

                            </div>

                          </td>

                          {/* EMAIL */}

                          <td className="px-4 py-3.5 hidden md:table-cell">

                            <span className="text-sm text-sage">
                              {user.email}
                            </span>

                          </td>

                          {/* ROLE */}

                          <td className="px-4 py-3.5">

                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-xl border ${
                                isAdmin
                                  ? 'text-forest bg-forest/8 border-forest/20'
                                  : 'text-sage bg-sage/8 border-sage/20'
                              }`}
                            >
                              {isAdmin ? 'Admin' : 'User'}
                            </span>

                          </td>

                          {/* REGISTERED */}

                          <td className="px-4 py-3.5 hidden lg:table-cell">

                            <span className="text-sm text-sage">
                              {formatDate(user.createdAt)}
                            </span>

                          </td>

                          {/* ACTION */}

                          <td className="px-5 py-3.5">

                            <div className="flex justify-end">

                              <button
                                onClick={() =>
                                  setDeleteTarget(user)
                                }
                                disabled={
                                  isAdmin ||
                                  deletingId === user._id
                                }
                                className="text-xs font-medium text-terracotta hover:text-terracotta-dark border border-terracotta/30 hover:border-terracotta px-3 py-1.5 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                title={
                                  isAdmin
                                    ? 'Cannot delete admin users'
                                    : 'Delete user'
                                }
                              >
                                {deletingId === user._id
                                  ? 'Deleting…'
                                  : 'Delete'}
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    })

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ==========================================
              USER COUNT SUMMARY
          ========================================== */}

          <div className="mt-4 flex gap-4 text-xs text-sage">

            <span>
              {
                users.filter(
                  (user) =>
                    user.role === 'admin' ||
                    user.role === 'Admin'
                ).length
              } admins
            </span>

            <span>·</span>

            <span>
              {
                users.filter(
                  (user) =>
                    user.role === 'user' ||
                    user.role === 'User'
                ).length
              } users
            </span>

          </div>

        </main>

      </div>

      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      <Modal
        open={!!deleteTarget}
        onClose={() => {
          if (!deletingId) {
            setDeleteTarget(null);
            setDeleteError('');
          }
        }}
        title="Delete User"
      >

        <p className="text-sm text-sage mb-5">

          Are you sure you want to permanently delete{' '}

          <strong className="text-charcoal">
            {deleteTarget?.name}
          </strong>

          ? This cannot be undone.

        </p>

        {/* Delete Error */}

        {deleteError && (
          <div className="mb-4 px-3 py-2 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta text-xs">
            {deleteError}
          </div>
        )}

        <div className="flex gap-3 justify-end">

          <button
            onClick={() => {
              setDeleteTarget(null);
              setDeleteError('');
            }}
            disabled={!!deletingId}
            className="text-sm font-medium text-sage hover:text-charcoal border border-border px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            disabled={!!deletingId}
            className="text-sm font-medium bg-terracotta hover:bg-terracotta-dark text-warm-white px-4 py-2 rounded-xl transition-colors disabled:opacity-70"
          >
            {deletingId ? 'Deleting…' : 'Delete User'}
          </button>

        </div>

      </Modal>

    </div>
  );
}

