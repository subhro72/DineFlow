import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, imageSrc }) => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Left side - Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--color-surface)]">
        <img 
          src={imageSrc || "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"} 
          alt="Restaurant ambiance" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#202722]/80 via-[#202722]/30 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <Link to="/" className="inline-block mb-8">
            <span className="font-display text-3xl font-semibold tracking-tight">DineFlow</span>
          </Link>
          <h2 className="font-display text-5xl font-medium mb-4 leading-tight">Culinary Craft, <br/><i className="opacity-90">Seamless Flow.</i></h2>
          <p className="font-sans text-lg text-white/80 max-w-md">Experience artisanal gastronomy with instant table ordering.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
        {/* Mobile Header */}
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-12">
          <span className="font-display text-3xl font-semibold text-[var(--color-primary)] tracking-tight">DineFlow</span>
        </Link>
        
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <h1 className="text-4xl font-display font-medium text-[var(--color-ink-deep)] mb-3">
            {title}
          </h1>
          <p className="font-sans text-[var(--color-ink-muted)] mb-10">
            {subtitle}
          </p>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
