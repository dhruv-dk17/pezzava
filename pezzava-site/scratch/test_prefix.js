
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nowmnussoipihwugaivo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vd21udXNzb2lwaWh3dWdhaXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzA2NjAsImV4cCI6MjA5Mzc0NjY2MH0.aIcY1NLmh6_g2nvOmLJfjFfuz6yOaIoQXT2MKlBWsWI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase
    .from('intern_records')
    .select('*')
    .ilike('ref', 'PZ-%');
  
  console.log('Results for PZ-%:', data);
}

test();
