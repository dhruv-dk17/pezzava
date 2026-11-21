import AtelierHero from '@/components/home/AtelierHero';
import AboutSection from '@/components/home/AboutSection';
import DualShowcase from '@/components/home/DualShowcase';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#FAF8F5]">
      {/* Editorial Dual-Pillar Hero (Skirts + Mugs with Three.js & GSAP) */}
      <AtelierHero />

      {/* Dual Craftsmanship Showcase with Live 3D Ceramic Customizer */}
      <DualShowcase />

      {/* Heritage Craft Story Bento */}
      <AboutSection />

      {/* Community Testimonials & Marketplace Trust */}
      <Testimonials />

      {/* Unified Dual-Portal Call to Action */}
      <CTA />
    </div>
  );
}
