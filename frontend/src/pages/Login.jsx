import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError('');

    // Basic validation
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }

    try {
      setLoading(true);

      // Send login request to backend
    const data = await loginUser({
  email: form.email,
  password: form.password,
});

login(data.token, data.user);



      // Login successful
     if(data.user.role === 'Admin'){
      navigate('/admin-dashboard')
     }else{
      navigate('/')
     }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Login failed. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-warm-white border border-border rounded-xl p-8 shadow-sm">

            {/* Header */}
            <div className="mb-8">
              <h1
                className="text-2xl font-bold text-charcoal mb-1"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Welcome back
              </h1>

              <p className="text-sm text-sage">
                Sign in to your DineFlow account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-terracotta/8 border border-terracotta/20 text-terracotta text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      email: e.target.value,
                    }))
                  }
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Password
                </label>

                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                />
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between mt-1">

              

                <span className="text-xs text-forest hover:underline cursor-pointer font-medium">
                  Forgot password?
                </span>

              </div>

              {/* Submit Button */}
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
                ) : (
                  'Sign In'
                )}
              </button>

            </form>

            {/* Register Link */}
            <div className="mt-6 pt-6 border-t border-border text-center text-xs text-sage">
              Don&apos;t have an account?{' '}

              <button
                onClick={() => navigate('/register')}
                className="text-forest font-semibold hover:underline"
              >
                Create one
              </button>
            </div>

            {/* Admin Login */}
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