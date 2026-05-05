'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-heritage.png"
          alt="Pezzava Heritage Collection"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-4xl"
        >
          <motion.span 
            className="mb-4 block font-manrope text-sm font-semibold tracking-[0.3em] text-white/90 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Jaipur Heritage &bull; Artisanal Luxury
          </motion.span>
          
          <h1 className="mb-8 font-noto-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
            The Art of the <br />
            <span className="italic font-light">Wrap Around</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl font-manrope text-lg text-white/80 leading-relaxed">
            Discover a curated collection of premium cotton silhouettes, 
            where centuries of Rajasthani craftsmanship meet modern editorial elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/shop" className="group relative overflow-hidden bg-primary px-10 py-4 text-on-primary transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 font-manrope font-bold uppercase tracking-widest text-sm">
                Shop Collection
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-primary-container transition-transform duration-300 group-hover:translate-y-0" />
            </Link>
            
            <Link href="/heritage" className="group flex items-center gap-2 font-manrope font-bold text-white uppercase tracking-widest text-sm transition-opacity hover:opacity-80">
              Explore Our Story
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                &rarr;
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient for Transition */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent z-20" />
      
      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-manrope text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Scroll</span>
        <div className="h-12 w-[1px] bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gold"
            animate={{ top: ["0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ height: '30%' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
