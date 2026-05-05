"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Heritage", href: "/heritage" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
  { name: "Verification", href: "/careers/verification" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-morphism py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-primary hover:opacity-100 opacity-80 transition-opacity"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="font-display tracking-[0.5em] uppercase text-xl md:text-2xl font-bold text-on-surface hover:text-primary transition-colors duration-500"
        >
          Pezzava
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-body text-[12px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <button className="text-primary hover:opacity-100 opacity-80 transition-opacity hidden md:block">
            <ShoppingBag size={22} />
          </button>
          <Link
            href="/shop"
            className="hidden lg:flex items-center gap-3 bg-on-surface text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold rounded-sm hover:bg-primary transition-all duration-500 hover:shadow-2xl"
          >
            Explore Shop
          </Link>
          <button className="md:hidden text-primary">
            <ShoppingBag size={22} />
          </button>
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
              <span className="font-display tracking-[0.2em] uppercase text-xl font-bold">PEZZAVA</span>
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
                <Link href="#" className="text-primary font-bold uppercase tracking-widest text-[10px]">Instagram</Link>
                <Link href="#" className="text-primary font-bold uppercase tracking-widest text-[10px]">Facebook</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
