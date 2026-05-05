'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const bentoItems = [
  {
    title: "Artisanal Heritage",
    description: "Every skirt tells a story of Jaipur's rich textile history, hand-printed with precision.",
    image: "/images/bento-craft.png",
    size: "large",
    link: "/heritage"
  },
  {
    title: "100% Pure Cotton",
    description: "Breathable, premium fabric sourced directly from local weavers.",
    image: "/images/bento-lifestyle.png",
    size: "medium",
    link: "/shop"
  },
  {
    title: "The Perfect Fit",
    description: "Adjustable wrap-around design for effortless elegance.",
    image: "/images/hero-heritage.png", // Reusing for now
    size: "small",
    link: "/shop"
  }
];

export default function Heritage() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="font-manrope text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Our Philosophy</span>
            <h2 className="font-noto-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
              Honoring Tradition through <br />
              <span className="italic">Modern Silhouettes</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-manrope text-lg text-on-surface-variant max-w-sm"
          >
            Pezzava is more than a brand; it is a movement to preserve the vanishing arts of Rajasthan while dressing the modern woman in comfort.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px] md:h-[600px]">
          {/* Large Item */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-8 relative overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image 
              src={bentoItems[0].image} 
              alt={bentoItems[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <h3 className="font-noto-serif text-3xl text-white mb-2">{bentoItems[0].title}</h3>
              <p className="font-manrope text-white/70 max-w-md mb-6">{bentoItems[0].description}</p>
              <Link href={bentoItems[0].link} className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                Explore The Craft <span className="text-xl">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column Stack */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="flex-1 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image 
                src={bentoItems[1].image} 
                alt={bentoItems[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <h3 className="font-noto-serif text-2xl text-white mb-2">{bentoItems[1].title}</h3>
                <p className="font-manrope text-white/80 text-sm max-w-xs">{bentoItems[1].description}</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="h-2/5 relative overflow-hidden group cursor-pointer bg-primary-container"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <span className="font-manrope text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2 block">Available Now</span>
                  <h3 className="font-noto-serif text-xl text-on-primary-container">The Perfect Fit</h3>
                </div>
                <Link href="/shop" className="text-primary font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                  Shop All <span className="text-lg">&rarr;</span>
                </Link>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity">
                <Image src="/images/bento-lifestyle.png" alt="pattern" fill className="object-cover rounded-full rotate-12" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
