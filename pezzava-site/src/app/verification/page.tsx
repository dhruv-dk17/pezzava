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

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const VerificationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchId, setSearchId] = useState("");
  const [internsList, setInternsList] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('intern_records')
      .select('*');

    if (!error && data) {
      // Sort by completion date (latest first), then by ref (year DESC, ID ASC)
      const sortedData = [...data].sort((a, b) => {
        const getEndDate = (duration: string) => {
          if (!duration) return new Date(0);
          const parts = duration.split(' to ');
          const dateStr = parts[1] || parts[0];
          // Handle format DD-MM-YYYY
          const dateParts = dateStr.split('-');
          if (dateParts.length === 3) {
            const [d, m, y] = dateParts.map(Number);
            return new Date(y, m - 1, d);
          }
          return new Date(0);
        };

        const dateA = getEndDate(a.duration);
        const dateB = getEndDate(b.duration);

        if (dateB.getTime() !== dateA.getTime()) {
          return dateB.getTime() - dateA.getTime();
        }
        
        // Fallback to ref parsing if dates are equal
        const parseRef = (ref: string) => {
          const parts = ref.split('-');
          return { 
            year: parseInt(parts[2]) || 0, 
            id: parseInt(parts[3]) || 0 
          };
        };
        
        const refA = parseRef(a.ref);
        const refB = parseRef(b.ref);
        
        if (refB.year !== refA.year) {
          return refB.year - refA.year;
        }
        return refA.id - refB.id;
      });
      
      setInternsList(sortedData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      handleVerify(ref.toUpperCase());
    }
  }, [searchParams]);

  const handleVerify = async (id: string) => {
    setIsSearching(true);
    setError(false);
    
    const { data, error: fetchError } = await supabase
      .from('intern_records')
      .select('ref')
      .eq('ref', id)
      .single();

    if (data && !fetchError) {
      router.push(`/verification/${id}`);
    } else {
      setError(true);
    }
    setIsSearching(false);
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

      {/* Verification Card removed as each student has a dedicated page */}

      
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
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center font-body text-stone-400">
                      Loading verified directory...
                    </td>
                  </tr>
                ) : internsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center font-body text-stone-400">
                      No verified records found in the directory.
                    </td>
                  </tr>
                ) : (
                  internsList.map((intern) => (
                    <tr 
                      key={intern.ref}
                      className="hover:bg-primary/5 transition-colors cursor-pointer group"
                      onClick={() => router.push(`/verification/${intern.ref}`)}
                    >
                      <td className="p-6 font-body text-sm font-bold text-primary">{intern.ref}</td>
                      <td className="p-6">
                        <div className="font-display font-bold text-on-surface group-hover:text-primary transition-colors">{intern.name}</div>
                        <div className="font-body text-[10px] text-on-surface-variant/60 uppercase tracking-widest">{intern.college}</div>
                      </td>
                      <td className="p-6 font-body text-sm text-on-surface-variant">{intern.role}</td>
                      <td className="p-6 font-body text-sm text-on-surface-variant">
                        {intern.duration?.includes(' to ') ? intern.duration.split(' to ')[1] : intern.duration}
                      </td>
                      <td className="p-6 text-right">
                        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-100 group-hover:bg-green-100 transition-colors">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      </td>
                    </tr>
                  ))
                )}
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
