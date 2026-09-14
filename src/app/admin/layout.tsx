import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

export const metadata = {
    title: 'CRM - Kammerjaeger-Zentrale',
};

const ADMIN_EMAIL = 'edorkalchuk@gmail.com';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        // Если не авторизован или не тот email, выкидываем на главную
        redirect('/');
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen admin-dotted-bg font-sans text-slate-300">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#161616] border-b md:border-b-0 md:border-r border-[#2a2a2a] flex flex-col md:fixed h-auto md:h-full z-10">
                <div className="p-4 md:p-6 border-b border-[#2a2a2a] flex justify-between items-center md:block">
                    <div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Super<span className="text-[#C8102E]">Admin</span></h2>
                        <p className="text-xs font-medium text-slate-400 mt-1">{session.user.email}</p>
                    </div>
                    {/* Logout button for mobile (header) */}
                    <form action="/auth/signout" method="post" className="md:hidden">
                        <button type="submit" className="p-2 text-slate-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </form>
                </div>
                
                <AdminNav />

                {/* Logout button for desktop (bottom) */}
                <div className="hidden md:block p-6 border-t border-[#2a2a2a]">
                    <form action="/auth/signout" method="post">
                        <button type="submit" className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-sm transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Abmelden
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main content area */}
            <main className="flex-1 w-full md:ml-64 p-4 md:p-8 max-w-[100vw] overflow-x-hidden min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
