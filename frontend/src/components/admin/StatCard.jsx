import React from 'react';

export default function StatCard({ label, value, icon, change, positive }) {
  return (
    <div className="bg-warm-white border border-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-forest/8 flex items-center justify-center text-forest">
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium ${positive ? 'text-success' : 'text-terracotta'}`}>
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold text-charcoal mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
        {value}
      </div>
      <div className="text-sm text-sage">{label}</div>
    </div>
  );
}
