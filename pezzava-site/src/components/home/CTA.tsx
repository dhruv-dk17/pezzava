'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortalUrl } from '@/lib/domain';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const skirtsUrl = getPortalUrl('skirts');
  const mugsUrl = getPortalUrl('mugs');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-[#161514] text-white overflow-hidden"
    >
      {/* Subtle ambient luxury light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#5C631C]/15 via-[#C9A84C]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="cta-reveal font-display text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight max-w-4xl mx-auto mb-6">
          Find your piece of <br className="hidden sm:block" />
          <span className="italic font-light text-[#C9A84C]">Jaipur craftsmanship.</span>
        </h2>

        <p className="cta-reveal font-manrope text-base sm:text-lg text-stone-300 max-w-xl mx-auto leading-relaxed mb-12">
          Discover hand-printed 100% cotton wrap-around skirts, or collaborate with our bespoke ceramic mug print studio. Delivered nationwide across India.
        </p>

        <div className="cta-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={skirtsUrl}
            className="btn-press group px-8 py-4 bg-white text-stone-900 rounded-full font-manrope text-xs font-bold uppercase tracking-wider hover:bg-[#C9A84C] hover:text-stone-900 transition-all duration-300 flex items-center gap-2.5 shadow-lg w-full sm:w-auto justify-center"
          >
            <span>Explore Wrap Skirts</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={mugsUrl}
            className="btn-press group px-8 py-4 border border-stone-700 bg-stone-900/60 backdrop-blur-sm text-stone-200 rounded-full font-manrope text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-stone-500 transition-all duration-300 flex items-center gap-2.5 w-full sm:w-auto justify-center"
          >
            <span>Visit Print Studio</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
