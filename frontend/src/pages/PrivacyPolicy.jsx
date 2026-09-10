
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-warm-white text-charcoal">
      <Navbar />

      <main className="w-full px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">

          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
              Legal
            </p>

            <h1
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Privacy Policy
            </h1>

            <p className="text-sage text-sm">
              Last updated: September 2026
            </p>
          </div>

          <div className="space-y-10 text-sm leading-7 text-charcoal">

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                1. Introduction
              </h2>

              <p>
                DineFlow is a restaurant management application designed to
                provide restaurant menu management, user authentication,
                and related administrative features.
              </p>

              <p className="mt-3">
                This Privacy Policy explains what information may be
                collected when you use DineFlow and how that information
                is handled within the application.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                2. Information We Collect
              </h2>

              <p>
                When you create an account, DineFlow may collect information
                such as your name, email address, password, account role,
                and account creation date.
              </p>

              <p className="mt-3">
                Passwords are stored in hashed form rather than as plain
                text passwords.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                3. How Information Is Used
              </h2>

              <p>
                Information is used to provide authentication, maintain
                user accounts, control access to protected features,
                and operate the restaurant management functionality.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                4. Authentication
              </h2>

              <p>
                DineFlow uses authentication mechanisms to distinguish
                between guests, registered users, and administrators.
                Protected administrative functionality is available only
                to authorized users.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                5. Menu Information
              </h2>

              <p>
                Restaurant menu information may include dish names,
                descriptions, categories, prices, availability status,
                and images. This information is used to display and
                manage restaurant menu items.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                6. Data Security
              </h2>

              <p>
                DineFlow uses reasonable technical measures to protect
                account information and restrict access to protected
                functionality.
              </p>

              <p className="mt-3">
                However, no software application or method of electronic
                storage can guarantee absolute security.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                7. Third-Party Services
              </h2>

              <p>
                Certain application functionality may rely on third-party
                services, such as cloud storage or authentication-related
                infrastructure. Information handled by those services may
                be subject to their respective privacy policies.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                8. Changes to This Policy
              </h2>

              <p>
                This Privacy Policy may be updated when the functionality
                or requirements of DineFlow change. Updated versions will
                be reflected on this page.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                9. Contact
              </h2>

              <p>
                If you have questions about this Privacy Policy or the
                DineFlow application, please use the contact information
                provided by the project administrator.
              </p>
            </section>

          </div>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-semibold text-forest hover:text-terracotta transition-colors"
            >
              ← Back to DineFlow
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

