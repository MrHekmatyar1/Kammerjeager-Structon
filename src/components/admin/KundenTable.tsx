'use client';

export default function KundenTable({ initialKunden }: { initialKunden: any[] }) {
    return (
        <div className="">
            <div className="overflow-x-auto pb-4">
                <table className="w-full text-sm text-left text-slate-600" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                    <thead className="text-xs text-slate-500 uppercase bg-transparent">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Email / Name</th>
                            <th className="px-6 py-4 font-semibold">Registriert am</th>
                            <th className="px-6 py-4 font-semibold">Letzter Login</th>
                            <th className="px-6 py-4 font-semibold text-right">ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialKunden.map(k => (
                            <tr key={k.id} className="bg-white hover:bg-slate-50 transition-colors shadow-sm group">
                                <td className="px-6 py-4 border-y border-l border-slate-200 rounded-l-xl group-hover:border-slate-300">
                                    <div className="font-bold text-slate-900">{k.email}</div>
                                    <div className="text-sm text-slate-500">{k.name || '-'}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700 border-y border-slate-200 group-hover:border-slate-300">
                                    {new Date(k.created_at).toLocaleDateString('de-DE')}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700 border-y border-slate-200 group-hover:border-slate-300">
                                    {k.last_sign_in_at ? new Date(k.last_sign_in_at).toLocaleString('de-DE') : 'Nie'}
                                </td>
                                <td className="px-6 py-4 text-right text-xs text-slate-400 font-mono border-y border-r border-slate-200 rounded-r-xl group-hover:border-slate-300">
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
