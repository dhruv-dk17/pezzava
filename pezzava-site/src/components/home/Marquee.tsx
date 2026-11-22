'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [
    'Hand Block-Printed Cotton',
    '·',
    'High-Quality Sublimation Printing',
    '·',
    'Prints Never Fade After Many Washes',
    '·',
    'Premium Imported Inks & Advanced Machines',
    '·',
    'Plain White High-Density Ceramic',
    '·',
    '100% Dishwasher & Microwave Safe',
    '·',
    'Crystal-Sharp 300+ DPI Heat Infusion',
    '·',
    'Jaipur Artisanal Wrap Skirts',
    '·',
    'Tested for 500+ Wash Cycles Without Peeling',
    '·',
    'Pan-India Safe Transit Packaging',
    '·',
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Smooth infinite GSAP continuous loop
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 32,
      repeat: -1,
    });

    const handleMouseEnter = () => tween.timeScale(0.2);
    const handleMouseLeave = () => tween.timeScale(1);

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      tween.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-7 bg-[#FAF8F5] border-y border-stone-200/80 overflow-hidden select-none"
    >
      <div 
        ref={trackRef} 
        className="flex w-max will-change-transform cursor-default"
      >
        {/* Quadrupled items list for seamless, continuous ribbon flow */}
        {[...items, ...items, ...items, ...items].map((word, i) => (
          <span
            key={i}
            className={`font-display text-2xl md:text-3xl whitespace-nowrap mx-3 md:mx-5 ${
              word === '·'
                ? 'text-[#8B6B22]/50 font-light'
                : 'text-stone-500 italic hover:text-stone-900 transition-colors duration-300'
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
