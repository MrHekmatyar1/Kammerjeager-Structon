import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val) acc[key.trim()] = val.join('=').trim().replace(/['"]+/g, '');
  return acc;
}, {});
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('masters').insert([{
    user_id: '00000000-0000-0000-0000-000000000000',
    email: 'test_insert@example.com',
    name: '',
    firma: '',
    phone: '',
    plz_bereiche: ['12205'],
    billing_model: 'commission',
    is_active: true,
    telegram_chat_id: '',
    pests_handled: []
  }]);
  console.log('Insert Error:', error);
  if (!error) {
     await supabase.from('masters').delete().eq('email', 'test_insert@example.com');
  }
}
run();
