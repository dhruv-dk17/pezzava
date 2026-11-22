'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { catalog } from '@/data/products';
import { getPortalUrl } from '@/lib/domain';
import { Feather, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DualShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const skirtsUrl = getPortalUrl('skirts');
  const topSkirts = catalog.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.product-reveal').forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
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

        {/* ─── HAND-BLOCK WRAP SKIRTS ATELIER ─── */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Feather size={16} className="text-[#5C631C]" />
                <span className="font-manrope text-[11px] font-bold tracking-[0.3em] text-[#5C631C] uppercase">
                  Pezzava Skirts Atelier · skirts.pezzava.in
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.08] tracking-tight">
                Breathable Cotton <br />
                <span className="italic font-light text-[#5C631C]">Wrap Around Skirts</span>
              </h2>
              <p className="mt-3 font-manrope text-sm sm:text-base text-stone-600 max-w-xl">
                Centuries-old Bagru and Sanganeri woodblock prints hand-stamped on pure 100% Rajasthani cotton. Features a universally adjustable wrap fit that flatters every silhouette.
              </p>
            </div>

            <Link
              href={skirtsUrl}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#5C631C] hover:bg-[#474e14] text-white rounded-full font-manrope text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 self-start md:self-auto"
            >
              <span>Explore All Skirts</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Skirt Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSkirts.map((skirt) => (
              <div
                key={skirt.id}
                className="product-reveal group bg-white rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-100 mb-4">
                    <Image
                      src={skirt.images?.[0] || '/images/products/p1.webp'}
                      alt={skirt.displayName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-manrope font-bold text-stone-800">
                      100% Pure Cotton
                    </div>
                  </div>

                  <span className="text-[10px] font-manrope font-bold text-[#5C631C] uppercase tracking-wider block mb-1">
                    {skirt.category} Length · Free Size
                  </span>
                  <h3 className="font-display text-xl text-stone-900 group-hover:text-[#5C631C] transition-colors mb-2">
                    {skirt.displayName}
                  </h3>
                  <p className="font-manrope text-xs text-stone-500 line-clamp-2 mb-4">
                    {skirt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl font-bold text-stone-900">₹{skirt.price}</span>
                    <span className="text-xs text-stone-400 line-through ml-2">₹{skirt.originalPrice}</span>
                  </div>

                  <div className="flex gap-2">
                    {skirt.marketplace.amazon && (
                      <a
                        href={skirt.marketplace.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#FF9900]/10 hover:bg-[#FF9900]/20 text-[#D47900] text-[10px] font-manrope font-bold rounded-lg transition-colors"
                      >
                        Amazon
                      </a>
                    )}
                    {skirt.marketplace.flipkart && (
                      <a
                        href={skirt.marketplace.flipkart}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#2874F0]/10 hover:bg-[#2874F0]/20 text-[#1C5BBD] text-[10px] font-manrope font-bold rounded-lg transition-colors"
                      >
                        Flipkart
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
