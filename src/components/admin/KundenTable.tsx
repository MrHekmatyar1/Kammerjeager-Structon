'use client';

import React, { useState } from 'react';
import { updateKundeProfile, deleteKunde } from '@/app/admin/actions';
import { Pencil, Save, X, Trash2 } from 'lucide-react';

export default function KundenTable({ initialKunden }: { initialKunden: any[] }) {
    const [kunden, setKunden] = useState(initialKunden);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{name?: string, email?: string, password?: string, telefon?: string, firma?: string}>({});
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const handleEdit = (k: any) => {
        setEditingId(k.id);
        setEditForm({ name: k.name, email: k.email, telefon: k.telefon, firma: k.firma });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleDeleteKunde = (id: string) => {
        setDeletingId(id);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;
        setSaving(true);
        try {
            await deleteKunde(deletingId);
            setKunden(prev => prev.filter(k => k.id !== deletingId));
            setDeletingId(null);
        } catch (err: any) {
            console.error(err);
            alert('Fehler beim Löschen des Kunden.');
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async (id: string) => {
        setSaving(true);
        try {
            await updateKundeProfile(id, editForm);
            
            // Update local state
            setKunden(kunden.map(k => {
                if (k.id === id) {
                    return { ...k, name: editForm.name, email: editForm.email, telefon: editForm.telefon, firma: editForm.firma };
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
                                            <div className="font-bold text-[#64748b]">{k.email}</div>
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
                                                    className={`p-1.5 rounded-lg transition-colors border ${isEditing ? 'bg-[#161616] text-red-400 border-[#2a2a2a]' : 'bg-[#111111] text-slate-500 hover:text-slate-300 border-[#2a2a2a] hover:bg-[#1a1a1a]'}`}
                                                    title="Bearbeiten"
                                                >
                                                    {isEditing ? <X size={16} /> : <Pencil size={16} />}
                                                </button>
                                            {!isEditing && (
                                                <button
                                                    onClick={() => handleDeleteKunde(k.id)}
                                                    className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-red-500/70 hover:text-red-500 hover:bg-[#1a1111] transition-colors"
                                                    title="Löschen"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
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
                                                            <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-[#161616] border border-[#2a2a2a] text-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">E-Mail</label>
                                                            <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full bg-[#161616] border border-[#2a2a2a] text-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Passwort (optional)</label>
                                                            <input type="password" placeholder="Neues Passwort..." value={editForm.password || ''} onChange={e => setEditForm({...editForm, password: e.target.value})} className="w-full bg-[#161616] border border-[#2a2a2a] text-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                            <p className="text-[10px] text-slate-500 mt-1">Nur ausfüllen, um das Passwort zu ändern.</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Kontaktdaten (Optional)</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Telefon</label>
                                                            <input type="text" value={editForm.telefon || ''} onChange={e => setEditForm({...editForm, telefon: e.target.value})} className="w-full bg-[#161616] border border-[#2a2a2a] text-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Firma</label>
                                                            <input type="text" value={editForm.firma || ''} onChange={e => setEditForm({...editForm, firma: e.target.value})} className="w-full bg-[#161616] border border-[#2a2a2a] text-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
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

            {/* Delete Confirmation Modal */}
            {deletingId && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#161616] rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-[#2a2a2a]">
                        <div className="p-5 border-b border-[#2a2a2a] flex justify-between items-center bg-[#111111]">
                            <h3 className="font-bold text-white">Löschen bestätigen</h3>
                            <button onClick={() => setDeletingId(null)} className="text-slate-500 hover:text-slate-300">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-300 mb-6">
                                Möchten Sie diesen Kunden wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                            </p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setDeletingId(null)}
                                    className="flex-1 px-4 py-2 bg-[#222222] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-slate-300 rounded-lg font-semibold transition-colors"
                                >
                                    Abbrechen
                                </button>
                                <button 
                                    onClick={confirmDelete}
                                    disabled={saving}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Lösche...' : 'Unwiderruflich löschen'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
