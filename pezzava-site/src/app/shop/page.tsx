'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { catalog, Product } from '@/data/products';
import MarketplaceToggle from '@/components/shop/MarketplaceToggle';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ProductCard from '@/components/ui/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function ShopPage() {
  const [activeStore, setActiveStore] = useState('all');
  const [filters, setFilters] = useState({ categories: [] as string[], colors: [] as string[] });
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const availableColors = useMemo(() => {
    return Array.from(new Set(catalog.map(p => p.color))).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return catalog.filter(p => {
      const matchesStore = activeStore === 'all' || p.storeAvailability.includes(activeStore);
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(p.category);
      const matchesColor = filters.colors.length === 0 || filters.colors.includes(p.color);
      const matchesSearch = p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStore && matchesCategory && matchesColor && matchesSearch;
    });
  }, [activeStore, filters, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="font-manrope text-sm font-bold tracking-widest text-primary uppercase mb-4 block">The Collection</span>
            <h1 className="font-noto-serif text-5xl md:text-7xl leading-tight">
              Curated <span className="italic">Gallery</span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
             <MarketplaceToggle activeStore={activeStore} setActiveStore={setActiveStore} />
             
             {/* Search */}
             <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                <input 
                  type="text" 
                  placeholder="Search designs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-variant/20 border-b border-stone-200 py-3 pl-12 pr-4 focus:border-primary outline-none transition-colors font-manrope text-sm"
                />
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              availableColors={availableColors} 
            />
          </div>

          {/* Mobile Filter Trigger */}
          <div className="lg:hidden flex justify-between items-center py-4 border-y border-stone-100">
             <button 
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 font-manrope font-bold text-xs uppercase tracking-widest"
             >
                <SlidersHorizontal size={16} /> Filters
             </button>
             <span className="font-manrope text-xs text-on-surface-variant">
               {filteredProducts.length} Products
             </span>
          </div>

          {/* Grid Area */}
          <div className="flex-1">
             {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  <AnimatePresence mode='popLayout'>
                    {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </AnimatePresence>
                </div>
             ) : (
                <div className="text-center py-32 bg-surface-variant/10 rounded-[40px] border border-dashed border-stone-200">
                  <p className="font-noto-serif text-2xl text-on-surface-variant italic">No silhouettes found matching your criteria.</p>
                  <button 
                    onClick={() => { setFilters({ categories: [], colors: [] }); setSearchQuery(''); }}
                    className="mt-6 text-primary font-manrope font-bold uppercase tracking-widest text-xs"
                  >
                    Clear All Filters
                  </button>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[70] p-10 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-noto-serif text-3xl italic">Refine</h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-primary">
                  <X size={24} />
                </button>
              </div>
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                availableColors={availableColors} 
              />
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-primary text-on-primary py-4 rounded-full mt-12 font-manrope font-bold text-xs uppercase tracking-widest"
              >
                Show Results ({filteredProducts.length})
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
