import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Calendar, User, Briefcase, Award, ArrowLeft, Download } from "lucide-react";

const VerificationPage = () => {
  return (
    <main className="min-h-screen bg-surface pt-32 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Back Link */}
        <Link 
          href="/careers" 
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-12 font-body text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Careers
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Certificate Verification</h1>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
            Pezzava verifies the successful completion of internship programs for our talented contributors. 
            This portal ensures the authenticity of our academic and professional recognitions.
          </p>
        </div>

        {/* Verification Card */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white border border-stone-200 rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="bg-on-surface p-8 text-white flex justify-between items-center border-b border-white/10">
              <div className="relative w-32 h-16">
                <Image src="/logo.png" alt="Pezzava" fill className="object-contain brightness-0 invert" />
              </div>
              <div className="text-right">
                <span className="block font-body text-[10px] uppercase tracking-[0.3em] opacity-60 mb-1">Official Verification</span>
                <span className="font-body font-bold text-warm-gold tracking-widest text-sm">REF: PZV-INT-2025-01</span>
              </div>
            </div>
            
            <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center text-primary border border-stone-100">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="block font-body text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Intern&apos;s Name</span>
                    <span className="font-display text-2xl font-bold text-on-surface">Simran Kumawat</span>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center text-primary border border-stone-100">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <span className="block font-body text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Role & Department</span>
                    <span className="font-display text-xl font-bold text-on-surface">Graphic Design Intern</span>
                    <span className="block font-body text-sm text-on-surface-variant mt-1">Creative & Branding</span>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center text-primary border border-stone-100">
                    <Award size={20} />
                  </div>
                  <div>
                    <span className="block font-body text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Status</span>
                    <span className="inline-flex items-center gap-2 font-display text-xl font-bold text-green-700 bg-green-50 px-4 py-1 rounded-full border border-green-100">
                      Completed Successfully
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center text-primary border border-stone-100">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="block font-body text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Issue Date</span>
                    <span className="font-display text-xl font-bold text-on-surface">May 5, 2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-8 text-center border-t border-stone-200">
              <p className="font-body text-sm italic text-on-surface-variant leading-relaxed">
                This is an electronically generated document. No signature is required for verification. 
                For further inquiries, please contact our HR department at <span className="font-bold text-primary">pezzava.jaipur@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Letter PDF */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold">Experience Letter</h2>
            <a 
              href="/intership_letter.pdf" 
              download 
              className="flex items-center gap-2 bg-on-surface text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-lg"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>
          <div className="relative aspect-[1/1.414] w-full bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            <iframe 
              src="/intership_letter.pdf#toolbar=0" 
              className="w-full h-full border-none"
              title="Internship Certificate"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerificationPage;
