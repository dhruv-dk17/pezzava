'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle text and image reveal with safe fallback
      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });

      // Metric Counter Animation
      gsap.utils.toArray<HTMLElement>('.counter-num').forEach((el) => {
        const target = parseInt(el.dataset.target || '0');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-44 bg-[#F7F4EE] border-t border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Editorial Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 md:mb-36">
          
          {/* Left: Authentic Jaipur Artisan Workshop Image */}
          <div className="about-reveal lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md border border-stone-200/60 group">
              <Image
                src="/images/bento-craft.png"
                alt="Jaipur block printing artisan carving teak wood blocks"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-stone-800 font-manrope text-xs flex items-center justify-between">
                <span>Hand-Carved Teak Woodblock</span>
                <span className="font-semibold text-[#5C631C]">Sanganer Atelier</span>
              </div>
            </div>
          </div>

          {/* Right: Architectural Narrative */}
          <div className="lg:col-span-7 lg:pl-4">
            <h2 className="about-reveal font-display text-4xl sm:text-6xl lg:text-7xl text-stone-900 leading-[1.04] tracking-tight mb-8">
              A legacy wrapped <br className="hidden md:block" />
              in <span className="italic font-light text-[#5C631C]">artisanal cotton.</span>
            </h2>

            <div className="about-reveal space-y-6 max-w-xl">
              <p className="font-manrope text-base sm:text-lg text-stone-600 leading-relaxed">
                Pezzava began in 2012 in a small Jaipur workshop with a quiet, uncompromising belief: India&apos;s centuries-old woodblock printing heritage belongs in modern everyday wardrobes, crafted with integrity rather than museum glass.
              </p>
              <p className="font-manrope text-sm sm:text-base text-stone-500 leading-relaxed">
                Every wrap skirt begins as handwoven Rajasthani cotton, dyed with natural pigments and stamped one impression at a time. The rhythm of the artisan&apos;s wooden mallet creates subtle, human variations in alignment — the indelible signature of real handcraft.
              </p>
            </div>

            <div className="about-reveal mt-10">
              <Link
                href="/about"
                className="btn-press group inline-flex items-center gap-2.5 font-manrope text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-900 pb-1.5 hover:text-[#5C631C] hover:border-[#5C631C] transition-colors"
              >
                <span>Read the Pezzava Story</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Numbers & Milestones Architectural Strip */}
        <div className="about-reveal grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-12 border-t border-stone-300/70">
          {[
            { num: 2012, label: 'Founded in Jaipur', suffix: '' },
            { num: 500, label: 'Years of craft heritage', suffix: '+' },
            { num: 100, label: 'Pure cotton, every fiber', suffix: '%' },
            { num: 12, label: 'Artisan partner ateliers', suffix: '+' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col justify-between">
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-none">
                <span className="counter-num" data-target={item.num}>{item.num}</span>
                <span className="text-[#5C631C]">{item.suffix}</span>
              </p>
              <p className="font-manrope text-xs sm:text-sm font-medium text-stone-500 mt-3">{item.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
