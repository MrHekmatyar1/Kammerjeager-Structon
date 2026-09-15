'use client';

// ==========================================
// [DE] PARTNER DASHBOARD — Marktplatz
// Zeigt neue (zugewiesene) Leads, die noch nicht angenommen wurden.
// Echte Daten aus Supabase via /api/partner/leads
// ==========================================

import { useEffect, useState, useCallback } from 'react';
import { getLeadPricing } from '@/lib/pricing';

interface Lead {
    id: number;
    plz: string;
    strasse?: string;
    hausnummer?: string;
    schaedling: string | null;
    kunde_typ: string | null;
    objekt_typ: string | null;
    befall: string | null;
    raeume: string | null;
    flaeche: string | null;
    zugang: string | null;
    zugang_beschreibung: string | null;
    created_at: string;
    status: string;
    billing_override_type?: string | null;
    billing_override_value?: number | null;
}

// Время с момента создания в читаемом формате
function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Gerade eben';
    if (mins < 60) return `Vor ${mins} Min.`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Vor ${hours} Std.`;
    return `Vor ${Math.floor(hours / 24)} Tag(en)`;
}

// Urgency: чем свежее — тем краснее
function getUrgencyColor(dateStr: string): string {
    const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (mins < 30) return '#C8102E';
    if (mins < 120) return '#f97316';
    return '#64748b';
}

// Removed local getLeadPricing

export default function DashboardMarketplace() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [billingModel, setBillingModel] = useState<string>('commission');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const loadLeads = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const res = await fetch('/api/partner/leads?status=neu,unassigned');
            if (!res.ok) {
                const d = await res.json();
                if (res.status === 401) {
                    setLeads([]);
                    return;
                }
                setError(d.error || 'Fehler beim Laden.');
                return;
            }
            const { leads: data, master } = await res.json();
            setLeads(data || []);
            if (master?.billing_model) {
                setBillingModel(master.billing_model);
            }
        } catch {
            setError('Netzwerkfehler. Bitte Seite neu laden.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadLeads(); }, [loadLeads]);

    // Синхронизируем data-modal-open на body чтобы layout мог скрывать стрелку, и блокируем фоновый скролл
    useEffect(() => {
        if (selectedLead) {
            document.body.setAttribute('data-modal-open', '1');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.removeAttribute('data-modal-open');
            document.body.style.overflow = '';
        }
        return () => {
            document.body.removeAttribute('data-modal-open');
            document.body.style.overflow = '';
        };
    }, [selectedLead]);

    const handleAccept = async () => {
        if (!selectedLead || !agreed) return;
        setActionLoading(true);
        try {
            const res = await fetch('/api/leads/accept', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId: selectedLead.id }),
            });
            const data = await res.json();
            if (!res.ok) { alert(data.error || 'Fehler beim Annehmen.'); return; }

            // Убираем из списка
            setLeads(prev => prev.filter(l => l.id !== selectedLead.id));
            setSelectedLead(null);
            setAgreed(false);
            alert('Auftrag erfolgreich angenommen! Sie finden ihn unter "Meine Aufträge".');
        } catch {
            alert('Netzwerkfehler. Bitte versuchen Sie es erneut.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedLead) return;
        setActionLoading(true);
        try {
            const res = await fetch('/api/leads/reject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId: selectedLead.id, reason: rejectReason }),
            });
            const data = await res.json();
            if (!res.ok) { alert(data.error || 'Fehler beim Ablehnen.'); return; }

            setLeads(prev => prev.filter(l => l.id !== selectedLead.id));
            setSelectedLead(null);
            setShowRejectModal(false);
            setRejectReason('');
        } catch {
            alert('Netzwerkfehler.');
        } finally {
            setActionLoading(false);
        }
    };

    // ─── Loading State ─────────────────────────────────────────────────────
    if (loading) return (
        <div>
            <h1 className="font-heading text-[2.5rem] font-black uppercase mb-[8px] text-slate-900 dark:text-white leading-none">
                Neue Aufträge
            </h1>
            <p className="text-slate-500 dark:text-slate-300 text-[15px] mb-[32px]">Lädt Aufträge<span className="loading-dots"><span></span><span></span><span></span></span></p>
            <div className="grid gap-[16px]">
                {[1, 2].map(i => (
                    <div key={i} className="animate-pulse bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] p-[24px] h-[100px]">
                        <div className="bg-slate-200 dark:bg-[#2a2a2a] h-[16px] w-[60%] rounded-[4px] mb-[12px]" />
                        <div className="bg-slate-200 dark:bg-[#2a2a2a] h-[12px] w-[40%] rounded-[4px]" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-start mb-[32px] flex-wrap gap-[12px]">
                <div>
                    <h1 className="font-heading text-[2.5rem] font-black uppercase mb-[8px] text-slate-900 dark:text-white leading-none">
                        Neue Aufträge
                    </h1>
                    <p className="text-slate-500 dark:text-white text-[15px] m-0">
                        Verfügbare Aufträge in Ihrem Einsatzgebiet.
                    </p>
                </div>
                <div className="flex items-center gap-[12px]">
                    {leads.length > 0 && (
                        <span className="bg-[#C8102E] border-none text-white text-[13px] font-bold py-[5px] px-[13px] rounded-[20px]">
                            {leads.length} Neu
                        </span>
                    )}
                    <button
                        onClick={loadLeads}
                        className="bg-slate-600 dark:bg-slate-700 text-white border border-transparent hover:bg-slate-100 dark:hover:bg-[#2a2a2a] hover:text-slate-600 dark:hover:text-white px-[17px] py-[9px] rounded-lg text-[13px] font-semibold transition-colors"
                    >
                        ↻ Aktualisieren
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-[16px] py-[12px] rounded-[8px] mb-[24px] text-[14px]">
                    {error}
                </div>
            )}

            {/* Empty state */}
            {!error && leads.length === 0 && (
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[16px] px-[32px] py-[64px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <h3 className="font-heading text-[22px] font-black uppercase text-slate-900 dark:text-white mb-[8px]">
                        Keine neuen Aufträge
                    </h3>
                    <p className="text-slate-500 dark:text-white text-[14px] m-0">
                        Aktuell liegen keine neuen Aufträge in Ihrem Einsatzgebiet vor.<br />
                        Sie werden per E-Mail & Telegram benachrichtigt, sobald ein neuer Auftrag eingeht.
                    </p>
                </div>
            )}

            {/* Lead cards */}
            <div className="grid gap-[16px]">
                {leads.map(lead => (
                    <div key={lead.id} className="bg-white dark:bg-[#111111] border border-slate-400 dark:border-[#2a2a2a] rounded-[12px] p-[20px] flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-shadow flex-wrap gap-[16px]">
                        <div className="flex-1 min-w-[220px]">
                            <div className="flex items-center gap-[8px] mb-[6px] flex-wrap">
                                <span className="bg-[#C8102E] text-white text-[11px] font-bold py-[3px] px-[9px] rounded-[4px] uppercase tracking-[0.05em]">Neu</span>
                                <span className="text-[12px] font-semibold" style={{ color: getUrgencyColor(lead.created_at) }}>
                                    {timeAgo(lead.created_at)}
                                </span>
                                {lead.kunde_typ && (
                                    <span className="bg-slate-600 text-white text-[11px] font-semibold py-[3px] px-[9px] rounded-[4px]">
                                        {lead.kunde_typ}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-[18px] font-bold text-slate-900 dark:text-white mb-[4px]">
                                {lead.schaedling || 'Schädling unbekannt'} · {lead.plz}
                            </h3>
                            <div className="text-slate-500 dark:text-slate-300 text-[13px] flex gap-[8px] flex-wrap items-center">
                                {lead.objekt_typ && <span>{lead.objekt_typ}</span>}
                                {lead.objekt_typ && lead.raeume && <span>·</span>}
                                {lead.raeume && <span>{lead.raeume} Räume</span>}
                                {(lead.objekt_typ || lead.raeume) && lead.befall && <span>·</span>}
                                {lead.befall && <span>{lead.befall}</span>}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                                {getLeadPricing(lead.schaedling, billingModel, lead.billing_override_type, lead.billing_override_value).label}: <strong>{getLeadPricing(lead.schaedling, billingModel, lead.billing_override_type, lead.billing_override_value).value}</strong>
                            </div>
                            <button
                                onClick={() => { setSelectedLead(lead); setAgreed(false); setShowRejectModal(false); }}
                                className="bg-slate-900 text-white border border-transparent hover:bg-white hover:text-slate-900 hover:border-slate-900 px-[22px] py-[10px] rounded-lg text-[14px] font-semibold transition-colors whitespace-nowrap"
                            >
                                Auftrag ansehen →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Modal: Lead Detail / Accept ──────────────────────────────── */}
            {selectedLead && !showRejectModal && (
                <div className="fixed top-[68px] inset-x-0 bottom-0 h-[calc(100dvh-68px)] bg-slate-900/30 dark:bg-black/50 flex items-start justify-center z-[1000] px-[16px] pt-[12px] pb-[36px] box-border backdrop-blur-sm">
                    <div className="no-scrollbar bg-white dark:bg-[#111111] w-full max-w-[540px] rounded-[16px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.25)] max-h-[calc(100dvh-68px-48px)] overflow-y-auto border border-transparent dark:border-[#2a2a2a]">

                        {/* Modal Header */}
                        <div className="px-[20px] py-[16px] border-b border-slate-200 dark:border-[#2a2a2a] flex justify-between items-center bg-white dark:bg-[#111111]">
                            <div>
                                <h2 className="text-[18px] font-extrabold text-slate-900 dark:text-white m-0">Auftragsdetails</h2>
                                <p className="text-slate-500 dark:text-slate-300 text-[13px] mt-[4px] mb-0">
                                    {selectedLead.schaedling} · PLZ {selectedLead.plz} · {timeAgo(selectedLead.created_at)}
                                </p>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="bg-transparent border-none text-[24px] cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 leading-none p-[4px]">×</button>
                        </div>

                        {/* Lead Details */}
                        <div className="px-[20px] py-[16px] bg-slate-50 dark:bg-[#161616] border-b border-slate-200 dark:border-[#2a2a2a]">
                            <div className="grid grid-cols-2 gap-[10px]">
                                {[
                                    { label: 'Schädling', value: selectedLead.schaedling },
                                    { label: 'PLZ', value: selectedLead.plz },
                                    { label: 'Kundentyp', value: selectedLead.kunde_typ },
                                    { label: 'Objekt', value: selectedLead.objekt_typ },
                                    { label: 'Befall', value: selectedLead.befall },
                                    { label: 'Räume', value: selectedLead.raeume },
                                    { label: 'Fläche', value: selectedLead.flaeche },
                                    { label: 'Zugang', value: selectedLead.zugang },
                                ].filter(f => f.value).map(f => (
                                    <div key={f.label} className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[8px] px-[12px] py-[9px]">
                                        <div className="text-[11px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-[0.05em] mb-[2px]">{f.label}</div>
                                        <div className="text-[14px] text-slate-900 dark:text-slate-300 font-semibold">{f.value}</div>
                                    </div>
                                ))}
                            </div>
                            {selectedLead.zugang_beschreibung && (
                                <div className="mt-[10px] bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[8px] px-[12px] py-[9px]">
                                    <div className="text-[11px] text-slate-400 dark:text-slate-400 font-bold uppercase mb-[2px]">Zugangsbeschreibung</div>
                                    <div className="text-[14px] text-slate-900 dark:text-slate-300">{selectedLead.zugang_beschreibung}</div>
                                </div>
                            )}
                        </div>

                        {/* Legal agreement */}
                        <div className="px-[20px] py-[16px] border-b border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111111]">
                            <div className="bg-white dark:bg-[#161616] border border-slate-300 dark:border-[#2a2a2a] rounded-[8px] px-[14px] py-[12px] mb-[14px]">
                                <div className="text-[13px] font-bold text-slate-900 dark:text-white mb-[4px]">Rechtliche Vereinbarung</div>
                                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-[1.55] m-0">
                                    Durch Annahme verpflichten Sie sich, im Falle einer prozentualen Provision die Abrechnung zwingend über die <strong>Stripe-Zahlungsfunktion</strong> des Portals abzuwickeln, damit unsere Provision automatisch einbehalten wird.
                                    Bei Barzahlungen unter Umgehung des Systems oder Falschangaben wird eine <strong className="text-red-700 dark:text-red-500">Vertragsstrafe von 280 € + entgangene Provision</strong> fällig.
                                </p>
                            </div>
                            <label className="flex items-start gap-[10px] cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={e => setAgreed(e.target.checked)}
                                    className="mt-[2px] w-[16px] h-[16px] accent-[#C8102E] shrink-0"
                                />
                                <span className="text-[13px] text-slate-900 dark:text-slate-300 font-medium leading-[1.45]">
                                    Ich akzeptiere die Bedingungen und bestätige, Provisions-Leads korrekt über Stripe abzurechnen.
                                </span>
                            </label>
                        </div>

                        {/* Action buttons */}
                        <div className="px-[20px] py-[16px] flex gap-[12px] justify-end bg-white dark:bg-[#111111]">
                            <button
                                onClick={() => setShowRejectModal(true)}
                                disabled={actionLoading}
                                className="bg-white dark:bg-[#161616] text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-500 dark:hover:bg-slate-700 hover:text-white dark:hover:text-white hover:border-slate-500 px-[20px] py-[10px] rounded-lg text-[14px] font-semibold transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                Ablehnen
                            </button>
                            <button
                                disabled={!agreed || actionLoading}
                                onClick={handleAccept}
                                className="btn-color-hover bg-[#C8102E] text-white border border-transparent px-[24px] py-[10px] rounded-lg text-[14px] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {actionLoading ? 'Wird verarbeitet...' : 'Auftrag annehmen'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Modal: Reject Reason ─────────────────────────────────────── */}
            {selectedLead && showRejectModal && (
                <div className="fixed top-[68px] inset-x-0 bottom-0 h-[calc(100dvh-68px)] bg-slate-900/30 dark:bg-black/50 flex items-start justify-center z-[1001] px-[16px] pt-[12px] pb-[36px] box-border backdrop-blur-sm">
                    <div className="no-scrollbar bg-white dark:bg-[#111111] w-full max-w-[420px] rounded-[16px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.25)] max-h-[calc(100dvh-68px-48px)] overflow-y-auto border border-transparent dark:border-[#2a2a2a]">
                        <div className="px-[20px] py-[16px] border-b border-slate-200 dark:border-[#2a2a2a]">
                            <h2 className="text-[18px] font-extrabold text-slate-900 dark:text-white m-0">Auftrag ablehnen</h2>
                        </div>
                        <div className="px-[20px] py-[16px]">
                            <label className="block text-[13px] text-slate-600 dark:text-slate-300 font-semibold mb-[8px]">
                                Grund (optional)
                            </label>
                            <select
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                className="w-full px-[14px] py-[10px] border border-slate-300 dark:border-[#2a2a2a] rounded-[8px] text-[14px] font-sans outline-none mb-[20px] bg-white dark:bg-[#161616] text-slate-900 dark:text-white focus:border-slate-400 dark:focus:border-slate-500"
                            >
                                <option value="">Kein Grund angeben</option>
                                <option value="Keine Kapazität">Keine Kapazität</option>
                                <option value="Zu weit entfernt">Zu weit entfernt</option>
                                <option value="Nicht meine Spezialisierung">Nicht meine Spezialisierung</option>
                                <option value="Urlaub / Krankheit">Urlaub / Krankheit</option>
                            </select>
                            <div className="flex gap-[12px] justify-end">
                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    disabled={actionLoading}
                                    className="bg-white dark:bg-[#161616] text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-500 dark:hover:bg-slate-700 hover:text-white dark:hover:text-white hover:border-slate-500 px-[20px] py-[10px] rounded-lg text-[14px] font-semibold transition-all duration-300 ease-in-out cursor-pointer"
                                >
                                    Zurück
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={actionLoading}
                                    className="bg-slate-900 dark:bg-slate-700 text-white border border-transparent hover:bg-slate-800 dark:hover:bg-slate-600 px-[24px] py-[10px] rounded-lg text-[14px] font-bold transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {actionLoading ? 'Wird verarbeitet...' : 'Ablehnen bestätigen'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
