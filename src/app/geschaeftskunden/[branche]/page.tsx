'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BRANCHES: Record<string, {
    slug: string;
    title: string;
    subtitle: string;
    heroImg: string;
    heroImgPosition?: string;
    breadcrumb: string;
    label: string;
    intro: string;
    introBody: string;
    stats: { value: string; label: string }[];
    risks: { icon: string; title: string; desc: string; law?: string }[];
    process: { step: string; title: string; desc: string }[];
    benefits: { icon: string; title: string; desc: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
}> = {
    gastronomie: {
        slug: 'gastronomie',
        title: 'Schädlingsschutz\nfür Gastronomie &\nLebensmittelbetriebe',
        subtitle: 'HACCP-konform · EU-VO 852/2004 · IFS Food · Audit-sicher',
        heroImg: '/b2b/b2b_hero_gastronomie.jpg',
        heroImgPosition: 'center',
        breadcrumb: 'Gastronomie & Lebensmittel',
        label: 'B2B SCHÄDLINGSSCHUTZ',
        intro: 'Ein Schädlingsfall kann Ihren Betrieb schließen. Wir verhindern das.',
        introBody: 'In der Gastronomie und Lebensmittelbranche sind Schädlinge nicht nur ein Hygieneproblem — sie sind eine existenzielle Bedrohung. Ein einziger Fund bei der Lebensmittelkontrolle, ein negativer Google-Bewertungseintrag oder ein Bericht im Gesundheitsamt kann jahrelange Aufbauarbeit zunichte machen. Wir schützen Ihren Betrieb mit HACCP-konformen Maßnahmen, arbeiten ausschließlich außerhalb der Öffnungszeiten, kommen in neutralen Fahrzeugen — und hinterlassen vollständige Audit-Dokumentation für jede Behördenkontrolle.',
        stats: [
            { value: '24/7', label: 'Notfallerreichbarkeit' },
            { value: '100%', label: 'HACCP-konform' },
            { value: '<2h', label: 'Reaktionszeit' },
            { value: '0€', label: 'Erstinspektion' },
        ],
        risks: [
            {
                icon: '🪳',
                title: 'Schaben & Kakerlaken',
                desc: 'Die häufigste und gefährlichste Bedrohung für Küchenbetriebe. Schaben übertragen Salmonellen, E. coli und Listerien auf Lebensmitteloberflächen und sind beim zuständigen Gesundheitsamt meldepflichtig. Ein Fund führt in der Regel zur sofortigen Betriebsschließung.',
                law: 'Meldepflicht §§ 42, 43 LFGB',
            },
            {
                icon: '🐀',
                title: 'Nager: Ratten & Mäuse',
                desc: 'Nager fressen Vorräte an, beschädigen Elektro- und Wasserleitungen und verbreiten Leptospirose, Hantavirus und Salmonellen. In Küchen und Lagerbereichen sind sie ein direkter IFS Food-Verstoß und führen zu Punktabzügen im Hygieneaudit.',
                law: 'IFS Food · LMHV Verstoß',
            },
            {
                icon: '🪰',
                title: 'Fliegen & Vorratsschädlinge',
                desc: 'Schmeißfliegen, Fruchtfliegen und Vorratsmotten verunreinigen offene Lebensmittel und Arbeitsflächen. Sie sind ein sichtbares Hygieneversagen — gefährlich für Gästerezensionen und inkompatibel mit HACCP-Eigenkontrollsystemen.',
                law: 'EU-VO 852/2004 Anhang II',
            },
            {
                icon: '🐜',
                title: 'Ameisen & Krabbeltiere',
                desc: 'Ameisen dringen in geschlossene Lebensmittelverpackungen ein und hinterlassen Pheromone, die Folgekolonien anlocken. Ihre Bekämpfung erfordert systemisches Vorgehen — Oberflächen-Sprühbehandlungen sind wirkungslos und nicht HACCP-konform.',
                law: 'HACCP CCP-Überwachung',
            },
        ],
        process: [
            { step: '01', title: 'Risikoanalyse vor Ort', desc: 'Wir kartieren alle kritischen Kontrollpunkte (CCPs) gemäß HACCP-Anforderungen — von der Warenannahme über die Kühlung bis zu den Abfallbereichen.' },
            { step: '02', title: 'Maßgeschneiderter Tilgungsplan', desc: 'Gezielte Bekämpfung nur mit BVL-zugelassenen Mitteln, außerhalb Ihrer Öffnungszeiten. Kein Betriebsstopp, keine Erkennungszeichen.' },
            { step: '03', title: 'Digitales Monitoring', desc: 'Installation eines lückenlosen Köder- und Fallensystems mit regelmäßiger Inspektion. Alle Befunde werden digital erfasst und sind sofort abrufbar.' },
            { step: '04', title: 'Audit-sichere Dokumentation', desc: 'Vollständige HACCP-Nachweisdokumentation für Gesundheitsamt, Veterinäramt und IFS-Food-Audits — sofort einsatzbereit für jede Kontrolle.' },
        ],
        benefits: [
            { icon: '📋', title: 'HACCP-Dokumentation inklusive', desc: 'Vollständige Nachweisdokumentation für Betriebsakte, Gesundheitsamt und Lebensmittelaudits (IFS Food, BRCGS, EU-VO 852/2004) — ohne Mehrkosten.' },
            { icon: '🌙', title: 'Einsatz außerhalb der Öffnungszeiten', desc: 'Abends, nachts oder früh morgens — vollkommen unbemerkt von Gästen und Mitarbeitern. Kein einziger Betriebsausfall.' },
            { icon: '🚗', title: 'Neutrale Fahrzeuge & Kleidung', desc: 'Kein Logo, keine Schutzanzüge, keine Erkennungszeichen. Vollständiger Schutz Ihres Rufs gegenüber Nachbarn, Gästen und Konkurrenten.' },
            { icon: '🔔', title: 'Präventionsvertrag & Monitoring', desc: 'Quartalsweise Inspektionen mit digitalem Protokoll. Sofort-Alarm bei Aktivität — Sie erfahren es, bevor ein Gast es sieht.' },
        ],
        ctaTitle: 'Jetzt diskrete Erstberatung anfordern',
        ctaSubtitle: 'Kostenlos, unverbindlich und vertraulich. In der Regel innerhalb von 2 Stunden rückgemeldet.',
    },
    hotellerie: {
        slug: 'hotellerie',
        title: 'Schädlingsschutz\nfür Hotels &\nGastgewerbe',
        subtitle: 'Diskret · Schnell · Für höchste Gästezufriedenheit',
        heroImg: '/b2b/b2b_hero_hotellerie.jpg',
        heroImgPosition: 'center 20%',
        breadcrumb: 'Hotellerie & Gewerbe',
        label: 'B2B SCHÄDLINGSSCHUTZ',
        intro: 'Eine einzige Bewertung mit "Bettwanzen" kann Ihre Buchungsrate halbieren.',
        introBody: 'In der Hotellerie ist Diskretion das höchste Gut. Eine einzige Bewertung mit Erwähnung von Schädlingen kann Buchungsraten drastisch senken und das Vertrauen jahrelanger Stammgäste zerstören. Unsere Techniker kommen in Zivilkleidung und neutralen Fahrzeugen, behandeln betroffene Zimmer während der regulären Zimmerpflege und hinterlassen keinerlei Hinweise auf einen Einsatz. Wir sichern Ihren Betrieb — diskret, schnell, zuverlässig.',
        stats: [
            { value: '24/7', label: 'Notfallerreichbarkeit' },
            { value: '100%', label: 'Diskretion garantiert' },
            { value: '<2h', label: 'Reaktionszeit' },
            { value: '0€', label: 'Erstinspektion' },
        ],
        risks: [
            { icon: '🛏️', title: 'Bettwanzen', desc: 'Der Albtraum jedes Hoteliers. Bettwanzen verstecken sich in Matratzen, Bettgestellen und Wandritzen und breiten sich bei Nichtbehandlung rasend schnell über benachbarte Zimmer aus. Frühzeitige Erkennung ist entscheidend.', law: 'Haftungsrisiko Gäste' },
            { icon: '🪳', title: 'Schaben in Küchen', desc: 'Hotelküchen und Frühstücksbuffets sind bevorzugte Lebensräume. HACCP-Verstöße drohen, wenn kein professionelles Monitoring besteht. Besonders kritisch in Kombination mit Lebensmittellagerung.', law: 'HACCP · IFS Food' },
            { icon: '🐀', title: 'Nager', desc: 'Besonders in Außenbereichen, Lagerräumen und Kellern. Beschädigen Infrastruktur und Kabel, schrecken Gäste ab und können in negativen Online-Bewertungen erwähnt werden.', law: 'Reputationsrisiko' },
            { icon: '🕊️', title: 'Tauben & Vögel', desc: 'Verschmutzen Balkone, Dachterrassen und Fassaden, hinterlassen gesundheitsschädliche Exkremente und beeinträchtigen das Gesamtbild des Hotels erheblich.', law: 'Tierschutzgerechte Abwehr' },
        ],
        process: [
            { step: '01', title: 'Diskrete Inspektion', desc: 'Unsere Techniker in Zivilkleidung führen eine vollständige Risikoanalyse durch — ohne dass Gäste oder Personal etwas bemerken.' },
            { step: '02', title: 'Zimmerweise Behandlung', desc: 'Wir behandeln nur betroffene Bereiche, ohne den restlichen Hotelbetrieb zu stören. Zimmer sind in der Regel innerhalb von Stunden wieder belegbar.' },
            { step: '03', title: 'Präventives Monitoring', desc: 'Regelmäßige Inspektionen aller Risikobereiche: Küche, Keller, Lager, Außenanlagen, Tiefgarage. Mit digitalem Protokoll.' },
            { step: '04', title: 'Sofort-Reaktion bei Befall', desc: 'Bei akutem Befall sind wir in der Regel innerhalb von 2 Stunden vor Ort — auch am Wochenende und an Feiertagen.' },
        ],
        benefits: [
            { icon: '👔', title: 'Einsatz in Zivilkleidung', desc: 'Keine Schutzanzüge oder auffällige Ausrüstung — vollständige Diskretion gegenüber Gästen und Personal.' },
            { icon: '⚡', title: '24/7 Notfallservice', desc: 'Bei akutem Befall sind wir in der Regel innerhalb weniger Stunden vor Ort, auch am Wochenende und an Feiertagen.' },
            { icon: '🏨', title: 'Zimmerweise Behandlung', desc: 'Wir behandeln nur betroffene Bereiche, ohne den restlichen Hotelbetrieb zu stören.' },
            { icon: '📋', title: 'Präventionsverträge', desc: 'Regelmäßige Inspektionen aller Risikobereiche — Küche, Keller, Lager, Außenbereiche.' },
        ],
        ctaTitle: 'Jetzt Notfallservice anfordern',
        ctaSubtitle: 'Kostenlos, unverbindlich und vertraulich. In der Regel innerhalb von 2 Stunden rückgemeldet.',
    },
    lager: {
        slug: 'lager',
        title: 'Schädlingsschutz\nfür Lager &\nLogistikbetriebe',
        subtitle: 'BRC · IFS Food · ISO-konform · Digitales Monitoring',
        heroImg: '/b2b/b2b_hero_lager.jpg',
        breadcrumb: 'Lager & Logistik',
        label: 'B2B SCHÄDLINGSSCHUTZ',
        intro: 'Schädlinge im Lager gefährden Ihre Waren, Audits und Lieferketten.',
        introBody: 'Schädlinge in Lagerhallen und Logistikzentren können immense wirtschaftliche Schäden verursachen — verdorbene Waren, beschädigte Verpackungen, gefährdete Lieferketten und gescheiterte Zertifizierungsaudits. Unser kontinuierliches Monitoring mit modernen digitalen Fallen und Detektionssystemen erkennt Schädlinge frühzeitig, bevor sie sich ausbreiten. Wir arbeiten nach BRC, IFS und ISO-Standards und liefern vollständige Dokumentation für alle gängigen Lebensmittelsicherheits-Audits.',
        stats: [
            { value: '24/7', label: 'Monitoring-Alarmierung' },
            { value: '100%', label: 'Audit-Dokumentation' },
            { value: 'BRC', label: 'IFS · ISO-konform' },
            { value: '<2h', label: 'Reaktionszeit' },
        ],
        risks: [
            { icon: '🐀', title: 'Ratten & Mäuse', desc: 'Benagen Kabel, Verpackungen und Lagergut. Lösen Kurzschlüsse und Brandgefahren aus. In Lebensmittellagern führt ein Nagerfund direkt zum Audit-Fail und zur Rückrufaktion.', law: 'BRC · IFS Food Verstoß' },
            { icon: '🪲', title: 'Vorratsschädlinge', desc: 'Getreidekäfer, Motten und Mehlwürmer vernichten Lebensmittelvorräte und lösen kostspielige Rückrufaktionen aus. Früherkennung durch digitale Monitoring-Systeme ist entscheidend.', law: 'Rückrufrisiko' },
            { icon: '🪳', title: 'Schaben', desc: 'Besonders in Kühlhäusern und Lebensmittellagern ein ernstes Hygieneproblem mit Meldepflicht. Schaben sind äußerst resistent und erfordern systematisches Vorgehen.', law: 'HACCP Meldepflicht' },
            { icon: '🕊️', title: 'Tauben & Spatzen', desc: 'Verschmutzen Lagerflächen und Waren durch Exkremente, übertragen Krankheitserreger und beschädigen Verpackungen. Besonders problematisch bei offenen Ladedocks.', law: 'Tierschutzgerechte Abwehr' },
        ],
        process: [
            { step: '01', title: 'Hallenweite Risikokartierung', desc: 'Wir identifizieren alle Eintrittspunkte, Risikozonen und kritischen Lagerbereiche und erstellen einen detaillierten Maßnahmenplan.' },
            { step: '02', title: 'Installation des Monitoring-Systems', desc: 'Digitale Fallen mit Sofort-Alarm bei Aktivität. Lückenlose Abdeckung aller Risikobereiche — Ladedocks, Kühlhäuser, Außenbereiche.' },
            { step: '03', title: 'Regelmäßige Inspektionen', desc: 'Quartalsweise oder monatliche Inspektion aller Monitoring-Punkte. Alle Befunde werden digital erfasst und mit Zeitstempel dokumentiert.' },
            { step: '04', title: 'Audit-Dokumentation auf Knopfdruck', desc: 'BRC, IFS, ISO-konforme Protokolle für alle gängigen Standards. Sofort abrufbar für unangekündigte Audits — ohne Vorbereitung.' },
        ],
        benefits: [
            { icon: '📡', title: 'Intelligentes Monitoring-System', desc: 'Digitale Fallen mit Sofort-Alarm bei Aktivität. Lückenlose Nachverfolgung für Audits.' },
            { icon: '📋', title: 'Audit-Dokumentation', desc: 'BRC, IFS, ISO-konforme Protokolle für alle gängigen Lebensmittelsicherheitsstandards.' },
            { icon: '🗺️', title: 'Hallenweite Risikokartierung', desc: 'Wir identifizieren alle Eintrittspunkte und Risikozonen und sichern sie systematisch ab.' },
            { icon: '⚙️', title: 'Minimierung von Betriebsunterbrechungen', desc: 'Einsätze werden koordiniert, um Ihren Lagerbetrieb so wenig wie möglich zu beeinflussen.' },
        ],
        ctaTitle: 'Jetzt Monitoring-Konzept anfragen',
        ctaSubtitle: 'Kostenlos, unverbindlich und vertraulich. In der Regel innerhalb von 2 Stunden rückgemeldet.',
    },
    oeffentlich: {
        slug: 'oeffentlich',
        title: 'Schädlingsschutz\nfür öffentliche\nEinrichtungen',
        subtitle: 'Kindersicher · Umweltschonend · Behördengerecht · Meldepflichtig',
        heroImg: '/b2b/b2b_hero_oeffentlich.jpg',
        breadcrumb: 'Öffentlicher Sektor',
        label: 'B2B SCHÄDLINGSSCHUTZ',
        intro: 'Schutz für Schulen, Kitas, Krankenhäuser und Behörden — sicher und rechtssicher.',
        introBody: 'Schulen, Kindergärten, Krankenhäuser und Behörden stellen besondere Anforderungen an die Schädlingsbekämpfung. Der Schutz von Kindern, Patienten und Mitarbeitern hat höchste Priorität. Wir verwenden ausschließlich BVL-zugelassene, kindersichere und umweltschonende Methoden und arbeiten nach streng geregelten Sicherheitsprotokollen. Alle unsere Techniker sind für sensible Bereiche geschult und zertifiziert — vollständige Behördendokumentation inklusive.',
        stats: [
            { value: '24/7', label: 'Erreichbarkeit' },
            { value: '100%', label: 'BVL-zugelassene Mittel' },
            { value: '<2h', label: 'Reaktionszeit' },
            { value: '0€', label: 'Erstinspektion' },
        ],
        risks: [
            { icon: '🐀', title: 'Nager in Schulen & Kitas', desc: 'Besonders gefährlich in Bereichen, in denen Kinder spielen und essen. Meldepflicht beim Gesundheitsamt. Nager übertragen Hantavirus, Leptospirose und Salmonellen.', law: 'Meldepflicht Gesundheitsamt' },
            { icon: '🪳', title: 'Schaben in Kantinen', desc: 'Schulkantinen und Krankenhausverpflegung unterliegen strengsten Hygienekontrollen. Wir sichern die Compliance mit HACCP-konformen Bekämpfungsmaßnahmen.', law: 'HACCP · IfSG' },
            { icon: '🐝', title: 'Wespen & Hornissen', desc: 'Nester an Gebäuden und Spielplätzen gefährden Kinder und Patienten. Wir entfernen Nester fachgerecht nach Tierschutzgesetz und sichern betroffene Bereiche dauerhaft.', law: 'Tierschutzgerecht' },
            { icon: '🕊️', title: 'Tauben & Vogelbefall', desc: 'Behörden und Denkmäler leiden unter Taubenbefall. Wir bieten nachhaltige, tierschutzgerechte Abwehr ohne Schädigung der Tiere — genehmigungskonform.', law: 'BNatSchG konform' },
        ],
        process: [
            { step: '01', title: 'Begehung & Risikoanalyse', desc: 'Vollständige Inspektion aller sensiblen Bereiche: Küche, Keller, Spielflächen, Außenanlagen. Identifikation aller Eintrittspunkte.' },
            { step: '02', title: 'Kindersicherer Bekämpfungsplan', desc: 'Ausschließlich BVL-zugelassene Mittel, sicher für Kinder, Senioren und Immungeschwächte. Keine giftigen Köder in zugänglichen Bereichen.' },
            { step: '03', title: 'Einsatz außerhalb der Betriebszeiten', desc: 'Wir kommen nachts, am Wochenende oder in den Ferien — ohne Beeinträchtigung des laufenden Betriebs und ohne dass Kinder oder Patienten betroffen sind.' },
            { step: '04', title: 'Behördengerechte Dokumentation', desc: 'Vollständige Nachweisführung für Gesundheitsämter, Schulbehörden und Aufsichtsbehörden. Sofort abrufbar für Kontrollen.' },
        ],
        benefits: [
            { icon: '🛡️', title: 'Zugelassene, kindersichere Mittel', desc: 'Ausschließlich BVL-zugelassene Mittel, sicher für Kinder, Senioren und Immungeschwächte.' },
            { icon: '🌙', title: 'Einsatz außerhalb der Betriebszeiten', desc: 'Wir kommen nachts, am Wochenende oder in den Ferien — ohne Beeinträchtigung des Betriebs.' },
            { icon: '📋', title: 'Behördengerechte Dokumentation', desc: 'Vollständige Nachweisführung für Gesundheitsämter, Schulbehörden und Aufsichtsbehörden.' },
            { icon: '🔄', title: 'Langfristige Prävention', desc: 'Individuelle Präventionskonzepte, die dauerhaft wirken und Wiederbefall verhindern.' },
        ],
        ctaTitle: 'Jetzt behördengerechte Beratung anfragen',
        ctaSubtitle: 'Kostenlos, unverbindlich und vertraulich. In der Regel innerhalb von 2 Stunden rückgemeldet.',
    },
};

export default function BranchePage({ params }: { params: Promise<{ branche: string }> }) {
    const { branche } = use(params);
    const data = BRANCHES[branche];
    if (!data) notFound();

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white flex flex-col items-center w-full overflow-x-hidden">

                {/* ── Hero ── */}
                <section className="relative w-full flex items-end overflow-hidden" style={{ height: 'calc(60vh + 68px)', minHeight: '480px' }}>
                    <img
                        src={data.heroImg}
                        alt={data.breadcrumb}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: data.heroImgPosition || 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                    <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-14">
                        {/* Eyebrow */}
                        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C8102E] mb-4">{data.label}</p>
                        {/* Title */}
                        <h1
                            className="text-white uppercase leading-[1.0] tracking-[-0.02em] mb-5"
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 900,
                                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                                whiteSpace: 'pre-line',
                                textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                            }}
                        >
                            {data.title}
                        </h1>
                        {/* Subtitle chips */}
                        <div className="flex flex-wrap gap-2">
                            {data.subtitle.split(' · ').map((chip, i) => (
                                <span key={i} className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/80 border border-white/25 px-3 py-1 backdrop-blur-sm bg-white/5">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Stats bar ── */}
                <section className="w-full bg-[#C8102E]">
                    <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
                        {data.stats.map((s, i) => (
                            <div key={i} className={`py-7 px-6 text-center ${i < data.stats.length - 1 ? 'border-r border-white/20' : ''}`}>
                                <div className="text-white font-black text-[2rem] leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</div>
                                <div className="text-white/75 text-[11px] uppercase tracking-[0.14em] font-semibold mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Intro ── */}
                <section className="w-full py-20 px-6 flex justify-center bg-white">
                    <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <div>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', color: '#0f0f0f', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px', textTransform: 'uppercase' }}>
                                {data.intro}
                            </h2>
                            <p className="text-[#555] text-[16px] leading-[1.75]">
                                {data.introBody}
                            </p>
                        </div>
                        {/* Quick trust list */}
                        <div className="flex flex-col gap-4 pt-1">
                            {data.benefits.map((b, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 border border-gray-100 hover:border-gray-200 transition-colors">
                                    <span className="text-2xl shrink-0 mt-0.5">{b.icon}</span>
                                    <div>
                                        <p className="font-bold text-[14px] text-[#0f0f0f] uppercase tracking-[0.04em] mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px' }}>{b.title}</p>
                                        <p className="text-[#666] text-[14px] leading-relaxed">{b.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Risk Grid ── */}
                <section className="w-full bg-[#f7f7f7] py-20 px-6 flex justify-center border-t border-gray-100">
                    <div className="w-full max-w-[1200px]">
                        <div className="mb-10">
                            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8102E] mb-3">Häufige Risiken</p>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#0f0f0f', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                                Typische Schädlinge in Ihrer Branche
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {data.risks.map((r, i) => (
                                <div key={i} className="bg-white p-6 border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
                                    <div className="text-3xl">{r.icon}</div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '18px', textTransform: 'uppercase', color: '#0f0f0f', marginBottom: '8px', letterSpacing: '0.01em', lineHeight: 1.2 }}>
                                            {r.title}
                                        </h3>
                                        <p className="text-[#666] text-[13px] leading-[1.65]">{r.desc}</p>
                                    </div>
                                    {r.law && (
                                        <div className="mt-auto pt-3 border-t border-gray-100">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C8102E] bg-[#fff1f2] px-2 py-1">{r.law}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4-Step Process ── */}
                <section className="w-full bg-white py-20 px-6 flex justify-center border-t border-gray-100">
                    <div className="w-full max-w-[1200px]">
                        <div className="mb-12">
                            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8102E] mb-3">Unser Vorgehen</p>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#0f0f0f', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                                So schützen wir Ihren Betrieb
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100">
                            {data.process.map((p, i) => (
                                <div key={i} className={`p-8 flex flex-col gap-4 ${i < data.process.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-gray-100' : ''}`}>
                                    <div className="text-[#C8102E] font-black text-[2.8rem] leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{p.step}</div>
                                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '17px', textTransform: 'uppercase', color: '#0f0f0f', letterSpacing: '0.02em', lineHeight: 1.2 }}>{p.title}</h3>
                                    <p className="text-[#666] text-[13px] leading-[1.65] flex-1">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA Banner ── */}
                <section className="w-full bg-[#0f0f0f] py-20 px-6 flex justify-center">
                    <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div className="flex-1">
                            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8102E] mb-4">Jetzt handeln</p>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>
                                {data.ctaTitle}
                            </h2>
                            <p className="text-white/50 text-[14px] leading-relaxed max-w-[480px]">{data.ctaSubtitle}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <Link
                                href="/geschaeftskunden#kontakt"
                                className="bg-[#C8102E] text-white font-bold text-[13px] uppercase tracking-[0.1em] px-7 py-4 text-center no-underline transition-colors hover:bg-[#a50d25] whitespace-nowrap"
                            >
                                Kostenlose Erstberatung →
                            </Link>
                            <a href="tel:015112345678" className="border border-white/20 text-white font-bold text-[13px] uppercase tracking-[0.1em] px-7 py-4 text-center no-underline transition-colors hover:border-white/50 whitespace-nowrap">
                                0151 12345678
                            </a>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
