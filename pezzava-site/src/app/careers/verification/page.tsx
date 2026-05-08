"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ShieldCheck, Calendar, User, Briefcase, Bookmark, 
  ArrowLeft, GraduationCap, Building2, 
  UserCheck, Search, AlertCircle, CheckCircle2, ExternalLink,
  ChevronRight, ArrowRight, Award, History
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const VerificationContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [directoryInterns, setDirectoryInterns] = useState<any[]>([]);
  const [isLoadingDirectory, setIsLoadingDirectory] = useState(true);
  const [totalVerified, setTotalVerified] = useState(0);

  useEffect(() => {
    fetchDirectory();
    const ref = searchParams.get("ref");
    if (ref) {
      handleVerify(ref.toUpperCase());
    }
  }, [searchParams]);

  const fetchDirectory = async () => {
    setIsLoadingDirectory(true);
    
    try {
      // 1. Fetch Simran specifically to ensure she's always at the top
      const { data: simranData } = await supabase
        .from("intern_records")
        .select("*")
        .eq("name", "Simran Kumawat")
        .maybeSingle();

      // 2. Fetch others (latest to oldest)
      let query = supabase
        .from("intern_records")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (simranData) {
        query = query.neq("name", "Simran Kumawat");
      }

      const { data, error } = await query;
      
      if (error) throw error;

      if (data) {
        const combined = simranData ? [simranData, ...data] : data;
        setDirectoryInterns(combined);
      }

      // 3. Fetch total count
      const { count, error: countError } = await supabase
        .from("intern_records")
        .select("*", { count: 'exact', head: true });
      
      if (!countError && count !== null) {
        setTotalVerified(count);
      }
    } catch (err) {
      console.error("Error fetching directory:", err);
    } finally {
      setIsLoadingDirectory(false);
    }
  };

  const handleVerify = async (id: string) => {
    if (!id) return;
    setIsSearching(true);
    setError(false);
    
    const { data, error: supabaseError } = await supabase
      .from("intern_records")
      .select("ref")
      .eq("ref", id.trim().toUpperCase())
      .single();

    if (!supabaseError && data) {
      router.push(`/careers/verification/${data.ref}`);
    } else {
      setError(true);
      // Shake animation effect could be added here
    }
    setIsSearching(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6">
      {/* Back Link */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/careers" 
          className="inline-flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-all mb-12 font-body text-xs uppercase tracking-[0.3em] group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          <span>Back to Careers</span>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <div className="relative mb-32">
        {/* Background Decorative Elements */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center p-1 rounded-full bg-stone-100 border border-stone-200 mb-8"
          >
            <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary shadow-sm">
              Authenticity Guaranteed
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-8xl font-bold mb-8 tracking-tight text-on-surface"
          >
            Credential <span className="text-primary italic">Verification</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-on-surface-variant max-w-2xl mx-auto text-xl leading-relaxed mb-12"
          >
            Validate the professional achievements and internship records of Pezzava alumni through our secure global database.
          </motion.p>

          {/* Search Bar Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 blur-3xl group-focus-within:bg-primary/10 transition-all rounded-full" />
              <div className="relative flex items-center bg-white border border-stone-200 rounded-full p-2 shadow-2xl group-focus-within:border-primary transition-all">
                <Search className="ml-6 text-stone-400 group-focus-within:text-primary transition-colors" size={24} />
                <input 
                  type="text" 
                  placeholder="Enter Reference ID (PZV-INT-...)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify(searchId.trim().toUpperCase())}
                  className="flex-grow bg-transparent border-none py-4 px-4 font-body text-lg focus:outline-none placeholder:text-stone-300"
                />
                <button 
                  onClick={() => handleVerify(searchId.trim().toUpperCase())}
                  disabled={isSearching}
                  className="bg-on-surface text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all disabled:opacity-50 flex items-center gap-2 group/btn shadow-xl shadow-on-surface/10 hover:shadow-primary/20"
                >
                  {isSearching ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 flex items-center justify-center gap-2 text-red-600 font-body text-sm bg-red-50 py-3 px-6 rounded-2xl border border-red-100"
                >
                  <AlertCircle size={16} />
                  <span>Invalid Reference ID. Please check and try again.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 px-2">
          <div>
            <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
              <History size={14} />
              <span>Latest Updates</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface">Verified Alumni <span className="text-stone-300">Directory</span></h2>
          </div>
          <div className="bg-stone-50 px-6 py-3 rounded-2xl border border-stone-100 flex items-center gap-4">
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60">Database Status</span>
              <span className="font-display font-bold text-sm text-on-surface">Online & Secure</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoadingDirectory ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-[200px] bg-stone-100 animate-pulse rounded-[2rem]" />
            ))
          ) : directoryInterns.length > 0 ? (
            directoryInterns.map((intern, idx) => (
              <motion.div
                key={intern.ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => router.push(`/careers/verification/${intern.ref}`)}
                className={`group cursor-pointer bg-white border ${intern.name === 'Simran Kumawat' ? 'border-gold/30 shadow-xl shadow-gold/5' : 'border-stone-100'} p-8 rounded-[2rem] hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5 flex flex-col relative overflow-hidden`}
              >
                {/* ID Tag */}
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} className="text-primary" />
                </div>

                {intern.name === 'Simran Kumawat' && (
                  <div className="absolute top-0 left-0 bg-gold/10 text-gold px-4 py-1 rounded-br-2xl text-[8px] uppercase tracking-[0.2em] font-bold border-b border-r border-gold/20">
                    Lead Verification
                  </div>
                )}
                
                <div className="flex-grow pt-4">
                  <span className="block font-body text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">
                    {intern.ref}
                  </span>
                  <h3 className="font-display text-xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {intern.name}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-6">
                    {intern.role}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface-variant/40">
                    <Calendar size={12} />
                    <span className="font-body text-[10px] uppercase tracking-widest">
                      {intern.duration.includes(' to ') ? intern.duration.split(' to ')[1] : intern.duration}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full ${intern.name === 'Simran Kumawat' ? 'bg-gold/10 text-gold' : 'bg-green-50 text-green-600'} flex items-center justify-center`}>
                    <CheckCircle2 size={12} />
                  </div>
                </div>

                {/* Decorative Element */}
                <div className={`absolute -bottom-10 -right-10 w-24 h-24 ${intern.name === 'Simran Kumawat' ? 'bg-gold/5' : 'bg-primary/5'} rounded-full blur-2xl group-hover:bg-primary/10 transition-all`} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-stone-50 rounded-[3rem] border border-dashed border-stone-200">
              <p className="font-body text-on-surface-variant italic">No public records found. Use the lookup tool above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-on-surface rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden mb-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-6 text-primary">
              <Award size={24} />
            </div>
            <div className="text-5xl font-display font-bold mb-2 tracking-tighter">
              {totalVerified > 0 ? `${totalVerified}+` : "24"}
            </div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-white/40">Talents Verified</p>
          </div>
          
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-6 text-primary">
              <Building2 size={24} />
            </div>
            <div className="text-5xl font-display font-bold mb-2 tracking-tighter">15+</div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-white/40">Partner Universities</p>
          </div>

          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-6 text-primary">
              <ShieldCheck size={24} />
            </div>
            <div className="text-5xl font-display font-bold mb-2 tracking-tighter">100%</div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-white/40">Data Integrity</p>
          </div>
        </div>
      </div>

      <footer className="text-center pb-20">
        <p className="font-body text-[10px] text-on-surface-variant/40 uppercase tracking-[0.4em] mb-4">Pezzava Certification Protocol v2.1</p>
        <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors cursor-pointer">
          <span>Terms of Verification</span>
          <span>Privacy Policy</span>
          <span>Contact Registrar</span>
        </div>
      </footer>
    </div>
  );
};

const VerificationPage = () => {
  return (
    <main className="min-h-screen bg-surface pt-32 pb-20 overflow-x-hidden">
      <Suspense fallback={<div className="text-center pt-20">Initializing Secure Portal...</div>}>
        <VerificationContent />
      </Suspense>
    </main>
  );
};

export default VerificationPage;
