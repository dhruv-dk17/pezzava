'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The cotton drapes like nothing I've owned. It moves with you, never against you.",
    author: 'Priya S.',
    location: 'Mumbai',
    product: 'Navy Tribal Art Wrap',
  },
  {
    quote: "The fabric breathing in summer heat is unmatched. Ordering two more for family gifts.",
    author: 'Ravi M.',
    location: 'Delhi',
    product: 'Black & White Knee Length Wrap',
  },
  {
    quote: "The blockprint details are even richer in person. Wearing this feels like carrying a piece of Jaipur with me.",
    author: 'Megha K.',
    location: 'Bangalore',
    product: 'Sanganeri Botanical Wrap',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-44 px-6 md:px-12 lg:px-20 bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-stone-900 leading-[1.04] tracking-tight">
            From the people <br className="hidden md:block" />
            who <span className="italic font-light text-[#5C631C]">wear it.</span>
          </h2>
        </div>

        {/* Testimonial Cards — Editorial Offset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`testimonial-card bg-white rounded-3xl p-8 md:p-10 border border-stone-200/90 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                index === 1 ? 'md:translate-y-8' : ''
              }`}
            >
              <div>
                <span className="font-display text-4xl text-[#8B6B22]/40 block mb-4 leading-none">“</span>
                <p className="font-display text-xl sm:text-2xl text-stone-900 leading-snug mb-8">
                  {item.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <p className="font-manrope text-sm font-bold text-stone-900">{item.author}</p>
                <p className="font-manrope text-xs text-stone-500 mt-1">
                  {item.location} · {item.product}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
