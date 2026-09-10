import React from 'react';
import MenuCard from './MenuCard';

const MenuGrid = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-warm)] flex items-center justify-center mb-6 shadow-sm">
          <span className="material-symbols-outlined text-[var(--color-ink-muted)] text-3xl">restaurant_menu</span>
        </div>
        <h3 className="font-display text-2xl font-medium text-[var(--color-ink-deep)]">No culinary offerings found</h3>
        <p className="font-sans text-[var(--color-ink-muted)] mt-2">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {items.map(item => (
        <MenuCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default MenuGrid;
