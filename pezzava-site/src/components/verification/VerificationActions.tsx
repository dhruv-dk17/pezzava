"use client";

import React, { useState } from "react";
import { Printer, Share2, Copy, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface VerificationActionsProps {
  internName: string;
  refId: string;
}

export const VerificationActions = ({ internName, refId }: VerificationActionsProps) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Credential: ${internName}`,
          text: `Official Verification Record for ${internName} (Ref: ${refId}) at Pezzava.`,
          url: window.location.href,
        });
      } catch (err) {
        // If user cancels or it fails, fallback is fine
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        onClick={handlePrint}
        className="flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-all shadow-sm group"
      >
        <Printer className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
        <span>Generate PDF / Print</span>
      </motion.button>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        onClick={handleShare}
        className="flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-on-surface rounded-lg hover:bg-zinc-800 transition-all shadow-md group"
      >
        {copied ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Share2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
        )}
        <span>{copied ? "Link Copied" : "Share Credential"}</span>
      </motion.button>
    </div>
  );
};

export const BroadcastButton = ({ internName, refId }: VerificationActionsProps) => {
  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Credential: ${internName}`,
          text: `Official Verification Record for ${internName} (Ref: ${refId}) at Pezzava.`,
          url: window.location.href,
        });
      } catch (err) {
        // Silently fail if user cancels
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleShare}
      className="flex items-center gap-3 bg-white text-on-surface px-10 py-4 hover:bg-stone-50 transition-all text-xs uppercase tracking-[0.3em] font-black border border-stone-200 rounded-xl shadow-lg group"
    >
      <Share2 className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
      <span>Broadcast Record</span>
    </motion.button>
  );
};
