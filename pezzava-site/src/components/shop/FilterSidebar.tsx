'use client';

import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    categories: string[];
    colors: string[];
  };
  setFilters: (filters: any) => void;
  availableColors: string[];
}

export default function FilterSidebar({ filters, setFilters, availableColors }: FilterSidebarProps) {
  const categories = [
    { id: 'mini', label: 'Mini' },
    { id: 'knee', label: 'Knee Length' },
    { id: 'calf', label: 'Calf Length' },
    { id: 'long', label: 'Long' }
  ];

  const toggleFilter = (type: 'categories' | 'colors', value: string) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    setFilters({ ...filters, [type]: updated });
  };

  const clearAll = () => setFilters({ categories: [], colors: [] });

  return (
    <div className="w-full lg:w-64 space-y-12">
      <div className="flex justify-between items-center pb-4 border-b border-stone-100">
        <h3 className="font-noto-serif text-2xl font-bold">Filters</h3>
        {(filters.categories.length > 0 || filters.colors.length > 0) && (
          <button 
            onClick={clearAll}
            className="text-[10px] uppercase font-bold tracking-widest text-primary hover:opacity-70 transition-opacity"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <div className="flex justify-between items-center cursor-pointer group">
          <h4 className="font-manrope text-xs font-bold uppercase tracking-widest">Length</h4>
          <ChevronDown size={14} className="text-on-surface-variant group-hover:text-primary transition-colors" />
        </div>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <div 
                className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                  filters.categories.includes(cat.id) ? 'bg-primary border-primary' : 'border-stone-200 group-hover:border-primary'
                }`}
                onClick={() => toggleFilter('categories', cat.id)}
              >
                {filters.categories.includes(cat.id) && <X size={12} className="text-white" />}
              </div>
              <span className={`font-manrope text-sm transition-colors ${
                filters.categories.includes(cat.id) ? 'text-on-surface font-bold' : 'text-on-surface-variant'
              }`}>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-6">
        <div className="flex justify-between items-center cursor-pointer group">
          <h4 className="font-manrope text-xs font-bold uppercase tracking-widest">Color</h4>
          <ChevronDown size={14} className="text-on-surface-variant group-hover:text-primary transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => toggleFilter('colors', color)}
              className={`px-4 py-2 text-xs font-manrope rounded-full border transition-all ${
                filters.colors.includes(color) 
                ? 'bg-primary border-primary text-white font-bold' 
                : 'border-stone-200 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
