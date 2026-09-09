import React from 'react';

const Input = ({ label, icon: Icon, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-semibold font-sans text-[var(--color-ink-deep)] tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-[var(--color-ink-muted)]" />
          </div>
        )}
        <input
          className={`
            w-full bg-[var(--color-surface)] font-sans text-[var(--color-ink-deep)] 
            placeholder:text-[var(--color-ink-muted)]/60
            rounded-xl border ${error ? 'border-red-500' : 'border-[var(--color-border-warm)]'} 
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 
            focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] 
            transition-colors duration-200 shadow-sm
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-sans mt-1">{error}</span>}
    </div>
  );
};

export default Input;
