import React from 'react';

export default function AdminTopbar({ title, subtitle, onMenuToggle, action }) {
  return (
    <header className="h-16 bg-warm-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-1.5 text-sage hover:text-charcoal"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-base font-semibold text-charcoal" style={{ fontFamily: 'Sora, sans-serif' }}>
            {title}
          </h1>
          {subtitle && <p className="text-xs text-sage">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}
