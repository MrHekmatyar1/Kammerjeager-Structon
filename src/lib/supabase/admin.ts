import { createClient } from '@supabase/supabase-js';

// Это клиент для безопасного использования ТОЛЬКО на сервере.
// Он обходит Row Level Security (RLS) благодаря SERVICE_ROLE_KEY.
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
