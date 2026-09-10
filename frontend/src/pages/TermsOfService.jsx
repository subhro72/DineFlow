
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function TermsOfService() {
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
              Terms of Service
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
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing or using DineFlow, you agree to use the
                application responsibly and in accordance with these
                Terms of Service.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                2. Accounts
              </h2>

              <p>
                Users are responsible for providing accurate account
                information and keeping their login credentials secure.
              </p>

              <p className="mt-3">
                Users should not share their authentication credentials
                with unauthorized individuals.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                3. User Responsibilities
              </h2>

              <p>
                You agree not to misuse DineFlow, attempt to gain
                unauthorized access, interfere with application
                functionality, or use the application for unlawful
                purposes.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                4. Administrator Responsibilities
              </h2>

              <p>
                Administrators are responsible for managing menu
                information and user accounts appropriately and only
                using administrative functionality for authorized
                purposes.
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
                Restaurant menu information displayed through DineFlow
                is provided by authorized users or administrators.
                DineFlow does not guarantee that menu descriptions,
                prices, availability, or other restaurant information
                will always be accurate or current.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                6. Availability of the Service
              </h2>

              <p>
                DineFlow may be updated, modified, temporarily unavailable,
                or discontinued as development and maintenance requirements
                change.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                7. Intellectual Property
              </h2>

              <p>
                The DineFlow application, interface, branding, and original
                project content are protected by applicable intellectual
                property laws unless otherwise stated.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                8. Limitation of Liability
              </h2>

              <p>
                DineFlow is provided on an as-is basis. To the extent
                permitted by applicable law, the project developers are
                not responsible for losses resulting from misuse of the
                application, inaccurate information supplied by users,
                service interruptions, or unauthorized access caused by
                circumstances outside reasonable control.
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                9. Changes to These Terms
              </h2>

              <p>
                These Terms of Service may be updated as DineFlow evolves.
                Continued use of the application after changes are made
                indicates acceptance of the updated terms.
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
