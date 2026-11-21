'use client';

import { use } from 'react';
import { getMugById, mugCatalog } from '@/data/mugs';
import Mug3DViewer from '@/components/mugs/Mug3DViewer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ShieldCheck, Flame, Coffee, Package, Check, ExternalLink, ArrowLeft } from 'lucide-react';

export default function MugDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const mug = getMugById(resolvedParams.id);

  if (!mug) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/mugs"
            className="flex items-center gap-1.5 text-xs font-manrope font-bold uppercase tracking-wider text-stone-500 hover:text-[#5C631C] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Ceramic Mugs</span>
          </Link>
          <span className="text-stone-300">•</span>
          <span className="text-xs font-manrope text-stone-400 truncate max-w-xs">{mug.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Visuals & 3D Interactive Model */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Hero Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-md">
              <Image
                src={mug.images[0] || '/images/mugs/mug-sanganeri.webp'}
                alt={mug.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#5C631C] text-white text-xs font-manrope font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {mug.theme}
                </span>
                <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-manrope font-semibold px-3 py-1 rounded-full border border-stone-200 shadow-sm">
                  {mug.capacity}
                </span>
              </div>
            </div>

            {/* Interactive 3D Model View */}
            <div className="mt-8">
              <h3 className="font-noto-serif text-xl text-stone-900 mb-3 flex items-center gap-2">
                <span>Interactive 3D Ceramic Model</span>
              </h3>
              <Mug3DViewer showCustomizer={false} />
            </div>
          </div>

          {/* Right Column: Specs, Marketplace Links & Purchase */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-manrope text-xs font-bold tracking-[0.3em] text-[#5C631C] uppercase block mb-2">
              Pezzava Ceramic Studio
            </span>
            <h1 className="font-noto-serif text-3xl md:text-4xl text-stone-900 leading-tight mb-4">
              {mug.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm text-stone-600 mb-6 font-manrope">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span>{mug.rating}</span>
              </div>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">{mug.reviews} verified reviews</span>
              <span className="text-stone-300">•</span>
              <span className="text-emerald-700 font-bold">In Stock</span>
            </div>

            {/* Price Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-manrope text-3xl font-extrabold text-stone-900">₹{mug.price}</span>
                <span className="font-manrope text-base text-stone-400 line-through">₹{mug.originalPrice}</span>
                <span className="font-manrope text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {mug.discount}
                </span>
              </div>
              <p className="font-manrope text-xs text-stone-500 mb-6">
                Inclusive of all taxes. Free pan-India shipping available.
              </p>

              {/* Direct Marketplace Buy Buttons */}
              <div className="space-y-3">
                <div className="font-manrope text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Order Directly From Verified Marketplaces:
                </div>

                {mug.marketplace.amazon && (
                  <a
                    href={mug.marketplace.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#232F3E] hover:bg-[#131921] text-white py-3.5 px-6 rounded-xl font-manrope font-bold text-sm flex items-center justify-between transition-all shadow-md group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#FF9900] font-black text-lg">amazon</span>
                      <span className="text-stone-300 text-xs">| Buy on Amazon India</span>
                    </div>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}

                {mug.marketplace.flipkart && (
                  <a
                    href={mug.marketplace.flipkart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#2874F0] hover:bg-[#1258ca] text-white py-3.5 px-6 rounded-xl font-manrope font-bold text-sm flex items-center justify-between transition-all shadow-md group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#FFE500] font-black text-lg">Flipkart</span>
                      <span className="text-blue-100 text-xs">| Buy on Flipkart Assured</span>
                    </div>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Description & Key Specs */}
            <div className="space-y-6">
              <div>
                <h3 className="font-noto-serif text-lg text-stone-900 mb-2">The Artisan Story</h3>
                <p className="font-manrope text-sm text-stone-600 leading-relaxed">
                  {mug.description}
                </p>
              </div>

              <div>
                <h3 className="font-noto-serif text-lg text-stone-900 mb-3">Craft & Durability Features</h3>
                <ul className="space-y-2.5">
                  {mug.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-manrope text-stone-700">
                      <Check size={16} className="text-[#5C631C] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Material Specs Table */}
              <div className="pt-6 border-t border-stone-200">
                <h3 className="font-noto-serif text-lg text-stone-900 mb-3">Product Specifications</h3>
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden text-xs font-manrope">
                  <div className="flex justify-between py-2.5 px-4 border-b border-stone-100">
                    <span className="text-stone-500">Capacity</span>
                    <span className="font-bold text-stone-800">{mug.capacity}</span>
                  </div>
                  <div className="flex justify-between py-2.5 px-4 border-b border-stone-100">
                    <span className="text-stone-500">Material</span>
                    <span className="font-bold text-stone-800">{mug.material}</span>
                  </div>
                  <div className="flex justify-between py-2.5 px-4 border-b border-stone-100">
                    <span className="text-stone-500">Finish</span>
                    <span className="font-bold text-stone-800">{mug.finish}</span>
                  </div>
                  <div className="flex justify-between py-2.5 px-4">
                    <span className="text-stone-500">Country of Origin</span>
                    <span className="font-bold text-stone-800">Jaipur, India</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
