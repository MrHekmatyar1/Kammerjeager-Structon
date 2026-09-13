'use client';

// BezirkInfo — уникальный SEO-блок с информацией о берлинском районе.
// Рендерится только для isBerlinBezirk === true страниц.
// Даёт Google уникальный контент для каждой страницы — предотвращает определение как duplicate content.

import type { City } from '@/lib/data/cities';
import { SERVICES } from '@/lib/data/services';
import Link from 'next/link';

export default function BezirkInfo({ city }: { city: City }) {
    const info = city.bezirkInfo;
    if (!info) return null;

    return (
        <section style={{
            width: '100%',
            background: '#fff',
            padding: '72px 24px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div style={{ width: '100%', maxWidth: '860px' }}>

                {/* ── Heading ── */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#C8102E',
                        marginBottom: '10px',
                    }}>
                        Kammerjäger in {city.name}
                    </div>
                    <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 'clamp(28px, 5vw, 48px)',
                        fontWeight: 900,
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        lineHeight: 1.05,
                        margin: '0 0 20px',
                    }}>
                        Schädlingsbekämpfung<br />in {city.name}
                    </h2>
                </div>

                {/* ── Heading ── */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#C8102E',
                        marginBottom: '10px',
                    }}>
                        Kammerjäger in {city.name}
                    </div>
                    <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 'clamp(28px, 5vw, 48px)',
                        fontWeight: 900,
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        lineHeight: 1.05,
                        margin: '0 0 20px',
                    }}>
                        Schädlingsbekämpfung<br />in {city.name}
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: '#475569',
                        lineHeight: 1.75,
                        maxWidth: '680px',
                        margin: 0,
                    }}>
                        {info.description}
                    </p>
                </div>

                {/* ── Pest Context Card ── */}
                <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #C8102E',
                    borderRadius: '4px',
                    padding: '20px 24px',
                    marginBottom: '48px',
                }}>
                    <div style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#C8102E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '8px',
                    }}>
                        Schädlingssituation in {city.name}
                    </div>
                    <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, margin: 0 }}>
                        {info.pestContext}
                    </p>
                </div>

                {/* ── Stats Row ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '16px',
                    marginBottom: '56px',
                }}>
                    <StatCard label="Einwohner" value={info.population} />
                    <StatCard label="Bebauung" value={info.buildingType.split(',')[0] ?? info.buildingType} />
                    <StatCard label="Reaktionszeit" value="< 24 Stunden" />
                    <StatCard label="Zertifiziert" value="IHK-Geprüft" />
                </div>

                {/* ── Top Pests ── */}
                <div style={{ marginBottom: '56px' }}>
                    <h3 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '22px',
                        fontWeight: 800,
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                    }}>
                        Häufigste Schädlinge in {city.name}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {info.topPests.map(pest => (
                            <span key={pest} style={{
                                background: '#0f172a',
                                color: '#fff',
                                padding: '6px 16px',
                                fontSize: '13px',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase',
                            }}>
                                {pest}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Services Grid (Interne Verlinkung) ── */}
                <div>
                    <h3 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: '22px',
                        fontWeight: 800,
                        color: '#0f172a',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                    }}>
                        Unsere Leistungen in {city.name}
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '12px',
                    }}>
                        {SERVICES.map(service => (
                            <Link
                                key={service.slug}
                                href={`/${city.slug}/${service.slug}`}
                                className="group block px-[16px] py-[14px] bg-white border-[1.5px] border-[#e2e8f0] rounded-xl no-underline transition-colors hover:border-[#C8102E] hover:bg-[#fff5f5]"
                            >
                                <div className="text-[13px] font-bold text-[#0f172a] mb-[4px] group-hover:text-[#C8102E] transition-colors">
                                    {service.shortName}
                                </div>
                                <div className="text-[11px] text-[#64748b] leading-[1.4] flex items-center gap-[4px] group-hover:text-[#C8102E] transition-colors">
                                    in {city.name}
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div style={{
            padding: '16px 20px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
        }}>
            <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: '6px',
            }}>
                {label}
            </div>
            <div style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#0f172a',
            }}>
                {value}
            </div>
        </div>
    );
}
