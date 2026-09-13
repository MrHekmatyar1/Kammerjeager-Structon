import { getKundenUsers } from '../actions';
import KundenTable from '@/components/admin/KundenTable';

export const revalidate = 0;

export default async function AdminKundenPage() {
    const kunden = await getKundenUsers();

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Kunden Übersicht</h1>
                    <p className="text-slate-500 font-medium mt-1">Verwalten Sie hier alle registrierten Kunden (Privat & Gewerbe).</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-sm font-bold text-slate-700">{kunden?.length || 0} Kunden gesamt</span>
                </div>
            </header>

            <KundenTable initialKunden={kunden || []} />
        </div>
    );
}
