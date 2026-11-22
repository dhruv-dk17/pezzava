'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { catalog } from '@/data/products';
import { getPortalUrl } from '@/lib/domain';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SkirtsLookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const skirtsUrl = getPortalUrl('skirts');

  // Select top 3 authentic catalog pieces
  const featuredSkirts = catalog.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.lookbook-card').forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.08,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto">

        {/* ─── SECTION HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16 pb-8 border-b border-stone-200">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.05] tracking-tight">
              The Cotton Wrap <br />
              <span className="italic font-light text-[#5C631C]">Silhouettes</span>
            </h2>
            <p className="mt-3 font-manrope text-base text-stone-600 leading-relaxed">
              Every skirt is stamped by hand in Jaipur using natural vegetable dyes and centuries-old wooden blocks. Tailored with a universally adjustable wrap waist that flatters every silhouette.
            </p>
          </div>

          <Link
            href={skirtsUrl}
            className="btn-press group inline-flex items-center gap-2 px-7 py-3.5 bg-[#5C631C] hover:bg-[#474e14] text-white rounded-full font-manrope text-xs font-bold uppercase tracking-wider shadow-md shrink-0 self-start md:self-auto"
          >
            <span>View Full Atelier</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ─── BALANCED 3-COLUMN EDITORIAL FASHION GRID (NO EMPTY GAPS) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {featuredSkirts.map((skirt, index) => (
            <div
              key={skirt.id}
              className="lookbook-card bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Product Imagery */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 mb-6">
                  <Image
                    src={skirt.images[0] || '/images/products/p1.webp'}
                    alt={skirt.displayName}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-manrope font-bold text-stone-900 shadow-sm">
                      100% Pure Cotton
                    </span>
                    {index === 0 && (
                      <span className="bg-[#5C631C] text-white px-3 py-1 rounded-full text-[10px] font-manrope font-bold tracking-wider uppercase shadow-sm">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Strip */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-stone-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-white font-manrope text-[11px] flex items-center justify-between">
                    <span>Free Size Wrap Drape</span>
                    <span className="text-[#C9A84C] font-semibold capitalize">{skirt.category} Length</span>
                  </div>
                </div>

                {/* Title & Pricing */}
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display text-2xl text-stone-900 group-hover:text-[#5C631C] transition-colors leading-snug">
                    {skirt.displayName}
                  </h3>
                  <div className="flex items-baseline gap-1.5 shrink-0">
                    <span className="font-display text-2xl font-bold text-stone-900">₹{skirt.price}</span>
                    {skirt.originalPrice && (
                      <span className="font-manrope text-xs text-stone-400 line-through">₹{skirt.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="font-manrope text-sm text-stone-600 line-clamp-2 leading-relaxed mb-6">
                  {skirt.description}
                </p>
              </div>

              {/* Purchase Action Strip */}
              <div className="pt-5 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-manrope text-stone-500">
                  <Check size={14} className="text-[#5C631C]" />
                  <span>Ready to Ship</span>
                </div>

                <div className="flex items-center gap-2">
                  {skirt.marketplace.amazon && (
                    <a
                      href={skirt.marketplace.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press px-4 py-2 bg-[#FF9900]/10 hover:bg-[#FF9900]/20 text-[#C46E00] text-xs font-manrope font-bold rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>Amazon</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {skirt.marketplace.flipkart && (
                    <a
                      href={skirt.marketplace.flipkart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press px-4 py-2 bg-[#2874F0]/10 hover:bg-[#2874F0]/20 text-[#1C5BBD] text-xs font-manrope font-bold rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>Flipkart</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
