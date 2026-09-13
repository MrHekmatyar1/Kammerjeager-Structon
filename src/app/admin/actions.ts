'use server';

import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

const ADMIN_EMAIL = 'edorkalchuk@gmail.com';

export async function updateLeadStatus(id: number, status: string) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabaseAdmin
        .from('leads')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('[Admin] Error updating lead:', error);
        throw new Error('Failed to update lead');
    }

    // Refresh the admin page data
    revalidatePath('/admin');
    
    return { success: true };
}

export async function getMasters() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized');
    }

    const { data, error } = await supabaseAdmin
        .from('masters')
        .select('*')
        .order('name');

    if (error) {
        console.error('[Admin] Error fetching masters:', error);
        throw new Error('Failed to fetch masters');
    }

    return data;
}

export async function assignLeadManually(
    leadId: number, 
    masterId: number, 
    overrideType: string | null, 
    overrideValue: number | null
) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized');
    }

    const updates: any = {
        master_id: masterId,
        status: 'neu',
    };

    if (overrideType) {
        updates.billing_override_type = overrideType;
        updates.billing_override_value = overrideValue;
    } else {
        updates.billing_override_type = null;
        updates.billing_override_value = null;
    }

    const { error } = await supabaseAdmin
        .from('leads')
        .update(updates)
        .eq('id', leadId);

    if (error) {
        console.error('[Admin] Error assigning lead manually:', error);
        throw new Error('Failed to assign lead');
    }

    // TODO: Send Telegram notification to the master here?
    // We can do it asynchronously.

    revalidatePath('/admin');
    return { success: true };
}

export async function updateMasterProfile(id: number, updates: any) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabaseAdmin
        .from('masters')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('[Admin] Error updating master:', error);
        throw new Error('Failed to update master profile');
    }

    revalidatePath('/admin/masters');
    return { success: true };
}

export async function setFreeLeads(id: number, days: number) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized');
    }

    let free_leads_until = null;
    if (days > 0) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        free_leads_until = date.toISOString();
    }

    const { error } = await supabaseAdmin
        .from('masters')
        .update({ free_leads_until })
        .eq('id', id);

    if (error) {
        console.error('[Admin] Error setting free leads:', error);
        throw new Error('Failed to set free leads');
    }

    revalidatePath('/admin/masters');
    return { success: true };
}

export async function getKundenUsers() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized');
    }

    // Retrieve users from auth using supabaseAdmin
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
        console.error('[Admin] Error fetching users:', error);
        throw new Error('Failed to fetch kunden users');
    }

    // Filter by role 'kunden'
    const kunden = data.users.filter(u => u.user_metadata?.role === 'kunden');
    
    return kunden.map(u => ({
        id: u.id,
        email: u.email,
        name: u.user_metadata?.name || '',
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at,
    }));
}
