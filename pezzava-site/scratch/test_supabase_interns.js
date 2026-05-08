
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nowmnussoipihwugaivo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vd21udXNzb2lwaWh3dWdhaXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzA2NjAsImV4cCI6MjA5Mzc0NjY2MH0.aIcY1NLmh6_g2nvOmLJfjFfuz6yOaIoQXT2MKlBWsWI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing "interns" table...');
  const { data, error } = await supabase.from('interns').select('*').limit(5);
  if (error) {
    console.log('Error querying "interns":', error.message);
  } else {
    console.log('Success! "interns" table exists. Sample data:', data);
  }
}

test();
