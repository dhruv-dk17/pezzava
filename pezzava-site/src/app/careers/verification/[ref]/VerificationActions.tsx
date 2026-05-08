"use client";

import React from "react";
import { Printer, Share2 } from "lucide-react";

interface VerificationActionsProps {
  internName: string;
}

export const VerificationActions = ({ internName }: VerificationActionsProps) => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `Credential Verification - ${internName}`,
        url: window.location.href
      }).catch(err => console.error("Share failed:", err));
    } else {
      // Fallback: Copy to clipboard
      if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    }
  };

  return (
    <div className="flex items-center gap-6 print:hidden">
      <button 
        type="button"
        onClick={handlePrint}
        className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-zinc-100 px-6 py-3 hover:bg-white hover:text-black transition-all text-[10px] uppercase tracking-[0.3em]"
      >
        <Printer size={14} /> Initialize Print
      </button>
      
      {/* This button is specifically for the broadcast/share action at the bottom */}
      <button 
        type="button"
        onClick={handleShare}
        id="broadcast-record-btn"
        className="hidden group items-center gap-3 bg-white text-black px-10 py-4 hover:bg-zinc-200 transition-all text-xs uppercase tracking-[0.3em] font-bold"
      >
        <Share2 size={16} /> Broadcast Record
      </button>
    </div>
  );
};

export const BroadcastButton = ({ internName }: VerificationActionsProps) => {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `Credential Verification - ${internName}`,
        url: window.location.href
      }).catch(err => console.error("Share failed:", err));
    } else {
      if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    }
  };

  return (
    <button 
      type="button"
      onClick={handleShare}
      className="group flex items-center gap-3 bg-white text-black px-10 py-4 hover:bg-zinc-200 transition-all text-xs uppercase tracking-[0.3em] font-bold"
    >
      <Share2 size={16} /> Broadcast Record
    </button>
  );
};
