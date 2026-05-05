"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Heart, Users, ShieldCheck, ArrowRight } from "lucide-react";

const CareersPage = () => {
  const values = [
    {
      icon: <Sparkles className="text-warm-gold" size={32} />,
      title: "Artisan Integrity",
      description: "We preserve the slow, intentional craft of hand-block printing, honoring the legacy of Jaipur's master printers."
    },
    {
      icon: <Heart className="text-warm-gold" size={32} />,
      title: "Quality First",
      description: "From the finest 100% cotton to the precision of every wrap-around tie, we never compromise on the tactile experience."
    },
    {
      icon: <Users className="text-warm-gold" size={32} />,
      title: "Creative Community",
      description: "We foster an environment where tradition meets modern editorial vision, encouraging bold ideas and cross-disciplinary collaboration."
    }
  ];

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
          <Image src="/images/careers-hero.png" alt="Pezzava Design Studio" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        <div className="relative z-10 text-center px-8">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-body text-white uppercase tracking-[0.4em] text-sm mb-6">Join the Legacy</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight">
            Crafting the <br /> <span className="italic font-light">Future</span>
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 px-8 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">Where heritage <br /> meets <span className="text-primary italic">innovation</span>.</h2>
            <div className="space-y-6 font-body text-on-surface-variant leading-relaxed text-lg">
              <p>At Pezzava, we believe that fashion should be a dialogue between the past and the future. Our studio in Jaipur is more than just a workspace — it&apos;s a living laboratory of craftsmanship.</p>
              <p>We are looking for individuals who are passionate about slow fashion, artisanal techniques, and the power of editorial storytelling.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/images/careers-workspace.png" alt="Pezzava Workspace" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-stone-50 border-y border-stone-200">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl font-bold mb-4 uppercase tracking-widest">Our Values</h2>
            <div className="w-24 h-[2px] bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="text-center group">
                <div className="mb-8 flex justify-center transform group-hover:scale-110 transition-transform duration-500">{v.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-4">{v.title}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 px-8 md:px-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden">
            <Image src="/images/careers-artisan.png" alt="Artisan at work" fill className="object-cover" />
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center p-12">
              <div className="text-center">
                <span className="font-display text-6xl font-bold text-primary block mb-2">100%</span>
                <span className="font-body text-sm uppercase tracking-widest text-primary font-bold">Natural Cotton</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <Image src="/images/hero-heritage.png" alt="Product detail" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="positions" className="py-32 bg-on-surface text-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">Join Our Team</h2>
          <p className="font-body text-stone-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            We are always looking for passionate individuals to join our Jaipur studio. 
            While we don&apos;t have any active openings at this moment, feel free to share your journey with us.
          </p>
          <a href="mailto:pezzava.jaipur@gmail.com" className="inline-block bg-primary text-on-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-on-surface transition-all duration-300">
            Submit Portfolio
          </a>
        </div>
      </section>

      {/* Verification Portal Link - More Prominent */}
      <section className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white border border-stone-200 rounded-3xl p-10 md:p-16 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 flex items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Internship Verification Portal</h3>
                <p className="font-body text-on-surface-variant max-w-md leading-relaxed">
                  Official platform to verify the authenticity of internship certificates issued by Pezzava.
                </p>
              </div>
            </div>
            <Link 
              href="/careers/verification" 
              className="relative z-10 inline-flex items-center gap-3 bg-on-surface text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all duration-300 hover:shadow-2xl group"
            >
              Verify Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CareersPage;
