import Hero from '@/components/home/Hero';
import Heritage from '@/components/home/Heritage';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Heritage />
      <FeaturedProducts />
      <Testimonials />
      <CTA />
    </div>
  );
}
