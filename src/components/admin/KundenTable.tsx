'use client';

import React, { useState } from 'react';
import { updateKundeProfile } from '@/app/admin/actions';
import { Pencil, Save, X, Trash2 } from 'lucide-react';

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
                <table className="w-full text-sm text-left text-slate-300" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
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
                                <React.Fragment key={k.id}>
                                <tr className="bg-[#161616] hover:bg-[#1e1e1e] transition-colors shadow-md group">
                                    <td className="px-6 py-4 border-y border-l border-[#2a2a2a] rounded-l-xl group-hover:border-[#333333]">
                                        <>
                                            <div className="font-bold text-white">{k.email}</div>
                                            <div className="text-sm text-slate-500">{k.name || '-'}</div>
                                        </>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300 border-y border-[#2a2a2a] group-hover:border-[#333333]">
                                        {new Date(k.created_at).toLocaleDateString('de-DE')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300 border-y border-[#2a2a2a] group-hover:border-[#333333]">
                                        {k.last_sign_in_at ? new Date(k.last_sign_in_at).toLocaleString('de-DE') : 'Nie'}
                                    </td>
                                    <td className="px-6 py-4 text-right border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333]">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => isEditing ? handleCancel() : handleEdit(k)} 
                                                className={`p-1.5 rounded-lg transition-colors border ${isEditing ? 'bg-[#161616] text-red-400 border-[#2a2a2a]' : 'bg-[#111111] text-slate-500 hover:text-slate-300 border-[#2a2a2a] hover:bg-[#222222]'}`}
                                                title="Bearbeiten"
                                            >
                                                {isEditing ? <X size={16} /> : <Pencil size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {isEditing && (
                                    <tr>
                                        <td colSpan={4} className="p-0 border-b border-[#2a2a2a]">
                                            <div className="bg-[#111111] p-6 border-x border-[#2a2a2a] shadow-inner">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-bold text-white flex items-center gap-2">
                                                        <Pencil size={18} className="text-blue-500" />
                                                        Kunde {k.email} bearbeiten
                                                    </h4>
                                                    <div className="flex gap-2">
                                                        <button onClick={handleCancel} disabled={saving} className="px-4 py-2 bg-[#161616] border border-[#2a2a2a] rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1e1e1e] transition-colors">Abbrechen</button>
                                                        <button onClick={() => handleSave(k.id)} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                                            <Save size={16} /> Speichern
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Profil</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                                                            <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">E-Mail</label>
                                                            <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </React.Fragment>
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
