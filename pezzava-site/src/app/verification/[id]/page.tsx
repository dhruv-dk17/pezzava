import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, Calendar, User, Briefcase, 
  ArrowLeft, GraduationCap, Building2, 
  UserCheck, CheckCircle2 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

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
      default: return <User size={sz} className={cls} />;
    }
  };

  return (
    <main className="min-h-screen bg-surface pt-32 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Back Link */}
        <Link 
          href="/verification" 
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 font-body text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Portal
        </Link>

        {/* Verification Card */}
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-white border border-stone-200 rounded-[2rem] shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-on-surface p-8 text-white flex justify-between items-center border-b border-white/10">
              <div className="relative w-32 h-16">
                <Image src="/logo.png" alt="Pezzava" fill className="object-contain brightness-0 invert" />
              </div>
              <div className="text-right">
                <span className="block font-body text-[10px] uppercase tracking-[0.3em] opacity-60 mb-1">Official Verification</span>
                <span className="font-body font-bold text-warm-gold tracking-widest text-sm">REF: {student.ref}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="px-10 md:px-16 pt-10 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 font-display text-base font-bold text-green-700 bg-green-50 px-5 py-2 rounded-full border border-green-200">
                <CheckCircle2 size={18} className="text-green-600" />
                Internship Verified: {student.status}
              </span>
            </div>
            
            {/* Details Grid */}
            <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: "user", label: "Intern's Name", value: student.name },
                { icon: "user", label: "Father's Name", value: student.father_name },
                { icon: "building", label: "College Name", value: student.college },
                { icon: "briefcase", label: "Company", value: student.company },
                { icon: "briefcase", label: "Role / Department", value: student.role },
                { icon: "calendar", label: "Duration", value: student.duration },
                { icon: "authority", label: "HR Issuing Authority", value: student.authority },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center border border-stone-100 flex-shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <span className="block font-body text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-1">{item.label}</span>
                    <span className="font-display text-lg font-bold text-on-surface leading-snug">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-stone-50 p-8 text-center border-t border-stone-200">
              <p className="font-body text-sm italic text-on-surface-variant leading-relaxed">
                This is an electronically verified record of Pezzava. Authentication is provided via the official company portal. 
                For inquiries: <span className="font-bold text-primary">pezzava@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
