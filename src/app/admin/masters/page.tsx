import { getMasters } from '../actions';
import MastersTable from '@/components/admin/MastersTable';

export const revalidate = 0;

export default async function AdminMastersPage() {
    const masters = await getMasters();

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Meister Übersicht</h1>
                    <p className="text-slate-400 font-medium mt-1">Verwalten Sie hier alle registrierten Schädlingsbekämpfer.</p>
                </div>
                <div className="bg-[#1e1e1e] px-4 py-2 rounded-lg border border-[#333] shadow-sm flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-sm font-bold text-white">{masters?.length || 0} Meister gesamt</span>
                </div>
            </header>

            <MastersTable initialMasters={masters || []} />
        </div>
    );
}
