'use client';

import { Product } from '@/data/products';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-variant">
          <Image
            src={imgSrc}
            alt={product.displayName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgSrc('/next.svg')}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                <span className="text-xs font-bold font-manrope text-black uppercase tracking-widest">View Details</span>
             </div>
             <div className="bg-primary text-on-primary p-3 rounded-full shadow-lg">
                <ShoppingBag size={18} />
             </div>
          </div>

          {/* Badges */}
          {product.featured && (
             <div className="absolute top-4 left-4">
                <span className="bg-gold text-black px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded-sm">Featured</span>
             </div>
          )}
        </div>
      </Link>

      <div className="mt-6">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-noto-serif text-xl group-hover:text-primary transition-colors">
            <Link href={`/product/${product.id}`}>{product.displayName}</Link>
          </h3>
          <span className="font-manrope font-bold text-lg">₹{product.price}</span>
        </div>
        
        <p className="text-sm text-on-surface-variant font-manrope mb-4">
          {product.color} &bull; {product.length}
        </p>

        <div className="flex items-center gap-3">
          {product.storeAvailability.includes('amazon') && (
            <div className="w-5 h-5 rounded-full bg-[#FF9900] flex items-center justify-center text-[10px] text-white font-bold">A</div>
          )}
          {product.storeAvailability.includes('flipkart') && (
            <div className="w-5 h-5 rounded-full bg-[#2874F0] flex items-center justify-center text-[10px] text-white font-bold">F</div>
          )}
          <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-on-surface-variant/60">Available on Marketplaces</span>
        </div>
      </div>
    </motion.div>
  );
}
