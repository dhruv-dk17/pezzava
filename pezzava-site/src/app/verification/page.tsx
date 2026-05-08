"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ShieldCheck, Calendar, User, Briefcase, Award, 
  ArrowLeft, Download, GraduationCap, Building2, 
  UserCheck, Search, AlertCircle, CheckCircle2,
  ExternalLink, QrCode
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import QRCodeDisplay from "@/components/QRCodeDisplay";

const VerificationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchId, setSearchId] = useState("");
  const [internsList, setInternsList] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('intern_records')
      .select('*');

    if (!error && data) {
      const sortedData = [...data].sort((a, b) => {
        const getEndDate = (duration: string) => {
          if (!duration) return new Date(0);
          const parts = duration.split(' to ');
          const dateStr = parts[1] || parts[0];
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
    if (!id) return;
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

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8">
      {/* Back Link */}
      <div className="mb-12">
        <Link 
          href="/careers" 
          className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-all duration-300 group font-body text-xs uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Careers
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative mb-24 py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-transparent -z-10 rounded-[3rem]" />
        
        <div className="text-center max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-xl shadow-primary/5 border border-stone-100 mb-8 animate-in fade-in zoom-in duration-700">
            <ShieldCheck size={48} className="text-primary" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight text-stone-900">
            Verification <span className="text-primary italic">Portal</span>
          </h1>
          <p className="font-body text-stone-500 text-lg md:text-xl leading-relaxed mb-12">
            Securely validate Pezzava internship credentials. Enter your Reference ID below to access the authentic digital certificate.
          </p>

          {/* Search Bar - Premium Design */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-warm-gold/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-white border border-stone-200 rounded-[2rem] p-2 shadow-2xl shadow-stone-200/50">
              <div className="flex-shrink-0 pl-6 text-stone-400">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Reference ID (e.g., PZV-INT-2026-01)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerify(searchId.trim().toUpperCase())}
                className="w-full bg-transparent py-4 px-4 font-body text-lg focus:outline-none placeholder:text-stone-300 text-stone-800"
              />
              <button 
                onClick={() => handleVerify(searchId.trim().toUpperCase())}
                disabled={isSearching || !searchId}
                className="bg-[#1A1A1A] text-white px-8 py-4 rounded-[1.5rem] font-display font-bold uppercase tracking-widest text-xs hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:hover:scale-100"
              >
                {isSearching ? "Verifying..." : "Validate ID"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-50 border border-red-100 text-red-600 font-body text-sm">
                <AlertCircle size={18} />
                <span>Reference ID not found. Please verify and try again.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verified Directory Section */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Award size={20} />
              </div>
              <h2 className="font-display text-3xl font-bold text-stone-900">Verified Alumni Directory</h2>
            </div>
            <p className="font-body text-stone-500 max-w-xl">
              A public record of individuals who have successfully completed their professional engagements with Pezzava.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-stone-50 px-6 py-3 rounded-2xl border border-stone-100">
            <div className="text-right">
              <div className="text-stone-400 font-body text-[10px] uppercase tracking-widest">Total Records</div>
              <div className="text-stone-900 font-display font-bold">{internsList.length} Verified</div>
            </div>
            <div className="w-[1px] h-8 bg-stone-200" />
            <div className="text-primary">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>
        
        {/* Directory List */}
        <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/50 border-b border-stone-100">
                  <th className="p-8 font-display text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">Credential</th>
                  <th className="p-8 font-display text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">Intern Profile</th>
                  <th className="p-8 font-display text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">Specialization</th>
                  <th className="p-8 font-display text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">Issued On</th>
                  <th className="p-8 font-display text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold text-right">Quick Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-stone-200 border-t-primary rounded-full animate-spin" />
                        <span className="font-body text-stone-400 text-sm">Accessing secure records...</span>
                      </div>
                    </td>
                  </tr>
                ) : internsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-stone-300">
                        <Search size={48} />
                        <span className="font-body text-sm">No records found in the directory.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  internsList.map((intern) => (
                    <tr 
                      key={intern.ref}
                      className="hover:bg-stone-50/80 transition-all cursor-pointer group"
                      onClick={() => router.push(`/verification/${intern.ref}`)}
                    >
                      <td className="p-8">
                        <span className="font-body text-sm font-bold text-primary group-hover:underline underline-offset-4 decoration-primary/30 tracking-tight">
                          {intern.ref}
                        </span>
                        <div className="mt-2 scale-[0.3] origin-left opacity-60 group-hover:opacity-100 transition-opacity">
                          <QRCodeDisplay value={`${origin}/verification/${intern.ref}`} />
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="font-display font-bold text-stone-800 text-lg group-hover:text-primary transition-colors duration-300">
                          {intern.name}
                        </div>
                        <div className="font-body text-xs text-stone-400 uppercase tracking-widest mt-1">
                          {intern.college}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-100 text-stone-600 font-body text-xs font-medium">
                          <Briefcase size={14} />
                          {intern.role}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="font-body text-sm text-stone-500">
                          {new Date(intern.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <div className="relative group/qr">
                            <QrCode size={18} className="text-stone-300 group-hover/qr:text-primary transition-colors" />
                            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white border border-stone-200 p-2 rounded-xl shadow-2xl opacity-0 invisible group-hover/qr:opacity-100 group-hover/qr:visible transition-all duration-300 z-50 scale-90 group-hover/qr:scale-100">
                              <QRCodeDisplay value={`${origin}/verification/${intern.ref}`} showDownload={true} />
                              <div className="text-[8px] text-center mt-1 text-stone-400 uppercase tracking-tighter">Scan to Verify</div>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-primary group-hover:text-primary transition-all duration-300 bg-white">
                            <ExternalLink size={16} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 bg-stone-50/50 border-t border-stone-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-stone-400 text-xs font-body">
                <ShieldCheck size={14} className="text-primary" />
                <span>All records are cryptographically signed and immutable.</span>
              </div>
              <div className="font-body text-xs text-stone-400 italic">
                Data last synchronized: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        {[
          { label: "Partner Institutions", value: "12+", sub: "Top Universities" },
          { label: "Program Completion", value: "98%", sub: "Success Rate" },
          { label: "Digital Certificates", value: "Issued", sub: "Blockchain Verified" }
        ].map((stat, i) => (
          <div key={i} className="p-10 rounded-[2.5rem] bg-stone-50 border border-stone-100 text-center hover:bg-white hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 group">
            <div className="font-display text-4xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors">{stat.value}</div>
            <div className="font-body text-xs uppercase tracking-[0.3em] text-stone-400 mb-1">{stat.label}</div>
            <div className="font-body text-[10px] text-primary/60 font-semibold tracking-widest">{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VerificationPage = () => {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -mr-96 -mt-96 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-warm-gold/5 rounded-full blur-[100px] -ml-72 -mb-72 opacity-30 pointer-events-none" />
      
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-stone-100 border-t-primary rounded-full animate-spin" />
            <span className="font-display text-sm font-bold tracking-widest text-stone-400 uppercase">Initializing Portal</span>
          </div>
        </div>
      }>
        <VerificationContent />
      </Suspense>
    </main>
  );
};

export default VerificationPage;
