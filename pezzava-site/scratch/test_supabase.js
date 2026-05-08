
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nowmnussoipihwugaivo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vd21udXNzb2lwaWh3dWdhaXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzA2NjAsImV4cCI6MjA5Mzc0NjY2MH0.aIcY1NLmh6_g2nvOmLJfjFfuz6yOaIoQXT2MKlBWsWI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Listing all tables (via a trick)...');
  // Since we can't easily query information_schema via anon key (usually restricted),
  // we'll try to query some common table names or check intern_records for partial matches.
  
  const { data, error } = await supabase
    .from('intern_records')
    .select('ref')
    .ilike('ref', '%24%');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Refs containing "24":', data.map(r => r.ref));
  }
}

test();
