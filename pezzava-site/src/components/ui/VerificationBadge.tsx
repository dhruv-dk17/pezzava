"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export const VerificationBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-8 right-8 z-[100] hidden md:block"
    >
      <Link
        href="/careers/verification"
        className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-stone-200 py-3 px-5 rounded-full shadow-2xl hover:shadow-primary/20 hover:border-primary/50 transition-all group"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <ShieldCheck size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 leading-none mb-1">Official Portal</span>
          <span className="text-[12px] font-bold text-on-surface leading-none">Verify Internships</span>
        </div>
      </Link>
    </motion.div>
  );
};
