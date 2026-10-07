'use client';

// ServicePageContent — editorial content block for /schaedlinge/[service]
// Контентный блок для страниц отдельных вредителей

import { useState } from 'react';
import type { ServiceContent } from '@/lib/data/serviceContent';

/* ── FAQ accordion item ── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid #e8e8e8' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                    fontFamily: 'inherit',
                }}
            >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>
                    {question}
                </span>
                <span style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e0e0e0',
                    borderRadius: '50%',
                    transition: 'transform 0.2s, border-color 0.2s, background 0.2s',
                    transform: open ? 'rotate(45deg)' : 'none',
                    background: open ? '#1a1a1a' : 'transparent',
                    borderColor: open ? '#1a1a1a' : '#e0e0e0',
                }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke={open ? '#fff' : '#1a1a1a'} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </span>
            </button>
            {open && (
                <div style={{
                    paddingBottom: '20px',
                    fontSize: '14px',
                    lineHeight: 1.75,
                    color: '#555',
                }}>
                    {answer}
                </div>
            )}
        </div>
    );
}

/* ── Main component ── */
export default function ServicePageContent({ content }: { content: ServiceContent }) {
    return (
        <div style={{ width: '100%', background: '#fff' }}>

            {/* ── 1. Intro Banner ── */}
            <section style={{
                width: '100%',
                background: '#fafafa',
                borderTop: '1px solid #f0f0f0',
                borderBottom: '1px solid #f0f0f0',
                padding: '64px 24px',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '48px',
                        alignItems: 'start',
                    }}>

                        {/* Left: Intro text */}
                        <div>
                            <p style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase' as const,
                                color: '#C8102E',
                                marginBottom: '12px',
                            }}>
                                Experten-Info
                            </p>
                            <p style={{
                                fontSize: '17px',
                                lineHeight: 1.7,
                                color: '#333',
                                marginBottom: '20px',
                                maxWidth: '540px',
                            }}>
                                {content.intro}
                            </p>
                            {/* Warning bar */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 16px',
                                background: '#fff5f5',
                                border: '1px solid #ffd5d5',
                                borderLeft: '3px solid #C8102E',
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8102E" strokeWidth="2" strokeLinecap="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#C8102E' }}>
                                    {content.warning}
                                </span>
                            </div>
                        </div>

                        {/* Right: Quick facts */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${content.facts.length}, 1fr)`,
                            gap: '1px',
                            background: '#e8e8e8',
                            border: '1px solid #e8e8e8',
                        }}>
                            {content.facts.map((fact, i) => (
                                <div key={i} style={{
                                    background: '#fff',
                                    padding: '24px 20px',
                                    textAlign: 'center',
                                }}>
                                    <div style={{
                                        fontSize: '26px',
                                        fontWeight: 900,
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        color: '#1a1a1a',
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1,
                                        marginBottom: '6px',
                                    }}>
                                        {fact.value}
                                    </div>
                                    <div style={{
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        textTransform: 'uppercase' as const,
                                        letterSpacing: '0.12em',
                                        color: '#999',
                                    }}>
                                        {fact.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Risks section ── */}
            <section style={{
                width: '100%',
                background: '#1a1a1a',
                padding: '64px 24px',
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '48px',
                        alignItems: 'start',
                    }}>
                        <div>
                            <p style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase' as const,
                                color: '#C8102E',
                                marginBottom: '12px',
                            }}>
                                Warum jetzt handeln?
                            </p>
                            <h2 style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                                fontWeight: 900,
                                color: '#fff',
                                textTransform: 'uppercase' as const,
                                lineHeight: 1.05,
                                letterSpacing: '-0.02em',
                                marginBottom: 0,
                            }}>
                                Die Risiken<br />eines Befalls.
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                            {content.risks.map((risk, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '14px',
                                }}>
                                    <span style={{
                                        flexShrink: 0,
                                        width: '20px',
                                        height: '20px',
                                        background: '#C8102E',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: '1px',
                                    }}>
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span style={{ fontSize: '14px', lineHeight: 1.65, color: '#ccc' }}>
                                        {risk}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. FAQ ── */}
            <section style={{
                width: '100%',
                background: '#fff',
                padding: '72px 24px 80px',
            }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <p style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase' as const,
                        color: '#C8102E',
                        marginBottom: '12px',
                    }}>
                        Häufige Fragen
                    </p>
                    <h2 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                        fontWeight: 900,
                        color: '#1a1a1a',
                        textTransform: 'uppercase' as const,
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        marginBottom: '40px',
                    }}>
                        Was Sie wissen sollten.
                    </h2>
                    <div style={{ borderTop: '1px solid #e8e8e8' }}>
                        {content.faqs.map((faq, i) => (
                            <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
