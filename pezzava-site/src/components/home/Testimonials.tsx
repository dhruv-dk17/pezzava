'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Loved the quality of the cotton! The print is so vibrant and the skirt fits perfectly. Will definitely buy more.",
    author: "Priya S.",
    location: "Mumbai",
    rating: 5
  },
  {
    quote: "Very comfortable for daily wear. The wrap-around design is so convenient. Great value for the price.",
    author: "Anita R.",
    location: "Delhi",
    rating: 5
  },
  {
    quote: "The colors are even more beautiful in person. It feels like wearing a piece of Jaipur's heritage.",
    author: "Megha K.",
    location: "Bangalore",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-surface-variant/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-manrope text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Kind Words</span>
          <h2 className="font-noto-serif text-4xl md:text-5xl leading-tight">
            Voices of <span className="italic">Our Community</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#C9A84C" stroke="#C9A84C" />
                  ))}
                </div>
                <p className="font-manrope text-lg text-on-surface-variant italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>
              <div>
                <p className="font-noto-serif text-lg font-bold text-on-surface">
                  &mdash; {item.author}
                </p>
                <p className="font-manrope text-sm text-on-surface-variant uppercase tracking-widest">
                  {item.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
