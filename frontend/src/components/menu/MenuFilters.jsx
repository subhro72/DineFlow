import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const MenuFilters = ({ categories = [], activeCategory, onCategoryChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filter Row */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:flex-1 flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-[var(--color-ink-muted)]" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search our culinary offerings..."
            className="w-full bg-[var(--color-surface)] text-[var(--color-ink-deep)] font-sans pl-12 pr-4 py-3.5 rounded-xl border border-[var(--color-border-warm)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] placeholder:text-[var(--color-ink-muted)]/60 shadow-sm transition-all"
          />
        </div>
        <button 
          className="hidden sm:flex w-12 h-12 flex-shrink-0 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border-warm)] items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-background)] transition-colors shadow-sm active:scale-95"
          aria-label="Toggle Filters"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Category Navigation */}
      <nav className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        <button 
          onClick={() => onCategoryChange('All')}
          className={`px-6 py-2.5 rounded-full font-sans text-sm font-semibold whitespace-nowrap transition-all shadow-sm border
            ${activeCategory === 'All' 
              ? 'bg-[var(--color-primary)] text-[var(--color-surface)] border-[var(--color-primary)]' 
              : 'bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] border-[var(--color-border-warm)] hover:border-[var(--color-primary)]/30'
            }`}
        >
          {activeCategory === 'All' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-surface)] mr-2 mb-[1px]"></span>}
          All Dishes
        </button>
        
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-6 py-2.5 rounded-full font-sans text-sm font-semibold whitespace-nowrap transition-all shadow-sm border
              ${activeCategory === cat 
                ? 'bg-[var(--color-primary)] text-[var(--color-surface)] border-[var(--color-primary)]' 
                : 'bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] border-[var(--color-border-warm)] hover:border-[var(--color-primary)]/30'
              }`}
          >
            {activeCategory === cat && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-surface)] mr-2 mb-[1px]"></span>}
            {cat}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MenuFilters;
