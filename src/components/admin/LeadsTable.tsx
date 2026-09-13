'use client';

import React, { useState, useTransition } from 'react';
import { updateLeadStatus, assignLeadManually, updateLeadProfile, deleteLead } from '@/app/admin/actions';
import { Settings, Pencil, Save, X, Trash2 } from 'lucide-react';

export type Lead = {
    id: number;
    plz: string;
    name: string;
    firma: string | null;
    telefon: string;
    email: string;
    strasse: string | null;
    hausnummer: string | null;
    etage: string | null;
    kunde_typ: string | null;
    objekt_typ: string | null;
    flaeche: string | null;
    schaedling: string | null;
    raeume: string | null;
    befall: string | null;
    zugang: string | null;
    zugang_beschreibung: string | null;
    created_at: string;
    erstellt_am?: string; // Fallback for old local JSON
    status: string;
    master_id?: number | null;
    billing_override_type?: string | null;
    billing_override_value?: number | null;
};

export type Master = {
    id: number;
    name: string;
    firma: string | null;
    is_active: boolean;
};

// Цвета для бейджиков статуса
const STATUS_COLORS: Record<string, string> = {
    'neu': 'bg-[#161616] text-green-400 border-[#2a2a2a]',
    'in_bearbeitung': 'bg-[#161616] text-yellow-400 border-[#2a2a2a]',
    'abgeschlossen': 'bg-[#161616] text-blue-400 border-[#2a2a2a]',
    'storniert': 'bg-[#222222] text-slate-300 border-[#2a2a2a]',
};

const STATUS_LABELS: Record<string, string> = {
    'neu': 'Neu',
    'in_bearbeitung': 'In Bearbeitung',
    'abgeschlossen': 'Abgeschlossen',
    'storniert': 'Storniert',
};

export default function LeadsTable({ initialLeads, masters }: { initialLeads: Lead[], masters?: Master[] }) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    const [filter, setFilter] = useState<'all' | 'b2b' | 'privat'>('all');
    const [isPending, startTransition] = useTransition();

    // Edit state
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Lead>>({});
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (lead: Lead) => {
        setExpandedRowId(lead.id);
        setEditForm(lead);
    };

    const handleCancelEdit = () => {
        setExpandedRowId(null);
        setEditForm({});
    };

    const handleSaveEdit = async () => {
        if (!expandedRowId) return;
        setIsSaving(true);
        try {
            await updateLeadProfile(expandedRowId, editForm);
            setLeads(current => current.map(l => l.id === expandedRowId ? { ...l, ...editForm } as Lead : l));
            setExpandedRowId(null);
        } catch (e: any) {
            alert('Fehler beim Speichern: ' + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Modal state
    const [selectedLeadForAssign, setSelectedLeadForAssign] = useState<Lead | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [assignMasterId, setAssignMasterId] = useState<string>('');
    const [priceType, setPriceType] = useState<string>('default');
    const [priceValue, setPriceValue] = useState<string>('');
    const [isAssigning, setIsAssigning] = useState(false);

    const isB2BLead = (lead: Lead) =>
        lead.kunde_typ === 'B2B' ||
        lead.kunde_typ === 'Firmenkunde' ||
        lead.kunde_typ === 'Öffentlicher Sektor' ||
        Boolean(lead.firma);

    const b2bCount = leads.filter(isB2BLead).length;
    const privatCount = leads.length - b2bCount;

    const filteredLeads = leads.filter(lead => {
        if (filter === 'b2b') return isB2BLead(lead);
        if (filter === 'privat') return !isB2BLead(lead);
        return true;
    });

    const handleStatusChange = (id: number, newStatus: string) => {
        // Оптимистичное обновление UI
        setLeads(current => 
            current.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead)
        );

        // Обновление в БД
        startTransition(async () => {
            try {
                await updateLeadStatus(id, newStatus);
            } catch (error) {
                console.error(error);
                alert('Fehler beim Aktualisieren des Status.');
                // Откат в случае ошибки
                setLeads(initialLeads);
            }
        });
    };


    const handleDeleteLead = (id: number) => {
        setDeletingId(id);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;
        startTransition(async () => {
            try {
                await deleteLead(deletingId);
                setLeads(prev => prev.filter(l => l.id !== deletingId));
                setDeletingId(null);
            } catch (err) {
                console.error(err);
                alert('Fehler beim Löschen des Leads.');
            }
        });
    };
    const handleAssign = async () => {
        if (!selectedLeadForAssign || !assignMasterId) return;
        setIsAssigning(true);
        try {
            const overrideType = priceType === 'default' ? null : priceType;
            const overrideValue = (priceType === 'fixed' || priceType === 'percentage') ? parseFloat(priceValue) : null;
            
            await assignLeadManually(selectedLeadForAssign.id, parseInt(assignMasterId), overrideType, overrideValue);
            
            // Оптимистичное обновление
            setLeads(current => current.map(lead => lead.id === selectedLeadForAssign.id ? { 
                ...lead, 
                master_id: parseInt(assignMasterId), 
                status: 'neu',
                billing_override_type: overrideType,
                billing_override_value: overrideValue
            } : lead));
            
            setSelectedLeadForAssign(null);
        } catch (error) {
            console.error(error);
            alert('Fehler bei der Zuweisung.');
        } finally {
            setIsAssigning(false);
        }
    };

    if (leads.length === 0) {
        return (
            <div className="bg-[#161616] rounded-xl shadow-sm border border-[#2a2a2a] p-12 text-center">
                <p className="text-slate-500 font-medium">Noch keine Leads vorhanden.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        filter === 'all'
                            ? 'bg-slate-800 text-white'
                            : 'bg-[#161616] text-slate-300 border border-[#2a2a2a] hover:bg-[#222222]'
                    }`}
                >
                    Alle ({leads.length})
                </button>
                <button
                    type="button"
                    onClick={() => setFilter('b2b')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                        filter === 'b2b'
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#161616] text-blue-400 border border-[#2a2a2a] hover:bg-[#222222]'
                    }`}
                >
                    Gewerbe ({b2bCount})
                </button>
                <button
                    type="button"
                    onClick={() => setFilter('privat')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        filter === 'privat'
                            ? 'bg-slate-800 text-white'
                            : 'bg-[#161616] text-slate-300 border border-[#2a2a2a] hover:bg-[#222222]'
                    }`}
                >
                    Privatkunden ({privatCount})
                </button>
            </div>

            <div className="">
                {filteredLeads.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm bg-[#161616] rounded-xl shadow-sm border border-[#2a2a2a]">
                        Keine Leads in dieser Kategorie gefunden.
                    </div>
                ) : (
                    <>
                        {/* Desktop View */}
                        <div className="hidden md:block overflow-x-auto pb-4">
                            <table className="w-full text-sm text-left text-slate-300" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                                <thead className="text-xs text-slate-500 uppercase bg-transparent">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Datum</th>
                                        <th className="px-6 py-4 font-semibold">Kunde / Firma</th>
                                        <th className="px-6 py-4 font-semibold">Kontakt</th>
                                        <th className="px-6 py-4 font-semibold">Ort / PLZ</th>
                                        <th className="px-6 py-4 font-semibold">Schädling &amp; Details</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Aktionen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.map((lead) => {
                                        const b2b = isB2BLead(lead);
                                        return (
                                            <tr key={lead.id} className="bg-[#161616] hover:bg-[#1e1e1e] transition-colors shadow-md group">
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 border-y border-l border-[#2a2a2a] rounded-l-xl group-hover:border-[#333333]">
                                                    {new Date(lead.created_at || lead.erstellt_am || new Date()).toLocaleDateString('de-DE', {
                                                        day: '2-digit', month: '2-digit', year: 'numeric',
                                                        hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 border-y border-[#2a2a2a] group-hover:border-[#333333]">
                                                    {b2b ? (
                                                        <div>
                                                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#161616] text-blue-400 border border-[#2a2a2a] uppercase tracking-wider mb-1">
                                                                Gewerbe
                                                            </span>
                                                            <div className="font-bold text-white text-sm">
                                                                {lead.firma || lead.name}
                                                            </div>
                                                            <div className="text-xs text-slate-500 mt-0.5">
                                                                Ansprechpartner: {lead.name}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="font-bold text-white">{lead.name}</div>
                                                            {lead.firma && <div className="text-xs text-slate-500 mt-0.5">{lead.firma}</div>}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 border-y border-[#2a2a2a] group-hover:border-[#333333]">
                                                    <a href={`tel:${lead.telefon}`} className="font-semibold text-white hover:text-[#C8102E] transition-colors block">
                                                        {lead.telefon}
                                                    </a>
                                                    <a href={`mailto:${lead.email}`} className="text-xs text-slate-500 hover:text-white transition-colors block mt-0.5">
                                                        {lead.email}
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 border-y border-[#2a2a2a] group-hover:border-[#333333]">
                                                    <div className="font-medium text-white">
                                                        {lead.plz} {lead.strasse || ''} {lead.hausnummer || ''}
                                                    </div>
                                                    {lead.etage && <div className="text-xs text-slate-500 mt-0.5">Etage: {lead.etage}</div>}
                                                </td>
                                                <td className="px-6 py-4 border-y border-[#2a2a2a] group-hover:border-[#333333]">
                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161616] text-red-400 font-medium text-xs border border-[#2a2a2a] mb-1">
                                                        {lead.schaedling || 'Unbekannt'}
                                                    </div>
                                                    <div className="text-xs text-slate-300 font-medium">
                                                        {lead.objekt_typ ? `${lead.objekt_typ}` : (lead.kunde_typ || 'Typ unbekannt')}
                                                    </div>
                                                    {lead.zugang_beschreibung && (
                                                        <div className="text-xs text-slate-300 bg-[#111111] p-2.5 rounded-md border border-[#2a2a2a] mt-1.5 max-w-[320px] whitespace-normal break-words">
                                                            <span className="font-bold text-[10px] text-slate-500 uppercase block mb-0.5">Nachricht / Anliegen:</span>
                                                            {lead.zugang_beschreibung}
                                                        </div>
                                                    )}
                                                    {(lead.befall || lead.raeume || lead.flaeche) && (
                                                        <div className="text-xs text-slate-500 mt-1">
                                                            {lead.befall ? `${lead.befall}, ` : ''}{lead.raeume ? `${lead.raeume} Räume, ` : ''}{lead.flaeche || ''}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333]">
                                                    <div className="relative">
                                                        <select
                                                            value={lead.status}
                                                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                            disabled={isPending}
                                                            className={`appearance-none cursor-pointer border pl-3 pr-8 py-1.5 rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${STATUS_COLORS[lead.status] || STATUS_COLORS['neu']}`}
                                                        >
                                                            {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                                                <option key={val} value={val} className="bg-[#161616] text-white font-medium">
                                                                    {label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-50">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333] text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setSelectedLeadForAssign(lead)}
                                                            className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a] transition-colors"
                                                            title="Zuweisen / Bearbeiten"
                                                        >
                                                            <Settings size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLead(lead.id)}
                                                            className="p-1.5 bg-[#111111] hover:bg-red-900/30 text-slate-500 hover:text-red-500 rounded-lg transition-colors border border-[#2a2a2a]"
                                                            title="Löschen"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
                        <div className="block md:hidden flex flex-col gap-4 pb-4">
                            {filteredLeads.map((lead) => {
                                const b2b = isB2BLead(lead);
                                return (
                                    <div key={`mob-${lead.id}`} className="bg-[#161616] rounded-xl shadow-sm border border-[#2a2a2a] p-4 sm:p-5 flex flex-col gap-4">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                {b2b && (
                                                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#161616] text-blue-400 border border-[#2a2a2a] uppercase tracking-wider mb-1">
                                                        Gewerbe
                                                    </span>
                                                )}
                                                <div className="font-bold text-white text-base">{lead.firma || lead.name}</div>
                                                {b2b && lead.firma && (
                                                    <div className="text-xs text-slate-500 mt-0.5">Ansprechpartner: {lead.name}</div>
                                                )}
                                                {!b2b && lead.firma && (
                                                    <div className="text-sm text-slate-500 mt-0.5">{lead.firma}</div>
                                                )}
                                            </div>
                                            <div className="text-right text-xs text-slate-500 font-medium whitespace-nowrap">
                                                {new Date(lead.created_at || lead.erstellt_am || new Date()).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}<br/>
                                                {new Date(lead.created_at || lead.erstellt_am || new Date()).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-sm bg-[#111111] p-3 rounded-lg border border-[#2a2a2a]">
                                            <div>
                                                <span className="text-slate-500 text-xs block mb-0.5">Kontakt</span>
                                                <a href={`tel:${lead.telefon}`} className="font-semibold text-slate-300 hover:text-[#C8102E] block">
                                                    {lead.telefon}
                                                </a>
                                                <a href={`mailto:${lead.email}`} className="text-slate-500 text-xs break-all hover:text-white block mt-0.5">
                                                    {lead.email}
                                                </a>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 text-xs block mb-0.5">Ort / PLZ</span>
                                                <span className="font-semibold text-slate-300">{lead.plz} {lead.strasse || ''} {lead.hausnummer || ''}</span>
                                                {lead.etage && <span className="text-slate-500 text-xs block mt-0.5">Etage: {lead.etage}</span>}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-slate-500 text-xs block mb-1.5">Problem &amp; Details</span>
                                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#161616] text-red-400 font-medium text-xs border border-[#2a2a2a]">
                                                    {lead.schaedling || 'Unbekannt'}
                                                </div>
                                                <span className="text-xs text-slate-300 font-medium bg-[#222222] px-2 py-0.5 rounded border border-[#2a2a2a]">
                                                    {lead.objekt_typ ? `${lead.objekt_typ}` : (lead.kunde_typ || 'Typ unbekannt')}
                                                </span>
                                            </div>
                                            {lead.zugang_beschreibung && (
                                                <div className="text-xs text-slate-300 bg-[#161616] rounded p-2.5 border border-[#2a2a2a] mt-2">
                                                    <span className="font-bold text-[10px] text-slate-500 uppercase block mb-0.5">Nachricht / Anliegen:</span>
                                                    {lead.zugang_beschreibung}
                                                </div>
                                            )}
                                            {(lead.befall || lead.raeume || lead.flaeche) && (
                                                <div className="text-xs text-slate-500 leading-relaxed bg-[#161616] rounded p-2 border border-[#2a2a2a] italic mt-1.5">
                                                    {lead.befall ? `${lead.befall}, ` : ''}{lead.raeume ? `${lead.raeume} Räume, ` : ''}{lead.flaeche || ''}
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
                                            <span className="text-slate-500 text-sm font-medium">Status:</span>
                                            <div className="relative">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                    disabled={isPending}
                                                    className={`appearance-none cursor-pointer border pl-3 pr-8 py-1.5 rounded-full text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${STATUS_COLORS[lead.status] || STATUS_COLORS['neu']}`}
                                                >
                                                    {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                                        <option key={val} value={val} className="bg-[#161616] text-white font-medium">
                                                            {label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-50">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setSelectedLeadForAssign(lead)}
                                                className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a] transition-colors"
                                                title="Zuweisen / Bearbeiten"
                                            >
                                                <Settings size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLead(lead.id)}
                                                className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-red-500/70 hover:text-red-500 hover:bg-[#1a1111] transition-colors"
                                                title="Löschen"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Modal for Manual Assignment */}
            {selectedLeadForAssign && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100dvh', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px', boxSizing: 'border-box', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: '#161616', width: '100%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', border: '1px solid #2a2a2a' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>Lead manuell zuweisen</h2>
                            <button onClick={() => setSelectedLeadForAssign(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#64748b', lineHeight: 1, padding: '4px' }} className="hover:text-white transition-colors">×</button>
                        </div>
                        <div style={{ padding: '20px 24px' }}>
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Partner auswählen</label>
                                <select 
                                    value={assignMasterId} 
                                    onChange={(e) => setAssignMasterId(e.target.value)}
                                    className="w-full bg-[#111111] text-white border border-[#2a2a2a] rounded-lg p-2.5 pr-10 text-sm font-medium focus:ring-2 focus:ring-slate-600 focus:outline-none appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]"
                                >
                                    <option value="" className="text-slate-400">-- Bitte wählen --</option>
                                    {masters?.filter(m => m.is_active).map(m => (
                                        <option key={m.id} value={m.id} className="text-white">
                                            {m.name} {m.firma ? `(${m.firma})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Abrechnungsmodell für diesen Lead</label>
                                <select 
                                    value={priceType} 
                                    onChange={(e) => {
                                        setPriceType(e.target.value);
                                        if (e.target.value === 'free' || e.target.value === 'default') setPriceValue('');
                                    }}
                                    className="w-full bg-[#111111] text-white border border-[#2a2a2a] rounded-lg p-2.5 pr-10 text-sm font-medium focus:ring-2 focus:ring-slate-600 focus:outline-none appearance-none bg-no-repeat bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]"
                                >
                                    <option value="default">Standard (laut Schädling/Vertrag)</option>
                                    <option value="free">Kostenlos (0 €)</option>
                                    <option value="fixed">Eigener Fixpreis (€)</option>
                                    <option value="percentage">Eigene Provision (%)</option>
                                </select>
                            </div>

                            {(priceType === 'fixed' || priceType === 'percentage') && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Betrag ({priceType === 'fixed' ? '€' : '%'})
                                    </label>
                                    <input 
                                        type="number" 
                                        value={priceValue}
                                        onChange={(e) => setPriceValue(e.target.value)}
                                        placeholder={priceType === 'fixed' ? 'z.B. 25' : 'z.B. 15'}
                                        className="w-full bg-[#111111] text-white border border-[#2a2a2a] rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-slate-600 focus:outline-none placeholder:text-slate-500"
                                    />
                                </div>
                            )}
                            
                            <div className="flex gap-3 justify-end mt-8">
                                <button
                                    onClick={() => setSelectedLeadForAssign(null)}
                                    className="px-5 py-2.5 rounded-lg font-bold text-sm bg-[#161616] border border-[#2a2a2a] text-slate-300 hover:bg-[#1e1e1e] transition-colors"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    onClick={handleAssign}
                                    disabled={!assignMasterId || isAssigning || ((priceType === 'fixed' || priceType === 'percentage') && !priceValue)}
                                    className="px-5 py-2.5 rounded-lg font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {isAssigning ? 'Weist zu...' : 'Jetzt zuweisen'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingId && (
                <div className="fixed inset-0 z-[1000] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#161616] rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-[#2a2a2a]">
                        <div className="p-5 border-b border-[#2a2a2a] flex justify-between items-center bg-[#111111]">
                            <h3 className="font-bold text-white">Löschen bestätigen</h3>
                            <button onClick={() => setDeletingId(null)} className="text-slate-500 hover:text-slate-300">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-300 mb-6">
                                Möchten Sie diesen Lead wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
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
                                    disabled={isPending}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                                >
                                    {isPending ? 'Lösche...' : 'Unwiderruflich löschen'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
