'use client';

import { Product } from '@/data/products';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star, ExternalLink } from 'lucide-react';
import { normalizeImageSrc } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(normalizeImageSrc(product.images?.[0]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100/60">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={imgSrc}
            alt={product.displayName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImgSrc('/next.svg')}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="bg-[#C9A84C] text-stone-900 text-[10px] font-manrope font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Featured
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-manrope font-semibold px-2.5 py-0.5 rounded-full border border-stone-200 shadow-sm">
            {product.length || 'Wrap Skirt'}
          </span>
        </div>

        {/* View Details Quick Action */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Link
            href={`/product/${product.id}`}
            className="w-full bg-white/95 backdrop-blur-md text-stone-900 hover:bg-[#5C631C] hover:text-white py-2 px-4 rounded-xl text-xs font-manrope font-bold text-center shadow-lg transition-colors"
          >
            Explore Craft Details & Fit
          </Link>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-manrope">
            <span className="uppercase tracking-widest text-[10px] font-bold text-[#5C631C]">
              {product.color || 'Artisanal'}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>{product.rating || 4.8}</span>
              <span className="text-stone-400">({product.reviews || 24})</span>
            </div>
          </div>

          <h3 className="font-noto-serif text-lg font-medium text-stone-900 group-hover:text-[#5C631C] transition-colors leading-snug line-clamp-2 mb-2">
            <Link href={`/product/${product.id}`}>{product.displayName}</Link>
          </h3>

          <p className="text-xs text-stone-500 font-manrope line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-manrope text-xl font-bold text-stone-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="font-manrope text-xs text-stone-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="font-manrope text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {product.discount}% off
              </span>
            )}
          </div>

          {/* Amazon and Flipkart Buy Buttons */}
          <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
            {product.marketplace?.amazon ? (
              <a
                href={product.marketplace.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#232F3E] hover:bg-[#131921] text-white py-2 px-3 rounded-lg text-[11px] font-manrope font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span className="text-[#FF9900] font-black text-xs">a</span>
                <span>Amazon</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>
            ) : null}

            {product.marketplace?.flipkart ? (
              <a
                href={product.marketplace.flipkart}
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
