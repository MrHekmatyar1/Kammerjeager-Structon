'use client';

export default function KundenTable({ initialKunden }: { initialKunden: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Email / Name</th>
                            <th className="px-6 py-4 font-semibold">Registriert am</th>
                            <th className="px-6 py-4 font-semibold">Letzter Login</th>
                            <th className="px-6 py-4 font-semibold text-right">ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {initialKunden.map(k => (
                            <tr key={k.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{k.email}</div>
                                    <div className="text-sm text-slate-500">{k.name || '-'}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {new Date(k.created_at).toLocaleDateString('de-DE')}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {k.last_sign_in_at ? new Date(k.last_sign_in_at).toLocaleString('de-DE') : 'Nie'}
                                </td>
                                <td className="px-6 py-4 text-right text-xs text-slate-400 font-mono">
                                    {k.id.substring(0, 8)}...
                                </td>
                            </tr>
                        ))}
                        {initialKunden.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    Keine Kunden gefunden.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
