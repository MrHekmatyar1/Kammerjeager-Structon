'use client';

import React, { useState } from 'react';
import { updateMasterProfile, deleteMaster, setFreeLeads } from '@/app/admin/actions';
import { CheckCircle, XCircle, Gift, Pencil, Save, X, Trash2 } from 'lucide-react';

export default function MastersTable({ initialMasters }: { initialMasters: any[] }) {
    const [masters, setMasters] = useState(initialMasters);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [deletingId, setDeletingId] = useState<number | null>(null);
    
    // Modal state for free leads
    const [showFreeLeadsModal, setShowFreeLeadsModal] = useState(false);
    const [selectedMaster, setSelectedMaster] = useState<any>(null);
    const [freeLeadsDays, setFreeLeadsDays] = useState(7);
    const [saving, setSaving] = useState(false);

    const handleEditClick = (m: any) => {
        setEditingId(m.id);
        setEditForm({ ...m });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleDeleteMaster = (id: number) => {
        setDeletingId(id);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;
        setSaving(true);
        try {
            await deleteMaster(deletingId);
            setMasters(prev => prev.filter(m => m.id !== deletingId));
            setDeletingId(null);
        } catch (err) {
            console.error(err);
            alert('Fehler beim Löschen des Meisters.');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveEdit = async () => {
        setSaving(true);
        try {
            await updateMasterProfile(editingId!, {
                name: editForm.name,
                firma: editForm.firma,
                phone: editForm.phone || editForm.telefon, // handle both formats
                email: editForm.email,
                is_active: editForm.is_active,
                telegram_chat_id: editForm.telegram_chat_id,
                billing_model: editForm.billing_model,
                plz_bereiche: editForm.plz_bereiche,
                pests_handled: editForm.pests_handled,
            });
            setMasters(prev => prev.map(m => m.id === editingId ? { ...m, ...editForm } : m));
            setEditingId(null);
        } catch (err) {
            alert('Fehler beim Speichern.');
        } finally {
            setSaving(false);
        }
    };

    const handleOpenFreeLeads = (m: any) => {
        setSelectedMaster(m);
        setFreeLeadsDays(7);
        setShowFreeLeadsModal(true);
    };

    const handleSaveFreeLeads = async () => {
        setSaving(true);
        try {
            await setFreeLeads(selectedMaster.id, freeLeadsDays);
            
            // Calculate new date for UI update
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + freeLeadsDays);
            const isoDate = newDate.toISOString();
            
            setMasters(prev => prev.map(m => m.id === selectedMaster.id ? { ...m, free_leads_until: isoDate } : m));
            setShowFreeLeadsModal(false);
        } catch (err) {
            alert('Fehler beim Speichern der kostenlosen Leads.');
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
                            <th className="px-5 py-3 font-semibold">Firma / Name</th>
                            <th className="px-5 py-3 font-semibold">Kontakt</th>
                            <th className="px-5 py-3 font-semibold text-center">Status</th>
                            <th className="px-5 py-3 font-semibold text-center">Free Leads Bis</th>
                            <th className="px-5 py-3 font-semibold text-right">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {masters.map(m => {
                            const isEditing = editingId === m.id;
                            const hasFreeLeads = m.free_leads_until && new Date(m.free_leads_until) > new Date();

                            return (
                                <React.Fragment key={m.id}>
                                <tr className="bg-[#161616] hover:bg-[#1e1e1e] transition-colors shadow-md group">
                                    <td className="px-5 py-3 border-y border-l border-[#2a2a2a] rounded-l-xl group-hover:border-[#333333]">
                                        <div>
                                            <div className="font-bold text-white">{m.firma || '-'}</div>
                                            <div className="text-sm text-slate-500">{m.name || '-'}</div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-5 py-3 border-y border-[#2a2a2a] group-hover:border-[#333333]">
                                        <div className="text-sm text-slate-300">{m.telefon || '-'}</div>
                                        <div className="text-xs text-slate-500 mt-1">{m.email}</div>
                                    </td>
                                    
                                    <td className="px-5 py-3 border-y border-[#2a2a2a] group-hover:border-[#333333] text-center">
                                        {m.is_active ? 
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#161616] text-green-400 border border-[#2a2a2a]">
                                                    <CheckCircle size={14} /> Aktiv
                                                </span> 
                                            : 
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#222222] text-slate-300">
                                                    <XCircle size={14} /> Inaktiv
                                                </span>
                                        }
                                    </td>
                                    
                                    <td className="px-5 py-3 border-y border-[#2a2a2a] group-hover:border-[#333333] text-center">
                                        {hasFreeLeads ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#161616] text-blue-400 border border-[#2a2a2a]">
                                                <Gift size={14} /> {new Date(m.free_leads_until).toLocaleDateString('de-DE')}
                                            </span>
                                        ) : (
                                            <span className="text-slate-500">-</span>
                                        )}
                                    </td>

                                    <td className="px-5 py-3 border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333] text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => isEditing ? handleCancelEdit() : handleEditClick(m)} 
                                                    className={`p-1.5 rounded-lg transition-colors border ${isEditing ? 'bg-[#161616] text-red-400 border-[#2a2a2a]' : 'bg-[#111111] text-slate-500 hover:text-slate-300 border-[#2a2a2a] hover:bg-[#1a1a1a]'}`}
                                                    title="Bearbeiten"
                                                >
                                                    {isEditing ? <X size={16} /> : <Pencil size={16} />}
                                                </button>
                                                {!isEditing && (
                                                    <button
                                                        onClick={() => handleDeleteMaster(m.id)}
                                                        className="p-1.5 rounded-lg transition-colors border bg-[#111111] text-slate-500 hover:text-red-500 hover:bg-[#1a1111] border-[#2a2a2a]"
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
                                        <td colSpan={5} className="p-0 border-b border-[#2a2a2a]">
                                            <div className="bg-[#111111] p-6 border-x border-[#2a2a2a] shadow-inner">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-bold text-white flex items-center gap-2">
                                                        <Pencil size={18} className="text-blue-500" />
                                                        Meister #{m.id} bearbeiten
                                                    </h4>
                                                    <div className="flex items-center gap-4">
                                                        <button 
                                                            onClick={() => handleOpenFreeLeads(m)}
                                                            className="flex items-center gap-2 px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-[#161616] text-sm font-medium rounded-md border border-[#2a2a2a] transition-colors"
                                                        >
                                                            <Gift size={14} /> Free Leads
                                                        </button>
                                                        <div className="w-px h-6 bg-[#2a2a2a]"></div>
                                                        <div className="flex gap-2">
                                                            <button onClick={handleCancelEdit} disabled={saving} className="px-4 py-2 bg-[#161616] border border-[#2a2a2a] rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1e1e1e] transition-colors">Abbrechen</button>
                                                            <button onClick={handleSaveEdit} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                                                <Save size={16} /> Speichern
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Allgemein</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                                                            <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Firma</label>
                                                            <input type="text" value={editForm.firma || ''} onChange={e => setEditForm({...editForm, firma: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="flex items-center gap-2 cursor-pointer mt-4">
                                                                <input type="checkbox" checked={editForm.is_active || false} onChange={e => setEditForm({...editForm, is_active: e.target.checked})} className="w-4 h-4 text-blue-600 border-[#2a2a2a] rounded focus:ring-red-500" />
                                                                <span className="text-sm font-medium text-slate-300">Account ist aktiv</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Kontakt</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">E-Mail</label>
                                                            <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Telefon / Phone</label>
                                                            <input type="text" value={editForm.phone || editForm.telefon || ''} onChange={e => setEditForm({...editForm, phone: e.target.value, telefon: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Telegram Chat ID</label>
                                                            <input type="text" value={editForm.telegram_chat_id || ''} onChange={e => setEditForm({...editForm, telegram_chat_id: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Einstellungen</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Abrechnungsmodell (Billing)</label>
                                                            <select value={editForm.billing_model || 'pay_per_lead'} onChange={e => setEditForm({...editForm, billing_model: e.target.value})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none">
                                                                <option value="pay_per_lead">Pay Per Lead</option>
                                                                <option value="commission">Commission</option>
                                                                <option value="flat_rate">Flat Rate</option>
                                                                <option value="percentage">Percentage</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">PLZ Bereiche (durch Komma getrennt)</label>
                                                            <input type="text" value={Array.isArray(editForm.plz_bereiche) ? editForm.plz_bereiche.join(', ') : (editForm.plz_bereiche || '')} onChange={e => setEditForm({...editForm, plz_bereiche: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="10115, 10117" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-300 mb-1">Schädlinge (durch Komma getrennt)</label>
                                                            <input type="text" value={Array.isArray(editForm.pests_handled) ? editForm.pests_handled.join(', ') : (editForm.pests_handled || '')} onChange={e => setEditForm({...editForm, pests_handled: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} className="w-full border border-[#2a2a2a] rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Mäuse & Ratten, Wespen" />
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
                    </tbody>
                </table>
            </div>

            {/* Free Leads Modal */}
            {showFreeLeadsModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#161616] rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-5 border-b border-[#2a2a2a] flex justify-between items-center bg-[#111111]">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Gift className="text-blue-500" size={18} /> Free Leads für {selectedMaster?.firma || selectedMaster?.name}
                            </h3>
                            <button onClick={() => setShowFreeLeadsModal(false)} className="text-slate-500 hover:text-slate-300">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-300 mb-4">
                                Wie viele Tage sollen die Leads für diesen Partner kostenlos sein?
                            </p>
                            <select 
                                value={freeLeadsDays} 
                                onChange={e => setFreeLeadsDays(Number(e.target.value))}
                                className="w-full border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-red-500"
                            >
                                <option value={3}>3 Tage</option>
                                <option value={7}>7 Tage</option>
                                <option value={14}>14 Tage</option>
                                <option value={30}>30 Tage</option>
                                <option value={0}>Entfernen (0 Tage)</option>
                            </select>
                            
                            <div className="mt-6 flex gap-3">
                                <button 
                                    onClick={() => setShowFreeLeadsModal(false)}
                                    className="flex-1 px-4 py-2 bg-[#222222] hover:bg-[#2a2a2a] text-slate-300 rounded-lg font-semibold transition-colors"
                                >
                                    Abbrechen
                                </button>
                                <button 
                                    onClick={handleSaveFreeLeads}
                                    disabled={saving}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Speichern...' : 'Bestätigen'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                            <p className="text-sm text-slate-200 mb-6 text-center">
                                Möchten Sie diesen Meister wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                            </p>
                            <div className="flex justify-center gap-3">
                                <button 
                                    onClick={() => setDeletingId(null)}
                                    className="px-3 py-1.5 bg-[#222222] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-slate-300 rounded-md text-sm font-medium transition-colors"
                                >
                                    Abbrechen
                                </button>
                                <button 
                                    onClick={confirmDelete}
                                    disabled={saving}
                                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
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
