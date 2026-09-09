import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';

const CATEGORIES = ['Starters', 'Mains', 'Pasta', 'Desserts', 'Drinks'];

export default function AddMenuItem() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Mains',
    price: '',
    available: true,
    image: '',
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = 'A valid price is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => navigate('/admin/menu-items'), 1000);
    }, 1200);
  };

  const field = (id) => ({
    className: `w-full px-3 py-2.5 text-sm border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:ring-1 transition-colors ${
      errors[id]
        ? 'border-terracotta focus:border-terracotta focus:ring-terracotta/20'
        : 'border-border focus:border-forest focus:ring-forest/20'
    }`,
  });

  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-56">
        <AdminTopbar
          title="Add Menu Item"
          subtitle="Create a new dish"
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />

        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/admin/menu-items')}
              className="flex items-center gap-2 text-sm text-sage hover:text-charcoal transition-colors mb-6"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Menu Items
            </button>

            {saved && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Item created successfully. Redirecting…
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-warm-white border border-border rounded-xl p-6 flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Dish Name <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Pan-Seared Atlantic Salmon"
                  {...field('name')}
                />
                {errors.name && <p className="mt-1 text-xs text-terracotta">{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Description <span className="text-terracotta">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the dish — ingredients, preparation, flavour profile…"
                  rows={4}
                  className={field('description').className}
                />
                {errors.description && <p className="mt-1 text-xs text-terracotta">{errors.description}</p>}
              </div>

              {/* Category + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                    Price (USD) <span className="text-terracotta">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                      placeholder="0.00"
                      className={`${field('price').className} pl-7`}
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-xs text-terracotta">{errors.price}</p>}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                  placeholder="https://…"
                  {...field('image')}
                />
                {form.image && (
                  <div className="mt-2 w-24 h-16 rounded-xl border border-border overflow-hidden">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between p-4 bg-ivory rounded-xl border border-border">
                <div>
                  <div className="text-sm font-semibold text-charcoal">Availability</div>
                  <div className="text-xs text-sage mt-0.5">Control whether this item appears on the public menu</div>
                </div>
                <button
  type="button"
  aria-pressed={form.available}
  onClick={() =>
    setForm(prev => ({
      ...prev,
      available: !prev.available,
    }))
  }
  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
    form.available ? 'bg-forest' : 'bg-border'
  }`}
>
  <span
    className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
      form.available ? 'translate-x-6' : 'translate-x-1'
    }`}
  />
</button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || saved}
                  className="bg-forest hover:bg-forest-dark disabled:opacity-70 text-warm-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving…
                    </>
                  ) : 'Create Item'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/menu-items')}
                  className="text-sm font-medium text-sage hover:text-charcoal border border-border px-6 py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
