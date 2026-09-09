import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-charcoal flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-forest-dark"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1663530761401-15eefb544889?w=900&h=1200&fit=crop&auto=format)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-forest-dark/70" />
        <div className="relative">
          <div className="font-sora text-2xl font-bold text-warm-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            Dine<span className="text-terracotta">Flow</span>
          </div>
        </div>
        <div className="relative">
          <blockquote className="text-white/80 text-lg leading-relaxed italic mb-4">
            "DineFlow transformed how we manage nightly service. Our team operates with confidence and our guests feel the difference."
          </blockquote>
          <div className="text-white/50 text-sm">— Eleanor Whitmore, Executive Chef, The Ivory Table</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-ivory">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <div className="font-sora text-xl font-bold text-charcoal" style={{ fontFamily: 'Sora, sans-serif' }}>
              Dine<span className="text-terracotta">Flow</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sage border border-border px-2.5 py-1.5 rounded-xl mb-4">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Admin Portal
            </div>
            <h1 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
              Administration
            </h1>
            <p className="text-sm text-sage">Restricted access — authorised personnel only</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-terracotta/8 border border-terracotta/20 text-terracotta text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="admin@dineflow.co"
                className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-warm-white text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-warm-white text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-charcoal hover:bg-forest-dark disabled:opacity-70 text-warm-white text-sm font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </>
              ) : 'Access Admin Panel'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-xs text-sage hover:text-charcoal transition-colors"
            >
              ← Back to guest login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
