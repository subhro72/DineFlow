import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import Modal from '../../components/common/Modal';
import { getMenuItems } from '../../services/menuService';
import api from '../../services/api';

export default function MenuItems() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [deleteError, setDeleteError] = useState('');

  // Category styles
  const CAT_COLORS = {
    Starter: 'text-terracotta bg-terracotta/8 border-terracotta/20',
    'Main Course': 'text-forest bg-forest/8 border-forest/20',
    Dessert: 'text-[#9B4E8E] bg-[#9B4E8E]/8 border-[#9B4E8E]/20',
    Beverage: 'text-sage bg-sage/8 border-sage/20',
  };

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getMenuItems();

        setItems(data.menuItems || []);
      } catch (error) {
        console.error('Fetch menu items error:', error);

        setError(
          error.response?.data?.message ||
          'Failed to load menu items.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Search
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Delete menu item
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const id = deleteTarget._id;

    try {
      setDeletingId(id);
      setDeleteError('');

      await api.delete(`/menu-items/${id}`);

      // Remove deleted item from UI
      setItems(prev =>
        prev.filter(item => item._id !== id)
      );

      setDeleteTarget(null);

    } catch (error) {
      console.error('Delete menu item error:', error);

      setDeleteError(
        error.response?.data?.message ||
        'Failed to delete menu item.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-ivory">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-56">

        <AdminTopbar
          title="Menu Items"
          subtitle={`${items.length} items total`}
          onMenuToggle={() => setSidebarOpen(o => !o)}
          action={
            <button
              onClick={() => navigate('/admin/menu-items/add')}
              className="bg-forest hover:bg-forest-dark text-warm-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>

              Add Item
            </button>
          }
        />

        <main className="flex-1 p-6">

          {/* Search */}
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              placeholder="Search menu items…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-warm-white text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
            />

          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta text-sm">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="bg-warm-white border border-border rounded-xl py-20 flex flex-col items-center justify-center">

              <div className="w-8 h-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin mb-4" />

              <p className="text-sm text-sage">
                Loading menu items...
              </p>

            </div>
          ) : (

            /* Table */
            <div className="bg-warm-white border border-border rounded-xl overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-border bg-ivory/60">

                      <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">
                        Item
                      </th>

                      <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden sm:table-cell">
                        Category
                      </th>

                      <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5">
                        Price
                      </th>

                      <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden md:table-cell">
                        Status
                      </th>

                      <th className="text-right text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">
                        Actions
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
                          {search
                            ? 'No items match your search.'
                            : 'No menu items yet.'
                          }
                        </td>
                      </tr>

                    ) : (

                      filtered.map(item => (

                        <tr
                          key={item._id}
                          className={`hover:bg-ivory/40 transition-colors ${
                            deletingId === item._id
                              ? 'opacity-40'
                              : ''
                          }`}
                        >

                          {/* Item */}
                          <td className="px-5 py-3.5">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 rounded-xl bg-ivory border border-border overflow-hidden shrink-0">

                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />

                              </div>

                              <span className="text-sm font-medium text-charcoal">
                                {item.name}
                              </span>

                            </div>

                          </td>

                          {/* Category */}
                          <td className="px-4 py-3.5 hidden sm:table-cell">

                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-xl border ${
                                CAT_COLORS[item.category] ||
                                'text-sage bg-sage/8 border-sage/20'
                              }`}
                            >
                              {item.category}
                            </span>

                          </td>

                          {/* Price */}
                          <td className="px-4 py-3.5">

                            <span className="text-sm font-semibold text-charcoal">
                              ${Number(item.price).toFixed(2)}
                            </span>

                          </td>

                          {/* Status */}
                          <td className="px-4 py-3.5 hidden md:table-cell">

                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-xl border ${
                                item.availability
                                  ? 'text-success bg-success/8 border-success/20'
                                  : 'text-sage bg-sage/8 border-sage/20'
                              }`}
                            >
                              {item.availability
                                ? 'Available'
                                : 'Unavailable'
                              }
                            </span>

                          </td>

                          {/* Actions */}
                          <td className="px-5 py-3.5">

                            <div className="flex items-center justify-end gap-2">

                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/menu-items/edit/${item._id}`
                                  )
                                }
                                className="text-xs font-medium text-forest hover:text-forest-dark border border-forest/30 hover:border-forest px-3 py-1.5 rounded-xl transition-colors"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => {
                                  setDeleteTarget(item);
                                  setDeleteError('');
                                }}
                                disabled={deletingId === item._id}
                                className="text-xs font-medium text-terracotta hover:text-terracotta-dark border border-terracotta/30 hover:border-terracotta px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </main>

      </div>

      {/* Delete Modal */}
      <Modal
        open={!!deleteTarget}
        onClose={() => {
          if (!deletingId) {
            setDeleteTarget(null);
            setDeleteError('');
          }
        }}
        title="Delete Menu Item"
      >

        <p className="text-sm text-sage mb-5">

          Are you sure you want to delete{' '}

          <strong className="text-charcoal">
            {deleteTarget?.name}
          </strong>
          ?

          <br />

          This action cannot be undone.

        </p>

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
            className="text-sm font-medium bg-terracotta hover:bg-terracotta-dark text-warm-white px-4 py-2 rounded-xl transition-colors disabled:opacity-70 flex items-center gap-2"
          >

            {deletingId ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting…
              </>
            ) : (
              'Delete Item'
            )}

          </button>

        </div>

      </Modal>

    </div>
  );
}