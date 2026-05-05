"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationUrl: string;
  marketplace: "Amazon" | "Flipkart";
  productName: string;
}

const RedirectModal: React.FC<RedirectModalProps> = ({
  isOpen,
  onClose,
  destinationUrl,
  marketplace,
  productName,
}) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(5);
      return;
    }

    if (timeLeft === 0) {
      window.open(destinationUrl, "_blank");
      onClose();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, timeLeft, destinationUrl, onClose]);

  const handleManualRedirect = () => {
    window.open(destinationUrl, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header / Brand Bar */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <span className="font-display tracking-widest uppercase text-xs font-bold">Pezzava Official</span>
              <button 
                onClick={onClose}
                className="hover:rotate-90 transition-transform p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-10 text-center">
              {/* Marketplace Icon Area */}
              <div className="mb-8 flex justify-center items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                   <ShoppingCart className="text-primary" size={32} />
                </div>
                <ArrowRight className="text-stone-300" size={24} />
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center border border-stone-100">
                   {marketplace === "Amazon" ? (
                     <span className="font-bold text-sm">Amazon</span>
                   ) : (
                     <span className="font-bold text-sm text-blue-600">Flipkart</span>
                   )}
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold mb-4 text-on-surface">
                Taking you to {marketplace}
              </h2>
              <p className="font-body text-on-surface-variant mb-8 leading-relaxed">
                You are being redirected to our official storefront on {marketplace} to complete your purchase of <span className="font-bold text-primary">{productName}</span>.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 h-1.5 rounded-full mb-8 overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-primary"
                />
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleManualRedirect}
                  className="w-full bg-primary text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-primary-container transition-all"
                >
                  Proceed Now ({timeLeft}s) <ExternalLink size={16} />
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-on-surface-variant py-2 font-body text-sm hover:text-primary transition-colors"
                >
                  Stay on Pezzava
                </button>
              </div>
            </div>

            {/* Footer Trust Note */}
            <div className="bg-stone-50 p-6 border-t border-stone-100 text-center">
               <p className="text-[10px] uppercase tracking-widest font-body text-stone-400">
                  Secure official marketplace partner redirect
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RedirectModal;
