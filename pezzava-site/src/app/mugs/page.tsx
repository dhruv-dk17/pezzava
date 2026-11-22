'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { mugCatalog, MUG_CATEGORIES, MugProduct, MugCategory } from '@/data/mugs';
import MugProductCard from '@/components/ui/MugProductCard';
import { Search, Sparkles, ShieldCheck, Flame, Coffee, Package, CheckCircle2, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export default function MugsPage() {
  const [selectedCategory, setSelectedCategory] = useState<MugCategory | 'all'>('all');
  const [selectedStore, setSelectedStore] = useState<'all' | 'amazon' | 'flipkart'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const hasCatalogItems = mugCatalog.length > 0;

  // Filtered mugs
  const filteredMugs = useMemo(() => {
    return mugCatalog.filter((mug) => {
      const matchesCategory = selectedCategory === 'all' || mug.category === selectedCategory;
      const matchesStore = selectedStore === 'all' || mug.storeAvailability.includes(selectedStore);
      const matchesSearch =
        mug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mug.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mug.theme.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStore && matchesSearch;
    });
  }, [selectedCategory, selectedStore, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Subdomain Header */}
        <div className="border-b border-stone-200/80 pb-12 mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-8 bg-[#8B6B22]"></span>
                <span className="font-manrope text-xs font-bold tracking-[0.3em] text-[#8B6B22] uppercase">
                  Pezzava Mug Print Studio • mugs.pezzava.in
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-stone-900 leading-[1.05]">
                Graphic & Custom <br />
                <span className="italic font-light text-[#8B6B22]">Mug Printing</span>
              </h1>
              <p className="mt-4 font-manrope text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                We print high-definition Jaipur heritage motifs, personalized typography, and custom graphics onto premium ready-made ceramic coffee mugs. Fade-proof sublimation, microwave safe, and delivered across India via Amazon and Flipkart.
              </p>
            </div>

            {/* Quick Stats / Trust Badges */}
            <div className="flex items-center gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="text-center px-2">
                <span className="block font-display text-2xl font-bold text-stone-900">Ready</span>
                <span className="block font-manrope text-[10px] uppercase tracking-wider text-stone-500 font-bold">Ceramic Mugs</span>
              </div>
              <div className="h-8 w-[1px] bg-stone-200" />
              <div className="text-center px-2">
                <span className="block font-display text-2xl font-bold text-[#8B6B22]">300+ DPI</span>
                <span className="block font-manrope text-[10px] uppercase tracking-wider text-stone-500 font-bold">Sublimation</span>
              </div>
              <div className="h-8 w-[1px] bg-stone-200" />
              <div className="text-center px-2">
                <span className="block font-display text-2xl font-bold text-[#C9A84C]">100%</span>
                <span className="block font-manrope text-[10px] uppercase tracking-wider text-stone-500 font-bold">Microwave Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog Display or Curation Announcement */}
        {hasCatalogItems ? (
          <>
            {/* Catalog Filtering & Search Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 mb-12 pb-6 border-b border-stone-200">
              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {MUG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-manrope font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#8B6B22] text-white shadow-md'
                        : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Controls: Store filter + Search */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center bg-stone-200/60 p-1 rounded-full text-xs font-manrope font-bold w-full sm:w-auto">
                  {(['all', 'amazon', 'flipkart'] as const).map((store) => (
                    <button
                      key={store}
                      onClick={() => setSelectedStore(store)}
                      className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full capitalize transition-all ${
                        selectedStore === store
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {store === 'all' ? 'All Stores' : store}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search mugs & prints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-stone-200 py-2 pl-10 pr-4 rounded-full text-xs font-manrope focus:outline-none focus:border-[#8B6B22] shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredMugs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredMugs.map((mug, index) => (
                  <MugProductCard
                    key={mug.id}
                    mug={mug}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-stone-200">
                <Coffee className="mx-auto text-stone-300 mb-4" size={48} />
                <h3 className="font-display text-2xl text-stone-800 mb-2">No Matches Found</h3>
                <p className="font-manrope text-sm text-stone-500 mb-6">
                  Try adjusting your filter or search keywords.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStore('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-[#8B6B22] text-white rounded-full text-xs font-manrope font-bold hover:bg-[#725719] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        ) : (
          /* Editorial Studio Curation Notice */
          <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-14 shadow-sm mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-manrope font-semibold mb-6">
                <Clock size={14} className="text-[#8B6B22]" />
                <span>Spring 2026 Collection Curation In Progress</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl text-stone-900 leading-tight mb-4">
                Our New Finished Product Line Is Arriving Soon
              </h2>
              <p className="font-manrope text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto mb-8">
                We are currently photographing and stocking new production batches of our signature Jaipur folk camel mugs, blue pottery ceramics, and custom print series. In the meantime, custom sublimation printing orders are open for direct booking.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/919829000000?text=Hello%20Pezzava,%20I%20would%20like%20to%20inquire%20about%20ordering%20custom%20printed%20mugs."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1ebd5a] text-stone-900 font-manrope font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Custom Print Inquiry</span>
                </a>
                <a
                  href="https://www.amazon.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 hover:bg-stone-800 text-white font-manrope font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center gap-2 transition-colors"
                >
                  <span>Check Pezzava on Amazon</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Custom Printing Service Banner */}
        <section className="bg-[#1A1C1A] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B6B22]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="font-manrope text-xs font-bold tracking-[0.3em] text-[#C9A84C] uppercase block mb-3">
                Pezzava Bespoke Sublimation Studio
              </span>
              <h2 className="font-display text-3xl sm:text-5xl leading-tight mb-4 text-white">
                Need Custom Printed Mugs for Your Brand or Event?
              </h2>
              <p className="font-manrope text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl mb-8">
                From startup welcome kits and university reunions to wedding favors and cafe merchandise. We handle precision color calibration, breakage-free packaging, and pan-India doorstep delivery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 text-xs font-manrope text-stone-200">
                  <CheckCircle2 size={16} className="text-[#C9A84C]" />
                  <span>No Minimum Order</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-manrope text-stone-200">
                  <CheckCircle2 size={16} className="text-[#C9A84C]" />
                  <span>Free Design Proofing</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-manrope text-stone-200">
                  <CheckCircle2 size={16} className="text-[#C9A84C]" />
                  <span>Express 48H Dispatch</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/919829000000?text=Hello%20Pezzava,%20I%20am%20interested%20in%20custom%20mug%20printing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1ebd5a] text-stone-900 font-manrope font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Design Team</span>
                </a>
                <a
                  href="mailto:contact@pezzava.in?subject=Custom%20Mug%20Printing%20Inquiry"
                  className="bg-white/10 hover:bg-white/20 text-white font-manrope font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/20 transition-colors"
                >
                  Email Bulk Inquiry
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-display text-xl text-white mb-4">Print Specifications</h3>
              <ul className="space-y-3 font-manrope text-xs text-stone-300">
                <li className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-stone-400">Print Method</span>
                  <span className="font-semibold text-white">Full-Wrap Sublimation</span>
                </li>
                <li className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-stone-400">Resolution</span>
                  <span className="font-semibold text-white">300+ DPI Crystal HD</span>
                </li>
                <li className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-stone-400">Ceramic Quality</span>
                  <span className="font-semibold text-white">Food-Grade Super Vitrified</span>
                </li>
                <li className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-stone-400">Durability</span>
                  <span className="font-semibold text-white">Dishwasher & Microwave Safe</span>
                </li>
                <li className="flex justify-between py-2">
                  <span className="text-stone-400">Packaging</span>
                  <span className="font-semibold text-white">Thermocol Safe Box + Gift Wrap</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
