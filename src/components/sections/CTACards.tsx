'use client';

import Link from 'next/link';
import { useState } from 'react';

// Card data type
interface ActionCardProps {
    title: string;
    desc: string;
    linkText: string;
    href: string;
    gradient: string; // CSS gradient string
}

function ActionCard({ title, desc, linkText, href, gradient }: ActionCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            className="no-underline"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    border: `1.5px solid ${hovered ? '#C8102E' : '#e5e7eb'}`,
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#fff',
                    transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                    boxShadow: hovered ? '0 4px 20px rgba(200,16,46,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    height: '100%',
                    minHeight: '140px',
                }}
            >
                {/* Text side */}
                <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                        <p style={{ fontWeight: 700, fontSize: '15px', color: '#0f0f0f', marginBottom: '8px', lineHeight: 1.4 }}>{title}</p>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                    </div>
                    <span
                        style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#C8102E',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'gap 0.15s ease',
                        }}
                    >
                        {linkText}
                        <span style={{ transition: 'transform 0.15s ease', display: 'inline-block', transform: hovered ? 'translateX(3px)' : 'translateX(0)' }}>
                            {hovered ? '→' : '>'}
                        </span>
                    </span>
                </div>

                {/* Gradient side */}
                <div
                    style={{
                        width: '120px',
                        flexShrink: 0,
                        background: gradient,
                        transition: 'opacity 0.18s ease',
                        opacity: hovered ? 0.9 : 1,
                    }}
                />
            </div>
        </Link>
    );
}

// Variants per page context
export type CTACardVariant = 'master' | 'client' | 'b2b';

const VARIANTS: Record<CTACardVariant, { left: ActionCardProps; right: ActionCardProps }> = {
    master: {
        left: {
            title: 'Jetzt als Partner registrieren.',
            desc: 'Kein Abo, keine Grundgebühr — nur Provision bei erfolgreichem Auftrag. In 3 Minuten angemeldet.',
            linkText: 'Partner werden',
            href: '/fuer-schaedlingsbekaempfer#anmeldung',
            // Deep red → near-black — brand aligned, unique
            gradient: 'linear-gradient(135deg, #C8102E 0%, #6b0016 55%, #1a0006 100%)',
        },
        right: {
            title: 'Wie viele Aufträge kann ich erwarten?',
            desc: 'Erfahre, wie unser Netzwerk arbeitet und wie viel andere Kammerjäger in deiner Region verdienen.',
            linkText: 'Mehr erfahren',
            href: '/fuer-schaedlingsbekaempfer#vorteile',
            // Dark slate → anthracite
            gradient: 'linear-gradient(135deg, #334155 0%, #1e293b 60%, #0f172a 100%)',
        },
    },
    client: {
        left: {
            title: 'Kostenlose Preisschätzung erhalten.',
            desc: 'In 2 Minuten Ihren Schädling auswählen und sofort einen unverbindlichen Festpreis berechnen.',
            linkText: 'Preis berechnen',
            href: '/#anfrage',
            // Warm red → burgundy
            gradient: 'linear-gradient(135deg, #C8102E 0%, #9b1225 50%, #3d0008 100%)',
        },
        right: {
            title: 'Online Termin buchen.',
            desc: 'Wählen Sie Ihren Wunschtermin direkt online — ohne Warteschleife, ohne Rückruf abwarten.',
            linkText: 'Termin buchen',
            href: '/#anfrage',
            // Deep charcoal → near-black
            gradient: 'linear-gradient(135deg, #475569 0%, #1e293b 55%, #0f172a 100%)',
        },
    },
    b2b: {
        left: {
            title: 'Kostenlose Erstbegehung anfragen.',
            desc: 'Unser Techniker inspiziert Ihre Räumlichkeiten unverbindlich — inklusive schriftlichem Befundbericht.',
            linkText: 'Jetzt anfragen',
            href: '/geschaeftskunden#kontakt',
            // Brand red → deep red
            gradient: 'linear-gradient(135deg, #C8102E 0%, #8b0c20 55%, #2d0009 100%)',
        },
        right: {
            title: 'HACCP-Schutzkonzept anfordern.',
            desc: 'Erhalten Sie ein individuelles Konzept für Ihren Betrieb — audit-sicher, IFS-konform, sofort einsetzbar.',
            linkText: 'Konzept anfordern',
            href: '/geschaeftskunden#kontakt',
            // Dark teal → charcoal
            gradient: 'linear-gradient(135deg, #1e3a5f 0%, #162032 60%, #0a0f1a 100%)',
        },
    },
};

interface CTACardsProps {
    variant: CTACardVariant;
}

export default function CTACards({ variant }: CTACardsProps) {
    const cards = VARIANTS[variant];

    return (
        <section style={{ width: '100%', padding: '0 24px 72px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <ActionCard {...cards.left} />
                <ActionCard {...cards.right} />
            </div>
        </section>
    );
}
