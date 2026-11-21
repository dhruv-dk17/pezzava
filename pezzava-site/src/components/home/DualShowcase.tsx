'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { catalog } from '@/data/products';
import { mugCatalog } from '@/data/mugs';
import ProductCard from '@/components/ui/ProductCard';
import MugProductCard from '@/components/ui/MugProductCard';
import Mug3DViewer from '@/components/mugs/Mug3DViewer';
import { getPortalUrl } from '@/lib/domain';
import { Feather, Coffee, ArrowRight, Sparkles } from 'lucide-react';

export default function DualShowcase() {
  const [activeTab, setActiveTab] = useState<'skirts' | 'mugs'>('skirts');

  const featuredSkirts = catalog.slice(0, 4);
  const featuredMugs = mugCatalog.slice(0, 4);

  const skirtsUrl = getPortalUrl('skirts');
  const mugsUrl = getPortalUrl('mugs');

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading & Interactive Tab Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-[#5C631C]"></span>
              <span className="font-manrope text-xs font-bold tracking-[0.3em] text-[#5C631C] uppercase">
                Curated Jaipur Collections
              </span>
            </div>
            <h2 className="font-noto-serif text-3xl sm:text-5xl text-stone-900 leading-tight">
              Featured <span className="italic font-light">Craftsmanship</span>
            </h2>
          </div>

          {/* Dual Pill Tab Selector */}
          <div className="flex items-center bg-stone-200/70 p-1.5 rounded-full shadow-inner self-start md:self-auto">
            <button
              onClick={() => setActiveTab('skirts')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-manrope font-bold transition-all ${
                activeTab === 'skirts'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Feather size={14} className={activeTab === 'skirts' ? 'text-[#5C631C]' : ''} />
              <span>Artisanal Skirts</span>
            </button>

            <button
              onClick={() => setActiveTab('mugs')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-manrope font-bold transition-all ${
                activeTab === 'mugs'
                  ? 'bg-white text-stone-900 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Coffee size={14} className={activeTab === 'mugs' ? 'text-[#C9A84C]' : ''} />
              <span>Ceramic Mugs</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Skirts Content */}
        {activeTab === 'skirts' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredSkirts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="text-center pt-6">
              <Link
                href={skirtsUrl}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5C631C] hover:bg-[#4a5016] text-white rounded-full font-manrope font-bold text-xs uppercase tracking-widest shadow-lg transition-transform hover:scale-105"
              >
                <span>Explore Full Skirts Gallery on skirts.pezzava.in</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Mugs Content */}
        {activeTab === 'mugs' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredMugs.map((mug, index) => (
                <MugProductCard key={mug.id} mug={mug} index={index} />
              ))}
            </div>

            <div className="text-center pt-6">
              <Link
                href={mugsUrl}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B6B22] hover:bg-[#725719] text-white rounded-full font-manrope font-bold text-xs uppercase tracking-widest shadow-lg transition-transform hover:scale-105"
              >
                <span>Explore Ceramic Studio & Custom Printing on mugs.pezzava.in</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Interactive 3D Teaser Box */}
        <div className="mt-24 pt-16 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-manrope text-xs font-bold tracking-[0.25em] text-[#5C631C] uppercase block mb-2">
              Cutting-Edge 3D Preview
            </span>
            <h3 className="font-noto-serif text-3xl sm:text-4xl text-stone-900 mb-3">
              Try the 3D Ceramic Customizer
            </h3>
            <p className="font-manrope text-sm text-stone-600">
              Personalize mugs in real time. Rotate, switch glazes, and preview your custom text directly in WebGL 3D before ordering on Amazon or Flipkart.
            </p>
          </div>

          <Mug3DViewer showCustomizer={true} />
        </div>

      </div>
    </section>
  );
}
