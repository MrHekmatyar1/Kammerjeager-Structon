'use client';

import { useState } from 'react';
import { updateKundeProfile } from '@/app/admin/actions';
import { Pencil, Save, X } from 'lucide-react';

export default function KundenTable({ initialKunden }: { initialKunden: any[] }) {
    const [kunden, setKunden] = useState(initialKunden);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{name?: string, email?: string}>({});
    const [saving, setSaving] = useState(false);

    const handleEdit = (k: any) => {
        setEditingId(k.id);
        setEditForm({ name: k.name, email: k.email });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async (id: string) => {
        setSaving(true);
        try {
            await updateKundeProfile(id, editForm);
            
            // Update local state
            setKunden(kunden.map(k => {
                if (k.id === id) {
                    return { ...k, name: editForm.name, email: editForm.email };
                }
                return k;
            }));
            
            setEditingId(null);
        } catch (e: any) {
            alert('Fehler beim Speichern des Kunden: ' + e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="">
            <div className="overflow-x-auto pb-4">
                <table className="w-full text-sm text-left text-slate-600" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                    <thead className="text-xs text-slate-500 uppercase bg-transparent">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Email / Name</th>
                            <th className="px-6 py-4 font-semibold">Registriert am</th>
                            <th className="px-6 py-4 font-semibold">Letzter Login</th>
                            <th className="px-6 py-4 font-semibold text-right">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kunden.map(k => {
                            const isEditing = editingId === k.id;
                            
                            return (
                                <tr key={k.id} className="bg-white hover:bg-slate-50 transition-colors shadow-md group">
                                    <td className="px-6 py-4 border-y border-l border-slate-300 rounded-l-xl group-hover:border-slate-400">
                                        {isEditing ? (
                                            <div className="flex flex-col gap-2">
                                                <input 
                                                    type="email" 
                                                    value={editForm.email || ''} 
                                                    onChange={e => setEditForm({...editForm, email: e.target.value})}
                                                    className="border rounded px-2 py-1 text-sm w-full"
                                                    placeholder="Email"
                                                />
                                                <input 
                                                    type="text" 
                                                    value={editForm.name || ''} 
                                                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                                                    className="border rounded px-2 py-1 text-sm w-full"
                                                    placeholder="Name"
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="font-bold text-slate-900">{k.email}</div>
                                                <div className="text-sm text-slate-500">{k.name || '-'}</div>
                                            </>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700 border-y border-slate-300 group-hover:border-slate-400">
                                        {new Date(k.created_at).toLocaleDateString('de-DE')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700 border-y border-slate-300 group-hover:border-slate-400">
                                        {k.last_sign_in_at ? new Date(k.last_sign_in_at).toLocaleString('de-DE') : 'Nie'}
                                    </td>
                                    <td className="px-6 py-4 text-right border-y border-r border-slate-300 rounded-r-xl group-hover:border-slate-400">
                                        {isEditing ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleSave(k.id)} disabled={saving} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Speichern">
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={handleCancel} disabled={saving} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Abbrechen">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                                <button onClick={() => handleEdit(k)} className="p-2 hover:text-[#C8102E] hover:bg-red-50 rounded-full transition-colors" title="Bearbeiten">
                                                    <Pencil size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {kunden.length === 0 && (
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
