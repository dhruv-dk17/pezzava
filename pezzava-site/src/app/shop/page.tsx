'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { catalog } from '@/data/products';
import MarketplaceToggle from '@/components/shop/MarketplaceToggle';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ProductCard from '@/components/ui/ProductCard';
import { Search, SlidersHorizontal, Coffee, Feather, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getPortalUrl } from '@/lib/domain';

export default function ShopPage() {
  const [activeStore, setActiveStore] = useState('all');
  const [filters, setFilters] = useState<{ categories: string[]; colors: string[] }>({
    categories: [],
    colors: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const mugsUrl = getPortalUrl('mugs');

  const availableColors = useMemo(() => {
    return Array.from(new Set(catalog.map((p) => p.color))).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return catalog.filter((p) => {
      const matchesStore = activeStore === 'all' || p.storeAvailability.includes(activeStore);
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(p.category);
      const matchesColor = filters.colors.length === 0 || filters.colors.includes(p.color);
      const matchesSearch =
        p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStore && matchesCategory && matchesColor && matchesSearch;
    });
  }, [activeStore, filters, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* New Wing Announcement Banner */}
        <div className="mb-8 p-4 bg-[#8B6B22]/10 border border-[#C9A84C]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 text-[#8B6B22] flex items-center justify-center shrink-0">
              <Coffee size={16} />
            </div>
            <p className="font-manrope text-xs text-stone-800">
              <span className="font-bold">New Pezzava Ceramic Studio:</span> We now print bespoke ceramic mugs with 3D preview and Pan-India dispatch!
            </p>
          </div>
          <Link
            href={mugsUrl}
            className="shrink-0 px-4 py-2 bg-[#8B6B22] hover:bg-[#745819] text-white rounded-full text-xs font-manrope font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Visit mugs.pezzava.in</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 pb-8 border-b border-stone-200">
          <div>
            <span className="font-manrope text-xs font-bold tracking-[0.3em] text-[#5C631C] uppercase mb-2 block">
              Pezzava Wrap Skirts • skirts.pezzava.in
            </span>
            <h1 className="font-noto-serif text-4xl sm:text-6xl leading-tight text-stone-900">
              Curated <span className="italic font-light">Gallery</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <MarketplaceToggle activeStore={activeStore} setActiveStore={setActiveStore} />
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input 
                type="text" 
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-200 py-2.5 pl-10 pr-4 rounded-full text-xs font-manrope focus:outline-none focus:border-[#5C631C] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-36">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                availableColors={availableColors} 
              />
            </div>
          </div>

          {/* Mobile Filter Button & Panel */}
          <div className="lg:hidden col-span-12">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 rounded-xl font-manrope text-xs font-bold text-stone-800 shadow-sm mb-6"
            >
              <SlidersHorizontal size={14} />
              <span>{showMobileFilters ? "Hide Filters" : "Filter Silhouettes"}</span>
            </button>

            {showMobileFilters && (
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md mb-8">
                <FilterSidebar 
                  filters={filters} 
                  setFilters={setFilters} 
                  availableColors={availableColors} 
                />
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="col-span-12 lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-stone-200">
                <p className="font-noto-serif text-xl text-stone-700 mb-4">No matching skirts found</p>
                <button
                  onClick={() => {
                    setFilters({ categories: [], colors: [] });
                    setActiveStore('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-[#5C631C] text-white rounded-full text-xs font-manrope font-bold hover:bg-[#4a5016] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
