'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, UserCircle, BarChart3, ArrowLeft } from 'lucide-react';

export default function AdminNav() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Leads', href: '/admin', icon: LayoutDashboard },
        { name: 'Masters', href: '/admin/masters', icon: Users },
        { name: 'Clients', href: '/admin/kunden', icon: UserCircle },
    ];

    return (
        <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto">
            {/* Back to Dashboard Button */}
            <Link 
                href="/dashboard" 
                className="mb-4 flex items-center gap-2 text-slate-500 hover:text-[#C8102E] transition-colors font-medium text-sm px-4 md:px-0"
            >
                <ArrowLeft size={18} />
                Zurück zum Dashboard
            </Link>

            {navItems.map(item => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                    <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${
                            isActive 
                                ? 'bg-red-50 text-[#C8102E]' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <Icon size={20} />
                        {item.name}
                    </Link>
                );
            })}
            
            <div className="flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 text-slate-400 font-medium text-sm cursor-not-allowed whitespace-nowrap mt-4 border-t border-slate-100">
                <BarChart3 size={20} />
                Statistik (Bald)
            </div>
        </nav>
    );
}
