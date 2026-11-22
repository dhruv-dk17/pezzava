import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPortalUrl } from '@/lib/domain';

const Footer = () => {
  const skirtsUrl = getPortalUrl('skirts');
  const mugsUrl = getPortalUrl('mugs');

  const footerLinks = [
    {
      title: 'Collection',
      links: [
        { name: 'All Wrap Skirts', href: skirtsUrl },
        { name: 'Ceramic Mugs', href: mugsUrl },
        { name: 'Custom Mug Printing', href: `${mugsUrl}#custom` },
        { name: 'New Arrivals', href: skirtsUrl },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Pezzava', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Verification', href: '/verification' },
      ],
    },
    {
      title: 'Shop On',
      links: [
        { name: 'Amazon India', href: 'https://www.amazon.in', external: true },
        { name: 'Flipkart', href: 'https://www.flipkart.com', external: true },
      ],
    },
  ];

  const socials = [
    { name: 'Instagram', href: 'https://www.instagram.com/pezzava6828' },
    { name: 'Facebook', href: 'https://www.facebook.com/pezzava/' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pezzava-jaipur-1850415b' },
  ];

  return (
    <footer className="w-full bg-ink text-white/70 pt-24 pb-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="relative w-28 h-14 block mb-6">
              <Image src="/logo.png" alt="Pezzava" fill className="object-contain brightness-200 invert" />
            </Link>
            <p className="font-manrope text-[15px] text-white/40 max-w-sm leading-relaxed mb-6">
              Bridging Jaipur&apos;s ornate block-printing heritage with modern editorial design. 
              100% cotton wrap skirts & bespoke printed ceramic mugs.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-manrope text-[11px] font-bold tracking-[0.3em] text-white/30 uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-manrope text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-manrope text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/8 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-manrope text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="font-manrope text-[11px] text-white/25 tracking-wider">
              © 2026 Pezzava · Crafted in Jaipur, Rajasthan
            </p>
            <p className="font-manrope text-[10px] text-white/15 tracking-wider">
              GSTIN: 08AWIPK5231H1ZJ
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
