import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-stone-50 border-t border-stone-200 py-20 px-8 md:px-16 mt-20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Link href="/" className="relative w-40 h-24 mb-6 block hover:scale-105 transition-transform duration-500">
            <Image src="/logo.png" alt="Pezzava" fill className="object-contain" />
          </Link>
          <p className="font-body text-on-surface-variant max-w-md leading-relaxed mb-8">
            Bridging the ornate architectural history of Rajasthan with the restrained clarity of modern editorial fashion. 
            Purveyors of fine 100% cotton wrap-around skirts.
          </p>
          <p className="font-body text-[12px] uppercase tracking-widest text-primary font-bold">
            © 2024 PEZZAVA. Crafted in Jaipur.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] mb-4">Collection</h4>
          <Link href="/shop" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">Shop All</Link>
          <Link href="/shop?cat=new" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">New Arrivals</Link>
          <Link href="/shop?cat=bestsellers" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">Bestsellers</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] mb-4">About Us</h4>
          <Link href="/about" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">Our Story</Link>
          <Link href="/contact" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">Contact Us</Link>
          <Link href="/careers" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">Careers</Link>
          <Link href="/careers/verification" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">Internship Verification</Link>
          <Link href="#" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors underline decoration-1 underline-offset-4">Terms of Service</Link>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-20 pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-10">
          <a href="https://www.instagram.com/pezzava6828?igsh=NWc5cGp5aHhkbmF2" target="_blank" rel="noopener noreferrer" className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface hover:text-primary transition-colors">Instagram</a>
          <a href="https://www.facebook.com/pezzava/" target="_blank" rel="noopener noreferrer" className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface hover:text-primary transition-colors">Facebook</a>
          <a href="#" className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface hover:text-primary transition-colors">Pinterest</a>
        </div>
        <div className="text-[10px] font-body text-stone-400 uppercase tracking-widest">
            Handcrafted with love in the Pink City
        </div>
      </div>
    </footer>
  );
};

export default Footer;
