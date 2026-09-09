import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function Login() {
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
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-warm-white border border-border rounded-xl p-8 shadow-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-charcoal mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                Welcome back
              </h1>
              <p className="text-sm text-sage">Sign in to your DineFlow account</p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-terracotta/8 border border-terracotta/20 text-terracotta text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
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
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 text-xs text-sage cursor-pointer">
                  <input type="checkbox" className="accent-forest" />
                  Remember me
                </label>
                <span className="text-xs text-forest hover:underline cursor-pointer font-medium">Forgot password?</span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-forest hover:bg-forest-dark disabled:opacity-70 text-warm-white text-sm font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center text-xs text-sage">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-forest font-semibold hover:underline"
              >
                Create one
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => navigate('/admin-login')}
                className="text-xs text-sage hover:text-charcoal transition-colors"
              >
                Admin access →
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
