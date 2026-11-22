import AtelierHero from '@/components/home/AtelierHero';
import Marquee from '@/components/home/Marquee';
import SkirtsLookbook from '@/components/home/SkirtsLookbook';
import ScrollQuote from '@/components/home/ScrollQuote';
import AboutSection from '@/components/home/AboutSection';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#FAF8F5]">
      {/* Editorial Dual-Portal Hero: The House of Pezzava with 3D Ambient Fabric Canvas */}
      <AtelierHero />

      {/* Kinetic Marquee Ribbon */}
      <Marquee />

      {/* Asymmetric Editorial Skirts Lookbook Showcase */}
      <SkirtsLookbook />

      {/* GSAP Scroll Scrub Word Reveal Quote: The Pezzava Philosophy */}
      <ScrollQuote />

      {/* Heritage Craft Story Bento & Atelier Numbers */}
      <AboutSection />

      {/* Community Testimonials & Marketplace Trust */}
      <Testimonials />

      {/* Unified Dual-Portal Call to Action */}
      <CTA />
    </div>
  );
}
