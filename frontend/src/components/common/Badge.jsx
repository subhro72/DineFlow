import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const baseStyles = 'inline-flex items-center px-2 py-0.5 rounded-xl font-sans text-xs font-semibold tracking-wide uppercase border';

  const variants = {
    success: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20', // Used for Available
    warning: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20', // Used for Important/Low Stock
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-[var(--color-surface)] text-[var(--color-ink-muted)] border-[var(--color-border-warm)]', // Used for Sold out
    dark: 'bg-[var(--color-ink-deep)] text-[var(--color-surface)] border-[var(--color-ink-deep)]', // Used for Category
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
