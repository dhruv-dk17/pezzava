"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Feather, Coffee } from "lucide-react";
import { usePathname } from "next/navigation";
import { getPortalUrl } from "@/lib/domain";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const skirtsUrl = getPortalUrl("skirts");
  const mugsUrl = getPortalUrl("mugs");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Skirts Atelier", href: skirtsUrl, badge: "skirts.pezzava.in" },
    { name: "Mug Printing", href: mugsUrl, badge: "mugs.pezzava.in" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Verification", href: "/verification" },
  ];

  const isLightHeader = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-[#FAF8F5]/90 backdrop-blur-md py-4 shadow-sm border-b border-stone-200/60"
          : "bg-white/80 backdrop-blur-sm py-5 md:bg-transparent md:backdrop-blur-none"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
          className={`md:hidden hover:opacity-100 transition-opacity drop-shadow-sm ${
            isLightHeader ? "text-stone-900" : "text-[#5C631C]"
          }`}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="relative w-32 h-16 md:w-36 md:h-18 hover:scale-105 transition-transform duration-500"
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
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href) ||
                  (link.name === "Skirts Atelier" && pathname.startsWith("/skirts")) ||
                  (link.name === "Mug Printing" && pathname.startsWith("/mugs"));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-manrope text-[11px] lg:text-[12px] font-semibold uppercase tracking-widest transition-colors relative group py-1 ${
                  isActive
                    ? "text-[#5C631C] font-bold"
                    : "text-stone-700 hover:text-[#5C631C]"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#5C631C] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Dual Subdomain Quick Switcher Pill */}
        <div className="hidden lg:flex items-center bg-stone-200/60 p-1 rounded-full border border-stone-300/60 text-xs font-manrope font-bold">
          <Link
            href={skirtsUrl}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              pathname.startsWith("/skirts")
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Go to Skirts Atelier"
          >
            <Feather size={12} className="text-[#5C631C]" />
            <span>Skirts</span>
          </Link>
          <Link
            href={mugsUrl}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              pathname.startsWith("/mugs")
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Go to Mug Printing Studio"
          >
            <Coffee size={12} className="text-[#C9A84C]" />
            <span>Mugs</span>
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
            className="fixed inset-0 z-[60] bg-[#FAF8F5] flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="relative w-32 h-14">
                <Image src="/logo.png" alt="Pezzava" fill className="object-contain" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
                className="text-stone-800 p-2 hover:bg-stone-200/60 rounded-full transition-colors"
              >
                <X size={26} />
              </button>
            </div>

            {/* Mobile Portals Quick Access */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <Link
                href={skirtsUrl}
                onClick={() => setIsOpen(false)}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col gap-1"
              >
                <div className="flex items-center gap-1.5 text-[#5C631C] font-bold text-xs">
                  <Feather size={14} />
                  <span>Skirts Portal</span>
                </div>
                <span className="text-[10px] text-stone-500 font-manrope">skirts.pezzava.in</span>
              </Link>

              <Link
                href={mugsUrl}
                onClick={() => setIsOpen(false)}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col gap-1"
              >
                <div className="flex items-center gap-1.5 text-[#8B6B22] font-bold text-xs">
                  <Coffee size={14} />
                  <span>Mug Studio</span>
                </div>
                <span className="text-[10px] text-stone-500 font-manrope">mugs.pezzava.in</span>
              </Link>
            </div>

            <nav className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-noto-serif text-2xl text-stone-900 hover:text-[#5C631C] transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-[#5C631C]" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-stone-200">
              <p className="font-manrope text-xs text-stone-500 mb-3">Crafted in Jaipur, Rajasthan</p>
              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/pezzava6828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C631C] font-bold uppercase tracking-widest text-[10px]"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/pezzava/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C631C] font-bold uppercase tracking-widest text-[10px]"
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/in/pezzava-jaipur-1850415b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5C631C] font-bold uppercase tracking-widest text-[10px]"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
