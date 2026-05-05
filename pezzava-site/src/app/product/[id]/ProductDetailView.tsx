'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, ShieldCheck, Truck, RefreshCcw, ChevronDown } from 'lucide-react';
import { Product } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import RedirectModal from '@/components/ui/RedirectModal';
import { normalizeImageSrc } from '@/lib/utils';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    url: string;
    marketplace: "Amazon" | "Flipkart";
  }>({
    isOpen: false,
    url: '',
    marketplace: 'Amazon'
  });

  const openRedirectModal = (url: string, marketplace: "Amazon" | "Flipkart") => {
    setModalConfig({
      isOpen: true,
      url,
      marketplace
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Redirect Modal */}
        <RedirectModal 
          isOpen={modalConfig.isOpen}
          onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
          destinationUrl={modalConfig.url}
          marketplace={modalConfig.marketplace}
          productName={product.displayName}
        />

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-12 font-manrope text-[10px] uppercase tracking-widest text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-on-surface font-bold">{product.displayName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
               {product.images.map((img, i) => (
                 <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative w-20 aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all flex-shrink-0 ${
                    activeImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                 >
                <Image 
                  src={normalizeImageSrc(img)} 
                  alt={`${product.displayName} - view ${i + 1}`} 
                  fill 
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/next.svg';
                  }}
                />
                 </button>
               ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative aspect-[3/4] bg-surface-variant rounded-2xl overflow-hidden group">
               <AnimatePresence mode='wait'>
                 <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                 >
                     <Image 
                       src={normalizeImageSrc(product.images[activeImage])} 
                       alt={product.displayName} 
                       fill 
                       className="object-cover"
                       priority
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = '/next.svg';
                       }}
                     />
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">{product.length}</span>
                <span className="bg-gold/10 text-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">{product.fabric}</span>
              </div>
              <h1 className="font-noto-serif text-5xl md:text-6xl mb-4 leading-tight">{product.displayName}</h1>
              <div className="flex items-center gap-6">
                 <span className="font-manrope text-3xl font-bold">₹{product.price}</span>
                 {product.originalPrice && (
                    <span className="font-manrope text-xl text-on-surface-variant line-through">₹{product.originalPrice}</span>
                 )}
                 {product.discount && (
                    <span className="bg-green-600 text-white px-2 py-0.5 text-xs font-bold rounded">{product.discount} OFF</span>
                 )}
              </div>
            </div>

            <div className="flex items-center gap-4 py-6 border-y border-stone-100">
               <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "#C9A84C" : "none"} stroke="#C9A84C" />
                  ))}
               </div>
               <span className="font-manrope text-sm text-on-surface-variant">({product.reviews} customer reviews)</span>
            </div>

            <div className="space-y-6">
               <h3 className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Available on Marketplaces</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.stores.amazon && (
                    <button 
                      onClick={() => openRedirectModal(product.stores.amazon!.url, 'Amazon')}
                      aria-label="Shop on Amazon"
                      className="flex flex-col items-center justify-center p-6 bg-[#FF9900]/5 border border-[#FF9900]/20 rounded-2xl hover:bg-[#FF9900]/10 transition-all group w-full"
                    >
                      <span className="font-manrope text-[10px] font-bold uppercase text-[#FF9900] mb-2">Shop on</span>
                      <Image src="/images/amazon-logo.png" alt="Amazon" width={80} height={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  {product.stores.flipkart && (
                    <button 
                      onClick={() => openRedirectModal(product.stores.flipkart!.url, 'Flipkart')}
                      aria-label="Shop on Flipkart"
                      className="flex flex-col items-center justify-center p-6 bg-[#2874F0]/5 border border-[#2874F0]/20 rounded-2xl hover:bg-[#2874F0]/10 transition-all group w-full"
                    >
                      <span className="font-manrope text-[10px] font-bold uppercase text-[#2874F0] mb-2">Shop on</span>
                      <Image src="/images/flipkart-logo.png" alt="Flipkart" width={80} height={24} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
               </div>
            </div>


            {/* Accordions */}
            <div className="pt-10 border-t border-stone-100 space-y-4">
              {[
                { id: 'description', title: 'The Story', content: product.description },
                { id: 'details', title: 'Product Details', content: (
                  <ul className="space-y-3 font-manrope text-sm">
                    <li><span className="font-bold">Material:</span> {product.fabric}</li>
                    <li><span className="font-bold">Size:</span> {product.size}</li>
                    <li><span className="font-bold">Fit:</span> Adjustable Wrap-Around</li>
                    <li><span className="font-bold">Origin:</span> Jaipur, Rajasthan</li>
                  </ul>
                )},
                { id: 'care', title: 'Care Instructions', content: product.care }
              ].map((item) => (
                <div key={item.id} className="border-b border-stone-100 last:border-0 pb-4">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    aria-expanded={openAccordion === item.id}
                    className="w-full flex justify-between items-center text-left py-4 group"
                  >
                    <span className="font-noto-serif text-xl group-hover:text-primary transition-colors">{item.title}</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${openAccordion === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 font-manrope text-on-surface-variant leading-relaxed">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-stone-100">
               <div className="flex flex-col items-center text-center gap-3">
                  <ShieldCheck size={24} className="text-primary" />
                  <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Quality Guaranteed</span>
               </div>
               <div className="flex flex-col items-center text-center gap-3">
                  <Truck size={24} className="text-primary" />
                  <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fast Delivery</span>
               </div>
               <div className="flex flex-col items-center text-center gap-3">
                  <RefreshCcw size={24} className="text-primary" />
                  <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Easy Returns</span>
               </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="pt-24 border-t border-stone-100">
           <div className="flex justify-between items-end mb-16">
              <h2 className="font-noto-serif text-4xl italic">Complete Your <br /> Look</h2>
              <Link href="/shop" className="font-manrope font-bold text-xs uppercase tracking-widest text-primary">View All Silhouettes &rarr;</Link>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
           </div>
        </section>

      </div>
    </div>
  );
}
