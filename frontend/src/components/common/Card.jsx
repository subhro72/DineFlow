import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-warm)] shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
