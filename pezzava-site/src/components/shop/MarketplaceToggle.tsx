'use client';

import { motion } from 'framer-motion';

interface MarketplaceToggleProps {
  activeStore: string;
  setActiveStore: (store: string) => void;
}

export default function MarketplaceToggle({ activeStore, setActiveStore }: MarketplaceToggleProps) {
  const options = [
    { id: 'all', label: 'All Products', color: 'bg-gold' },
    { id: 'amazon', label: 'Amazon', color: 'bg-[#FF9900]' },
    { id: 'flipkart', label: 'Flipkart', color: 'bg-[#2874F0]' }
  ];

  return (
    <div className="bg-white rounded-full p-2 shadow-sm border border-stone-100 flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setActiveStore(opt.id)}
          className={`relative px-6 py-2 rounded-full transition-all duration-300 font-manrope font-bold text-xs uppercase tracking-widest ${
            activeStore === opt.id ? 'text-white' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          {activeStore === opt.id && (
            <motion.div
              layoutId="toggle-bg"
              className={`absolute inset-0 rounded-full ${opt.color} shadow-lg`}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {opt.id === 'all' && activeStore === opt.id && <span className="text-sm">✦</span>}
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
}
