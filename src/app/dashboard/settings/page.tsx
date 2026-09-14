'use client';

import { useEffect, useState, useCallback } from 'react';

const PEST_TYPES = [
    'Wespen', 'Mäuse & Ratten', 'Bettwanzen', 'Schaben / Kakerlaken', 'Ameisen', 'Flöhe', 'Marder', 'Tauben', 'Sonstige'
];

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const [form, setForm] = useState({
        firma: '',
        name: '',
        telefon: '',
        service_plz: '',
        billing_model: 'commission',
        is_active: true,
        telegram_chat_id: '',
        pests_handled: [] as string[],
    });

    const loadSettings = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/partner/settings');
            if (res.ok) {
                const data = await res.json();
                if (data.master) {
                    setForm({
                        firma: data.master.firma || '',
                        name: data.master.name || '',
                        telefon: data.master.phone || '',
                        service_plz: Array.isArray(data.master.plz_bereiche) ? data.master.plz_bereiche.join(', ') : '',
                        billing_model: data.master.billing_model || 'commission',
                        is_active: data.master.is_active !== false, // default true
                        telegram_chat_id: data.master.telegram_chat_id || '',
                        pests_handled: Array.isArray(data.master.pests_handled) ? data.master.pests_handled : [],
                    });
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadSettings(); }, [loadSettings]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch('/api/partner/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ text: 'Einstellungen erfolgreich gespeichert!', type: 'success' });
            } else {
                setMessage({ text: data.error || 'Fehler beim Speichern.', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'Netzwerkfehler beim Speichern.', type: 'error' });
        } finally {
            setSaving(false);
            setTimeout(() => {
                setMessage(prev => prev.type === 'success' ? { text: '', type: '' } : prev);
            }, 3000);
        }
    };

    const togglePest = (pest: string) => {
        setForm(prev => {
            const list = prev.pests_handled;
            if (list.includes(pest)) return { ...prev, pests_handled: list.filter(p => p !== pest) };
            return { ...prev, pests_handled: [...list, pest] };
        });
    };

    if (loading) return (
        <div>
            <h1 className="font-heading text-[2.5rem] font-black uppercase mb-[8px] text-slate-900 dark:text-white leading-none">
                Einstellungen
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] mb-[32px]">Profil und Abrechnung verwalten.</p>
            <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2a2a2a] rounded-[12px] p-[24px] h-[300px] animate-pulse">
                <div className="bg-slate-100 dark:bg-[#2a2a2a] h-[16px] w-[30%] rounded-[4px] mb-[24px]" />
                <div className="bg-slate-100 dark:bg-[#2a2a2a] h-[40px] w-full rounded-[8px] mb-[16px]" />
                <div className="bg-slate-100 dark:bg-[#2a2a2a] h-[40px] w-full rounded-[8px]" />
            </div>
        </div>
    );

    return (
        <div className="max-w-[700px]">
            <h1 className="font-heading text-[2.5rem] font-black uppercase mb-[8px] text-slate-900 dark:text-white leading-none">
                Einstellungen
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] mb-[32px]">
                Verwalten Sie Ihr Unternehmensprofil, Einsatzgebiete und Abrechnungsmodelle.
            </p>

            {message.text && (
                <div className={`px-[16px] py-[12px] rounded-[8px] mb-[24px] text-[14px] font-semibold border ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="grid gap-[32px]">
                
                {/* 0. Verfügbarkeit (Aktiv/Pause) */}
                <div className={`bg-white dark:bg-[#111111] border-[2px] rounded-[12px] overflow-hidden transition-all duration-200 ${form.is_active ? 'border-[#C8102E]' : 'border-slate-200 dark:border-[#2a2a2a]'}`}>
                    <div className="px-[24px] py-[20px] flex items-center justify-between gap-[16px] flex-wrap">
                        <div>
                            <h2 className="text-[16px] font-bold text-slate-900 dark:text-white m-0 mb-[4px]">Auftragsannahme</h2>
                            <p className="m-0 text-[13px] text-slate-500 dark:text-slate-400">
                                {form.is_active 
                                    ? 'Sie sind aktiv und erhalten Benachrichtigungen über neue Aufträge.' 
                                    : 'Sie sind pausiert (z.B. Urlaub) und erhalten derzeit keine neuen Anfragen.'}
                            </p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input 
                                    type="checkbox" 
                                    className="sr-only" 
                                    checked={form.is_active} 
                                    onChange={e => setForm({ ...form, is_active: e.target.checked })} 
                                />
                                <div className={`w-[48px] h-[24px] rounded-[12px] transition-colors duration-200 ${form.is_active ? 'bg-[#C8102E]' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                <div 
                                    className="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-200"
                                    style={{ left: form.is_active ? '26px' : '2px' }}
                                />
                            </div>
                            <span className={`ml-[12px] text-[14px] font-bold ${form.is_active ? 'text-[#C8102E]' : 'text-slate-500 dark:text-slate-400'}`}>
                                {form.is_active ? 'Aktiv' : 'Pausiert'}
                            </span>
                        </label>
                    </div>
                </div>

                {/* 1. Persönliche Daten */}
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <div className="bg-slate-50 dark:bg-[#161616] px-[24px] py-[16px] border-b border-slate-300 dark:border-[#2a2a2a]">
                        <h2 className="text-[16px] font-bold text-slate-900 dark:text-white m-0">Unternehmensprofil</h2>
                    </div>
                    <div className="p-[24px] grid gap-[20px]">
                        <div className="grid gap-[8px]">
                            <label className="text-[13px] font-semibold text-slate-600 dark:text-slate-400">Firmenname (optional)</label>
                            <input
                                type="text"
                                value={form.firma}
                                onChange={e => setForm({ ...form, firma: e.target.value })}
                                placeholder="z.B. Schmidt Schädlingsbekämpfung GmbH"
                                className="w-full px-[14px] py-[10px] rounded-[8px] border border-slate-400 dark:border-[#2a2a2a] text-[14px] outline-none bg-white dark:bg-[#161616] text-slate-900 dark:text-white focus:border-slate-500"
                            />
                        </div>
                        <div className="grid grid-cols-[1fr_1fr] gap-[16px]">
                            <div className="grid gap-[8px]">
                                <label className="text-[13px] font-semibold text-slate-600 dark:text-slate-400">Ansprechpartner</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-[14px] py-[10px] rounded-[8px] border border-slate-400 dark:border-[#2a2a2a] text-[14px] outline-none bg-white dark:bg-[#161616] text-slate-900 dark:text-white focus:border-slate-500"
                                />
                            </div>
                            <div className="grid gap-[8px]">
                                <label className="text-[13px] font-semibold text-slate-600 dark:text-slate-400">Telefonnummer</label>
                                <input
                                    type="tel"
                                    value={form.telefon}
                                    onChange={e => setForm({ ...form, telefon: e.target.value })}
                                    className="w-full px-[14px] py-[10px] rounded-[8px] border border-slate-400 dark:border-[#2a2a2a] text-[14px] outline-none bg-white dark:bg-[#161616] text-slate-900 dark:text-white focus:border-slate-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Einsatzgebiet */}
                <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <div style={{ background: '#f8fafc', padding: '16px 24px', borderBottom: '1px solid #cbd5e1' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Einsatzgebiete (PLZ)</h2>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                            Geben Sie hier die Postleitzahlen ein, in denen Sie Aufträge annehmen möchten. 
                            Trennen Sie mehrere Postleitzahlen mit einem Komma (z.B. 10115, 10117, 10119).
                        </p>
                        <textarea
                            value={form.service_plz}
                            onChange={e => setForm({ ...form, service_plz: e.target.value })}
                            placeholder="10115, 10117, 10119..."
                            rows={3}
                            className="w-full px-[14px] py-[12px] rounded-[8px] border border-slate-400 dark:border-[#2a2a2a] text-[14px] outline-none resize-y min-h-[80px] max-h-[250px] bg-white dark:bg-[#161616] text-slate-900 dark:text-white focus:border-slate-500"
                        />
                    </div>
                </div>

                {/* 3. Spezialisierung (Schädlinge) */}
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <div className="bg-slate-50 dark:bg-[#161616] px-[24px] py-[16px] border-b border-slate-300 dark:border-[#2a2a2a]">
                        <h2 className="text-[16px] font-bold text-slate-900 dark:text-white m-0">Spezialisierung</h2>
                    </div>
                    <div className="p-[24px]">
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-[16px]">
                            Wählen Sie aus, welche Schädlinge Sie bekämpfen. Sie erhalten nur Anfragen für diese Arten.
                        </p>
                        <div className="flex flex-wrap gap-[10px]">
                            {PEST_TYPES.map(pest => {
                                const isSelected = form.pests_handled.includes(pest);
                                return (
                                    <button
                                        key={pest}
                                        type="button"
                                        onClick={() => togglePest(pest)}
                                        className={`px-[16px] py-[8px] rounded-[20px] text-[13px] font-semibold cursor-pointer border ${
                                            isSelected
                                                ? 'btn-color-hover bg-[#C8102E] text-white border-transparent'
                                                : 'bg-slate-100 dark:bg-[#161616] text-slate-600 dark:text-slate-400 border-slate-300 dark:border-[#2a2a2a] hover:bg-white dark:hover:bg-[#222222] hover:border-slate-400 dark:hover:border-slate-500 transition-colors'
                                        }`}
                                    >
                                            <div className="flex items-center gap-[6px]">
                                                {isSelected && (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                                {pest}
                                            </div>
                                        </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 4. Benachrichtigungen (Telegram) */}
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <div className="bg-slate-50 dark:bg-[#161616] px-[24px] py-[16px] border-b border-slate-300 dark:border-[#2a2a2a]">
                        <h2 className="text-[16px] font-bold text-slate-900 dark:text-white m-0">Benachrichtigungen (Telegram)</h2>
                    </div>
                    <div className="p-[24px]">
                        <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-[16px]">
                            Um sofort über neue Aufträge informiert zu werden, verbinden Sie Ihren Account mit Telegram.
                            Geben Sie hier Ihre Telegram Chat-ID ein.
                        </p>
                        <div className="grid gap-[8px]">
                            <label className="text-[13px] font-semibold text-slate-600 dark:text-slate-400">Telegram Chat-ID</label>
                            <input
                                type="text"
                                value={form.telegram_chat_id}
                                onChange={e => setForm({ ...form, telegram_chat_id: e.target.value })}
                                placeholder="z.B. 123456789"
                                className="w-full px-[14px] py-[10px] rounded-[8px] border border-slate-400 dark:border-[#2a2a2a] text-[14px] outline-none bg-white dark:bg-[#161616] text-slate-900 dark:text-white focus:border-slate-500"
                            />
                            <div className="text-[12px] text-slate-400 dark:text-slate-500 mt-[4px]">
                                Tipp: Senden Sie eine Nachricht an den Bot <strong className="text-slate-900 dark:text-white">@userinfobot</strong> in Telegram, um Ihre ID herauszufinden.
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Abrechnungsmodell */}
                <div className="bg-white dark:bg-[#111111] border border-slate-300 dark:border-[#2a2a2a] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                    <div className="bg-slate-50 dark:bg-[#161616] px-[24px] py-[16px] border-b border-slate-300 dark:border-[#2a2a2a]">
                        <h2 className="text-[16px] font-bold text-slate-900 dark:text-white m-0">Abrechnungsmodell</h2>
                    </div>
                    <div className="p-[24px] grid gap-[16px]">
                        
                        {/* Option 1: Commission (Default) */}
                        <label className={`flex items-start gap-[16px] p-[16px] border-[2px] rounded-[8px] cursor-pointer transition-all duration-200 hover:shadow-md ${form.billing_model === 'commission' ? 'border-[#C8102E] bg-red-50 dark:bg-[#C8102E]/10' : 'border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111111] hover:border-slate-300 dark:hover:border-slate-600'}`}>
                            <input 
                                type="radio" 
                                name="billing_model" 
                                value="commission"
                                checked={form.billing_model === 'commission'}
                                onChange={() => setForm({ ...form, billing_model: 'commission' })}
                                className="mt-[4px] w-[18px] h-[18px] accent-[#C8102E]"
                            />
                            <div>
                                <div className="text-[15px] font-bold text-slate-900 dark:text-white mb-[4px]">Prozentuale Vermittlung (20%)</div>
                                <div className="text-[13px] text-slate-600 dark:text-slate-400 leading-[1.5]">
                                    Sie zahlen keine fixen Gebühren. Wir erhalten lediglich 20% Provision vom finalen Rechnungsbetrag, nachdem Sie den Auftrag erfolgreich beim Kunden abgeschlossen haben.
                                </div>
                            </div>
                        </label>

                        {/* Option 2: Pay-Per-Lead */}
                        <label className={`flex items-start gap-[16px] p-[16px] border-[2px] rounded-[8px] cursor-pointer transition-all duration-200 hover:shadow-md ${form.billing_model === 'pay_per_lead' ? 'border-slate-900 dark:border-slate-500 bg-slate-50 dark:bg-[#161616]' : 'border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111111] hover:border-slate-300 dark:hover:border-slate-600'}`}>
                            <input 
                                type="radio" 
                                name="billing_model" 
                                value="pay_per_lead"
                                checked={form.billing_model === 'pay_per_lead'}
                                onChange={() => setForm({ ...form, billing_model: 'pay_per_lead' })}
                                className="mt-[4px] w-[18px] h-[18px] accent-slate-900 dark:accent-slate-400"
                            />
                            <div>
                                <div className="text-[15px] font-bold text-slate-900 dark:text-white mb-[4px]">Fixpreis pro Lead kaufen</div>
                                <div className="text-[13px] text-slate-600 dark:text-slate-400 leading-[1.5]">
                                    Sie kaufen Kundenanfragen (Leads) zu einem festen Preis. Die komplette Rechnungssumme bleibt bei Ihnen. Sie sind selbst für die Kontaktaufnahme und den Verkauf verantwortlich.
                                </div>
                            </div>
                        </label>

                    </div>
                </div>

                <div className="flex justify-end pt-[16px] border-t border-slate-200 dark:border-[#2a2a2a]">
                    <button 
                        type="submit" 
                        disabled={saving}
                        className={`btn-color-hover px-[32px] py-[12px] rounded-lg text-[15px] font-bold border bg-[#C8102E] text-white border-transparent ${saving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer shadow-sm'}`}
                    >
                        {saving ? 'Speichert...' : 'Einstellungen speichern'}
                    </button>
                </div>
            </form>
        </div>
    );
}
