import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const VERIFIED_INTERNS = [
  {
    ref: "PZV-INT-2026-01",
    name: "Simran Kumawat",
    father_name: "Hansraj Kumawat",
    college: "St. Wilfred's PG College",
    role: "E-Commerce Operations Intern",
    duration: "01-04-2026 to 30-04-2026",
    authority: "Khushi Sharma (HR Head)",
    company: "Pezzava",
    status: "Completed"
  },
  {
    ref: "PZV-INT-2026-02",
    name: "Abhay Singh Shekhawat",
    father_name: "Goverdhan Singh",
    college: "St. Wilfred's PG College",
    role: "Product listing intern",
    duration: "01-04-2026 to 30-04-2026",
    authority: "Khushi Sharma",
    company: "Pezzava",
    status: "Completed"
  },
  {
    ref: "PZV-INT-2025-14",
    name: "Aarav Sharma",
    father_name: "Rajesh Sharma",
    college: "University Commerce College, Jaipur",
    role: "Digital Marketing Strategy",
    duration: "15-12-2024 to 15-01-2025",
    authority: "Vikram Rathore (HR Manager)",
    company: "Pezzava",
    status: "Completed"
  },
  {
    ref: "PZV-INT-2025-08",
    name: "Ishita Gupta",
    father_name: "Sanjay Gupta",
    college: "Maharani College",
    role: "Content Writing Intern",
    duration: "01-06-2024 to 30-06-2024",
    authority: "Vikram Rathore (HR Manager)",
    company: "Pezzava",
    status: "Completed"
  },
  {
    ref: "PZV-INT-2024-12",
    name: "Rohan Joshi",
    father_name: "Sunil Joshi",
    college: "Rajasthan University, Jaipur",
    role: "Operations Management",
    duration: "01-11-2023 to 30-11-2023",
    authority: "Sanjay Mathur (Operations Lead)",
    company: "Pezzava",
    status: "Completed"
  },
  {
    ref: "PZV-INT-2024-05",
    name: "Priyanka Verma",
    father_name: "M.L. Verma",
    college: "Kanoria PG Mahila Mahavidyalaya",
    role: "Fashion Design Intern",
    duration: "01-02-2024 to 01-03-2024",
    authority: "Sanjay Mathur (Operations Lead)",
    company: "Pezzava",
    status: "Completed"
  }
];

async function migrate() {
  console.log('Starting migration...');
  
  for (const intern of VERIFIED_INTERNS) {
    const { error } = await supabase
      .from('intern_records')
      .upsert(intern);
    
    if (error) {
      console.error(`Error migrating ${intern.ref}:`, error.message);
    } else {
      console.log(`Successfully migrated ${intern.ref}`);
    }
  }
  
  console.log('Migration complete!');
}

migrate();
