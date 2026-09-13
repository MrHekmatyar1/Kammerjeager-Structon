'use client';

import { useState } from 'react';
import { updateMasterProfile, setFreeLeads } from '../../app/admin/actions';
import { CheckCircle, XCircle, Gift, Pencil, Save, X } from 'lucide-react';

export default function MastersTable({ initialMasters }: { initialMasters: any[] }) {
    const [masters, setMasters] = useState(initialMasters);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    
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

    const handleSaveEdit = async () => {
        setSaving(true);
        try {
            await updateMasterProfile(editingId!, {
                name: editForm.name,
                firma: editForm.firma,
                telefon: editForm.telefon,
                is_active: editForm.is_active,
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
                <table className="w-full text-sm text-left text-slate-600" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                    <thead className="text-xs text-slate-500 uppercase bg-transparent">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Firma / Name</th>
                            <th className="px-6 py-4 font-semibold">Kontakt</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                            <th className="px-6 py-4 font-semibold text-center">Free Leads Bis</th>
                            <th className="px-6 py-4 font-semibold text-right">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {masters.map(m => {
                            const isEditing = editingId === m.id;
                            const hasFreeLeads = m.free_leads_until && new Date(m.free_leads_until) > new Date();

                            return (
                                <tr key={m.id} className="bg-white hover:bg-slate-50 transition-colors shadow-md group">
                                    <td className="px-6 py-4 border-y border-l border-slate-300 rounded-l-xl group-hover:border-slate-400">
                                        {isEditing ? (
                                            <div className="flex flex-col gap-2">
                                                <input 
                                                    type="text" 
                                                    value={editForm.firma || ''} 
                                                    onChange={e => setEditForm({...editForm, firma: e.target.value})}
                                                    className="border rounded px-2 py-1 text-sm w-full"
                                                    placeholder="Firma"
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
                                            <div>
                                                <div className="font-bold text-slate-900">{m.firma || '-'}</div>
                                                <div className="text-sm text-slate-500">{m.name || '-'}</div>
                                            </div>
                                        )}
                                    </td>
                                    
                                    <td className="px-6 py-4 border-y border-slate-300 group-hover:border-slate-400">
                                        {isEditing ? (
                                            <input 
                                                type="text" 
                                                value={editForm.telefon || ''} 
                                                onChange={e => setEditForm({...editForm, telefon: e.target.value})}
                                                className="border rounded px-2 py-1 text-sm w-full"
                                                placeholder="Telefon"
                                            />
                                        ) : (
                                            <div className="text-sm text-slate-700">{m.telefon || '-'}</div>
                                        )}
                                        <div className="text-xs text-slate-400 mt-1">{m.email}</div>
                                    </td>
                                    
                                    <td className="px-6 py-4 border-y border-slate-300 group-hover:border-slate-400 text-center">
                                        {isEditing ? (
                                            <label className="flex items-center justify-center gap-2 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={editForm.is_active} 
                                                    onChange={e => setEditForm({...editForm, is_active: e.target.checked})}
                                                />
                                                <span className="text-sm">Aktiv</span>
                                            </label>
                                        ) : (
                                            m.is_active ? 
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                    <CheckCircle size={14} /> Aktiv
                                                </span> 
                                            : 
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                                    <XCircle size={14} /> Inaktiv
                                                </span>
                                        )}
                                    </td>
                                    
                                    <td className="px-6 py-4 border-y border-slate-300 group-hover:border-slate-400 text-center">
                                        {hasFreeLeads ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                                <Gift size={14} /> {new Date(m.free_leads_until).toLocaleDateString('de-DE')}
                                            </span>
                                        ) : (
                                            <span className="text-slate-400 text-sm">-</span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 border-y border-r border-slate-300 rounded-r-xl group-hover:border-slate-400 text-right">
                                        {isEditing ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={handleSaveEdit} disabled={saving} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Speichern">
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={handleCancelEdit} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors" title="Abbrechen">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleOpenFreeLeads(m)} className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1">
                                                    <Gift size={14} /> Free Leads
                                                </button>
                                                <button onClick={() => handleEditClick(m)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors" title="Bearbeiten">
                                                    <Pencil size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Free Leads Modal */}
            {showFreeLeadsModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Gift className="text-blue-500" size={18} /> Free Leads für {selectedMaster?.firma || selectedMaster?.name}
                            </h3>
                            <button onClick={() => setShowFreeLeadsModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-600 mb-4">
                                Wie viele Tage sollen die Leads für diesen Partner kostenlos sein?
                            </p>
                            <select 
                                value={freeLeadsDays} 
                                onChange={e => setFreeLeadsDays(Number(e.target.value))}
                                className="w-full border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                                    className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
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
        </div>
    );
}
