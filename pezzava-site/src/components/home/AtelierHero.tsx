'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Feather, Coffee, ShieldCheck } from 'lucide-react';
import { getPortalUrl } from '@/lib/domain';
import gsap from 'gsap';

export default function AtelierHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle ambient particle canvas for Jaipur desert & terracotta dust atmosphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#C9A84C', '#5C631C', '#8D3828', '#FAF8F5'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP entrance animation for high-contrast editorial title
  useEffect(() => {
    if (!headlineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal-text', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
      });
      gsap.from('.hero-portal-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const skirtsUrl = getPortalUrl('skirts');
  const mugsUrl = getPortalUrl('mugs');

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center bg-[#FAF8F5] pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Ambient Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
      />

      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#5C631C]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#C9A84C]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Brand Tagline */}
        <div className="flex items-center gap-2 mb-4 hero-reveal-text">
          <span className="h-[1px] w-10 bg-[#5C631C]"></span>
          <span className="font-manrope text-xs md:text-sm font-bold tracking-[0.35em] text-[#5C631C] uppercase">
            Est. 2012 • Jaipur Artisanal House
          </span>
        </div>

        {/* Display Typography */}
        <div className="mb-14">
          <h1
            ref={headlineRef}
            className="font-noto-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-stone-900 leading-[1.05] tracking-tight"
          >
            <span className="block hero-reveal-text">Jaipur Craftsmanship,</span>
            <span className="block hero-reveal-text">
              Reimagined in <span className="italic font-light text-[#5C631C]">Cotton</span> &{' '}
              <span className="italic font-light text-[#C9A84C]">Ceramics</span>.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl font-manrope text-base sm:text-lg text-stone-600 leading-relaxed hero-reveal-text">
            Pezzava unites two timeless traditions: 100% pure cotton artisanal wrap-around skirts
            and precision high-fire ceramic mug printing. Available across India on Amazon and Flipkart.
          </p>
        </div>

        {/* The Dual Pillars: Dedicated Subdomain Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Pillar 1: Skirts Atelier -> skirts.pezzava.in */}
          <Link
            href={skirtsUrl}
            className="hero-portal-card group relative bg-white rounded-3xl p-8 lg:p-10 border border-stone-200/90 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#5C631C]/15 to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#5C631C]/10 text-[#5C631C] flex items-center justify-center">
                    <Feather size={20} />
                  </div>
                  <div>
                    <span className="font-manrope text-[11px] font-bold tracking-[0.2em] text-[#5C631C] uppercase block">
                      skirts.pezzava.in
                    </span>
                    <span className="font-manrope text-xs text-stone-400">Atelier Collection</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-[#5C631C] text-stone-700 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <h2 className="font-noto-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 group-hover:text-[#5C631C] transition-colors mb-3">
                Hand-Block Cotton <br />
                <span className="italic font-light">Wrap Around Skirts</span>
              </h2>

              <p className="font-manrope text-sm text-stone-600 leading-relaxed mb-6">
                Centuries-old Bagru & Sanganeri botanical prints on breathable cotton. Tailored with a universally adjustable wrap fit that flatters every silhouette.
              </p>
            </div>

            <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-manrope text-stone-500">
                <span>• Mini & Maxi</span>
                <span>• 100% Jaipur Cotton</span>
                <span>• Amazon & Flipkart</span>
              </div>
              <span className="font-manrope text-xs font-bold uppercase tracking-wider text-[#5C631C] group-hover:underline flex items-center gap-1">
                Explore Skirts Portal &rarr;
              </span>
            </div>
          </Link>

          {/* Pillar 2: Mugs Studio -> mugs.pezzava.in */}
          <Link
            href={mugsUrl}
            className="hero-portal-card group relative bg-white rounded-3xl p-8 lg:p-10 border border-stone-200/90 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C9A84C]/20 to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 text-[#8B6B22] flex items-center justify-center">
                    <Coffee size={20} />
                  </div>
                  <div>
                    <span className="font-manrope text-[11px] font-bold tracking-[0.2em] text-[#8B6B22] uppercase block">
                      mugs.pezzava.in
                    </span>
                    <span className="font-manrope text-xs text-stone-400">Ceramic Printing Studio</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-[#C9A84C] text-stone-700 group-hover:text-stone-900 flex items-center justify-center transition-colors">
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              <h2 className="font-noto-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 group-hover:text-[#8B6B22] transition-colors mb-3">
                Artisanal Ceramic & <br />
                <span className="italic font-light">Custom Mug Printing</span>
              </h2>

              <p className="font-manrope text-sm text-stone-600 leading-relaxed mb-6">
                1200°C kiln-vitrified ceramic coffee mugs with royal Blue Pottery motifs and 300+ DPI sublimation print personalization for gifts and corporate branding.
              </p>
            </div>

            <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-manrope text-stone-500">
                <span>• 3D Interactive View</span>
                <span>• Microwave Safe</span>
                <span>• Custom Print Service</span>
              </div>
              <span className="font-manrope text-xs font-bold uppercase tracking-wider text-[#8B6B22] group-hover:underline flex items-center gap-1">
                Explore Mugs Studio &rarr;
              </span>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
