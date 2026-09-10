import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const variants = {
    primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white shadow-sm hover:shadow-[var(--shadow-level-1)] focus:ring-[var(--color-primary)]',
    secondary: 'bg-[var(--color-surface)] border border-[var(--color-border-warm)] text-[var(--color-primary)] hover:bg-[var(--color-background)] focus:ring-[var(--color-primary)] shadow-sm',
    accent: 'bg-[var(--color-accent)] hover:opacity-90 text-white focus:ring-[var(--color-accent)] shadow-sm hover:shadow-[var(--shadow-level-1)]',
    ghost: 'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-border-warm)]/30 focus:ring-[var(--color-primary)]',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600',
  };

  const currentVariant = variants[variant] || variants.primary;
  const currentSize = sizeStyles[props.size] || sizeStyles.md;

  return (
    <button className={`${baseStyles} ${currentVariant} ${currentSize} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
