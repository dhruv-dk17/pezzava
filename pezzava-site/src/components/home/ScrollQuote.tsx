'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const words = `True luxury is the harmony of absolute comfort and authentic craftsmanship`.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrubWords = gsap.utils.toArray<HTMLElement>('.scrub-word');
      
      // Word-by-word scrub lighting animation
      scrubWords.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          color: '#1a1917',
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${i * 35} 65%`,
            end: `top+=${i * 35 + 50} 65%`,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 md:py-52 px-6 md:px-12 lg:px-20 bg-[#FAF8F5] overflow-hidden border-t border-b border-stone-200/80"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#5C631C]/6 via-[#C9A84C]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Subtle Brand Insignia */}
        <div className="flex items-center justify-center gap-3 mb-10 opacity-70">
          <span className="h-[1px] w-8 bg-stone-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B6B22]" />
          <span className="h-[1px] w-8 bg-stone-300" />
        </div>

        {/* Monumental Editorial Quote */}
        <p
          ref={textRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight text-stone-900"
        >
          {words.map((word, i) => {
            const isItalic = word === 'harmony' || word === 'comfort' || word === 'craftsmanship';
            return (
              <span
                key={i}
                className={`scrub-word inline-block mr-[0.28em] transition-all duration-150 ${
                  isItalic ? 'italic font-light text-[#5C631C]' : 'font-normal'
                }`}
                style={{ opacity: 0.28, color: '#88857c', transform: 'translateY(8px)' }}
              >
                {word}
              </span>
            );
          })}
        </p>

        {/* Philosophy Attribution Tag */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-stone-300" />
          <p className="font-manrope text-xs sm:text-sm font-semibold tracking-[0.35em] text-stone-500 uppercase">
            The Pezzava Philosophy
          </p>
          <span className="h-[1px] w-12 bg-stone-300" />
        </div>
      </div>
    </section>
  );
}
