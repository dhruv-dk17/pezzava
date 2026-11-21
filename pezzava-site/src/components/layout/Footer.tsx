import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPortalUrl } from "@/lib/domain";

const Footer = () => {
  const skirtsUrl = getPortalUrl("skirts");
  const mugsUrl = getPortalUrl("mugs");

  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-stone-200/80 py-20 px-6 md:px-16 mt-20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Link href="/" className="relative w-36 h-18 mb-6 block hover:scale-105 transition-transform duration-500">
            <Image src="/logo.png" alt="Pezzava" fill className="object-contain" />
          </Link>
          <p className="font-manrope text-sm text-stone-600 max-w-sm leading-relaxed mb-6">
            Bridging the ornate architectural craftsmanship of Jaipur with contemporary editorial design. Purveyors of 100% cotton wrap-around skirts and precision high-fire ceramic mug printing.
          </p>
          <div className="space-y-1">
            <p className="font-manrope text-[11px] uppercase tracking-widest text-[#5C631C] font-bold">
              Est. 2012 · © 2026 PEZZAVA. Crafted in Jaipur.
            </p>
            <p className="font-manrope text-[10px] text-stone-400">
              Operating domains: pezzava.in • skirts.pezzava.in • mugs.pezzava.in
            </p>
          </div>
        </div>

        {/* Links Column 1: Skirts Atelier */}
        <div className="flex flex-col gap-3 font-manrope text-sm">
          <h4 className="font-noto-serif text-sm font-bold uppercase tracking-[0.2em] text-stone-900 mb-2">
            Skirts Atelier
          </h4>
          <Link href={skirtsUrl} className="text-stone-600 hover:text-[#5C631C] transition-colors">
            All Wrap Skirts
          </Link>
          <Link href={`${skirtsUrl}?cat=mini`} className="text-stone-600 hover:text-[#5C631C] transition-colors">
            Mini Wrap Skirts
          </Link>
          <Link href={`${skirtsUrl}?cat=knee`} className="text-stone-600 hover:text-[#5C631C] transition-colors">
            Knee Length Skirts
          </Link>
          <Link href={`${skirtsUrl}?cat=long`} className="text-stone-600 hover:text-[#5C631C] transition-colors">
            Long Maxi Silhouettes
          </Link>
          <a
            href="https://www.amazon.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-[#FF9900] transition-colors text-xs pt-1"
          >
            Pezzava on Amazon &rarr;
          </a>
        </div>

        {/* Links Column 2: Ceramic Mugs Studio */}
        <div className="flex flex-col gap-3 font-manrope text-sm">
          <h4 className="font-noto-serif text-sm font-bold uppercase tracking-[0.2em] text-stone-900 mb-2">
            Ceramic Mugs
          </h4>
          <Link href={mugsUrl} className="text-stone-600 hover:text-[#8B6B22] transition-colors">
            All Ceramic Mugs
          </Link>
          <Link href={`${mugsUrl}#custom`} className="text-stone-600 hover:text-[#8B6B22] transition-colors">
            Custom Mug Printing
          </Link>
          <Link href={`${mugsUrl}?cat=heritage`} className="text-stone-600 hover:text-[#8B6B22] transition-colors">
            Blue Pottery Collection
          </Link>
          <Link href={`${mugsUrl}?cat=mandala`} className="text-stone-600 hover:text-[#8B6B22] transition-colors">
            Terracotta Mandala Mugs
          </Link>
          <a
            href="https://www.flipkart.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-[#2874F0] transition-colors text-xs pt-1"
          >
            Pezzava on Flipkart &rarr;
          </a>
        </div>

        {/* Links Column 3: The House */}
        <div className="flex flex-col gap-3 font-manrope text-sm">
          <h4 className="font-noto-serif text-sm font-bold uppercase tracking-[0.2em] text-stone-900 mb-2">
            The House
          </h4>
          <Link href="/about" className="text-stone-600 hover:text-[#5C631C] transition-colors">
            About Our Story
          </Link>
          <Link href="/contact" className="text-stone-600 hover:text-[#5C631C] transition-colors">
            Contact Jaipur Studio
          </Link>
          <Link href="/careers" className="text-stone-600 hover:text-[#5C631C] transition-colors">
            Careers
          </Link>
          <Link href="/verification" className="text-stone-600 hover:text-[#5C631C] transition-colors">
            Internship Verification
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-16 pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8">
          <a
            href="https://www.instagram.com/pezzava6828"
            target="_blank"
            rel="noopener noreferrer"
            className="font-manrope text-[11px] uppercase tracking-[0.25em] font-bold text-stone-800 hover:text-[#5C631C] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/pezzava/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-manrope text-[11px] uppercase tracking-[0.25em] font-bold text-stone-800 hover:text-[#5C631C] transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/in/pezzava-jaipur-1850415b"
            target="_blank"
            rel="noopener noreferrer"
            className="font-manrope text-[11px] uppercase tracking-[0.25em] font-bold text-stone-800 hover:text-[#5C631C] transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1.5 font-manrope">
          <div className="text-[11px] text-stone-500 uppercase tracking-widest">
            Handcrafted with devotion in the Pink City • Jaipur, Rajasthan
          </div>
          <div className="text-[10px] text-[#5C631C] uppercase tracking-widest font-bold">
            GSTIN: 08AWIPK5231H1ZJ
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
