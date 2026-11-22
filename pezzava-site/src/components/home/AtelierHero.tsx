'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPortalUrl } from '@/lib/domain';
import ThreeFabricCanvas from '@/components/3d/ThreeFabricCanvas';
import { ArrowUpRight, Sparkles, Feather, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AtelierHero() {
  const heroRef = useRef<HTMLElement>(null);
  const portalsContainerRef = useRef<HTMLDivElement>(null);
  const skirtCardRef = useRef<HTMLDivElement>(null);
  const mugCardRef = useRef<HTMLDivElement>(null);

  const skirtsUrl = getPortalUrl('skirts');
  const mugsUrl = getPortalUrl('mugs');

  // GSAP 3D Scroll Depth Choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-brand-tag', {
        y: -30,
        opacity: 0,
        duration: 1.1,
      })
      .from('.hero-title-word', {
        y: 80,
        opacity: 0,
        duration: 1.3,
        stagger: 0.08,
      }, '-=0.7')
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 1,
      }, '-=0.9')
      .from('.hero-portal-door', {
        y: 80,
        opacity: 0,
        rotationX: 14,
        duration: 1.4,
        stagger: 0.16,
        clearProps: 'transform',
      }, '-=0.8');

      // 2. 3D Scroll Depth Effect: As user scrolls, hero shifts backward into deep spatial perspective
      if (heroRef.current && portalsContainerRef.current) {
        gsap.to('.hero-title-wrapper', {
          yPercent: -35,
          scale: 0.92,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(portalsContainerRef.current, {
          yPercent: -12,
          scale: 1.01,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Interactive 3D Card Tilt on Mouse Move (Spring Physics)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, cardRef: React.RefObject<HTMLDivElement | null>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 9;
    const rotateY = (x / rect.width) * 9;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = (cardRef: React.RefObject<HTMLDivElement | null>) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`;
  };

  return (
    <section
      ref={heroRef}
      className="scene-3d-perspective relative min-h-screen bg-[#FAF8F5] pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden border-b border-stone-200/80"
    >
      {/* ─── AMBIENT 3D FABRIC CANVAS BACKGROUND ─── */}
      <ThreeFabricCanvas className="absolute inset-0 w-full h-full opacity-65 pointer-events-none z-0" />

      {/* Subtle Gradient Fog to guarantee text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-transparent to-[#FAF8F5] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full">

        {/* ─── MONUMENTAL PEZZAVA EDITORIAL HEADER ─── */}
        <div className="hero-title-wrapper text-center max-w-5xl mx-auto mb-16 md:mb-24">
          
          <div className="hero-brand-tag flex items-center justify-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-stone-300" />
            <span className="font-manrope text-[11px] md:text-xs font-semibold tracking-[0.45em] text-[#5C631C] uppercase">
              The House of Pezzava · Jaipur
            </span>
            <span className="h-[1px] w-12 bg-stone-300" />
          </div>

          <h1 className="font-display text-[clamp(2.8rem,7.5vw,7.2rem)] text-stone-900 leading-[1.02] tracking-tight">
            <span className="hero-title-word inline-block mr-3">Where</span>
            <span className="hero-title-word inline-block mr-3">heritage</span>
            <span className="hero-title-word inline-block mr-3 italic font-light text-[#5C631C]">textiles</span>
            <span className="hero-title-word inline-block mr-3">meet</span>
            <span className="hero-title-word inline-block italic font-light text-[#C9A84C]">bespoke</span>
            <br className="hidden md:inline" />
            <span className="hero-title-word inline-block mr-3">print</span>
            <span className="hero-title-word inline-block italic font-light">craftsmanship.</span>
          </h1>

          <p className="hero-description mt-8 font-manrope text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Founded in 2012 in the Pink City. Pezzava crafts pure 100% cotton Jaipur wrap-around skirts and precision high-definition design printing on premium ceramic mugs — available nationwide on Amazon and Flipkart.
          </p>

        </div>

        {/* ─── DUAL ARCHITECTURAL 3D PORTAL GATES ─── */}
        <div
          ref={portalsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >

          {/* ── PORTAL 01: THE SKIRTS ATELIER ── */}
          <Link
            href={skirtsUrl}
            className="hero-portal-door group block"
            onMouseMove={(e) => handleMouseMove(e, skirtCardRef)}
            onMouseLeave={() => handleMouseLeave(skirtCardRef)}
          >
            <div
              ref={skirtCardRef}
              className="card-3d-tilt relative bg-white/95 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-stone-200/90 shadow-sm group-hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
            >
              {/* Subtle Atmospheric Sheen */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#5C631C]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Feather size={14} className="text-[#5C631C]" />
                      <span className="font-manrope text-[11px] font-bold tracking-[0.25em] text-[#5C631C] uppercase">
                        skirts.pezzava.in
                      </span>
                    </div>
                    <span className="font-manrope text-xs text-stone-400">Atelier Portal · Pure Cotton</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-stone-100 group-hover:bg-[#5C631C] text-stone-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Imagery Preview */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 mb-6">
                  <Image
                    src="/images/products/p1.webp"
                    alt="Pezzava Pure Cotton Wrap Around Skirt"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-4 text-white font-manrope text-[11px] font-semibold tracking-wider uppercase">
                    100% Breathable Jaipur Cotton
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 group-hover:text-[#5C631C] transition-colors mb-3 leading-snug">
                  Artisanal Cotton <br />
                  <span className="italic font-light">Wrap-Around Skirts</span>
                </h2>

                <p className="font-manrope text-sm text-stone-600 leading-relaxed mb-6">
                  Centuries-old Bagru and Sanganeri botanical woodblock prints. Featuring a universally adjustable tie-around drape that moves gracefully with every silhouette.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-manrope text-stone-500">
                  <span>Free Size</span>
                  <span>·</span>
                  <span>Mini & Maxi</span>
                  <span>·</span>
                  <span>Amazon & Flipkart</span>
                </div>
                <span className="font-manrope text-xs font-bold text-[#5C631C] group-hover:underline">
                  Enter Atelier &rarr;
                </span>
              </div>
            </div>
          </Link>

          {/* ── PORTAL 02: THE PRINT STUDIO ── */}
          <Link
            href={mugsUrl}
            className="hero-portal-door group block"
            onMouseMove={(e) => handleMouseMove(e, mugCardRef)}
            onMouseLeave={() => handleMouseLeave(mugCardRef)}
          >
            <div
              ref={mugCardRef}
              className="card-3d-tilt relative bg-white/95 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-stone-200/90 shadow-sm group-hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
            >
              {/* Subtle Atmospheric Sheen */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#C9A84C]/15 via-transparent to-transparent rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Coffee size={14} className="text-[#8B6B22]" />
                      <span className="font-manrope text-[11px] font-bold tracking-[0.25em] text-[#8B6B22] uppercase">
                        mugs.pezzava.in
                      </span>
                    </div>
                    <span className="font-manrope text-xs text-stone-400">Print Studio Portal · Ceramic Mugs</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-stone-100 group-hover:bg-[#C9A84C] text-stone-700 group-hover:text-stone-900 flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Imagery Preview */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white mb-6 border border-stone-100">
                  <Image
                    src="/images/mugs/mug-camels-jaipur.jpg"
                    alt="Pezzava Jaipur Desert Camels Printed Ceramic Coffee Mug"
                    fill
                    className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-3 left-4 bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-white font-manrope text-[10px] font-semibold tracking-wider uppercase">
                    325ml Plain White Ceramic · Sublimation Print
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 group-hover:text-[#8B6B22] transition-colors mb-3 leading-snug">
                  Precision Graphic <br />
                  <span className="italic font-light">Ceramic Mug Printing</span>
                </h2>

                <p className="font-manrope text-sm text-stone-600 leading-relaxed mb-6">
                  We take classic plain white ceramic mugs and infuse permanent 300+ DPI sublimation art. Authentic Rajasthani motifs, folk illustrations, and personalized prints.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-manrope text-stone-500">
                  <span>325ml</span>
                  <span>·</span>
                  <span>Microwave Safe</span>
                  <span>·</span>
                  <span>Bespoke Orders</span>
                </div>
                <span className="font-manrope text-xs font-bold text-[#8B6B22] group-hover:underline">
                  Enter Print Studio &rarr;
                </span>
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
