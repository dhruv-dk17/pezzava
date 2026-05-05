'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeritagePage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 z-10 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-manrope text-xs font-bold tracking-[0.5em] text-primary uppercase mb-8 block">Est. 2024 • Jaipur</span>
              <h1 className="font-noto-serif text-6xl md:text-8xl lg:text-[10rem] text-on-surface leading-[0.85] mb-12 -ml-1">
                The <br />
                <span className="italic text-primary">Soul</span> <br />
                Of <span className="font-light">Jaipur</span>
              </h1>
              <p className="font-manrope text-lg text-on-surface-variant max-w-sm leading-relaxed mb-12">
                Bridging ancient Rajasthani textile traditions with the modern silhouette. A story of craftsmanship, cotton, and timeless elegance.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7 relative h-[600px] md:h-[800px]">
             <motion.div 
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="absolute inset-0 rounded-tl-[120px] lg:rounded-tl-[240px] overflow-hidden shadow-3xl"
             >
                <Image 
                  src="/images/about-heritage.png" 
                  alt="Jaipur Heritage" 
                  fill 
                  className="object-cover"
                  priority
                />
             </motion.div>
             
             {/* Decorative element */}
             <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 backdrop-blur-3xl rounded-full z-0 hidden lg:block" 
             />
          </div>
        </div>
      </section>

      {/* Narrative Section - Asymmetrical */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            <div className="relative pt-24 lg:order-2">
               <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="relative z-10"
               >
                 <h2 className="font-noto-serif text-4xl md:text-5xl mb-12 leading-tight">
                   A Legacy Wrapped in <br />
                   <span className="italic text-primary">Artisanal Cotton</span>
                 </h2>
                 <div className="space-y-8 font-manrope text-lg text-on-surface-variant leading-relaxed">
                   <p>
                     Founded in the heart of Jaipur, Pezzava was born from a desire to bridge the gap between 
                     ancient Rajasthani textile traditions and the wardrobe of the modern woman. 
                     Jaipur, known globally for its vibrant craftsmanship, provides the perfect backdrop 
                     for our creative journey.
                   </p>
                   <p>
                     Our signature wrap-around skirts are more than just garments; they are a canvas 
                     for the block-printing techniques that have been passed down through generations. 
                     We work directly with local artisans, ensuring that every piece is crafted with 
                     respect for the environment and the people who make them.
                   </p>
                 </div>
               </motion.div>

               <div className="absolute top-0 right-0 font-noto-serif text-[12rem] text-primary/5 leading-none select-none -z-10 italic">
                 Heritage
               </div>
            </div>

            <div className="lg:order-1">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
                 className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 shadow-2xl overflow-hidden rounded-lg"
               >
                 <Image 
                   src="/images/bento-craft.png" 
                   alt="Artisanal Details" 
                   fill 
                   className="object-cover"
                 />
               </motion.div>
               <div className="mt-8 text-right lg:text-left max-w-md mx-auto lg:mx-0">
                  <span className="font-manrope text-xs font-bold uppercase tracking-widest text-secondary">The Craftsmanship</span>
                  <p className="font-manrope text-sm text-on-surface-variant mt-2 italic">Hand-blocked prints on 100% pure cotton, dried under the Jaipur sun.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Process - Visual Grid */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
             <div className="max-w-xl">
                <span className="font-manrope text-xs font-bold tracking-widest text-primary uppercase mb-4 block">The Creation</span>
                <h2 className="font-noto-serif text-5xl md:text-6xl italic">The Pezzava Way</h2>
             </div>
             <p className="font-manrope text-on-surface-variant max-w-xs text-sm">
                A meticulous three-step process that ensures every skirt tells a story of quality and culture.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-stone-200 border border-stone-200">
             {[
               {
                 step: "01",
                 title: "Ethical Sourcing",
                 desc: "We hand-select only the finest 100% pure cotton from local mills that practice sustainable manufacturing."
               },
               {
                 step: "02",
                 title: "Artisanal Printing",
                 desc: "Traditional wooden blocks are used by master craftsmen to apply natural dyes with rhythmic precision."
               },
               {
                 step: "03",
                 title: "Universal Fit",
                 desc: "Each skirt is engineered for a universal wrap-around fit, celebrating the diversity of the female form."
               }
             ].map((item, i) => (
               <div key={i} className="bg-surface p-12 group hover:bg-primary transition-colors duration-500">
                 <span className="font-noto-serif text-5xl mb-12 block text-primary group-hover:text-gold transition-colors">{item.step}</span>
                 <h3 className="font-noto-serif text-2xl mb-6 group-hover:text-white transition-colors">{item.title}</h3>
                 <p className="font-manrope text-on-surface-variant leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-6 overflow-hidden relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-noto-serif text-[20vw] text-stone-100 whitespace-nowrap pointer-events-none select-none uppercase font-bold">
            Timeless Elegance
         </div>
         <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-noto-serif text-4xl md:text-6xl leading-tight mb-12">
                "True luxury is the <span className="italic">harmony</span> of absolute comfort and authentic <span className="text-primary">craftsmanship</span>."
              </h2>
              <div className="w-12 h-1px bg-primary mx-auto mb-8" />
              <div className="relative w-24 h-16 mx-auto mb-4">
                <Image src="/logo.png" alt="Pezzava" fill className="object-contain" />
              </div>
              <p className="font-manrope font-bold uppercase tracking-[0.4em] text-sm text-primary">
                Pezzava Jaipur
              </p>
            </motion.div>
         </div>
      </section>
    </div>
  );
}

