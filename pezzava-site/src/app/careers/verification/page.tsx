"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, User, Building2, GraduationCap, Calendar, Award, Download, BadgeCheck } from "lucide-react";

const internData = {
  name: "Simran Kumawat",
  fatherName: "Hansraj Kumawat",
  universityRollNo: "116223",
  collegeName: "St. Wilfred's PG College",
  company: "Pezzava",
  role: "E-Commerce Operations Intern",
  duration: "01-04-2026 to 30-04-2026",
  companyMentor: "Yuvraj Kumawat",
  hrIssuingAuthority: "Khushi Sharma",
  certificateId: "PZV-INT-2026-001",
  issueDate: "30-04-2026",
};

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} className="text-green-600" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Internship Verification
          </h1>
          <p className="font-body text-on-surface-variant max-w-md mx-auto">
            Official verification portal for internship certificates issued by Pezzava.
          </p>
        </motion.div>

        {/* Verification Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4 mb-8"
        >
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <BadgeCheck size={22} className="text-white" />
          </div>
          <div>
            <p className="font-body text-green-800 font-bold text-sm">Certificate Verified ✓</p>
            <p className="font-body text-green-700 text-xs">
              This internship certificate is authentic and was issued by Pezzava. Certificate ID: {internData.certificateId}
            </p>
          </div>
        </motion.div>

        {/* Intern Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-stone-900 to-stone-800 p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-body text-stone-400 text-xs uppercase tracking-widest mb-2">Intern Profile</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold">{internData.name}</h2>
                <p className="font-body text-primary mt-1 font-semibold">{internData.role}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center">
                <p className="font-body text-[10px] uppercase tracking-widest text-stone-400 mb-1">Company</p>
                <p className="font-display text-xl font-bold text-primary">PEZZAVA</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

              <DetailRow icon={<User size={18} />} label="Intern&apos;s Name" value={internData.name} />
              <DetailRow icon={<User size={18} />} label="Father&apos;s Name" value={internData.fatherName} />
              <DetailRow icon={<GraduationCap size={18} />} label="University Roll No." value={internData.universityRollNo} />
              <DetailRow icon={<GraduationCap size={18} />} label="College Name" value={internData.collegeName} />
              <DetailRow icon={<Building2 size={18} />} label="Company" value={internData.company} />
              <DetailRow icon={<Award size={18} />} label="Role" value={internData.role} />
              <DetailRow icon={<Calendar size={18} />} label="Duration" value={internData.duration} />
              <DetailRow icon={<User size={18} />} label="Company Mentor" value={internData.companyMentor} />
              <DetailRow icon={<User size={18} />} label="HR Issuing Authority" value={internData.hrIssuingAuthority} />
              <DetailRow icon={<ShieldCheck size={18} />} label="Certificate ID" value={internData.certificateId} />

            </div>

            {/* Divider */}
            <div className="border-t border-stone-100 my-10" />

            {/* PDF Download / View Section */}
            <div>
              <h3 className="font-display text-lg font-bold mb-4">Internship Certificate</h3>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-4">
                <div className="aspect-[8.5/11] w-full max-h-[700px] rounded-lg overflow-hidden border border-stone-200">
                  <iframe
                    src="/intership_letter.pdf"
                    width="100%"
                    height="100%"
                    className="w-full h-full min-h-[500px] md:min-h-[700px]"
                    title="Internship Certificate - Simran Kumawat"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/intership_letter.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-on-surface transition-colors"
                  >
                    <Download size={16} /> Download Certificate
                  </a>
                  <a
                    href="/intership_letter.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-stone-100 text-on-surface px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-stone-200 transition-colors"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center font-body text-xs text-on-surface-variant/60 mt-10 max-w-md mx-auto"
        >
          This verification page is an official record by Pezzava. For any discrepancies or further queries, contact us at{" "}
          <a href="mailto:pezzava.jaipur@gmail.com" className="text-primary underline">pezzava.jaipur@gmail.com</a>.
        </motion.p>
      </div>
    </main>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-primary">
        {icon}
      </div>
      <div>
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-0.5">{label}</p>
        <p className="font-body text-sm font-semibold text-on-surface">{value}</p>
      </div>
    </div>
  );
}
