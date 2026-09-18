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


                {/* 1 ─ STRIPE-STYLE HERO */}
                <section style={{ padding: '64px 0 0', background: '#fff', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', minHeight: '560px' }}>

                        {/* LEFT: headline + body + buttons + partnership card */}
                        <div style={{ paddingBottom: '80px' }}>
                            {/* Big headline — Stripe style */}
                            <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 800, fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', lineHeight: 1.08, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.03em' }}>
                                Starten.<br />
                                <span style={{ color: '#C8102E' }}>Wachsen.</span><br />
                                Verdienen.
                            </h1>
                            <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, maxWidth: '480px', marginBottom: '32px' }}>
                                Qualifizierte Kunden-Anfragen direkt in Ihrer Region — ohne Kaltakquise, ohne Monatsgebühr. Melden Sie sich an und erhalten Sie Ihren ersten Auftrag innerhalb weniger Tage.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '48px' }}>
                                <a href="#anmelden" style={{ backgroundColor: '#C8102E', color: '#fff', padding: '13px 28px', fontWeight: 700, fontSize: '15px', letterSpacing: '0.04em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(200,16,46,0.25)', borderRadius: '4px' }}>
                                    Jetzt anmelden <span style={{ fontSize: '18px' }}>›</span>
                                </a>
                                <a href="#vorteile" style={{ fontSize: '15px', fontWeight: 600, color: '#475569', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    Alle Vorteile <span>›</span>
                                </a>
                            </div>

                            {/* 4th screenshot style card — exact Stripe clone in our colors */}
                            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '340px', width: '100%' }}>
                                {/* Rainbow gradient line on top — our colors: red → orange → amber */}
                                <div style={{
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #C8102E 0%, #e84c1e 18%, #f97316 36%, #f59e0b 54%, #C8102E 72%, #7b0018 100%)',
                                    borderRadius: '3px 3px 0 0',
                                }} />
                                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderTop: 'none', padding: '20px 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                                    {/* Logo + label row */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                                        <div style={{ width: '22px', height: '22px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', flexShrink: 0 }}>
                                            <span style={{ color: '#fff', fontWeight: 900, fontSize: '13px', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>K</span>
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Kammerjäger Structon</span>
                                    </div>
                                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', lineHeight: 1.3 }}>Partner werden — in 3 Minuten</p>
                                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '14px' }}>
                                        Erstellt für selbstständige Kammerjäger und Schädlingsbekämpfer, die mehr Aufträge ohne Mehraufwand wollen.
                                    </p>
                                    <a href="#anmelden" style={{ fontSize: '13px', fontWeight: 600, color: '#C8102E', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        Jetzt starten <span style={{ fontSize: '16px' }}>↓</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: floating dashboard mock */}
                        <div style={{ position: 'relative', height: '540px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>

                            {/* Background blob */}
                            <div style={{
                                position: 'absolute', top: '-40px', right: '-60px', width: '480px', height: '480px',
                                background: 'radial-gradient(ellipse at 60% 40%, rgba(200,16,46,0.18) 0%, rgba(200,16,46,0.06) 50%, transparent 75%)',
                                borderRadius: '50%', zIndex: 0,
                            }} />

                            {/* Main earnings card */}
                            <div style={{ position: 'absolute', left: '0px', top: '20px', width: '220px', background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', zIndex: 3 }}>
                                <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Ausstehend</p>
                                <p style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '4px', letterSpacing: '-0.02em' }}>€280.81</p>
                                <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>Verfügbares Guthaben: €341.42</p>
                                <div style={{ background: '#C8102E', color: '#fff', padding: '9px 0', textAlign: 'center', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                                    Sofort auszahlen
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Letzte Aufträge</p>
                                    {[
                                        { amount: '€432.33', info: '4 Aufträge', date: 'Gutgeschr. 17.09.' },
                                        { amount: '€487.32', info: '5 Aufträge', date: 'Gutgeschr. 16.09.' },
                                        { amount: '€290.79', info: '3 Aufträge', date: 'Gutgeschr. 15.09.' },
                                    ].map((r, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4,7 8,3" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{r.amount} <span style={{ fontWeight: 400, color: '#94a3b8' }}>({r.info})</span></p>
                                                <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{r.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Revenue chart card */}
                            <div style={{ position: 'absolute', right: '0px', top: '0px', width: '240px', background: '#fff', borderRadius: '12px', padding: '18px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', zIndex: 2 }}>
                                <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Einnahmen</p>
                                <p style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '14px' }}>€5.839,41</p>
                                {/* Mini bar chart */}
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', marginBottom: '10px' }}>
                                    {[20, 35, 28, 45, 38, 55, 42, 60, 48, 72].map((h, i) => (
                                        <div key={i} style={{ flex: 1, borderRadius: '2px 2px 0 0', background: i === 9 ? '#C8102E' : `rgba(200,16,46,${0.2 + i * 0.07})`, height: `${h}%` }} />
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>Sep 2025</span>
                                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>Sep 2026</span>
                                </div>
                                <div style={{ marginTop: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>September</p>
                                    {[
                                        { label: 'Neue Aufträge', val: '€1.216,75' },
                                        { label: 'Abgeschlossen', val: '€4.244,87' },
                                        { label: 'Stornierungen', val: '€22.38' },
                                    ].map((row, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{row.label}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a' }}>{row.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Success notification */}
                            <div style={{ position: 'absolute', bottom: '30px', right: '20px', background: '#fff', borderRadius: '10px', padding: '14px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 4, minWidth: '160px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#C8102E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,10.5 12,4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', textAlign: 'center', margin: '0 0 2px', letterSpacing: '-0.02em' }}>€120.56</p>
                                <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>Erster Auftrag erhalten!</p>
                            </div>

                        </div>
                    </div>

                    {/* Mobile fallback: stack vertically */}
                    <style>{`@media(max-width:768px){.partner-hero-grid{grid-template-columns:1fr !important;}.partner-hero-mock{display:none !important;}}`}</style>
                </section>


                {/* 2 ─ VORTEILE (simple text list, compact headline) */}
                <section style={{ padding: '80px 0', background: '#fff' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#C8102E', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Ihre Vorteile als Partner</p>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', textTransform: 'uppercase', color: '#1E293B', marginBottom: '40px' }}>Warum mit uns zusammenarbeiten?</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                            {[
                                { title: 'Qualifizierte Aufträge', desc: 'Sie erhalten vorqualifizierte Kundenanfragen mit Befall-Details, Adresse, Kontaktdaten und Dringlichkeit. Kein Kaltakquise-Aufwand.' },
                                { title: 'Regionale Zuteilung', desc: 'Ausschließlich Aufträge in Ihrem Einsatzgebiet. Sie definieren Ihre Postleitzahlen — keine weiten Anfahrtswege.' },
                                { title: 'Faire Preisgestaltung', desc: 'Ihre Preise bleiben vollständig flexibel und werden von uns nicht eingeschränkt, solange sie marktgerecht sind.' },
                                { title: 'Keine Kosten bei Stornierung', desc: 'Abgerechnet wird ausschließlich für erfolgreich abgeschlossene Aufträge. Kein finanzielles Risiko Ihrerseits.' },
                                { title: 'Volle Kapazitätskontrolle', desc: 'Sie entscheiden selbst, welche Aufträge Sie annehmen. Keine Annahmepflicht, kein Vertragszwang.' },
                                { title: 'Innovative Plattform', desc: 'Gestalten Sie Optimierungen aktiv mit. Wir bauen unsere Prozesse gemeinsam mit unseren Partnern kontinuierlich aus.' },
                            ].map(item => (
                                <div key={item.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                    <span style={{ color: '#C8102E', fontWeight: 900, fontSize: '20px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>—</span>
                                    <div>
                                        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '18px', textTransform: 'uppercase', color: '#1E293B', marginBottom: '8px' }}>{item.title}</h3>
                                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '40px' }}>
                            <a href="#anmelden" style={{ backgroundColor: '#C8102E', color: '#fff', padding: '13px 36px', fontWeight: 700, fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>
                                Jetzt Partner werden
                            </a>
                        </div>
                    </div>
                </section>

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
