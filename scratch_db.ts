import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function test() {
    console.log("Testing free_leads_until...");
    const { data, error } = await supabase
        .from('masters')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Select error:", error);
    } else {
        console.log("Data:", data);
        if (data && data.length > 0) {
            console.log("Keys in first row:", Object.keys(data[0]));
        }
    }
}

test();
