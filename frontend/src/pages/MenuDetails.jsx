import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { MENU_ITEMS } from '../utils/mockData';

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = MENU_ITEMS.find(i => i._id === id || i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <p className="text-sage text-sm">Item not found.</p>
          <Link
            to="/menu"
            className="text-sm text-forest font-medium hover:underline"
          >
            Back to Menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <div className="w-full px-4 md:px-6 lg:px-8 py-10 w-full">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 text-sm text-sage hover:text-charcoal transition-colors mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-border bg-ivory" style={{ maxHeight: '480px' }}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              style={{ minHeight: '320px', maxHeight: '480px' }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-terracotta border border-terracotta/30 px-2.5 py-1 rounded-xl">
                {item.category}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl border ${
                item.available
                  ? 'text-success border-success/30 bg-success/8'
                  : 'text-sage border-border bg-sage/5'
              }`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            <h1
              className="text-4xl font-bold text-charcoal mb-4 leading-tight"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              {item.name}
            </h1>

            <p className="text-sage text-base leading-relaxed mb-8">{item.description}</p>

            <div className="border-t border-border pt-6 flex items-center justify-between">
              <div>
                <div className="text-xs text-sage mb-1 uppercase tracking-wider">Price</div>
                <div className="text-3xl font-bold text-charcoal" style={{ fontFamily: 'Sora, sans-serif' }}>
                  ${Number(item.price).toFixed(2)}
                </div>
              </div>
              {item.available && (
               <button className="bg-forest hover:bg-forest-dark text-warm-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
                  Add to Order
                </button>
              )}
            </div>

            {/* Details */}
            <div className="mt-8 bg-warm-white border border-border rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-sage mb-4">Dish Details</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-sage mb-1">Category</div>
                  <div className="text-charcoal font-medium">{item.category}</div>
                </div>
                <div>
                  <div className="text-xs text-sage mb-1">Status</div>
                  <div className={`font-medium ${item.available ? 'text-success' : 'text-sage'}`}>
                    {item.available ? 'In Season' : 'Off Menu'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-sage mb-1">Allergen Info</div>
                  <div className="text-charcoal font-medium">Ask your server</div>
                </div>
                <div>
                  <div className="text-xs text-sage mb-1">Preparation</div>
                  <div className="text-charcoal font-medium">À la minute</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
