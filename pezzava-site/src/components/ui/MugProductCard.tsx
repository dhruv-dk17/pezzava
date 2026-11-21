'use client';

import { MugProduct } from '@/data/mugs';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface MugProductCardProps {
  mug: MugProduct;
  index: number;
  onOpen3D?: (mug: MugProduct) => void;
}

export default function MugProductCard({ mug, index, onOpen3D }: MugProductCardProps) {
  const [imgSrc, setImgSrc] = useState(mug.images[0] || '/images/mugs/mug-sanganeri.webp');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-stone-100/60">
        <Link href={`/mugs/${mug.id}`} className="block w-full h-full">
          <Image
            src={imgSrc}
            alt={mug.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgSrc('/images/mugs/mug-sanganeri.webp')}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {mug.featured && (
            <span className="bg-[#5C631C] text-white text-[10px] font-manrope font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Artisan Choice
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-manrope font-semibold px-2.5 py-0.5 rounded-full border border-stone-200 shadow-sm">
            {mug.capacity}
          </span>
        </div>

        {/* 3D Interactive trigger button on hover */}
        {onOpen3D && (
          <button
            onClick={() => onOpen3D(mug)}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 text-stone-900 hover:bg-[#5C631C] hover:text-white px-3 py-1.5 rounded-full text-xs font-manrope font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0"
            title="Inspect 3D Ceramic Model"
          >
            <Sparkles size={12} className="text-[#C9A84C]" />
            <span>View in 3D</span>
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-manrope">
            <span className="uppercase tracking-widest text-[10px] font-bold text-[#5C631C]">
              {mug.theme}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>{mug.rating}</span>
              <span className="text-stone-400">({mug.reviews})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-noto-serif text-lg font-medium text-stone-900 group-hover:text-[#5C631C] transition-colors leading-snug line-clamp-2 mb-2">
            <Link href={`/mugs/${mug.id}`}>{mug.name}</Link>
          </h3>

          <p className="text-xs text-stone-500 font-manrope line-clamp-2 mb-4 leading-relaxed">
            {mug.description}
          </p>
        </div>

        <div>
          {/* Price & Discount */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-manrope text-xl font-bold text-stone-900">₹{mug.price}</span>
            {mug.originalPrice && (
              <span className="font-manrope text-xs text-stone-400 line-through">
                ₹{mug.originalPrice}
              </span>
            )}
            {mug.discount && (
              <span className="font-manrope text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {mug.discount}
              </span>
            )}
          </div>

          {/* Direct Amazon & Flipkart Buy Action Links */}
          <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
            {mug.marketplace.amazon ? (
              <a
                href={mug.marketplace.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#232F3E] hover:bg-[#131921] text-white py-2 px-3 rounded-lg text-[11px] font-manrope font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span className="text-[#FF9900] font-black text-xs">a</span>
                <span>Amazon</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>
            ) : null}

            {mug.marketplace.flipkart ? (
              <a
                href={mug.marketplace.flipkart}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#2874F0] hover:bg-[#1258ca] text-white py-2 px-3 rounded-lg text-[11px] font-manrope font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span className="font-black text-xs text-[#FFE500]">F</span>
                <span>Flipkart</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
