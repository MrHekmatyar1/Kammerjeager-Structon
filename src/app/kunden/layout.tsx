'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, LogOut, Shield } from 'lucide-react';

export default function KundenLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/');
                setTimeout(() => window.dispatchEvent(new CustomEvent('open-auth-modal')), 500);
            } else {
                setUser(session.user);
                
                // Проверка на роль мастера
                if (session.user.user_metadata?.role === 'partner' && session.user.email?.toLowerCase() !== 'edorkalchuk@gmail.com') {
                    router.push('/dashboard');
                    return;
                }
            }
            setLoading(false);
        };
        checkUser();
    }, [router, supabase]);

    useEffect(() => { setDrawerOpen(false); }, [pathname]);

    if (loading) return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-100 dark:bg-[#121212] dark-dotted-bg transition-colors flex items-center justify-center">
            <div className="text-slate-500 dark-subtext text-[15px] font-bold tracking-widest uppercase">Lädt<span className="loading-dots"><span></span><span></span><span></span></span></div>
        </div>
    );
    if (!user) return null;

    const navItems = [
        { name: 'Meine Aufträge', href: '/kunden', icon: Briefcase },
    ];

    if (user?.email?.toLowerCase() === 'edorkalchuk@gmail.com') {
        navItems.push({ name: 'Admin CRM', href: '/admin', icon: Shield });
    }

    const NavLinks = () => (
        <nav className="flex flex-col gap-2 px-4">
            {navItems.map(item => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link key={item.name} href={item.href} className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold whitespace-nowrap transition-colors
                        ${active 
                            ? 'bg-slate-200 dark:bg-[#2a2a2a] text-slate-900 dark:text-white' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#222222] hover:text-slate-900 dark:hover:text-white'
                        }
                    `}>
                        <Icon size={20} />
                        {item.name}
                    </Link>
                );
            })}
            <button
                onClick={async () => { await supabase.auth.signOut(); router.push('/'); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#222222] hover:text-slate-900 dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer mt-2 w-full text-left"
            >
                <LogOut size={20} />
                Abmelden
            </button>
        </nav>
    );

    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-100 dark:bg-[#121212] dark-dotted-bg transition-colors">
            
            {/* ══════════════════════════════════════
                MOBILE ONLY
            ══════════════════════════════════════ */}
            <div className="md:hidden">
                <button
                    onClick={() => setDrawerOpen(o => !o)}
                    aria-label="Menü"
                    className={`
                        dashboard-drawer-toggle fixed top-[68px] left-[20px] z-[9998] w-[44px] h-[38px] flex items-center justify-center pb-1
                        bg-white dark:bg-[#111111] border border-t-0 border-slate-200 dark:border-[#2a2a2a] rounded-b-[22px] cursor-pointer
                        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-200
                        ${drawerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
                    `}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" className="text-slate-600 dark-header-text stroke-[2.5px] stroke-linecap-round stroke-linejoin-round transition-transform duration-200" style={{ transform: drawerOpen ? 'rotate(180deg)' : 'none' }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>

                <div
                    onClick={() => setDrawerOpen(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.35)',
                        zIndex: 9996,
                        opacity: drawerOpen ? 1 : 0,
                        pointerEvents: drawerOpen ? 'auto' : 'none',
                        transition: 'opacity 0.2s',
                    }}
                />

                <div className={`
                    fixed top-[68px] left-0 w-max min-w-[205px] max-w-[calc(100vw-32px)] z-[9997]
                    bg-white dark:bg-[#111111] border-r border-b border-slate-200 dark:border-[#2a2a2a] rounded-br-[16px]
                    shadow-[4px_8px_24px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${drawerOpen ? 'translate-y-0' : '-translate-y-[120%]'}
                `}>
                    <div className="px-[18px] py-[18px] pb-[12px] border-b border-slate-100 dark:border-[#1a1a1a]">
                        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.08em] mb-1">Kunden-Portal</div>
                        <div className="text-[14px] font-bold text-slate-900 dark-header-text whitespace-nowrap">{user.email}</div>
                    </div>
                    <div className="pb-[12px] pt-2">
                        <NavLinks />
                    </div>
                </div>

                <main className="pt-[40px] px-[16px] pb-[40px]">
                    {children}
                </main>
            </div>

            {/* ══════════════════════════════════════
                DESKTOP: classic sidebar layout
            ══════════════════════════════════════ */}
            <div className="hidden md:flex">
                <aside className="w-[250px] bg-white dark:bg-[#111111] border-r border-slate-300 dark:border-[#2a2a2a] py-[24px] min-h-[calc(100vh-70px)] shrink-0 transition-colors">
                    <div className="px-[24px] mb-[32px]">
                        <div className="text-[12px] text-slate-400 font-bold uppercase tracking-[0.1em] mb-1">Kunden-Portal</div>
                        <div className="text-[15px] font-bold text-slate-900 dark-header-text truncate" title={user.email}>{user.email}</div>
                    </div>
                    <NavLinks />
                </aside>
                <main className="flex-1 min-w-0 py-[32px] px-[40px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
