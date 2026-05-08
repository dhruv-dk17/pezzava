
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nowmnussoipihwugaivo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vd21udXNzb2lwaWh3dWdhaXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzA2NjAsImV4cCI6MjA5Mzc0NjY2MH0.aIcY1NLmh6_g2nvOmLJfjFfuz6yOaIoQXT2MKlBWsWI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.rpc('get_tables'); // This might not work if RPC not defined
  if (error) {
    console.log('Error calling RPC:', error.message);
    // Fallback: try to guess common table names
    const tables = ['interns', 'intern_records', 'records', 'credentials', 'verifications'];
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('*').limit(1);
      if (!tableError) {
        console.log(`Table "${table}" exists.`);
      } else {
        console.log(`Table "${table}" does not exist or error:`, tableError.message);
      }
    }
  } else {
    console.log('Tables:', data);
  }
}

test();
