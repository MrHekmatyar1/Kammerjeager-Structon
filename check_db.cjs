const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val) acc[key.trim()] = val.join('=').trim().replace(/['"]+/g, '');
  return acc;
}, {});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('masters').select('*');
  console.log('Total masters:', data ? data.length : error);
  if (data) {
    const emails = data.map(d => d.email).filter(Boolean);
    const duplicates = emails.filter((item, index) => emails.indexOf(item) !== index);
    console.log('Duplicate emails:', [...new Set(duplicates)]);
    
    const dups = data.filter(d => duplicates.includes(d.email));
    console.log(dups.map(d => ({id: d.id, email: d.email, plz: d.plz_bereiche})));
  }
}
run();
