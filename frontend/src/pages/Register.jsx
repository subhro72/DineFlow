
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError('');

    // Basic validation
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.');
      return;
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirm,
      });

      // Registration successful
      setSuccess(true);

      // Redirect to login after 1 second
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory">
        <Navbar />

        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-md bg-warm-white border border-border rounded-xl p-8 shadow-sm text-center">

            <div className="w-14 h-14 rounded-full bg-success/12 flex items-center justify-center mx-auto mb-5">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-success"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2
              className="text-xl font-bold text-charcoal mb-2"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Account created!
            </h2>

            <p className="text-sm text-sage mb-6">
              Welcome to DineFlow, {form.name.split(' ')[0]}. Your account is ready.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="bg-forest hover:bg-forest-dark text-warm-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Sign In Now
            </button>

          </div>
        </div>

        <Footer />
      </div>
    );
  }

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
                Create your account
              </h1>

              {/* <p className="text-sm text-sage">
                Start your 14-day free trial — no card required
              </p> */}

            </div>

            {/* Error message */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-terracotta/8 border border-terracotta/20 text-terracotta text-sm">
                {error}
              </div>
            )}

            {/* Registration form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >

              {/* Full Name */}
              <div>

                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value
                    }))
                  }
                  placeholder="Eleanor Whitmore"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                />

              </div>

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
                      email: e.target.value
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

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        password: e.target.value
                      }))
                    }
                    placeholder="Min. 8 characters"
                    className="w-full px-3 py-2.5 pr-10 text-sm border border-border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sage hover:text-charcoal transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      // Eye Off
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                        <path d="M9.88 4.24A9.77 9.77 0 0 1 12 4c5 0 8.5 4 9.5 8a12.8 12.8 0 0 1-2.1 3.78" />
                        <path d="M6.61 6.61C4.62 7.83 3.25 9.78 2.5 12c1 4 4.5 8 9.5 8a9.7 9.7 0 0 0 4.39-1.04" />
                      </svg>
                    ) : (
                      // Eye
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}
              <div>

                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirm}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        confirm: e.target.value
                      }))
                    }
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2.5 pr-10 text-sm border border-border rounded-xl bg-ivory text-charcoal placeholder-sage focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sage hover:text-charcoal transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      // Eye Off
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                        <path d="M9.88 4.24A9.77 9.77 0 0 1 12 4c5 0 8.5 4 9.5 8a12.8 12.8 0 0 1-2.1 3.78" />
                        <path d="M6.61 6.61C4.62 7.83 3.25 9.78 2.5 12c1 4 4.5 8 9.5 8a9.7 9.7 0 0 0 4.39-1.04" />
                      </svg>
                    ) : (
                      // Eye
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>

                </div>

              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-forest hover:bg-forest-dark disabled:opacity-70 text-warm-white text-sm font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >

                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  'Create Account'
                )}

              </button>

            </form>

            {/* Terms */}
            <p className="mt-3 text-xs text-sage text-center">

              By registering, you agree to our{' '}

              <span className="text-forest font-medium cursor-pointer hover:underline">
                Terms of Service
              </span>

            </p>

            {/* Login link */}
            <div className="mt-6 pt-6 border-t border-border text-center text-xs text-sage">

              Already have an account?{' '}

              <button
                onClick={() => navigate('/login')}
                className="text-forest font-semibold hover:underline"
              >
                Sign in
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}
