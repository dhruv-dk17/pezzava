'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { catalog, Product, Category } from '@/data/products';
import MarketplaceToggle from '@/components/shop/MarketplaceToggle';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ProductCard from '@/components/ui/ProductCard';
import { Search, SlidersHorizontal, Sparkles, Feather, ShieldCheck, Ruler } from 'lucide-react';

export default function SkirtsPage() {
  const [activeStore, setActiveStore] = useState('all');
  const [filters, setFilters] = useState<{ categories: string[]; colors: string[] }>({
    categories: [],
    colors: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
        
        {/* Editorial Subdomain Header */}
        <div className="border-b border-stone-200/80 pb-12 mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-8 bg-[#5C631C]"></span>
                <span className="font-manrope text-xs font-bold tracking-[0.3em] text-[#5C631C] uppercase">
                  Pezzava Wrap Skirt Atelier • skirts.pezzava.in
                </span>
              </div>
              <h1 className="font-noto-serif text-4xl sm:text-6xl lg:text-7xl text-stone-900 leading-tight">
                Artisanal Cotton <br />
                <span className="italic font-light text-[#5C631C]">Wrap Skirts</span>
              </h1>
              <p className="mt-4 font-manrope text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Hand-block printed on 100% breathable Jaipur cotton. Tailored with an adjustable wrap-around waistband to gracefully drape any silhouette. Available on Amazon and Flipkart.
              </p>
            </div>

            {/* Atelier Key Highlights */}
            <div className="flex items-center gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="text-center px-2">
                <span className="block font-noto-serif text-2xl font-bold text-stone-900">100%</span>
                <span className="block font-manrope text-[10px] uppercase tracking-wider text-stone-500 font-bold">Pure Cotton</span>
              </div>
              <div className="h-8 w-[1px] bg-stone-200" />
              <div className="text-center px-2">
                <span className="block font-noto-serif text-2xl font-bold text-[#5C631C]">Free</span>
                <span className="block font-manrope text-[10px] uppercase tracking-wider text-stone-500 font-bold">Universal Size</span>
              </div>
              <div className="h-8 w-[1px] bg-stone-200" />
              <div className="text-center px-2">
                <span className="block font-noto-serif text-2xl font-bold text-[#C9A84C]">Jaipur</span>
                <span className="block font-manrope text-[10px] uppercase tracking-wider text-stone-500 font-bold">Hand Blockprint</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Marketplace Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 mb-12 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-4">
            <MarketplaceToggle activeStore={activeStore} setActiveStore={setActiveStore} />
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 text-xs font-manrope font-bold text-stone-700"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input
              type="text"
              placeholder="Search prints, colors, lengths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200 py-2.5 pl-10 pr-4 rounded-full text-xs font-manrope focus:outline-none focus:border-[#5C631C] shadow-sm"
            />
          </div>
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-36">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                availableColors={availableColors}
              />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="lg:hidden col-span-12 bg-white p-6 rounded-2xl border border-stone-200 shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-noto-serif text-lg font-bold">Filter Silhouettes</h4>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-xs font-manrope font-bold text-[#5C631C]"
                >
                  Done
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                availableColors={availableColors}
              />
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-stone-200">
                <Ruler className="mx-auto text-stone-300 mb-4" size={48} />
                <h3 className="font-noto-serif text-2xl text-stone-800 mb-2">No Skirts Found</h3>
                <p className="font-manrope text-sm text-stone-500 mb-6">
                  Try adjusting your filter options or search terms.
                </p>
                <button
                  onClick={() => {
                    setFilters({ categories: [], colors: [] });
                    setActiveStore('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-[#5C631C] text-white rounded-full text-xs font-manrope font-bold hover:bg-[#474e14] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
