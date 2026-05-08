"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Award, 
  Database, 
  QrCode, 
  FileText 
} from "lucide-react";

interface CredentialDashboardProps {
  intern: any;
  authHash: string;
}

export const CredentialDashboard = ({ intern, authHash }: CredentialDashboardProps) => {
  const displayInstitution = intern?.institution || intern?.college || intern?.university || "Pezzava Infrastructure";
  const authority = intern?.authority || "Sarah Jenkins, Head of Engineering";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-[32px] overflow-hidden shadow-sm selection:bg-primary/20 selection:text-primary relative">
      {/* Internal Technical Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#1a1c1a 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="p-8 md:p-12 lg:p-16 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
        >
          {/* Header Section */}
          <motion.div variants={item} className="md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-stone-100 pb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-[10px] font-black tracking-widest uppercase mb-4">
                <ShieldCheck size={12} />
                Registry Status: Verified
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter leading-tight text-on-surface">
                {intern?.name}
              </h2>
              <p className="text-xl md:text-2xl text-stone-400 font-medium mt-2">
                {intern?.role}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-black text-stone-400 uppercase tracking-widest bg-stone-50 p-4 border border-stone-100 rounded-xl">
               <div className="flex flex-col gap-1">
                 <span className="text-stone-300">Auth Signature</span>
                 <span className="text-on-surface font-mono">{authHash?.slice(0, 12)}...</span>
               </div>
               <div className="w-px h-8 bg-stone-200 mx-2"></div>
               <div className="flex flex-col gap-1">
                 <span className="text-stone-300">Reference ID</span>
                 <span className="text-on-surface font-mono">{intern?.ref}</span>
               </div>
            </div>
          </motion.div>

          {/* Detailed breakdown */}
          <motion.div variants={item} className="md:col-span-4 space-y-10">
            <div className="space-y-8">
              <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Database size={14} className="text-primary" />
                Data Registry
              </h3>
              <div className="space-y-8">
                <DataField label="Tenure Duration" value={intern?.duration || "Jan 2024 - Apr 2024"} icon={<Calendar size={14}/>} />
                <DataField label="Credential Authority" value={displayInstitution} icon={<Building2 size={14}/>} />
                <DataField label="Institutional Rank" value={intern?.role} icon={<Award size={14}/>} />
              </div>
            </div>

            <div className="pt-10 border-t border-stone-100">
               <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <QrCode size={14} className="text-primary" />
                Digital Proof
              </h3>
              <div className="flex items-center gap-6 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                <QrCode size={64} className="text-on-surface opacity-90" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-on-surface uppercase tracking-widest">Live Node Verification</p>
                  <p className="text-[9px] font-bold text-stone-400 leading-relaxed uppercase">Scan to confirm record <br/>authenticity via Pezzava Net</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="md:col-span-8">
             <div className="h-full flex flex-col justify-between">
               <div className="relative">
                 {/* Industrial Watermark */}
                 <div className="absolute top-0 right-0 text-[100px] font-black text-stone-50 pointer-events-none select-none uppercase -rotate-12 opacity-50">
                   Verified
                 </div>
                 
                 <div className="relative z-10">
                   <h2 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
                     <FileText size={14} className="text-primary" />
                     Endorsement Statement
                   </h2>
                   
                   <p className="text-2xl md:text-3xl text-stone-700 font-medium leading-relaxed italic pr-12">
                     &quot;This document confirms that <span className="text-on-surface font-black not-italic">{intern?.name}</span> successfully completed their tenure. Their professional performance and technical contributions have been formally validated by our engineering audit.&quot;
                   </p>
                   
                   <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                     <div>
                       <div className="h-16 w-48 mb-4 flex items-center opacity-60">
                         {/* Placeholder for actual signature if needed */}
                         <div className="w-full h-px bg-stone-300 relative">
                            <span className="absolute -top-6 left-0 font-display italic text-stone-400 text-lg">/s/ {authority.split(',')[0]}</span>
                         </div>
                       </div>
                       <p className="text-xl font-black text-on-surface tracking-tight">{authority}</p>
                       <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">Official Institutional Delegate</p>
                     </div>
                     
                     <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-4">
                           <TechStatMini label="Encryption" value="AES-256" />
                           <TechStatMini label="Protocol" value="V2.4" />
                        </div>
                        <p className="text-[9px] font-mono text-stone-400 uppercase tracking-tighter">Registered: {new Date().toISOString().split('T')[0]}</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const TechStatMini = ({ label, value }: { label: string, value: string }) => (
  <div className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg">
    <p className="text-[8px] font-black text-stone-300 uppercase tracking-widest">{label}</p>
    <p className="text-[10px] font-black text-on-surface uppercase">{value}</p>
  </div>
);

const DataField = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
      {icon}
      {label}
    </span>
    <span className="text-lg font-bold text-on-surface leading-none">{value}</span>
  </div>
);
