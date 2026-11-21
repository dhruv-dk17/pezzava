'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPortalUrl } from '@/lib/domain';
import { Feather, Coffee, ArrowRight } from 'lucide-react';

export default function CTA() {
  const skirtsUrl = getPortalUrl('skirts');
  const mugsUrl = getPortalUrl('mugs');

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#141613] text-white overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5C631C]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="font-manrope text-xs font-bold tracking-[0.3em] text-[#C9A84C] uppercase block mb-4">
          Direct From The Artisans of Jaipur
        </span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-noto-serif text-4xl md:text-6xl mb-6 leading-tight"
        >
          Discover Pure Cotton Silhouettes & <br />
          <span className="italic font-light text-[#C9A84C]">Vitrified Ceramic Prints</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-manrope text-base sm:text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Explore the dedicated Skirts Atelier and Ceramic Mug Studio. Order with one-click convenience on Amazon or Flipkart with verified express delivery across India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link 
            href={skirtsUrl} 
            className="w-full sm:w-auto px-8 py-4 bg-[#5C631C] hover:bg-[#4a5016] text-white rounded-full font-manrope font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <Feather size={14} />
            <span>Shop Skirts (skirts.pezzava.in)</span>
            <ArrowRight size={14} />
          </Link>

          <Link 
            href={mugsUrl} 
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-manrope font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <Coffee size={14} className="text-[#C9A84C]" />
            <span>Mug Studio (mugs.pezzava.in)</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
