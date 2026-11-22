'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { getPortalUrl } from '@/lib/domain';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const skirtsUrl = getPortalUrl('skirts');
  const mugsUrl = getPortalUrl('mugs');

  const navLinks = [
    { name: 'Skirts', href: skirtsUrl },
    { name: 'Mugs', href: mugsUrl },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-xl py-3 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
            : 'bg-[#FAF8F5]/50 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative w-28 h-14 md:w-32 md:h-16 shrink-0">
            <Image
              src="/logo.png"
              alt="Pezzava"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href) ||
                    (link.name === 'Skirts' && pathname.startsWith('/skirts')) ||
                    (link.name === 'Mugs' && pathname.startsWith('/mugs'));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-manrope text-[12px] font-semibold tracking-[0.15em] uppercase transition-colors relative group py-1 ${
                    isActive
                      ? 'text-[#5C631C]'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[1.5px] transition-all duration-300 bg-[#5C631C] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA button */}
          <Link
            href={skirtsUrl}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-manrope text-[11px] font-bold tracking-wider uppercase transition-all duration-300 bg-stone-900 text-white hover:bg-stone-800 shadow-sm"
          >
            <span>Explore Atelier</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
            className="md:hidden p-2 text-stone-900"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink"
          >
            <div className="h-full flex flex-col p-8">
              <div className="flex justify-between items-center mb-16">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Image src="/logo.png" alt="Pezzava" width={100} height={50} className="brightness-200 invert" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                  className="text-white/70 hover:text-white p-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, ease: 'easeOut' }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-display text-4xl text-white/80 hover:text-gold transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-8 border-t border-white/10">
                <p className="font-manrope text-xs text-white/30 tracking-wider">
                  Crafted in Jaipur, Rajasthan · Est. 2012
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
