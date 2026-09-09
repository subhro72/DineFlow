
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import api from '../../services/api';

const CATEGORIES = [
  'Starter',
  'Main Course',
  'Dessert',
  'Beverage',
];

export default function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [item, setItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Main Course',
    price: '',
    availability: true,
    image: null,
  });

  // ==========================================
  // FETCH MENU ITEM
  // ==========================================

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        setServerError('');

        const response = await api.get(`/menu-items/${id}`);

        const existingItem = response.data.menuItem;

        setItem(existingItem);

        setForm({
          name: existingItem.name || '',
          description: existingItem.description || '',
          category: existingItem.category || 'Main Course',
          price: existingItem.price?.toString() || '',
          availability: existingItem.availability ?? true,
          image: null,
        });
      } catch (error) {
        console.error('Fetch menu item error:', error);

        setServerError(
          error.response?.data?.message ||
          'Failed to load menu item.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  // ==========================================
  // VALIDATION
  // ==========================================

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = 'Name is required.';
    }

    if (!form.description.trim()) {
      e.description = 'Description is required.';
    }

    if (
      !form.price ||
      isNaN(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      e.price = 'A valid price is required.';
    }

    return e;
  };

  // ==========================================
  // IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setForm((prev) => ({
      ...prev,
      image: file || null,
    }));

    setErrors((prev) => ({
      ...prev,
      image: '',
    }));
  };

  // ==========================================
  // SUBMIT / UPDATE MENU ITEM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    setErrors(errs);
    setServerError('');

    if (Object.keys(errs).length > 0) {
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append('name', form.name.trim());
      formData.append('description', form.description.trim());
      formData.append('category', form.category);
      formData.append('price', form.price);
      formData.append('availability', form.availability);

      // Only send an image if the admin selected a new one
      if (form.image) {
        formData.append('image', form.image);
      }

      const response = await api.put(
        `/menu-items/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Menu item updated:', response.data);

      setItem(response.data.menuItem);

      setSaved(true);

      setTimeout(() => {
        navigate('/admin/menu-items');
      }, 1000);
    } catch (error) {
      console.error('Update menu item error:', error);

      setServerError(
        error.response?.data?.message ||
        'Failed to update menu item.'
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // INPUT STYLING
  // ==========================================

  const field = (fieldId) => ({
    className: `w-full px-3 py-2.5 text-sm border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:ring-1 transition-colors ${
      errors[fieldId]
        ? 'border-terracotta focus:border-terracotta focus:ring-terracotta/20'
        : 'border-border focus:border-forest focus:ring-forest/20'
    }`,
  });

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
            title="Edit Menu Item"
            subtitle="Loading item..."
            onMenuToggle={() => setSidebarOpen((o) => !o)}
          />

          <main className="flex-1 flex items-center justify-center">

            <div className="text-center">

              <div className="w-8 h-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin mx-auto mb-4" />

              <p className="text-sm text-sage">
                Loading menu item...
              </p>

            </div>

          </main>

        </div>

      </div>
    );
  }

  // ==========================================
  // ITEM NOT FOUND
  // ==========================================

  if (!item) {
    return (
      <div className="flex min-h-screen bg-ivory">

        <AdminSidebar
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col lg:ml-56">

          <AdminTopbar
            title="Edit Menu Item"
            subtitle="Item unavailable"
            onMenuToggle={() => setSidebarOpen((o) => !o)}
          />

          <main className="flex-1 flex items-center justify-center">

            <div className="text-center">

              <p className="text-sm text-terracotta mb-4">
                {serverError || 'Item not found.'}
              </p>

              <button
                onClick={() => navigate('/admin/menu-items')}
                className="text-sm text-forest font-medium hover:underline"
              >
                Go back
              </button>

            </div>

          </main>

        </div>

      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="flex min-h-screen bg-ivory">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:ml-56">

        <AdminTopbar
          title="Edit Menu Item"
          subtitle={`Editing: ${item.name}`}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
        />

        <main className="flex-1 p-6">

          <div className="max-w-2xl mx-auto">

            {/* Back Button */}

            <button
              onClick={() => navigate('/admin/menu-items')}
              className="flex items-center gap-2 text-sm text-sage hover:text-charcoal transition-colors mb-6"
            >

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>

              Back to Menu Items

            </button>

            {/* Success Message */}

            {saved && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2">

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>

                Item updated successfully. Redirecting…

              </div>
            )}

            {/* Server Error */}

            {serverError && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta text-sm">
                {serverError}
              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="bg-warm-white border border-border rounded-xl p-6 flex flex-col gap-5"
            >

              {/* ================= NAME ================= */}

              <div>

                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Dish Name <span className="text-terracotta">*</span>
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                    }))
                  }
                  placeholder="e.g. Pan-Seared Atlantic Salmon"
                  {...field('name')}
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-terracotta">
                    {errors.name}
                  </p>
                )}

              </div>

              {/* ================= DESCRIPTION ================= */}

              <div>

                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Description <span className="text-terracotta">*</span>
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe the dish — ingredients, preparation, flavour profile…"
                  rows={4}
                  className={field('description').className}
                />

                {errors.description && (
                  <p className="mt-1 text-xs text-terracotta">
                    {errors.description}
                  </p>
                )}

              </div>

              {/* ================= CATEGORY + PRICE ================= */}

              <div className="grid grid-cols-2 gap-4">

                {/* Category */}

                <div>

                  <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                  >

                    {CATEGORIES.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Price */}

                <div>

                  <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                    Price (USD) <span className="text-terracotta">*</span>
                  </label>

                  <div className="relative">

                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage text-sm">
                      $
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          price: e.target.value,
                        }))
                      }
                      placeholder="0.00"
                      className={`${field('price').className} pl-7`}
                    />

                  </div>

                  {errors.price && (
                    <p className="mt-1 text-xs text-terracotta">
                      {errors.price}
                    </p>
                  )}

                </div>

              </div>

              {/* ================= IMAGE ================= */}

              <div>

                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Dish Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                />

                {/* New Image Preview */}

                {form.image && (
                  <div className="mt-3">

                    <div className="w-32 h-24 rounded-xl border border-border overflow-hidden">

                      <img
                        src={URL.createObjectURL(form.image)}
                        alt="New preview"
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <p className="mt-1 text-xs text-sage">
                      New image: {form.image.name}
                    </p>

                  </div>
                )}

                {/* Existing Image Preview */}

                {!form.image && item.image && (
                  <div className="mt-3">

                    <div className="w-32 h-24 rounded-xl border border-border overflow-hidden">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <p className="mt-1 text-xs text-sage">
                      Current image
                    </p>

                  </div>
                )}

              </div>

              {/* ================= AVAILABILITY ================= */}

              <div className="flex items-center justify-between p-4 bg-ivory rounded-xl border border-border">

                <div>

                  <div className="text-sm font-semibold text-charcoal">
                    Availability
                  </div>

                  <div className="text-xs text-sage mt-0.5">
                    Control whether this item appears on the public menu
                  </div>

                </div>

                <button
                  type="button"
                  aria-pressed={form.availability}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      availability: !prev.availability,
                    }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    form.availability
                      ? 'bg-forest'
                      : 'bg-border'
                  }`}
                >

                  <span
                    className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      form.availability
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />

                </button>

              </div>

              {/* ================= ACTIONS ================= */}

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
                  ) : (
                    'Save Changes'
                  )}

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

