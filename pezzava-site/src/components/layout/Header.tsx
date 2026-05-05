"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
  { name: "Verification", href: "/careers/verification" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On homepage, we use light text over the dark hero when not scrolled.
  // On all other pages, we use dark text for visibility against light backgrounds.
  const isLightHeader = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || !isHome 
          ? "glass-morphism py-4 shadow-sm" 
          : "bg-white/80 backdrop-blur-sm py-6 md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`md:hidden hover:opacity-100 transition-opacity drop-shadow-md ${isLightHeader ? "text-white" : "text-primary"}`}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="relative w-32 h-20 md:w-40 md:h-24 hover:scale-105 transition-transform duration-500 drop-shadow-md"
        >
          <Image 
            src="/logo.png" 
            alt="Pezzava" 
            fill 
            className="object-contain" 
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-body text-[12px] font-medium uppercase tracking-widest transition-colors relative group drop-shadow-md ${
                isLightHeader ? "text-white" : "text-on-surface-variant"
              } hover:text-primary`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <Link href="/shop" className={`hover:opacity-100 opacity-90 transition-opacity hidden md:block drop-shadow-md ${isLightHeader ? "text-white" : "text-primary"}`}>
            <ShoppingBag size={22} />
          </Link>
          <Link
            href="/shop"
            className={`hidden lg:flex items-center gap-3 px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold rounded-sm transition-all duration-500 hover:shadow-2xl ${
              isLightHeader 
                ? "bg-white text-on-surface hover:bg-primary hover:text-white" 
                : "bg-on-surface text-white hover:bg-primary"
            }`}
          >
            Explore Shop
          </Link>
          <Link href="/shop" className={`md:hidden drop-shadow-md ${isLightHeader ? "text-white" : "text-primary"}`}>
            <ShoppingBag size={22} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="relative w-32 h-16">
                <Image src="/logo.png" alt="Pezzava" fill className="object-contain" />
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary">
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-4xl text-on-surface hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-stone-100">
              <p className="font-body text-sm text-on-surface-variant mb-4">Crafted in Jaipur, Rajasthan</p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/pezzava6828" target="_blank" rel="noopener noreferrer" className="text-primary font-bold uppercase tracking-widest text-[10px]">Instagram</a>
                <a href="https://www.facebook.com/pezzava/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold uppercase tracking-widest text-[10px]">Facebook</a>
                <a href="https://www.linkedin.com/in/pezzava-jaipur-1850415b" target="_blank" rel="noopener noreferrer" className="text-primary font-bold uppercase tracking-widest text-[10px]">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
