'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#1a1c2c] text-white overflow-hidden relative">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-noto-serif text-4xl md:text-6xl mb-8 leading-tight"
        >
          Ready to Find Your <br />
          <span className="italic font-light text-gold">Perfect Skirt?</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-manrope text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Browse our full collection and shop on Amazon or Flipkart with secure checkout and fast delivery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/shop" className="inline-block px-12 py-5 bg-gradient-to-r from-primary to-gold rounded-full font-manrope font-bold text-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
            Explore Collection &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
