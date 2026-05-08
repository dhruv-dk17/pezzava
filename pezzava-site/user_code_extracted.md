<USER_REQUEST>
Certainly! Here is the code for the two main components that handle the fetching and displaying of the intern data.

### 1. The Verification Card (Detail Page)
This is the code for the individual student page that shows the premium verification card. It uses the `id` from the URL to fetch data from Supabase.

**File:** `src/app/careers/verification/[id]/page.tsx`

```tsx
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
<truncated 7806 bytes>