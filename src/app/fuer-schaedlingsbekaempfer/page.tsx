'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/sections/FAQ';
import CTACards from '@/components/sections/CTACards';

// ─── Types & helpers ──────────────────────────────────────────────────────
type PartnerTyp = '' | 'schaedlingsbekaempfer' | 'kooperation';

interface FormData {
    typ: PartnerTyp; name: string; email: string; telefon: string;
    firma: string; plz: string; anmerkung: string; datenschutz: boolean;
}
const INITIAL: FormData = { typ: '', name: '', email: '', telefon: '', firma: '', plz: '', anmerkung: '', datenschutz: false };

const inp: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', fontSize: '14px', color: '#374151', background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', borderRadius: '0' };
const lbl: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' };

// ─── VorteileCarousel ────────────────────────────────────────────────────
const TABS = [
    { id: 'auftraege', label: 'Aufträge', sub: 'Direktvermittlung' },
    { id: 'verdienst', label: 'Verdienst', sub: 'Fair & transparent' },
    { id: 'freiheit',  label: 'Freiheit',  sub: 'Volle Kontrolle' },
];

const VORTEIL_CARDS: Record<string, Array<{ tag: string; title: string; desc: string; visual: React.ReactNode }>> = {
    auftraege: [
        {
            tag: 'Aufträge',
            title: 'Vorqualifizierte Anfragen',
            desc: 'Jede Anfrage kommt mit Befall-Typ, Adresse, Kontaktdaten und Dringlichkeit. Sie wissen sofort, worum es geht — kein Kaltakquise-Stress.',
            visual: (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '11px', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>Neue Anfrage</span>
                        <span style={{ background: '#fef2f2', color: '#C8102E', fontWeight: 700, padding: '2px 6px', borderRadius: '3px', fontSize: '10px' }}>AKUT</span>
                    </div>
                    <div style={{ marginBottom: '4px' }}>🐀 Ratten im Keller · Berlin-Mitte</div>
                    <div style={{ marginBottom: '4px', color: '#94a3b8' }}>Heute gemeldet · 2,3 km entfernt</div>
                    <div style={{ background: '#C8102E', color: '#fff', textAlign: 'center', padding: '6px', borderRadius: '4px', fontWeight: 700, marginTop: '8px' }}>Annehmen</div>
                </div>
            ),
        },
        {
            tag: 'Aufträge',
            title: 'Regionale Zuteilung',
            desc: 'Ausschließlich Aufträge in Ihrem Einsatzgebiet. Sie definieren Ihre Postleitzahlen — keine weiten Anfahrtswege, keine verschwendete Zeit.',
            visual: (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '11px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Ihr Einsatzgebiet</div>
                    {['10115 Berlin-Mitte', '10178 Alexanderplatz', '10117 Mitte', '10119 Prenzlauer Berg'].map((plz, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px', color: '#475569' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8102E', flexShrink: 0 }} />
                            {plz}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: 'Aufträge',
            title: 'Sofort-Benachrichtigung',
            desc: 'Neue Anfragen in Ihrer Region kommen per E-Mail und SMS — in Echtzeit. Schnell reagieren heißt mehr Aufträge sichern.',
            visual: (
                <div style={{ background: '#0f172a', borderRadius: '8px', padding: '14px', fontSize: '11px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8102E' }} />
                        <span style={{ color: '#e2e8f0', fontWeight: 700 }}>SMS Benachrichtigung</span>
                    </div>
                    <div style={{ color: '#94a3b8' }}>„Neue Anfrage in 10115 Berlin: Schaben-Befall, Dringlichkeit HOCH. Jetzt annehmen ›"</div>
                    <div style={{ marginTop: '8px', color: '#64748b', fontSize: '10px' }}>gerade eben</div>
                </div>
            ),
        },
    ],
    verdienst: [
        {
            tag: 'Verdienst',
            title: 'Faire Provisionsstruktur',
            desc: 'Nur Provision bei erfolgreich abgeschlossenem Auftrag. Keine Grundgebühr, keine Abonnements, keine Mindestabnahme — 100% ergebnisbasiert.',
            visual: (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '11px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Abrechnung September</div>
                    {[
                        { label: 'Aufträge abgeschlossen', val: '12' },
                        { label: 'Ihr Umsatz', val: '€ 4.240' },
                        { label: 'Provision (12%)', val: '−€ 508' },
                        { label: 'Ihr Netto', val: '€ 3.732', bold: true },
                    ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: r.bold ? '#0f172a' : '#64748b', fontWeight: r.bold ? 700 : 400, borderTop: r.bold ? '1px solid #e2e8f0' : 'none', paddingTop: r.bold ? '6px' : 0 }}>
                            <span>{r.label}</span><span style={{ color: r.bold ? '#C8102E' : undefined }}>{r.val}</span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: 'Verdienst',
            title: 'Keine Kosten bei Stornierung',
            desc: 'Springt ein Kunde ab, zahlen Sie nichts. Abgerechnet wird ausschließlich für abgeschlossene Aufträge — kein finanzielles Risiko.',
            visual: (
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '14px', fontSize: '11px' }}>
                    <div style={{ color: '#166534', fontWeight: 700, marginBottom: '8px' }}>Storniert — keine Kosten</div>
                    <div style={{ color: '#4d7c0f' }}>Auftrag #1042 storniert vom Kunden.<br />Provision: €0,00</div>
                    <div style={{ background: '#16a34a', color: '#fff', textAlign: 'center', padding: '6px', borderRadius: '4px', fontWeight: 700, marginTop: '10px', fontSize: '10px' }}>Kein Abzug von Ihrem Konto</div>
                </div>
            ),
        },
        {
            tag: 'Verdienst',
            title: 'Flexible Preisgestaltung',
            desc: 'Ihre Preise bleiben vollständig in Ihren Händen. Wir geben keine Preise vor — Sie kennen Ihren Markt am besten.',
            visual: (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '11px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Ihr Angebot</div>
                    <div style={{ color: '#475569', marginBottom: '5px' }}>Inspektion + Erstbehandlung</div>
                    <input readOnly value="€ 249,00" style={{ width: '100%', border: '1px solid #C8102E', padding: '6px', fontSize: '13px', fontWeight: 700, color: '#C8102E', background: '#fff', borderRadius: '3px', boxSizing: 'border-box' }} />
                    <div style={{ color: '#94a3b8', fontSize: '10px', marginTop: '4px' }}>Sie bestimmen den Preis — wir vermitteln.</div>
                </div>
            ),
        },
    ],
    freiheit: [
        {
            tag: 'Freiheit',
            title: 'Volle Kapazitätskontrolle',
            desc: 'Sie wählen, welche Aufträge Sie annehmen. Keine Annahmepflicht, keine Mindestquoten — arbeiten Sie, wann und wie viel Sie wollen.',
            visual: (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '11px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Verfügbarkeit</div>
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((d, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ color: '#475569' }}>{d}</span>
                            <div style={{ width: '32px', height: '16px', borderRadius: '8px', background: i === 2 ? '#e2e8f0' : '#C8102E', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: i === 2 ? 'auto' : '2px', left: i === 2 ? '2px' : 'auto' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            tag: 'Freiheit',
            title: 'Kein Vertragszwang',
            desc: 'Keine Mindestlaufzeit, kein Abo. Sie melden sich an, nehmen Aufträge an — und können jederzeit pausieren oder aufhören.',
            visual: (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '11px', color: '#475569' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Partnervertrag</div>
                    <div style={{ marginBottom: '4px' }}>Mindestlaufzeit: <strong style={{ color: '#16a34a' }}>Keine</strong></div>
                    <div style={{ marginBottom: '4px' }}>Monatliche Gebühr: <strong style={{ color: '#16a34a' }}>€0</strong></div>
                    <div style={{ marginBottom: '4px' }}>Kündigungsfrist: <strong style={{ color: '#16a34a' }}>Sofort</strong></div>
                    <div style={{ background: '#C8102E', color: '#fff', textAlign: 'center', padding: '6px', borderRadius: '4px', fontWeight: 700, marginTop: '10px' }}>Jetzt kostenlos starten</div>
                </div>
            ),
        },
        {
            tag: 'Freiheit',
            title: 'Innovative Plattform',
            desc: 'Mitgestalten statt nur nutzen — wir entwickeln die Plattform gemeinsam mit unseren Partnern. Ihr Feedback wird direkt umgesetzt.',
            visual: (
                <div style={{ background: '#0f172a', borderRadius: '8px', padding: '14px', fontSize: '11px', color: '#94a3b8' }}>
                    <div style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '8px' }}>Partner-Feedback</div>
                    {[
                        { text: 'Routenoptimierung', done: true },
                        { text: 'HACCP-Export PDF', done: true },
                        { text: 'Gruppenaufträge', done: false },
                    ].map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: f.done ? '#C8102E' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {f.done && <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4,7 8,3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span style={{ color: f.done ? '#e2e8f0' : '#64748b', textDecoration: f.done ? 'none' : 'none' }}>{f.text}</span>
                        </div>
                    ))}
                </div>
            ),
        },
    ],
};

function VorteileCarousel() {
    const [activeTab, setActiveTab] = useState<string>('auftraege');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const isDragging = React.useRef(false);
    const startX = React.useRef(0);
    const scrollLeft = React.useRef(0);

    // Mouse drag handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
        scrollRef.current.style.userSelect = 'none';
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };
    const onMouseUp = () => {
        isDragging.current = false;
        if (scrollRef.current) { scrollRef.current.style.cursor = 'grab'; scrollRef.current.style.userSelect = ''; }
    };

    const cards = VORTEIL_CARDS[activeTab] || [];

    return (
        <section style={{ background: '#fff', borderTop: '1px solid #f1f5f9', paddingTop: '64px', paddingBottom: '80px', overflow: 'hidden' }}>
            {/* Header + tabs */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#C8102E', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>Ihre Vorteile als Partner</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '0' }}>
                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                        Warum mit uns<br />zusammenarbeiten?
                    </h2>
                    <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, maxWidth: '420px', margin: 0 }}>
                        Stripe bringt Kunden, wir bringen Aufträge. Entscheiden Sie selbst, wie viel Sie arbeiten.
                    </p>
                </div>

                {/* Tab bar — like Stripe's "Нет кода | Низкий код | API" */}
                <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid #e2e8f0', marginTop: '40px', overflowX: 'auto' }}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); if (scrollRef.current) scrollRef.current.scrollLeft = 0; }}
                            style={{
                                padding: '12px 24px 14px',
                                background: 'none',
                                border: 'none',
                                borderBottom: `3px solid ${activeTab === tab.id ? '#C8102E' : 'transparent'}`,
                                marginBottom: '-2px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                flexShrink: 0,
                            }}
                        >
                            <div style={{ fontSize: '14px', fontWeight: 700, color: activeTab === tab.id ? '#C8102E' : '#64748b', transition: 'color 0.15s' }}>{tab.label}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{tab.sub}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Drag-scrollable card track */}
            <div
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                style={{
                    display: 'flex',
                    gap: '16px',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch',
                    cursor: 'grab',
                    paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 24px))',
                    paddingRight: '40px',
                    paddingTop: '32px',
                    paddingBottom: '8px',
                }}
            >
                {cards.map((card, i) => (
                    <div
                        key={`${activeTab}-${i}`}
                        onMouseEnter={() => setHoveredCard(i)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                            flexShrink: 0,
                            width: '320px',
                            scrollSnapAlign: 'start',
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#fff',
                            border: `1px solid ${hoveredCard === i ? '#C8102E' : '#e2e8f0'}`,
                            borderTop: `3px solid ${hoveredCard === i ? '#C8102E' : '#cbd5e1'}`,
                            borderRadius: '2px',
                            padding: '28px 24px 24px',
                            transition: 'all 0.18s ease',
                            transform: hoveredCard === i ? 'translateY(-6px)' : 'translateY(0)',
                            boxShadow: hoveredCard === i ? '0 12px 28px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)' : '0 1px 4px rgba(0,0,0,0.04)',
                            cursor: isDragging.current ? 'grabbing' : 'pointer',
                            minHeight: '400px',
                        }}
                    >
                        {/* Tag */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#C8102E', flexShrink: 0 }} />
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#C8102E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{card.tag}</span>
                        </div>

                        {/* Title + desc */}
                        <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0f172a', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '-0.01em' }}>
                            {card.title}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: '20px' }}>{card.desc}</p>

                        {/* Link */}
                        <a href="#anmelden" style={{ fontSize: '13px', fontWeight: 600, color: '#C8102E', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
                            Mehr erfahren <span style={{ transition: 'transform 0.15s', transform: hoveredCard === i ? 'translateX(4px)' : 'translateX(0)', display: 'inline-block' }}>›</span>
                        </a>

                        {/* Visual mockup */}
                        <div style={{ marginTop: 'auto' }}>{card.visual}</div>
                    </div>
                ))}

                {/* Spacer so last card isn't flush to edge */}
                <div style={{ flexShrink: 0, width: '1px' }} />
            </div>
        </section>
    );
}

// ─── Form ────────────────────────────────────────────────────────────────
function PartnerForm() {
    const [form, setForm] = useState<FormData>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.datenschutz) { setError('Bitte stimmen Sie der Datenschutzerklärung zu.'); return; }
        setLoading(true);
        try {
            const res = await fetch('/api/partner-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            const data = await res.json();
            if (!res.ok) setError(data.error || 'Fehler beim Senden.');
            else setSent(true);
        } catch { setError('Netzwerkfehler. Bitte versuchen Sie es erneut.'); }
        finally { setLoading(false); }
    };

    if (sent) return (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: '#1E293B', marginBottom: '10px' }}>Vielen Dank!</h3>
            <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.</p>
        </div>
    );

    return (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <label style={lbl}>Sind Sie Schädlingsbekämpfer? <span style={{ color: '#C8102E' }}>*</span></label>
                <select value={form.typ} onChange={set('typ')} required style={{ ...inp, cursor: 'pointer' }}>
                    <option value="" disabled>Bitte auswählen</option>
                    <option value="schaedlingsbekaempfer">Ja, ich bin Schädlingsbekämpfer.</option>
                    <option value="kooperation">Nein, aber ich interessiere mich für eine Zusammenarbeit.</option>
                </select>
            </div>

            {form.typ && (<>
                <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '6px 0' }} />
                <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', color: '#1E293B', margin: 0 }}>Ansprechpartner</h4>

                <div>
                    <label style={lbl}>Name <span style={{ color: '#C8102E' }}>*</span></label>
                    <input value={form.name} onChange={set('name')} required style={inp} placeholder="Max Mustermann" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                        <label style={lbl}>E-Mail <span style={{ color: '#C8102E' }}>*</span></label>
                        <input type="email" value={form.email} onChange={set('email')} required style={inp} placeholder="info@firma.de" />
                    </div>
                    <div>
                        <label style={lbl}>Telefon <span style={{ color: '#C8102E' }}>*</span></label>
                        <input type="tel" value={form.telefon} onChange={set('telefon')} required style={inp} placeholder="+49 30 …" />
                    </div>
                </div>

                {form.typ === 'schaedlingsbekaempfer' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={lbl}>Firma / Unternehmensname</label>
                            <input value={form.firma} onChange={set('firma')} style={inp} placeholder="Muster GmbH" />
                        </div>
                        <div>
                            <label style={lbl}>Einsatzgebiet / PLZ</label>
                            <input value={form.plz} onChange={set('plz')} style={inp} placeholder="10115, 12205 …" />
                        </div>
                    </div>
                )}

                <div>
                    <label style={lbl}>Anmerkungen (optional)</label>
                    <textarea value={form.anmerkung} onChange={set('anmerkung')} rows={3} style={{ ...inp, resize: 'vertical' }} placeholder="Erfahrungen, Kapazitäten, Fragen ..." />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px', background: '#f8fafc', border: '1px solid #d1d5db' }}>
                    <input type="checkbox" id="ds" checked={form.datenschutz} onChange={set('datenschutz')} style={{ marginTop: '2px', accentColor: '#C8102E', flexShrink: 0, width: '15px', height: '15px', cursor: 'pointer' }} />
                    <label htmlFor="ds" style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, cursor: 'pointer' }}>
                        Ich stimme zu, dass meine Daten zur Kontaktaufnahme und Partnerschaftsvermittlung verarbeitet werden (Art. 6 Abs. 1 lit. b DSGVO). Ich habe die <a href="/datenschutz" target="_blank" style={{ color: '#C8102E', textDecoration: 'underline' }}>Datenschutzerklärung</a> gelesen.{' '}<span style={{ color: '#C8102E' }}>*</span>
                    </label>
                </div>
            </>)}

            {error && <div style={{ padding: '11px 14px', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: '14px' }}>{error}</div>}

            {form.typ && (
                <button type="submit" disabled={loading} className="btn-color-hover" style={{ backgroundColor: loading ? '#94a3b8' : '#C8102E', color: '#fff', padding: '13px', fontWeight: 700, fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%' }}>
                    {loading ? 'Wird gesendet …' : 'Jetzt Partner werden'}
                </button>
            )}
        </form>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────
export default function PartnerPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main style={{ paddingTop: '68px' }} className="flex-grow w-full">


                {/* 1 ─ HERO SECTION */}
                <section style={{ padding: '40px 0 0', background: '#ffffff', overflow: 'hidden', position: 'relative', minHeight: '560px' }}>

                    {/* ── Background: Simple Circle Blob (as requested) ── */}
                    <div style={{
                        position: 'absolute',
                        top: 0, right: 0,
                        width: '65%',
                        height: '100%',
                        background: 'radial-gradient(circle at 60% 15%, rgba(200,16,46,0.15) 0%, rgba(200,16,46,0.03) 50%, rgba(200,16,46,0) 70%)',
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}>
                        {/* More intense inner blob to match original look */}
                        <div style={{
                            position: 'absolute',
                            top: '-5%', right: '5%',
                            width: '80%', height: '80%',
                            background: '#C8102E',
                            filter: 'blur(120px)',
                            opacity: 0.18,
                            borderRadius: '50%',
                        }} />
                    </div>

                    <div style={{
                        maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
                        display: 'grid', gridTemplateColumns: '1fr 1fr',
                        gap: '40px', alignItems: 'center', minHeight: '560px',
                        position: 'relative', zIndex: 1,
                    }} className="partner-hero-grid">

                        {/* LEFT: headline + body + buttons + partnership card */}
                        <div style={{ paddingBottom: '80px' }}>
                            <h1 style={{
                                fontFamily: 'Inter, system-ui, sans-serif',
                                fontWeight: 800,
                                fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                                lineHeight: 1.07,
                                color: '#0f172a',
                                marginBottom: '22px',
                                letterSpacing: '-0.03em',
                            }}>
                                Starten.<br />
                                <span style={{ color: '#C8102E' }}>Wachsen.</span><br />
                                Verdienen.
                            </h1>
                            <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, maxWidth: '440px', marginBottom: '34px' }}>
                                Qualifizierte Kunden-Anfragen direkt in Ihrer Region — ohne Kaltakquise, ohne Monatsgebühr. Melden Sie sich an und erhalten Sie Ihren ersten Auftrag innerhalb weniger Tage.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '48px' }}>
                                <a href="#anmelden" style={{
                                    backgroundColor: '#C8102E', color: '#fff',
                                    padding: '12px 28px', fontWeight: 700, fontSize: '15px',
                                    letterSpacing: '0.03em', textDecoration: 'none',
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    boxShadow: '0 4px 18px rgba(200,16,46,0.28)',
                                    borderRadius: '6px',
                                }}>
                                    Jetzt anmelden <span style={{ fontSize: '17px' }}>›</span>
                                </a>
                                <a href="#vorteile" style={{
                                    fontSize: '15px', fontWeight: 600, color: '#475569',
                                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px',
                                }}>
                                    Alle Vorteile <span>›</span>
                                </a>
                            </div>

                            {/* Partnership callout card */}
                            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '360px', width: '100%' }}>
                                <div style={{
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #C8102E 0%, #e84c1e 30%, #f97316 55%, #C8102E 78%, #6b0014 100%)',
                                    borderRadius: '6px 6px 0 0',
                                }} />
                                <div style={{
                                    background: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderTop: 'none',
                                    padding: '20px 24px',
                                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                                    borderRadius: '0 0 6px 6px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
                                        <div style={{ width: '20px', height: '20px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', flexShrink: 0 }}>
                                            <span style={{ color: '#fff', fontWeight: 900, fontSize: '12px', lineHeight: 1 }}>K</span>
                                        </div>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Kammerjäger Structon</span>
                                    </div>
                                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '7px', lineHeight: 1.4 }}>
                                        Partner werden — in 3 Minuten
                                    </p>
                                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65, marginBottom: '14px' }}>
                                        Erstellt für selbstständige Kammerjäger und Schädlingsbekämpfer, die mehr Aufträge ohne Mehraufwand wollen.
                                    </p>
                                    <a href="#anmelden" style={{ fontSize: '13px', fontWeight: 600, color: '#C8102E', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                        Jetzt starten <span style={{ fontSize: '14px' }}>↓</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: floating dashboard mock cards */}
                        <div className="partner-hero-mock" style={{ position: 'relative', height: '540px' }}>

                            {/* Main earnings card */}
                            <div style={{
                                position: 'absolute', left: '0px', top: '28px',
                                width: '224px', background: '#fff', borderRadius: '14px',
                                padding: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.14)', zIndex: 3,
                            }}>
                                <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Ausstehend</p>
                                <p style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '3px', letterSpacing: '-0.02em' }}>€280.81</p>
                                <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '14px' }}>Verfügbares Guthaben: €341.42</p>
                                <div style={{ background: '#C8102E', color: '#fff', padding: '9px 0', textAlign: 'center', borderRadius: '7px', fontSize: '13px', fontWeight: 700 }}>
                                    Sofort auszahlen
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Letzte Aufträge</p>
                                    {[
                                        { amount: '€432.33', info: '4 Aufträge', date: 'Gutgeschr. 17.09.' },
                                        { amount: '€487.32', info: '5 Aufträge', date: 'Gutgeschr. 16.09.' },
                                        { amount: '€290.79', info: '3 Aufträge', date: 'Gutgeschr. 15.09.' },
                                    ].map((r, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '9px' }}>
                                            <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                                <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4,7 8,3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{r.amount} <span style={{ fontWeight: 400, color: '#94a3b8' }}>({r.info})</span></p>
                                                <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>{r.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Revenue / analytics card */}
                            <div style={{
                                position: 'absolute', right: '0px', top: '8px',
                                width: '244px', background: '#fff', borderRadius: '14px',
                                padding: '18px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', zIndex: 2,
                            }}>
                                <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '2px' }}>Einnahmen</p>
                                <p style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '12px' }}>€5.839,41</p>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '60px', marginBottom: '8px' }}>
                                    {[20, 35, 28, 45, 38, 55, 42, 60, 48, 72].map((h, i) => (
                                        <div key={i} style={{
                                            flex: 1, borderRadius: '2px 2px 0 0',
                                            background: i === 9 ? '#C8102E' : `rgba(200,16,46,${0.18 + i * 0.075})`,
                                            height: `${h}%`,
                                        }} />
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '10px', color: '#cbd5e1' }}>Sep 2025</span>
                                    <span style={{ fontSize: '10px', color: '#cbd5e1' }}>Sep 2026</span>
                                </div>
                                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>September</p>
                                    {[
                                        { label: 'Neue Aufträge', val: '€1.216,75' },
                                        { label: 'Abgeschlossen', val: '€4.244,87' },
                                        { label: 'Stornierungen', val: '€22,38' },
                                    ].map((row, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '10px', color: '#94a3b8' }}>{row.label}</span>
                                            <span style={{ fontSize: '10px', fontWeight: 600, color: '#0f172a' }}>{row.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* First payment badge */}
                            <div style={{
                                position: 'absolute', bottom: '52px', right: '24px',
                                background: '#fff', borderRadius: '12px',
                                padding: '14px 18px', boxShadow: '0 6px 32px rgba(0,0,0,0.12)',
                                zIndex: 4, minWidth: '160px', textAlign: 'center',
                            }}>
                                <div style={{
                                    width: '30px', height: '30px', borderRadius: '50%', background: '#C8102E',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 8px',
                                    boxShadow: '0 3px 12px rgba(200,16,46,0.35)',
                                }}>
                                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,10.5 12,4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <p style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px', letterSpacing: '-0.02em' }}>€120.56</p>
                                <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Erster Auftrag erhalten!</p>
                            </div>

                        </div>
                    </div>

                    <style>{`
                        @media(max-width:768px){
                            .partner-hero-grid{ grid-template-columns:1fr !important; }
                            .partner-hero-mock{ display:none !important; }
                        }
                    `}</style>
                </section>


                {/* 2 ─ VORTEILE — Stripe-style tabbed drag-carousel */}
                <VorteileCarousel />

                {/* 3 ─ UNSERE WERTE */}
                <section style={{ padding: '80px 0', background: '#e8edf2', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#C8102E', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Unsere Werte</p>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', textTransform: 'uppercase', color: '#1E293B', marginBottom: '48px' }}>Ihr Erfolg ist unser Ziel</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
                            {[
                                { title: 'Zuverlässigkeit', desc: 'Wir vermitteln nur qualifizierte Aufträge, die perfekt zu Ihren Anforderungen passen.', svg: <svg width="22" height="22" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> },
                                { title: 'Qualität', desc: 'Transparente Prozesse und hochwertige Kundenanfragen sichern Ihren langfristigen Erfolg.', svg: <svg width="22" height="22" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> },
                                { title: 'Flexibilität', desc: 'Sie entscheiden selbst, welche Aufträge Sie annehmen — ganz nach Ihren Kapazitäten.', svg: <svg width="22" height="22" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> },
                                { title: 'Partnerschaft', desc: 'Gemeinsam optimieren wir unsere Plattform, um Ihnen das Arbeiten zu erleichtern.', svg: <svg width="22" height="22" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
                            ].map(item => (
                                <div key={item.title} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    <div style={{ width: '50px', height: '50px', border: '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                                        {item.svg}
                                    </div>
                                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '18px', color: '#1E293B', textTransform: 'uppercase', margin: 0 }}>{item.title}</h3>
                                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4 ─ SO FUNKTIONIERT'S */}
                <section style={{ padding: '80px 0', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#C8102E', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Der Prozess</p>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', textTransform: 'uppercase', color: '#1E293B', marginBottom: '48px' }}>So funktioniert&apos;s</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {[
                                { n: '1', title: 'Kunde meldet ein Problem', desc: 'Schädlingsbefall wird online oder telefonisch an unser Service-Team übermittelt.' },
                                { n: '2', title: 'Wir qualifizieren den Auftrag', desc: 'Unser Team prüft die Anfrage und klärt alle Details vorab mit dem Kunden (Lead-Gating).' },
                                { n: '3', title: 'Benachrichtigung über neue Aufträge', desc: 'Sie erhalten passende Aufträge direkt per E-Mail oder SMS mit allen relevanten Details.' },
                                { n: '4', title: 'Auftrag annehmen oder ablehnen', desc: 'Sie entscheiden völlig flexibel und unverbindlich, ob Sie den jeweiligen Auftrag übernehmen möchten.' },
                                { n: '5', title: 'Ausführung des Auftrags', desc: 'Sie vereinbaren den Termin, führen die Schädlingsbekämpfung durch und dokumentieren den Abschluss.' },
                                { n: '6', title: 'Erfolgreiche Abrechnung', desc: 'Erst nach erfolgreichem Abschluss wird eine transparente Vermittlungsprovision berechnet. Keine versteckten Kosten.' },
                            ].map((item, i) => (
                                <div key={item.n} style={{ display: 'flex', gap: '24px', padding: '28px 0', borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none', alignItems: 'flex-start' }}>
                                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '28px', color: '#94a3b8', lineHeight: 1.2, flexShrink: 0, width: '28px', paddingTop: '1px' }}>{item.n}</span>
                                    <div>
                                        <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '18px', color: '#1E293B', textTransform: 'uppercase', marginBottom: '6px' }}>{item.title}</h4>
                                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5 ─ REGISTRATION FORM (bottom) */}
                <section id="anmelden" style={{ padding: '80px 0', background: '#e8edf2', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
                        <div style={{ background: '#fff', border: '1px solid #d1d5db', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', padding: '48px 40px' }}>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', textTransform: 'uppercase', color: '#1E293B', marginBottom: '10px' }}>Jetzt anmelden</h2>
                            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '32px' }}>
                                Sie haben Interesse an einer Kooperation?<br />Melden Sie sich und wir treten mit Ihnen in Kontakt.
                            </p>
                            <PartnerForm />
                        </div>
                    </div>
                </section>

                {/* ── CTA Cards ── */}
                <CTACards variant="master" />

                {/* ── FAQ ── */}
                <div className="w-full px-4 mb-20 md:mb-28">
                    <FAQ 
                        title="Häufige Fragen für Partner" 
                        faqs={[
                            { question: "Gibt es wirklich keine monatlichen Grundgebühren?", answer: "Ja, unser Modell ist 100% fair. Es gibt keine Abo-Kosten, keine Einrichtungsgebühr und keine versteckten Kosten. Sie zahlen nur eine Provision, wenn Sie einen Auftrag erfolgreich abgeschlossen haben." },
                            { question: "Wie erhalte ich Aufträge in meiner Region?", answer: "Sie definieren in Ihrem Profil genau Ihren Einsatzradius (z.B. 30 km um Ihren Standort) und welche Leistungen Sie anbieten. Sie erhalten per E-Mail oder SMS sofort eine Benachrichtigung, wenn ein passender Auftrag in Ihrer Nähe verfügbar ist." },
                            { question: "Muss ich jeden Auftrag annehmen?", answer: "Nein, Sie sind völlig frei in Ihrer Entscheidung. Wenn Sie keine Kapazitäten haben, ignorieren Sie die Anfrage einfach. Es gibt keine Annahmequote, die Sie erfüllen müssen." },
                            { question: "Wie läuft die Bezahlung mit dem Kunden ab?", answer: "Sie rechnen direkt mit dem Kunden vor Ort ab – ganz so, wie Sie es gewohnt sind (Bar, EC-Karte, Rechnung). Anschließend erhalten wir unsere Vermittlungsprovision von Ihnen." }
                        ]} 
                    />
                </div>

            </main>
            <div style={{ marginTop: '-64px' }}>
                <Footer />
            </div>
        </div>
    );
}
