import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, Calendar, User, Briefcase, 
  ArrowLeft, GraduationCap, Building2, 
  UserCheck, CheckCircle2, Clock, Hash, BookOpen
} from "lucide-react";
import { calculateVerificationDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import QRCodeDisplay from "@/components/QRCodeDisplay";

export const dynamic = "force-dynamic";

export default async function VerificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const { data: student, error } = await supabase
    .from('intern_records')
    .select('*')
    .eq('ref', id.toUpperCase())
    .single();

  if (error || !student) {
    notFound();
  }

  const getIcon = (type: string) => {
    const cls = "text-primary";
    const sz = 20;
    switch(type) {
      case "grad": return <GraduationCap size={sz} className={cls} />;
      case "building": return <Building2 size={sz} className={cls} />;
      case "briefcase": return <Briefcase size={sz} className={cls} />;
      case "calendar": return <Calendar size={sz} className={cls} />;
      case "authority": return <UserCheck size={sz} className={cls} />;
      case "clock": return <Clock size={sz} className={cls} />;
      case "hash": return <Hash size={sz} className={cls} />;
      case "book": return <BookOpen size={sz} className={cls} />;
      default: return <User size={sz} className={cls} />;
    }
  };

  const headerList = await headers();
  const host = headerList.get("host") || "pezzava.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const verificationUrl = `${protocol}://${host}/verification/${student.ref}`;

  return (
    <main className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-stone-100/50 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-warm-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href="/verification" 
            className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-all duration-300 group font-body text-xs uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Return to Verification Portal
          </Link>
        </div>

        {/* Verification Card */}
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <div className="bg-white border border-stone-200 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Card Header - Modern Dark Aesthetic */}
            <div className="bg-[#1A1A1A] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="relative w-40 h-20">
                  <Image 
                    src="/logo.png" 
                    alt="Pezzava" 
                    fill 
                    className="object-contain brightness-0 invert" 
                    priority
                  />
                </div>
                <div className="hidden md:block w-[1px] h-16 bg-white/10" />
                <div>
                  <span className="block font-body text-[10px] uppercase tracking-[0.4em] text-warm-gold/80 mb-2 font-semibold">Official Credential</span>
                  <h1 className="font-display font-bold text-2xl tracking-tight text-white">Digital Verification</h1>
                  <p className="text-white/40 font-body text-xs mt-1 uppercase tracking-widest">Secure Record ID: {student.ref}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-right hidden sm:block">
                  <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Authenticity Link</span>
                  <span className="font-body font-bold text-warm-gold tracking-widest text-xs block">SCAN TO VALIDATE</span>
                </div>
                <QRCodeDisplay value={verificationUrl} size={140} showDownload={true} />
              </div>
            </div>

            {/* Content Area */}
            <div className="relative">
              {/* Status Banner */}
              <div className="px-10 md:px-16 pt-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <span className="block font-body text-[10px] uppercase tracking-widest text-stone-400 mb-0.5">Verification Status</span>
                      <span className="font-display text-lg font-bold text-green-700 uppercase tracking-wide">
                        Internship {student.status}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white border border-stone-200 shadow-sm">
                    <span className="text-[10px] font-body uppercase tracking-tighter text-stone-400 block mb-0.5 text-center">Verified On</span>
                    <span className="text-sm font-bold text-stone-700 font-display">
                      {calculateVerificationDate(student.duration, student.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Details Grid */}
              <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { icon: "user", label: "Intern Name", value: student.name },
                  { icon: "user", label: "Father's Name", value: student.father_name },
                  { icon: "building", label: "Institution", value: student.college },
                  { icon: "book", label: "Course / Degree", value: student.course },
                  { icon: "briefcase", label: "Internship Role", value: student.role },
                  { icon: "building", label: "Current Semester", value: student.semester },
                  { icon: "hash", label: "University Roll No.", value: student.university_roll_no },
                  { icon: "calendar", label: "Training Period", value: student.duration },
                  { icon: "clock", label: "Credit Hours", value: `${student.hours} Hours` },
                  { icon: "authority", label: "Project Mentor", value: student.mentor_name },
                  { icon: "authority", label: "Issuing Authority", value: student.authority },
                ].map((item, i) => (
                  item.value && (
                    <div key={i} className="flex items-start gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-[#F8F7F5] flex items-center justify-center border border-stone-100 flex-shrink-0 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors duration-300">
                        {getIcon(item.icon)}
                      </div>
                      <div className="pt-1">
                        <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1.5 group-hover:text-primary/60 transition-colors duration-300 font-medium">{item.label}</span>
                        <span className="font-display text-xl font-bold text-stone-800 leading-tight tracking-tight">{item.value}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Certificate Footer */}
              <div className="mt-4 p-10 md:p-16 pt-0">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-50 to-stone-100/50 border border-stone-200 text-center relative overflow-hidden">
                  {/* Subtle Seal Watermark */}
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none">
                    <ShieldCheck size={200} />
                  </div>
                  
                  <p className="font-body text-sm text-stone-500 leading-relaxed max-w-2xl mx-auto mb-6">
                    This document serves as an official confirmation of the internship completed by the above-named individual at Pezzava. 
                    This record has been digitally signed and encrypted to ensure tamper-proof authenticity.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-primary font-bold font-display text-sm tracking-wide uppercase">
                    <ShieldCheck size={18} />
                    Tamper-Proof Digital Certificate
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#1A1A1A] px-10 py-6 text-center">
              <p className="text-white/40 font-body text-[10px] uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} Pezzava Official Verification System &bull; Support: pezzava@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
