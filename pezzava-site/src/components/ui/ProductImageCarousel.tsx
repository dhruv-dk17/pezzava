'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  themeBadge?: string;
  capacityBadge?: string;
  aspectRatio?: 'square' | 'portrait';
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 350, damping: 32 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: 'spring' as const, stiffness: 350, damping: 32 },
      opacity: { duration: 0.2 },
    },
  }),
};

export default function ProductImageCarousel({
  images,
  productName,
  themeBadge,
  capacityBadge,
  aspectRatio = 'square',
}: ProductImageCarouselProps) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Normalize image list
  const validImages = images && images.length > 0 ? images : ['/images/mugs/pm1.1.jpg'];
  const currentIndex = ((page % validImages.length) + validImages.length) % validImages.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    []
  );

  const jumpTo = useCallback(
    (index: number) => {
      setPage(([prevPage]) => {
        const currentMod = ((prevPage % validImages.length) + validImages.length) % validImages.length;
        const diff = index - currentMod;
        return [prevPage + diff, diff >= 0 ? 1 : -1];
      });
    },
    [validImages.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, isLightboxOpen]);

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-[3/4]';

  return (
    <div className="space-y-4 select-none">
      {/* Primary Stage */}
      <div
        className={`relative ${aspectClass} w-full rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-md group`}
      >
        {/* Animated Carousel Slide */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -100 || offset.x < -60) {
                paginate(1);
              } else if (swipe > 100 || offset.x > 60) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={validImages[currentIndex]}
              alt={`${productName} - Image ${currentIndex + 1}`}
              fill
              priority={currentIndex === 0}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
          {themeBadge && (
            <span className="bg-[#5C631C] text-white text-xs font-manrope font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              {themeBadge}
            </span>
          )}
          {capacityBadge && (
            <span className="bg-white/95 backdrop-blur-md text-stone-800 text-xs font-manrope font-semibold px-3 py-1 rounded-full border border-stone-200/80 shadow-sm">
              {capacityBadge}
            </span>
          )}
        </div>

        {/* Top Right Counter & Lightbox Action */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <span className="bg-stone-900/70 backdrop-blur-md text-white text-xs font-manrope font-bold px-3 py-1 rounded-full shadow-sm border border-white/10">
            {currentIndex + 1} / {validImages.length}
          </span>
          <button
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Open Fullscreen Lightbox"
            className="p-1.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <Maximize2 size={15} />
          </button>
        </div>

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous Image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 hover:text-stone-950 flex items-center justify-center shadow-lg backdrop-blur-md border border-stone-200/60 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next Image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 hover:text-stone-950 flex items-center justify-center shadow-lg backdrop-blur-md border border-stone-200/60 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-1.5 pointer-events-none">
            {validImages.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? 'w-6 bg-[#5C631C] shadow-sm'
                    : 'w-1.5 bg-stone-300/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Strip */}
      {validImages.length > 1 && (
        <div className="relative">
          <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-stone-300">
            {validImages.map((img, i) => {
              const isActive = currentIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-200 border-2 ${
                    isActive
                      ? 'border-[#5C631C] ring-2 ring-[#5C631C]/30 scale-105 shadow-md'
                      : 'border-stone-200/80 hover:border-stone-400 opacity-75 hover:opacity-100 hover:scale-102'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productName} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {isActive && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#5C631C] shadow" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <X size={24} />
            </button>

            {/* Lightbox Counter */}
            <div className="absolute top-6 left-6 text-stone-300 text-sm font-manrope font-semibold">
              {productName} • <span className="text-white">{currentIndex + 1} / {validImages.length}</span>
            </div>

            {/* Lightbox Main Image */}
            <div className="relative w-full max-w-4xl max-h-[80vh] aspect-square flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={validImages[currentIndex]}
                    alt={`${productName} fullscreen ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 90vw, 1000px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Lightbox Nav Buttons */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Previous Lightbox Image"
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() => paginate(1)}
                  aria-label="Next Lightbox Image"
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Lightbox Thumbnails */}
            <div className="absolute bottom-6 flex gap-2 max-w-xl overflow-x-auto px-4 py-2">
              {validImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    currentIndex === i ? 'border-[#5C631C] scale-110' : 'border-stone-700 opacity-60'
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
