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
    risks: { icon: string; title: string; desc: string }[];
    benefits: { title: string; desc: string }[];
    ctaTitle: string;
}> = {
    gastronomie: {
        slug: 'gastronomie',
        title: 'Schädlingsbekämpfung\nfür Gastronomie &\nLebensmittel',
        subtitle: 'HACCP-konform · Diskret · Rechtssicher',
        heroImg: '/b2b/b2b_hero_gastronomie.jpg',
        heroImgPosition: 'center',
        breadcrumb: 'Gastronomie & Lebensmittel',
        label: 'SCHÄDLINGSSCHUTZ FÜR GASTRONOMIEBETRIEBE',
        intro: 'Zuverlässiger Schutz für Ihren Betrieb und Ihren Ruf',
        introBody: 'In der Gastronomie kann ein einziger Schädlingsfall existenzbedrohend sein. Ein negativer Bewertungsportal-Eintrag oder eine Lebensmittelkontrolle kann jahrelange Arbeit zunichte machen. Wir schützen Ihr Restaurant, Café oder Ihren Lebensmittelbetrieb mit HACCP-konformen Maßnahmen — diskret, professionell und rechtssicher. Unsere Techniker kommen in neutralen Fahrzeugen und arbeiten ausschließlich außerhalb der Öffnungszeiten. Ein einziger Fund bei einer Behördenkontrolle reicht für eine sofortige Betriebsschließung — wir verhindern genau das.',
        risks: [
            { icon: 'Schaben', title: 'Schaben & Kakerlaken', desc: 'Die häufigste und gefährlichste Bedrohung für Küchenbetriebe. Schaben übertragen Salmonellen, E. coli und Listerien auf Lebensmitteloberflächen und sind beim zuständigen Gesundheitsamt meldepflichtig. Ein Fund führt in der Regel zur sofortigen Betriebsschließung.' },
            { icon: 'Nager', title: 'Nager (Ratten & Mäuse)', desc: 'Nager fressen Vorräte an, beschädigen Elektro- und Wasserleitungen und verbreiten Leptospirose, Hantavirus und Salmonellen. In Küchen und Lagerbereichen sind sie ein direkter IFS-Food-Verstoß und führen zu Punktabzügen im Hygieneaudit.' },
            { icon: 'Fliegen', title: 'Fliegen & Vorratsschädlinge', desc: 'Schmeißfliegen, Fruchtfliegen und Vorratsmotten verunreinigen offene Lebensmittel und Arbeitsflächen. Sie sind ein sichtbares Hygieneversagen — gefährlich für Gästebewertungen und inkompatibel mit HACCP-Eigenkontrollsystemen.' },
            { icon: 'Ameisen', title: 'Ameisen', desc: 'Ameisen dringen in geschlossene Lebensmittelverpackungen ein und hinterlassen Pheromone, die Folgekolonien anlocken. Ihre Bekämpfung erfordert systemisches Vorgehen — Oberflächen-Sprühbehandlungen sind wirkungslos und nicht HACCP-konform.' },
        ],
        benefits: [
            { title: 'HACCP-Dokumentation inklusive', desc: 'Vollständige Nachweisdokumentation für Ihre Betriebsakte, das Gesundheitsamt und Lebensmittelaudits (IFS Food, BRCGS, EU-VO 852/2004) — ohne Mehrkosten, sofort einsatzbereit für jede Kontrolle.' },
            { title: 'Einsatz außerhalb der Öffnungszeiten', desc: 'Abends, nachts oder früh morgens — vollkommen unbemerkt von Gästen und Mitarbeitern. Kein einziger Betriebsausfall, kein Einnahmeverlust durch unsere Maßnahmen.' },
            { title: 'Neutrale Fahrzeuge & Kleidung', desc: 'Kein Logo, keine Schutzanzüge, keine Erkennungszeichen. Vollständiger Schutz Ihres Rufs gegenüber Nachbarn, Gästen und Mitbewerbern.' },
            { title: 'Regelmäßiges Monitoring', desc: 'Präventionsverträge mit quartalsweiser Inspektion und digitalem Protokoll für dauerhaft sicheren Betrieb. Sofort-Alarm bei Aktivität — Sie erfahren es, bevor ein Gast es bemerkt.' },
        ],
        ctaTitle: 'Jetzt diskrete Beratung anfordern',
    },
    hotellerie: {
        slug: 'hotellerie',
        title: 'Schädlingsbekämpfung\nfür Hotels &\nGewerbe',
        subtitle: 'Diskret · Schnell · Für höchste Gästezufriedenheit',
        heroImg: '/b2b/b2b_hero_hotellerie.jpg',
        heroImgPosition: 'center 20%',
        breadcrumb: 'Hotellerie & Gewerbe',
        label: 'SCHÄDLINGSSCHUTZ FÜR HOTELS UND GASTGEWERBE',
        intro: 'Schnelle und unauffällige Lösungen für höchste Gästezufriedenheit',
        introBody: 'In der Hotellerie ist Diskretion das höchste Gut. Eine einzige Bewertung mit Erwähnung von Schädlingen kann Buchungsraten drastisch senken und das Vertrauen jahrelanger Stammgäste zerstören. Unsere Techniker kommen in Zivilkleidung und neutralen Fahrzeugen, behandeln betroffene Zimmer während der regulären Zimmerpflege und hinterlassen keinerlei Hinweise auf einen Einsatz. Wir sichern Ihren Betrieb — 24/7, diskret, zuverlässig.',
        risks: [
            { icon: 'Bettwanzen', title: 'Bettwanzen', desc: 'Der Albtraum jedes Hoteliers. Bettwanzen verstecken sich in Matratzen, Bettgestellen und Wandritzen und breiten sich bei Nichtbehandlung rasend schnell über benachbarte Zimmer aus. Frühzeitige Erkennung und diskretes Handeln sind entscheidend.' },
            { icon: 'Schaben', title: 'Schaben in Küchen', desc: 'Hotelküchen und Frühstücksbuffets sind bevorzugte Lebensräume für Schaben. HACCP-Verstöße drohen, wenn kein professionelles Monitoring besteht. Besonders kritisch in Kombination mit Lebensmittellagerung.' },
            { icon: 'Nager', title: 'Nager', desc: 'Besonders in Außenbereichen, Lagerräumen und Kellern. Beschädigen Infrastruktur und Kabel, schrecken Gäste ab und können in negativen Online-Bewertungen erwähnt werden — mit dauerhaften Folgen für den Ruf.' },
            { icon: 'Tauben', title: 'Tauben & Vögel', desc: 'Verschmutzen Balkone, Dachterrassen und Fassaden, hinterlassen gesundheitsschädliche Exkremente und beeinträchtigen das Gesamtbild des Hotels erheblich. Tierschutzgerechte Abwehr ist zwingend erforderlich.' },
        ],
        benefits: [
            { title: 'Einsatz in Zivilkleidung', desc: 'Keine Schutzanzüge oder auffällige Ausrüstung — vollständige Diskretion gegenüber Gästen und Personal. Kein einziger Gast merkt etwas.' },
            { title: '24/7 Notfallservice', desc: 'Bei akutem Befall sind wir in der Regel innerhalb weniger Stunden vor Ort, auch am Wochenende und an Feiertagen. Schnelles Handeln verhindert Ausbreitung und Reputationsschäden.' },
            { title: 'Zimmerweise Behandlung', desc: 'Wir behandeln nur betroffene Bereiche, ohne den restlichen Hotelbetrieb zu stören. Zimmer sind in der Regel innerhalb von Stunden wieder belegbar.' },
            { title: 'Präventionsverträge', desc: 'Regelmäßige Inspektionen aller Risikobereiche — Küche, Keller, Lager, Außenbereiche — mit vollständiger digitaler Protokollierung.' },
        ],
        ctaTitle: 'Jetzt Notfallservice anfordern',
    },
    lager: {
        slug: 'lager',
        title: 'Schädlingsbekämpfung\nfür Lager &\nLogistik',
        subtitle: 'Monitoring · Prävention · Warehousing-Schutz',
        heroImg: '/b2b/b2b_hero_lager.jpg',
        breadcrumb: 'Lager & Logistik',
        label: 'SCHÄDLINGSSCHUTZ FÜR LAGER UND LOGISTIKBETRIEBE',
        intro: 'Kontinuierlicher Schutz für Ihre Waren und Lieferketten',
        introBody: 'Schädlinge in Lagerhallen und Logistikzentren können immense wirtschaftliche Schäden verursachen — verdorbene Waren, beschädigte Verpackungen, gefährdete Lieferketten und gescheiterte Zertifizierungsaudits. Unser kontinuierliches Monitoring mit modernen digitalen Fallen und Detektionssystemen erkennt Schädlinge frühzeitig, bevor sie sich ausbreiten. Wir arbeiten nach BRC, IFS und ISO-Standards und liefern vollständige Dokumentation für alle gängigen Lebensmittelsicherheits-Audits.',
        risks: [
            { icon: 'Ratten', title: 'Ratten & Mäuse', desc: 'Benagen Kabel, Verpackungen und Lagergut. Lösen Kurzschlüsse und Brandgefahren aus. In Lebensmittellagern führt ein Nagerfund direkt zum Audit-Fail und kann kostspielige Rückrufaktionen nach sich ziehen.' },
            { icon: 'Käfer', title: 'Vorratsschädlinge', desc: 'Getreidekäfer, Motten und Mehlwürmer vernichten Lebensmittelvorräte und lösen kostspielige Rückrufaktionen aus. Früherkennung durch digitale Monitoring-Systeme ist entscheidend für die Schadensbegrenzung.' },
            { icon: 'Schaben', title: 'Schaben', desc: 'Besonders in Kühlhäusern und Lebensmittellagern ein ernstes Hygieneproblem mit Meldepflicht. Schaben sind äußerst resistent — oberflächliche Behandlungen sind wirkungslos.' },
            { icon: 'Tauben', title: 'Tauben & Spatzen', desc: 'Verschmutzen Lagerflächen und Waren durch Exkremente, übertragen Krankheitserreger und beschädigen Verpackungen. Besonders problematisch bei offenen Ladedocks und schlecht gesicherten Öffnungen.' },
        ],
        benefits: [
            { title: 'Intelligentes Monitoring-System', desc: 'Digitale Fallen mit Sofort-Alarm bei Aktivität. Lückenlose Nachverfolgung aller Befunde für Audits — mit Zeitstempel und GPS-Koordinaten des Standorts.' },
            { title: 'Audit-Dokumentation', desc: 'BRC, IFS, ISO-konforme Protokolle für alle gängigen Lebensmittelsicherheitsstandards. Sofort abrufbar für unangekündigte Audits — ohne Vorbereitung.' },
            { title: 'Hallenweite Risikokartierung', desc: 'Wir identifizieren alle Eintrittspunkte und Risikozonen und sichern sie systematisch ab. Vollständige Kartierung mit Lageplan und Monitoring-Punkten.' },
            { title: 'Minimierung von Betriebsunterbrechungen', desc: 'Einsätze werden koordiniert, um Ihren Lagerbetrieb so wenig wie möglich zu beeinflussen. Nacht- und Wochenendeinsätze sind selbstverständlich.' },
        ],
        ctaTitle: 'Jetzt Monitoring-Konzept anfragen',
    },
    oeffentlich: {
        slug: 'oeffentlich',
        title: 'Schädlingsbekämpfung\nfür öffentliche\nEinrichtungen',
        subtitle: 'Umweltfreundlich · Sicher · Rechtssicher',
        heroImg: '/b2b/b2b_hero_oeffentlich.jpg',
        breadcrumb: 'Öffentlicher Sektor',
        label: 'SCHÄDLINGSSCHUTZ FÜR ÖFFENTLICHE EINRICHTUNGEN',
        intro: 'Sichere, giftfreie Methoden für sensible Bereiche',
        introBody: 'Schulen, Kindergärten, Krankenhäuser und Behörden stellen besondere Anforderungen an die Schädlingsbekämpfung. Der Schutz von Kindern, Patienten und Mitarbeitern hat höchste Priorität. Wir verwenden ausschließlich BVL-zugelassene, kindersichere und umweltschonende Methoden und arbeiten nach streng geregelten Sicherheitsprotokollen. Alle unsere Techniker sind für den Einsatz in sensiblen Bereichen geschult und zertifiziert — vollständige Behördendokumentation inklusive.',
        risks: [
            { icon: 'Nager', title: 'Nager in Schulen & Kitas', desc: 'Besonders gefährlich in Bereichen, in denen Kinder spielen und essen. Meldepflicht beim Gesundheitsamt. Nager übertragen Hantavirus, Leptospirose und Salmonellen — eine ernste Bedrohung für Kinder und Personal.' },
            { icon: 'Schaben', title: 'Schaben in Kantinen', desc: 'Schulkantinen und Krankenhausverpflegung unterliegen strengsten Hygienekontrollen. Wir sichern die Compliance mit HACCP-konformen Bekämpfungsmaßnahmen und vollständiger Behördendokumentation.' },
            { icon: 'Wespen', title: 'Wespen & Hornissen', desc: 'Nester an Gebäuden und Spielplätzen gefährden Kinder und Patienten. Wir entfernen Nester fachgerecht nach Tierschutzgesetz und sichern betroffene Bereiche dauerhaft vor Wiederbesiedlung.' },
            { icon: 'Tauben', title: 'Tauben & Vogelbefall', desc: 'Behörden und Denkmäler leiden unter Taubenbefall. Wir bieten nachhaltige, tierschutzgerechte Abwehr ohne Schädigung der Tiere — vollständig genehmigungskonform nach BNatSchG.' },
        ],
        benefits: [
            { title: 'Zugelassene, kindersichere Mittel', desc: 'Ausschließlich BVL-zugelassene Mittel, sicher für Kinder, Senioren und Immungeschwächte. Keine giftigen Köder in für Kinder zugänglichen Bereichen.' },
            { title: 'Einsatz außerhalb der Betriebszeiten', desc: 'Wir kommen nachts, am Wochenende oder in den Ferien — ohne Beeinträchtigung des laufenden Betriebs und ohne Kontakt mit Kindern oder Patienten.' },
            { title: 'Behördengerechte Dokumentation', desc: 'Vollständige Nachweisführung für Gesundheitsämter, Schulbehörden und Aufsichtsbehörden. Sofort abrufbar für unangekündigte Kontrollen.' },
            { title: 'Langfristige Prävention', desc: 'Wir entwickeln individuelle Präventionskonzepte, die dauerhaft wirken und Wiederbefall verhindern — mit regelmäßigen Inspektionen und digitalem Monitoring.' },
        ],
        ctaTitle: 'Jetzt behördengerechte Beratung anfragen',
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

                {/* ── Full-bleed Hero ── */}
                <section className="relative w-full flex items-end overflow-hidden" style={{ height: 'calc(55vh + 68px)', minHeight: '420px' }}>
                    <img
                        src={data.heroImg}
                        alt={data.breadcrumb}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: data.heroImgPosition || 'center' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-12">
                        <h1
                            className="text-white uppercase leading-[1.0] tracking-[-0.02em]"
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 900,
                                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                                whiteSpace: 'pre-line',
                                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                            }}
                        >
                            {data.title}
                        </h1>
                    </div>
                </section>

                {/* ── Intro Section ── */}
                <section className="w-full py-20 px-6 flex justify-center bg-white">
                    <div className="w-full max-w-[780px] text-center">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8102E] mb-4">{data.label}</p>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                            {data.intro}
                        </h2>
                        <p className="text-[#555] text-[16px] leading-relaxed max-w-[680px] mx-auto">
                            {data.introBody}
                        </p>
                    </div>
                </section>

                {/* ── Risk Grid ── */}
                <section className="w-full bg-[#f8f8f8] py-20 px-6 flex justify-center border-t border-gray-100">
                    <div className="w-full max-w-[1200px]">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8102E] mb-3">Häufige Risiken</p>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '40px' }}>
                            Typische Schädlinge in Ihrer Branche
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {data.risks.map((r, i) => (
                                <div key={i} className="bg-white p-6 border border-gray-100 shadow-sm">
                                    <div className="inline-block bg-[#fef2f2] text-[#C8102E] text-[11px] font-bold uppercase tracking-widest px-2 py-1 mb-4">{r.icon}</div>
                                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '20px', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '10px', letterSpacing: '0.01em' }}>
                                        {r.title}
                                    </h3>
                                    <p className="text-[#666] text-[14px] leading-relaxed">{r.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Benefits ── */}
                <section className="w-full bg-white py-20 px-6 flex justify-center border-t border-gray-100">
                    <div className="w-full max-w-[1200px]">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8102E] mb-3">Unsere Leistungen</p>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '40px' }}>
                            Was wir für Sie tun
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                            {data.benefits.map((b, i) => (
                                <div key={i}>
                                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '20px', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '6px', letterSpacing: '0.01em' }}>
                                        {b.title}
                                    </h3>
                                    <p className="text-[#666] text-[14px] leading-relaxed">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA Banner ── */}
                <section className="w-full py-16 md:py-20 px-6 flex justify-center">
                    <div className="w-full max-w-[1000px] bg-[#1a1a1a] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                        <div className="flex-1">
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                                {data.ctaTitle}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                            <Link
                                href="/geschaeftskunden#kontakt"
                                className="bg-[#C8102E] text-white font-bold text-[13px] uppercase tracking-[0.1em] px-6 py-3 text-center no-underline transition-colors hover:bg-[#a50d25]"
                            >
                                Anfrage stellen
                            </Link>
                            <a href="tel:015112345678" className="border border-white/30 text-white font-bold text-[13px] uppercase tracking-[0.1em] px-6 py-3 text-center no-underline transition-colors hover:border-white/60">
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
