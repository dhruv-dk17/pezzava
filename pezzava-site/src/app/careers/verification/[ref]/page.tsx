import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, Calendar, User, Briefcase, Award, 
  ArrowLeft, GraduationCap, Building2, 
  UserCheck, CheckCircle2, 
  Globe, Fingerprint, ExternalLink, Download
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { VerificationActions, BroadcastButton } from "@/components/verification/VerificationActions";

type Props = {
  params: Promise<{ ref: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;
  
  const { data: intern } = await supabase
    .from("intern_records")
    .select("name")
    .eq("ref", ref)
    .single();

  if (!intern) {
    return {
      title: "Credential Verification | Pezzava",
    };
  }

  return {
    title: `${intern.name} | Verified Professional Credential`,
    description: `Official professional certification record for ${intern.name}. Validated by Pezzava.`,
    openGraph: {
      title: `${intern.name} - Professional Certification`,
      description: `Official professional credential for ${intern.name}.`,
    }
  };
}

export async function generateStaticParams() {
  const { data: records } = await supabase
    .from("intern_records")
    .select("ref");

  return (records || []).map((record) => ({
    ref: record.ref,
  }));
}

export default async function InternVerificationPage({
  params,
}: Props) {
  const { ref } = await params;
  
  const { data: intern, error } = await supabase
    .from("intern_records")
    .select("*")
    .eq("ref", ref)
    .single();

  if (error || !intern) {
    notFound();
  }

  const getIcon = (type: string) => {
    const cls = "text-[#C9A84C]/60";
    const sz = 18;
    switch(type) {
      case "grad": return <GraduationCap size={sz} className={cls} />;
      case "building": return <Building2 size={sz} className={cls} />;
      case "briefcase": return <Briefcase size={sz} className={cls} />;
      case "calendar": return <Calendar size={sz} className={cls} />;
      case "authority": return <UserCheck size={sz} className={cls} />;
      default: return <User size={sz} className={cls} />;
    }
  };

  const getCompletionDate = (duration: string) => {
    if (duration.includes(' to ')) {
      return duration.split(' to ')[1];
    }
    return duration;
  };

  const formattedDate = getCompletionDate(intern.duration);
  const authHash = Buffer.from(intern.name + intern.ref).toString('hex').substring(0, 12).toUpperCase();

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] font-sans selection:bg-[#C9A84C] selection:text-white pt-32 pb-20 px-6 print:pt-0 print:pb-0 print:px-0">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,#C9A84C08_0%,transparent_70%)] -mr-96 -mt-96"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,#5c631c08_0%,transparent_70%)] -ml-72 -mb-72"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 print:hidden">
          <Link 
            href="/careers/verification" 
            className="group flex items-center gap-3 text-[#47483a] hover:text-[#C9A84C] transition-all text-xs font-semibold tracking-wider"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Registry
          </Link>

          <VerificationActions internName={intern.name} />
        </div>

        {/* Certificate Container */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 print:animate-none">
          <div className="bg-white border-[12px] border-[#f4f2ee] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden print:border-none print:shadow-none">
            
            {/* Inner Gold Border */}
            <div className="absolute inset-4 border border-[#C9A84C]/20 pointer-events-none"></div>
            
            {/* Certificate Content */}
            <div className="p-8 md:p-20 relative">
              
              {/* Header Branding */}
              <div className="flex flex-col items-center text-center mb-16 space-y-8">
                <div className="relative w-40 h-12 mb-4">
                  <Image src="/logo.png" alt="Pezzava" fill className="object-contain" priority />
                </div>
                <div className="space-y-4">
                  <h1 className="font-serif text-[#C9A84C] text-sm uppercase tracking-[0.5em] font-bold">Certificate of Completion</h1>
                  <div className="h-px w-24 bg-[#C9A84C]/30 mx-auto"></div>
                </div>
              </div>

              {/* Main Statement */}
              <div className="text-center max-w-2xl mx-auto space-y-10 mb-20">
                <p className="text-[#47483a] italic font-serif text-lg">This is to officially certify that</p>
                
                <div className="space-y-2">
                  <h2 className="font-serif text-4xl md:text-6xl text-[#1a1c1a] font-bold tracking-tight">
                    {intern.name}
                  </h2>
                  <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent"></div>
                </div>

                <p className="text-[#47483a] leading-relaxed">
                  has successfully completed the professional internship program as a <span className="font-bold text-[#1a1c1a] uppercase tracking-wider">{intern.role}</span>. 
                  During this tenure, they have demonstrated exceptional dedication, technical competence, and a commitment to professional excellence.
                </p>
              </div>

              {/* Certificate Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="text-center p-6 bg-[#faf9f6] border border-[#f4f2ee] space-y-1">
                  <span className="block text-[10px] text-[#47483a] uppercase tracking-[0.2em] font-bold">Credential ID</span>
                  <span className="block text-[#1a1c1a] font-mono text-sm">{intern.ref}</span>
                </div>
                <div className="text-center p-6 bg-[#faf9f6] border border-[#f4f2ee] space-y-1">
                  <span className="block text-[10px] text-[#47483a] uppercase tracking-[0.2em] font-bold">Duration</span>
                  <span className="block text-[#1a1c1a] font-semibold">{intern.duration}</span>
                </div>
                <div className="text-center p-6 bg-[#faf9f6] border border-[#f4f2ee] space-y-1">
                  <span className="block text-[10px] text-[#47483a] uppercase tracking-[0.2em] font-bold">Issuance Date</span>
                  <span className="block text-[#1a1c1a] font-semibold">{formattedDate}</span>
                </div>
              </div>

              {/* Footer Section: Signatures & Seal */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-16 pt-12 border-t border-[#f4f2ee]">
                {/* Authority Signature */}
                <div className="text-center md:text-left space-y-4">
                  <div className="space-y-1">
                    <p className="font-serif text-2xl text-[#1a1c1a] italic">{intern.authority}</p>
                    <div className="h-px w-48 bg-[#1a1c1a]/20"></div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-[#47483a] uppercase tracking-widest font-bold">Authorized Signatory</p>
                    <p className="text-[10px] text-[#C9A84C] uppercase tracking-widest font-medium">{intern.company || "Pezzava Infrastructure"}</p>
                  </div>
                </div>

                {/* Professional Seal */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#C9A84C]/10 rounded-full scale-110 blur-xl group-hover:bg-[#C9A84C]/20 transition-all"></div>
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Seal Ring */}
                    <div className="absolute inset-0 border-4 border-double border-[#C9A84C]/30 rounded-full"></div>
                    <div className="absolute inset-2 border border-dashed border-[#C9A84C]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    
                    <div className="text-center space-y-1">
                      <Award size={32} className="text-[#C9A84C] mx-auto mb-1" />
                      <span className="block text-[8px] text-[#C9A84C] font-bold uppercase tracking-widest">Official</span>
                      <span className="block text-[8px] text-[#1a1c1a] font-black uppercase tracking-widest leading-none">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Institutional Detail */}
                <div className="text-center md:text-right space-y-4">
                  <div className="space-y-1">
                    <p className="font-bold text-[#1a1c1a] uppercase tracking-wider text-sm">{intern.college}</p>
                    <p className="text-[10px] text-[#47483a] uppercase tracking-[0.2em]">Affiliated Institution</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Authenticated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Strip */}
            <div className="px-8 py-4 bg-[#fcfbf9] border-t border-[#f4f2ee] flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <span className="text-[9px] text-[#47483a] uppercase tracking-widest font-bold">© 2026 Pezzava</span>
                <span className="text-[9px] text-[#C9A84C] uppercase tracking-widest font-medium">Professional Standards Division</span>
              </div>
              <div className="flex gap-6 items-center">
                <span className="text-[9px] text-[#47483a]/60 uppercase tracking-widest">Ref Hash: {authHash}</span>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Secondary Data Grid (Optional/Technical) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
            <div className="p-8 bg-white border border-[#f4f2ee] rounded-2xl space-y-4">
              <h3 className="font-serif text-[#1a1c1a] font-bold">Credential Verification</h3>
              <p className="text-sm text-[#47483a] leading-relaxed">
                This document is a digital representation of a verified professional record. 
                Any modification to this record invalidates its authenticity. For direct verification, 
                contact our HR division or use the Registry Reference ID.
              </p>
              <div className="flex gap-4 pt-2">
                <Link 
                  href={`/careers/verification/${intern.ref}`}
                  className="inline-flex items-center gap-2 text-[#C9A84C] font-bold text-xs uppercase tracking-wider hover:underline"
                >
                  <ExternalLink size={14} />
                  Direct Link
                </Link>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#f4f2ee] rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-serif text-[#1a1c1a] font-bold">Share Credentials</h3>
                <p className="text-sm text-[#47483a]">Broadcast your achievement to your professional network.</p>
              </div>
              <div className="flex gap-4 pt-6">
                <BroadcastButton internName={intern.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


