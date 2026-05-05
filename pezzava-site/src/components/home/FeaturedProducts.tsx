'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { getFeaturedProducts } from '@/data/products';

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-manrope text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Curated Selection</span>
            <h2 className="font-noto-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
              Featured <span className="italic">Silhouettes</span>
            </h2>
          </motion.div>
          
          <Link href="/shop" className="group flex items-center gap-3 font-manrope font-bold text-sm uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors">
            View All Products
            <div className="w-10 h-[1px] bg-on-surface group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
