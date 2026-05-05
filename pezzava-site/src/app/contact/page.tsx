'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, CheckCircle2, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Success message stays until manually reset or page reload
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image 
          src="/images/contact-hero.png" 
          alt="Pezzava Lifestyle" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center px-6"
          >
            <p className="font-manrope text-xs font-bold tracking-[0.5em] text-white/80 uppercase mb-4">Get in Touch</p>
            <h1 className="font-noto-serif text-5xl md:text-7xl text-white leading-tight">
              Contact <span className="italic text-primary">Us</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards + Form */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Contact Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {/* Phone */}
          <a href="tel:+918209199603" className="group bg-stone-50 border border-stone-100 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <Phone size={20} className="text-primary" />
            </div>
            <h3 className="font-manrope text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/50 mb-2">Phone</h3>
            <p className="font-manrope text-sm font-semibold text-on-surface">+91 820 919 9603</p>
          </a>

          {/* Email */}
          <a href="mailto:pezzava@gmail.com" className="group bg-stone-50 border border-stone-100 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <Mail size={20} className="text-primary" />
            </div>
            <h3 className="font-manrope text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/50 mb-2">Email</h3>
            <p className="font-manrope text-sm font-semibold text-on-surface">pezzava@gmail.com</p>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/pezzava6828?igsh=NWc5cGp5aHhkbmF2" target="_blank" rel="noopener noreferrer" className="group bg-stone-50 border border-stone-100 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <InstagramIcon size={20} />
            </div>
            <h3 className="font-manrope text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/50 mb-2">Instagram</h3>
            <p className="font-manrope text-sm font-semibold text-on-surface flex items-center gap-1">@pezzava6828 <ExternalLink size={12} className="text-primary" /></p>
          </a>

          {/* Facebook */}
          <a href="https://www.facebook.com/pezzava/" target="_blank" rel="noopener noreferrer" className="group bg-stone-50 border border-stone-100 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <FacebookIcon size={20} />
            </div>
            <h3 className="font-manrope text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/50 mb-2">Facebook</h3>
            <p className="font-manrope text-sm font-semibold text-on-surface flex items-center gap-1">Pezzava <ExternalLink size={12} className="text-primary" /></p>
          </a>
        </motion.div>

        {/* Two-Column: Address + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Left: Address + Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="font-noto-serif text-3xl md:text-4xl font-bold mb-2">Reach Us</h2>
              <div className="w-16 h-[2px] bg-primary" />
            </div>

            {/* Registered Address */}
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-primary" />
                </div>
                <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-primary">Registered Address</span>
              </div>
              <p className="font-manrope text-sm font-semibold leading-relaxed text-on-surface pl-11">
                F-222B, Near Ram Nagar Extension,<br />
                New Sanganer Road, Sodala,<br />
                Jaipur, Rajasthan
              </p>
            </div>

            {/* Office Address */}
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-primary" />
                </div>
                <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-primary">Office Address</span>
              </div>
              <p className="font-manrope text-sm font-semibold leading-relaxed text-on-surface pl-11">
                P.N. 7-b Brij Vihar,<br />
                Badarama Kalwar Road, Govindpura,<br />
                Jaipur, Rajasthan, 302012
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 space-y-2">
              <p className="font-manrope text-xs font-bold uppercase tracking-widest text-on-surface-variant/50">Business Hours</p>
              <p className="font-manrope text-sm font-semibold">Mon — Sat: 10:00 AM – 7:00 PM</p>
              <p className="font-manrope text-sm text-on-surface-variant">Sunday: Closed</p>
            </div>

            {/* Trust Badge / Verification Link */}
            <Link 
              href="/careers/verification"
              className="flex items-center gap-4 p-6 bg-primary/5 border border-primary/10 rounded-2xl hover:bg-primary/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="font-manrope text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Authentic Brand</p>
                <p className="font-manrope text-xs font-semibold text-on-surface underline decoration-primary/30">Verify Internship Certificates</p>
              </div>
            </Link>
          </motion.div>

          {/* Right: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-stone-100 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h3 className="font-noto-serif text-3xl font-bold mb-4">Message Sent!</h3>
                    <p className="font-manrope text-on-surface-variant max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-primary font-bold uppercase tracking-widest text-xs hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <h2 className="font-noto-serif text-3xl font-bold mb-2">Send Us a Message</h2>
                    <p className="font-manrope text-sm text-on-surface-variant mb-10">Have a question or feedback? We&apos;d love to hear from you.</p>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="font-manrope text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2 block">Full Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-manrope text-sm" 
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="font-manrope text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2 block">Email</label>
                          <input 
                            type="email" 
                            id="email" 
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-manrope text-sm" 
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="font-manrope text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2 block">Phone (Optional)</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-manrope text-sm" 
                          placeholder="+91 XXX XXX XXXX"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="font-manrope text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2 block">Subject</label>
                        <select 
                          id="subject"
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-manrope text-sm text-on-surface"
                        >
                          <option value="">Select a topic</option>
                          <option value="product">Product Inquiry</option>
                          <option value="order">Order Support</option>
                          <option value="wholesale">Wholesale / Bulk Orders</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="font-manrope text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2 block">Message</label>
                        <textarea 
                          id="message" 
                          rows={5}
                          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-manrope text-sm resize-none" 
                          placeholder="Tell us how we can help..."
                          required
                        />
                      </div>

                      <motion.button 
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-4 font-manrope font-bold uppercase tracking-widest text-sm transition-all rounded-lg shadow-lg flex items-center justify-center gap-3 ${
                          isSubmitting ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'bg-primary text-on-primary hover:bg-on-surface'
                        }`}
                      >
                        {isSubmitting ? 'Sending...' : (
                          <>
                            Send Message <Send size={16} />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
