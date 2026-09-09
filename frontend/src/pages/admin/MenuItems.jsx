import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import Modal from '../../components/common/Modal';
import { MENU_ITEMS as INITIAL } from '../../utils/mockData';

export default function MenuItems() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState(INITIAL);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget._id || deleteTarget.id);
    setTimeout(() => {
      setItems(prev => prev.filter(i => (i._id || i.id) !== (deleteTarget._id || deleteTarget.id)));
      setDeleteTarget(null);
      setDeletingId(null);
    }, 700);
  };

  const CAT_COLORS = {
    Starters: 'text-terracotta bg-terracotta/8 border-terracotta/20',
    Mains: 'text-forest bg-forest/8 border-forest/20',
    Pasta: 'text-[#8B5E3C] bg-[#8B5E3C]/8 border-[#8B5E3C]/20',
    Desserts: 'text-[#9B4E8E] bg-[#9B4E8E]/8 border-[#9B4E8E]/20',
    Drinks: 'text-sage bg-sage/8 border-sage/20',
  };

  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add Item
            </button>
          }
        />

        <main className="flex-1 p-6">
          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search menu items…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-warm-white text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
            />
          </div>

          {/* Table */}
          <div className="bg-warm-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-ivory/60">
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">Item</th>
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden sm:table-cell">Category</th>
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5">Price</th>
                    <th className="text-left text-xs font-semibold text-sage uppercase tracking-wider px-4 py-3.5 hidden md:table-cell">Status</th>
                    <th className="text-right text-xs font-semibold text-sage uppercase tracking-wider px-5 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16 text-sage text-sm">
                        {search ? 'No items match your search.' : 'No menu items yet.'}
                      </td>
                    </tr>
                  ) : filtered.map(item => (
                    <tr key={item._id || item.id} className={`hover:bg-ivory/40 transition-colors ${deletingId === (item._id || item.id) ? 'opacity-40' : ''}`}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-ivory border border-border overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-medium text-charcoal">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden sm:table-cell">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-xl border ${CAT_COLORS[item.category] || 'text-sage bg-sage/8 border-sage/20'}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-sm font-semibold text-charcoal">${Number(item.price).toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-xl border ${
                          item.available
                            ? 'text-success bg-success/8 border-success/20'
                            : 'text-sage bg-sage/8 border-sage/20'
                        }`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/menu-items/edit/${item._id || item.id}`)}
                            className="text-xs font-medium text-forest hover:text-forest-dark border border-forest/30 hover:border-forest px-3 py-1.5 rounded-xl transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="text-xs font-medium text-terracotta hover:text-terracotta-dark border border-terracotta/30 hover:border-terracotta px-3 py-1.5 rounded-xl transition-colors"
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
        </main>
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Menu Item"
      >
        <p className="text-sm text-sage mb-5">
          Are you sure you want to delete <strong className="text-charcoal">{deleteTarget?.name}</strong>?
          This action cannot be undone.
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
            Delete Item
          </button>
        </div>
      </Modal>
    </div>
  );
}
