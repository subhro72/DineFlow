
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuCard({ item }) {
  const navigate = useNavigate();

  const isAvailable = item.availability === true;

  return (
    <div
      className="group bg-warm-white border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md hover:border-forest/30 transition-all duration-200"
      onClick={() => navigate(`/menu/${item._id || item.id}`)}
    >
      {/* Food Image */}
      <div className="relative overflow-hidden bg-ivory aspect-[16/10]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm ${
              isAvailable
                ? 'bg-white text-success border border-success/30'
                : 'bg-white text-charcoal border border-charcoal/20'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isAvailable ? 'bg-success' : 'bg-charcoal/40'
              }`}
            />

            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs font-medium text-sage uppercase tracking-wider mb-1">
          {item.category}
        </div>

        {/* Name */}
        <h3
          className="text-base font-semibold text-charcoal mb-2 leading-tight group-hover:text-forest transition-colors"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-sage leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Price + Details */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-charcoal">
            ₹{Number(item.price).toFixed(2)}
          </span>

          <span className="text-xs text-terracotta font-medium hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
