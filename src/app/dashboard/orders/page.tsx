'use client';

// ==========================================
// [DE] PARTNER DASHBOARD — Meine Aufträge
// Zeigt angenommene und laufende Aufträge.
// Echte Daten aus Supabase via /api/partner/leads
// ==========================================

import { useEffect, useState, useCallback } from 'react';

interface Lead {
    id: number;
    plz: string;
    strasse?: string;
    hausnummer?: string;
    etage?: string;
    name: string;
    firma?: string;
    telefon: string;
    email?: string;
    schaedling: string | null;
    kunde_typ: string | null;
    objekt_typ: string | null;
    befall: string | null;
    raeume: string | null;
    flaeche: string | null;
    zugang: string | null;
    zugang_beschreibung?: string;
    created_at: string;
    accepted_at?: string;
    completed_at?: string;
    status: string;
    invoice_amount?: number;
    commission_amount?: number;
    billing_override_type?: string | null;
    billing_override_value?: number | null;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
    angenommen:        { label: 'Angenommen',         bg: '#eff6ff', color: '#3b82f6', border: '#bfdbfe' },
    kontaktiert:       { label: 'Kontaktiert',         bg: '#fefce8', color: '#854d0e', border: '#fde68a' },
    termin_vereinbart: { label: 'Termin vereinbart',   bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
    in_arbeit:         { label: 'In Arbeit',           bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' },
    abgeschlossen:     { label: 'Abgeschlossen',       bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
    storniert:         { label: 'Storniert',           bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
};

const UPDATABLE_STATUSES = ['angenommen', 'kontaktiert', 'termin_vereinbart', 'in_arbeit'];
const ALL_STATUSES = ['angenommen', 'kontaktiert', 'termin_vereinbart', 'in_arbeit', 'abgeschlossen', 'storniert'];

import { getLeadPricing } from '@/lib/pricing';

export default function DashboardOrders() {
    const [orders, setOrders] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [billingModel, setBillingModel] = useState<string>('commission');
    const [filterStatus, setFilterStatus] = useState<string>('active'); // 'active' | 'all'
    const [closingId, setClosingId] = useState<number | null>(null);
    const [invoiceInput, setInvoiceInput] = useState<Record<number, string>>({});
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [confirmModalData, setConfirmModalData] = useState<{ leadId: number; amount: string; isFixed: boolean; pricing: any } | null>(null);

    const loadOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const statusParam = filterStatus === 'active'
                ? 'angenommen,kontaktiert,termin_vereinbart,in_arbeit'
                : ALL_STATUSES.join(',');
            const res = await fetch(`/api/partner/leads?status=${statusParam}`);
            if (!res.ok) {
                const d = await res.json();
                setError(d.error || 'Fehler beim Laden.');
                return;
            }
            const { leads, master } = await res.json();
            setOrders(leads || []);
            if (master?.billing_model) setBillingModel(master.billing_model);
        } catch {
            setError('Netzwerkfehler.');
        } finally {
            setLoading(false);
        }
    }, [filterStatus]);

    useEffect(() => { loadOrders(); }, [loadOrders]);

    const handleStatusChange = async (leadId: number, newStatus: string) => {
        setActionLoading(leadId);
        try {
            const res = await fetch('/api/partner/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, status: newStatus }),
            });
            if (!res.ok) { alert('Fehler beim Aktualisieren.'); return; }
            setOrders(prev => prev.map(o => o.id === leadId ? { ...o, status: newStatus } : o));
        } catch {
            alert('Netzwerkfehler.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleCompleteIntent = (leadId: number) => {
        const lead = orders.find(o => o.id === leadId);
        const pricing = getLeadPricing(lead?.schaedling || null, billingModel, lead?.billing_override_type, lead?.billing_override_value);
        
        let amount = '0';
        if (pricing.type === 'percentage') {
            amount = invoiceInput[leadId] || '0';
            if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
                alert('Bitte geben Sie einen gültigen Rechnungsbetrag ein.');
                return;
            }
        }
        setConfirmModalData({ leadId, amount, isFixed: pricing.type !== 'percentage', pricing });
    };

    const executeComplete = async () => {
        if (!confirmModalData) return;
        const { leadId, amount } = confirmModalData;

        setActionLoading(leadId);
        try {
            const res = await fetch('/api/leads/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, invoiceAmount: Number(amount) }),
            });
            const data = await res.json();
            if (!res.ok) { alert(data.error || 'Fehler beim Abschließen.'); return; }

            setOrders(prev => prev.map(o => o.id === leadId
                ? { ...o, status: 'abgeschlossen', invoice_amount: Number(amount), commission_amount: data.commissionAmount }
                : o
            ));
            setClosingId(null);
            setInvoiceInput(prev => { const n = { ...prev }; delete n[leadId]; return n; });
        } catch {
            alert('Netzwerkfehler.');
        } finally {
            setActionLoading(null);
            setConfirmModalData(null);
        }
    };

    // ─── Loading ────────────────────────────────────────────────────────────
    if (loading) return (
        <div>
            <h1 className="font-heading text-[2.5rem] font-black uppercase mb-[8px] text-slate-900 dark-header-text leading-none">
                Meine Aufträge
            </h1>
            <p className="text-slate-500 dark-header-text text-[15px] mb-[32px]">Lädt Aufträge<span className="loading-dots"><span></span><span></span><span></span></span></p>
            <div className="grid gap-[20px]">
                {[1, 2].map(i => (
                    <div key={i} className="animate-pulse bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] p-[24px] h-[120px]">
                        <div className="bg-slate-200 dark:bg-[#2a2a2a] h-[16px] w-[50%] rounded-[4px] mb-[12px]" />
                        <div className="bg-slate-200 dark:bg-[#2a2a2a] h-[12px] w-[35%] rounded-[4px]" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-start mb-[28px] flex-wrap gap-[12px]">
                <div>
                    <h1 className="font-heading text-[2.5rem] font-black uppercase mb-[6px] text-slate-900 dark-header-text leading-none">
                        Meine Aufträge
                    </h1>
                    <p className="text-slate-500 dark-header-text text-[15px] m-0">Verwalten Sie Ihre übernommenen Aufträge.</p>
                </div>
                <div className="flex gap-[8px] flex-wrap">
                    <button
                        onClick={() => setFilterStatus('active')}
                        className={`px-[16px] py-[8px] rounded-lg border text-[13px] font-semibold transition-all duration-300 ease-in-out cursor-pointer ${filterStatus === 'active' ? 'bg-slate-900 dark:bg-white text-white dark-header-text border-slate-900 dark:border-white' : 'bg-white dark:bg-[#161616] text-slate-600 dark-header-text border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-900 dark:hover:bg-slate-700 hover:text-white hover:border-slate-900'}`}
                    >
                        Aktiv
                    </button>
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`px-[16px] py-[8px] rounded-lg border text-[13px] font-semibold transition-all duration-300 ease-in-out cursor-pointer ${filterStatus === 'all' ? 'bg-slate-900 dark:bg-white text-white dark-header-text border-slate-900 dark:border-white' : 'bg-white dark:bg-[#161616] text-slate-600 dark-header-text border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-900 dark:hover:bg-slate-700 hover:text-white hover:border-slate-900'}`}
                    >
                        Alle
                    </button>
                    <button
                        onClick={loadOrders}
                        className="px-[14px] py-[8px] rounded-lg border border-slate-200 dark:border-[#2a2a2a] text-[13px] font-semibold bg-slate-50 dark:bg-[#111111] text-slate-600 dark-header-text hover:bg-slate-200 dark:hover:bg-[#1a1a1a] transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        ↻
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-[16px] py-[12px] rounded-[8px] mb-[20px] text-[14px]">
                    {error}
                </div>
            )}

            {/* Empty state */}
            {!error && orders.length === 0 && (
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[16px] px-[32px] py-[64px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <h3 className="font-heading text-[22px] font-black uppercase text-slate-900 dark-header-text mb-[8px]">
                        Noch keine Aufträge
                    </h3>
                    <p className="text-slate-500 dark-header-text text-[14px] m-0">
                        Nehmen Sie Aufträge aus <strong className="text-slate-900 dark-header-text">Neue Aufträge</strong> an, um sie hier zu verwalten.
                    </p>
                </div>
            )}

            {/* Order cards */}
            <div className="grid gap-[20px]">
                {orders.map(order => {
                    const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['angenommen']!;
                    const isCompleted = order.status === 'abgeschlossen';
                    const isCancelled = order.status === 'storniert';
                    const isClosing = closingId === order.id;
                    const canEdit = UPDATABLE_STATUSES.includes(order.status);

                    return (
                        <div key={order.id} className="bg-white dark:bg-[#111111] border border-slate-400 dark:border-[#2a2a2a] rounded-[14px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">

                            {/* Card header */}
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', flexWrap: 'wrap', gap: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '3px' }}>
                                        Auftrag #{order.id} · {new Date(order.created_at).toLocaleDateString('de-DE')}
                                    </div>
                                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                        {order.schaedling || 'Schädling'} · {order.plz}{order.strasse ? ` ${order.strasse} ${order.hausnummer || ''}` : ''}
                                    </h3>
                                </div>
                                {/* Status */}
                                {canEdit ? (
                                    <div className="relative flex items-center" style={{ '--cfg-color': cfg.color } as React.CSSProperties}>
                                        <select
                                            value={order.status}
                                            disabled={actionLoading === order.id}
                                            onChange={e => handleStatusChange(order.id, e.target.value)}
                                            className="peer bg-[var(--cfg-color)] text-white border border-transparent hover:bg-white focus:bg-white hover:text-[var(--cfg-color)] focus:text-[var(--cfg-color)] hover:border-[var(--cfg-color)] focus:border-[var(--cfg-color)] pl-[14px] pr-[30px] py-[6px] rounded-full text-[12px] font-bold cursor-pointer transition-colors duration-300 outline-none appearance-none"
                                        >
                                            {UPDATABLE_STATUSES.map(s => (
                                                <option key={s} value={s} className="bg-white text-slate-900">{STATUS_CONFIG[s]?.label || s}</option>
                                            ))}
                                        </select>
                                        <svg 
                                            className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none text-white peer-hover:text-[var(--cfg-color)] peer-focus:text-[var(--cfg-color)] transition-colors duration-300" 
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                        >
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                ) : (
                                    <span className="px-[14px] py-[6px] rounded-[20px] border border-transparent text-white font-bold text-[12px]" style={{ background: cfg.color }}>
                                        {cfg.label}
                                    </span>
                                )}
                            </div>

                            {/* Card body */}
                            <div className="p-[20px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[24px]">

                                {/* Kundendaten */}
                                <div>
                                    <div className="text-[11px] font-bold text-slate-400 dark-header-text uppercase tracking-[0.08em] mb-[12px]">Kundendaten</div>
                                    <div className="text-[14px] mb-[6px] text-slate-900 dark-header-text"><strong className="text-slate-900 dark-header-text">Name:</strong> {order.name}</div>
                                    {order.firma && <div className="text-[14px] mb-[6px] text-slate-900 dark-header-text"><strong className="text-slate-900 dark-header-text">Firma:</strong> {order.firma}</div>}
                                    <div className="text-[14px] mb-[6px] text-slate-900 dark-header-text">
                                        <strong className="text-slate-900 dark-header-text">Telefon:</strong>{' '}
                                        <a href={`tel:${order.telefon}`} className="text-[#C8102E] no-underline font-semibold">{order.telefon}</a>
                                    </div>
                                    {order.email && (
                                        <div className="text-[13px] text-slate-500 dark-header-text">
                                            <a href={`mailto:${order.email}`} className="text-blue-500 no-underline">{order.email}</a>
                                        </div>
                                    )}
                                    {order.etage && <div className="text-[13px] text-slate-500 dark-header-text mt-[4px]">Etage: {order.etage}</div>}
                                </div>

                                {/* Abschluss */}
                                <div>
                                    <div className="text-[11px] font-bold text-slate-400 dark-header-text uppercase tracking-[0.08em] mb-[12px]">Abschluss & Abrechnung</div>

                                    {isCompleted ? (
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-[10px] p-[16px]">
                                            <div className="text-green-800 dark:text-green-400 font-bold mb-[6px]">Auftrag abgeschlossen</div>
                                            {getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).type !== 'percentage' ? (
                                                <div className="text-green-700 dark:text-green-500 text-[14px] mb-[4px]">
                                                    Leadgebühr ({getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).label}): <strong className="text-green-800 dark:text-green-400">{getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).value}</strong>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="text-green-700 dark:text-green-500 text-[14px] mb-[4px]">
                                                        Rechnung: <strong>{order.invoice_amount?.toFixed(2)} €</strong>
                                                    </div>
                                                    <div style={{ color: '#15803d', fontSize: '13px' }}>
                                                        Provision (20%): <strong>{order.commission_amount?.toFixed(2)} €</strong>
                                                        Rechnung: <strong className="text-green-800 dark:text-green-400">{order.invoice_amount?.toFixed(2)} €</strong>
                                                    </div>
                                                    <div className="text-green-700 dark:text-green-500 text-[13px]">
                                                        Leadgebühr ({getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).label}): <strong className="text-green-800 dark:text-green-400">{getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).value}</strong>
                                                    </div>
                                                </>
                                            )}
                                            {order.completed_at && (
                                                <div className="text-green-600 dark:text-green-400 text-[12px] mt-[6px]">
                                                    {new Date(order.completed_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            )}
                                        </div>
                                    ) : isCancelled ? (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-[10px] p-[16px]">
                                            <div className="text-red-700 dark:text-red-400 font-bold mb-[4px]">Auftrag storniert</div>
                                            <div className="text-red-600 dark:text-red-500 text-[14px]">Keine Leadgebühr fällig.</div>
                                        </div>
                                    ) : isClosing ? (
                                        <div>
                                            {getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).type === 'percentage' ? (
                                                <div className="mb-[10px]">
                                                    <label className="block text-[12px] text-slate-600 font-semibold mb-[6px]">Finaler Rechnungsbetrag (€)</label>
                                                    <div className="flex gap-[8px]">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            placeholder="z.B. 350"
                                                            value={invoiceInput[order.id] || ''}
                                                            onChange={e => setInvoiceInput(prev => ({ ...prev, [order.id]: e.target.value }))}
                                                            className="flex-1 px-[12px] py-[8px] border border-slate-300 rounded-[6px] text-[15px] outline-none font-inherit"
                                                        />
                                                        <button
                                                            onClick={() => handleCompleteIntent(order.id)}
                                                            disabled={actionLoading === order.id}
                                                            className="btn-color-hover bg-[#C8102E] text-white border border-transparent px-[14px] py-0 rounded-lg text-[13px] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                                        >
                                                            {actionLoading === order.id ? '...' : 'Abschließen'}
                                                        </button>
                                                    </div>
                                                    {invoiceInput[order.id] && !isNaN(Number(invoiceInput[order.id])) && Number(invoiceInput[order.id]) > 0 && (
                                                        <div className="text-[12px] text-slate-500 mt-[6px]">
                                                            Provision ({getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).value}): <strong>{(Number(invoiceInput[order.id]) * getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).numericValue).toFixed(2)} €</strong>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="mb-[10px]">
                                                    <div className="text-[13px] text-slate-600 mb-[8px]">
                                                        Dieser Auftrag läuft über: {getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).label} ({getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).value}). Bitte schließen Sie den Auftrag ab.
                                                    </div>
                                                    <button
                                                        onClick={() => handleCompleteIntent(order.id)}
                                                        disabled={actionLoading === order.id}
                                                        className="btn-color-hover w-full bg-[#C8102E] text-white border border-transparent px-[14px] py-[10px] rounded-lg text-[13px] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                                    >
                                                        {actionLoading === order.id ? '...' : 'Auftrag endgültig abschließen'}
                                                    </button>
                                                </div>
                                            )}
                                            <button onClick={() => setClosingId(null)} className="bg-transparent border-none text-slate-400 text-[13px] cursor-pointer p-0 font-inherit">
                                                Abbrechen
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#2a2a2a] rounded-[10px] p-[16px]">
                                            <div className="text-[13px] text-slate-500 dark-header-text font-semibold mb-[4px]">Aktueller Status</div>
                                            <div className="text-[14px] text-slate-900 dark-header-text font-bold mb-[12px]">{cfg.label}</div>
                                            <div className="text-[12px] text-slate-500 dark-header-text mb-[4px]">
                                                {getLeadPricing(order.schaedling, billingModel, order.billing_override_type, order.billing_override_value).type === 'percentage'
                                                    ? 'Bei Abschluss wird die Rechnung hochgeladen.'
                                                    : 'Bei Abschluss wird die Fixgebühr berechnet.'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action bar */}
                            {canEdit && !isClosing && (
                                <div className="px-[20px] py-[14px] border-t border-slate-200 dark:border-[#2a2a2a] bg-slate-50 dark:bg-[#161616] flex justify-end">
                                    <button
                                        onClick={() => setClosingId(order.id)}
                                        disabled={actionLoading === order.id}
                                        className="bg-green-600 text-white border border-transparent hover:bg-green-700 px-[16px] py-[8px] rounded-lg text-[13px] font-bold transition-all duration-300 ease-in-out cursor-pointer shadow-[0_2px_4px_rgba(22,163,74,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Auftrag abschließen
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Custom Confirm Modal */}
            {confirmModalData && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-[16px]">
                    {/* Blurred Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/50 backdrop-blur-sm" />
                    
                    {/* Modal Content */}
                    <div className="relative bg-white dark:bg-[#111111] rounded-[16px] w-full max-w-[420px] overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-transparent dark:border-[#2a2a2a]">
                        <div className="bg-slate-900 dark:bg-[#161616] px-[24px] py-[20px] flex justify-between items-center border-b border-transparent dark:border-[#2a2a2a]">
                            <div className="text-slate-400 text-[11px] font-bold tracking-[0.1em] uppercase">
                                Kammerjäger Structon · Partner-Portal
                            </div>
                            <button onClick={() => setConfirmModalData(null)} className="bg-transparent border-none text-slate-500 hover:text-white cursor-pointer p-[4px] m-[-4px]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="p-[24px]">
                            <h3 className="font-heading text-[28px] font-black uppercase text-slate-900 dark-header-text mb-[16px] leading-none">
                                Auftrag abschließen
                            </h3>
                            
                            <div className="text-slate-600 dark-header-text text-[15px] leading-[1.6] mb-[24px]">
                                {!confirmModalData.isFixed ? (
                                    <>
                                        <div className="flex justify-between mb-[8px]">
                                            <span>Rechnungsbetrag:</span>
                                            <strong className="text-slate-900 dark-header-text">{Number(confirmModalData.amount).toFixed(2)} €</strong>
                                        </div>
                                        <div className="flex justify-between pb-[16px] border-b border-slate-200 dark:border-[#2a2a2a]">
                                            <span>Provision ({confirmModalData.pricing.value}):</span>
                                            <strong className="text-[#C8102E]">{(Number(confirmModalData.amount) * confirmModalData.pricing.numericValue).toFixed(2)} €</strong>
                                        </div>
                                        <div className="mt-[16px] font-semibold text-slate-900 dark-header-text">
                                            Möchten Sie diesen Auftrag jetzt endgültig abschließen?
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between pb-[16px] border-b border-slate-200 dark:border-[#2a2a2a]">
                                            <span>Leadgebühr:</span>
                                            <strong className="text-slate-900 dark-header-text">{confirmModalData.pricing.value}</strong>
                                        </div>
                                        <div className="mt-[16px] font-semibold text-slate-900 dark-header-text">
                                            Möchten Sie diesen Auftrag jetzt endgültig abschließen?
                                        </div>
                                    </>
                                )}
                            </div>

                            <button 
                                onClick={executeComplete}
                                disabled={actionLoading !== null}
                                className={`w-full text-white transition-colors py-[14px] rounded-lg font-bold text-[14px] uppercase tracking-wider ${actionLoading !== null ? 'bg-slate-400 dark:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400 dark:bg-[#161616] dark:border dark:border-[#2a2a2a] dark:hover:bg-[#2a2a2a]'}`}
                            >
                                {actionLoading !== null ? 'Wird verarbeitet...' : 'Auftrag endgültig abschließen'}
                            </button>
                            <div className="mt-[12px] text-center">
                                <button onClick={() => setConfirmModalData(null)} className="bg-transparent border-none text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-[13px] font-semibold cursor-pointer underline underline-offset-2">
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
