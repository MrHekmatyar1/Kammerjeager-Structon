import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val) acc[key.trim()] = val.join('=').trim().replace(/['"]+/g, '');
  return acc;
}, {});
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data } = await supabase.from('masters').select('email, plz_bereiche');
  console.log(typeof data[1].plz_bereiche[0]);
}
run();
