"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ShieldCheck, Calendar, User, Briefcase, Award, 
  ArrowLeft, Download, GraduationCap, Building2, 
  UserCheck, Search, AlertCircle, CheckCircle2 
} from "lucide-react";

// Data Structure for Interns
const VERIFIED_INTERNS: Record<string, any> = {
  "PZV-INT-2026-01": {
    name: "Simran Kumawat",
    fatherName: "Hansraj Kumawat",
    college: "St. Wilfred's PG College",
    role: "E-Commerce Operations Intern",
    duration: "01-04-2026 to 30-04-2026",
    authority: "Khushi Sharma (HR Head)",
    company: "Pezzava Retail Operations",
    status: "Completed",
    ref: "PZV-INT-2026-01"
  },
  "PZV-INT-2026-02": {
    name: "Abhay Singh",
    fatherName: "Goverdhan Singh",
    college: "St. Wilfred's PG College",
    role: "Product listing intern",
    duration: "01-04-2026 to 30-04-2026",
    authority: "Khushi Sharma",
    company: "Pezzava",
    status: "Completed",
    ref: "PZV-INT-2026-02"
  },
  "PZV-INT-2025-14": {
    name: "Aarav Sharma",
    fatherName: "Rajesh Sharma",
    college: "University Commerce College, Jaipur",
    role: "Digital Marketing Strategy",
    duration: "15-12-2024 to 15-01-2025",
    authority: "Vikram Rathore (HR Manager)",
    company: "Pezzava Digital Media",
    status: "Completed",
    ref: "PZV-INT-2025-14"
  },
  "PZV-INT-2025-08": {
    name: "Ishita Gupta",
    fatherName: "Sanjay Gupta",
    college: "Maharani College",
    role: "Content Writing Intern",
    duration: "01-06-2024 to 30-06-2024",
    authority: "Vikram Rathore (HR Manager)",
    company: "Pezzava Content Lab",
    status: "Completed",
    ref: "PZV-INT-2025-08"
  },
  "PZV-INT-2024-12": {
    name: "Rohan Joshi",
    fatherName: "Sunil Joshi",
    college: "Rajasthan University, Jaipur",
    role: "Operations Management",
    duration: "01-11-2023 to 30-11-2023",
    authority: "Sanjay Mathur (Operations Lead)",
    company: "Pezzava Retail Operations",
    status: "Completed",
    ref: "PZV-INT-2024-12"
  },
  "PZV-INT-2024-05": {
    name: "Priyanka Verma",
    fatherName: "M.L. Verma",
    college: "Kanoria PG Mahila Mahavidyalaya",
    role: "Fashion Design Intern",
    duration: "01-02-2024 to 01-03-2024",
    authority: "Sanjay Mathur (Operations Lead)",
    company: "Pezzava Design Studio",
    status: "Completed",
    ref: "PZV-INT-2024-05"
  }
};

const VerificationContent = () => {
  const searchParams = useSearchParams();
  const [searchId, setSearchId] = useState("");
  const [currentIntern, setCurrentIntern] = useState<any>(null);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      handleVerify(ref.toUpperCase());
    }
  }, [searchParams]);

  const handleVerify = (id: string) => {
    setIsSearching(true);
    setError(false);
    
    // Simulate a small delay for "Verification" feel
    setTimeout(() => {
      const intern = VERIFIED_INTERNS[id];
      if (intern) {
        setCurrentIntern(intern);
        setSearchId(id);
      } else {
        setCurrentIntern(null);
        setError(true);
      }
      setIsSearching(false);
    }, 600);
  };

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
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Verification Portal</h1>
        <p className="font-body text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed mb-10">
          Enter the Reference ID from the internship certificate to verify its authenticity.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group">
          <input 
            type="text" 
            placeholder="Enter Reference ID (e.g., PZV-INT-2026-01)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify(searchId.trim().toUpperCase())}
            className="w-full bg-white border-2 border-stone-200 rounded-full py-5 px-8 pl-14 font-body text-lg focus:outline-none focus:border-primary transition-all shadow-lg group-hover:shadow-xl"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-primary transition-colors" size={24} />
          <button 
            onClick={() => handleVerify(searchId.trim().toUpperCase())}
            disabled={isSearching}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-on-surface text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-all disabled:opacity-50"
          >
            {isSearching ? "Verifying..." : "Verify Now"}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-red-50 border border-red-200 p-6 rounded-3xl flex items-center gap-4 text-red-800">
            <AlertCircle size={24} className="flex-shrink-0" />
            <div>
              <p className="font-bold">Invalid Reference ID</p>
              <p className="text-sm opacity-80">No internship record was found matching this ID. Please check the spelling or contact HR.</p>
            </div>
          </div>
        </div>
      )}

      {/* Verification Card */}
      {currentIntern && (
        <div className="max-w-4xl mx-auto mb-20 animate-in fade-in zoom-in-95 duration-700">
          <div className="bg-white border border-stone-200 rounded-[2rem] shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-on-surface p-8 text-white flex justify-between items-center border-b border-white/10">
              <div className="relative w-32 h-16">
                <Image src="/logo.png" alt="Pezzava" fill className="object-contain brightness-0 invert" />
              </div>
              <div className="text-right">
                <span className="block font-body text-[10px] uppercase tracking-[0.3em] opacity-60 mb-1">Official Verification</span>
                <span className="font-body font-bold text-warm-gold tracking-widest text-sm">REF: {currentIntern.ref}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="px-10 md:px-16 pt-10 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 font-display text-base font-bold text-green-700 bg-green-50 px-5 py-2 rounded-full border border-green-200">
                <CheckCircle2 size={18} className="text-green-600" />
                Internship Verified: {currentIntern.status}
              </span>
            </div>
            
            {/* Details Grid */}
            <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: "user", label: "Intern's Name", value: currentIntern.name },
                { icon: "user", label: "Father's Name", value: currentIntern.fatherName },
                { icon: "building", label: "College Name", value: currentIntern.college },
                { icon: "briefcase", label: "Company", value: currentIntern.company },
                { icon: "briefcase", label: "Role / Department", value: currentIntern.role },
                { icon: "calendar", label: "Duration", value: currentIntern.duration },
                { icon: "authority", label: "HR Issuing Authority", value: currentIntern.authority },
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
      )}

      
      {/* Verified Interns Directory (Always Visible) */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Award className="text-primary" size={28} />
          <h2 className="font-display text-3xl font-bold">Verified Interns Directory</h2>
        </div>
        
        <div className="bg-white rounded-[2rem] border border-stone-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  <th className="p-6 font-display text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">ID</th>
                  <th className="p-6 font-display text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">Intern Name</th>
                  <th className="p-6 font-display text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">Department</th>
                  <th className="p-6 font-display text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">Completion Date</th>
                  <th className="p-6 font-display text-xs uppercase tracking-[0.2em] text-on-surface-variant/60 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {Object.values(VERIFIED_INTERNS).map((intern) => (
                  <tr 
                    key={intern.ref}
                    className={`hover:bg-primary/5 transition-colors cursor-pointer group ${currentIntern?.ref === intern.ref ? 'bg-primary/10' : ''}`}
                    onClick={() => handleVerify(intern.ref)}
                  >
                    <td className="p-6 font-body text-sm font-bold text-primary">{intern.ref}</td>
                    <td className="p-6">
                      <div className="font-display font-bold text-on-surface">{intern.name}</div>
                      <div className="font-body text-[10px] text-on-surface-variant/60 uppercase tracking-widest">{intern.college}</div>
                    </td>
                    <td className="p-6 font-body text-sm text-on-surface-variant">{intern.role}</td>
                    <td className="p-6 font-body text-sm text-on-surface-variant">{intern.duration.split(' to ')[1]}</td>
                    <td className="p-6 text-right">
                      <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-100">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-stone-50/50 text-center">
            <p className="font-body text-xs text-on-surface-variant/60">
              Showing most recent verified certifications. For privacy reasons, full records are only accessible via Reference ID lookup.
            </p>
          </div>
        </div>
      </div>

      {/* Program Stats */}
      <div className="max-w-4xl mx-auto text-center py-20 border-t border-stone-200">
        <h2 className="font-display text-2xl font-bold mb-6 text-stone-400 uppercase tracking-widest">Global Internship Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="text-primary font-display text-4xl font-bold mb-2">15+</div>
            <div className="font-body text-sm text-on-surface-variant uppercase tracking-widest">Total Interns Verified</div>
          </div>
          <div className="p-6">
            <div className="text-primary font-display text-4xl font-bold mb-2">12+</div>
            <div className="font-body text-sm text-on-surface-variant uppercase tracking-widest">Partner Institutions</div>
          </div>
          <div className="p-6">
            <div className="text-primary font-display text-4xl font-bold mb-2">100%</div>
            <div className="font-body text-sm text-on-surface-variant uppercase tracking-widest">Authentic Certification</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerificationPage = () => {
  return (
    <main className="min-h-screen bg-surface pt-32 pb-20 px-6">
      <Suspense fallback={<div className="text-center pt-20">Loading portal...</div>}>
        <VerificationContent />
      </Suspense>
    </main>
  );
};

export default VerificationPage;

