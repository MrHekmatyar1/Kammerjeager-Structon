import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES } from '@/lib/data/cities';
import { SERVICES } from '@/lib/data/services';

import Hero from '@/components/sections/Hero';
import ReviewSlider from '@/components/sections/ReviewSlider';
import UnserProzess from '@/components/sections/UnserProzess';
import LeadWizard from '@/components/interactive/LeadWizard';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/interactive/ChatBot';
import FAQ from '@/components/sections/FAQ';
import Link from 'next/link';

export async function generateStaticParams() {
    const params: { city: string; service: string }[] = [];
    for (const city of CITIES) {
        for (const service of SERVICES) {
            params.push({ city: city.slug, service: service.slug });
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
    const { city: citySlug, service: serviceSlug } = await params;
    const cityData = CITIES.find((c) => c.slug === citySlug);
    const serviceData = SERVICES.find((s) => s.slug === serviceSlug);

    if (!cityData || !serviceData) {
        return { title: 'Seite nicht gefunden' };
    }

    const isBezirk = cityData.isBerlinBezirk;

    return {
        title: isBezirk
            ? `${serviceData.name} in ${cityData.name} – Kammerjäger 24/7 | Festpreis`
            : `Kammerjäger ${cityData.name}: ${serviceData.name} | 24/7 Notdienst`,
        description: isBezirk
            ? `${serviceData.name} in ${cityData.name}: Zertifizierter Kammerjäger vor Ort – schnell, diskret und zum Festpreis. ${serviceData.description} Jetzt anfragen!`
            : `${serviceData.description} Schnelle Hilfe in ${cityData.name} durch zertifizierte Experten. Diskret, transparent und zum Festpreis.`,
        alternates: {
            canonical: `https://kammerjaeger-structon.de/${cityData.slug}/${serviceData.slug}`,
        },
    };
}

export default async function CityServicePage({ params }: { params: Promise<{ city: string; service: string }> }) {
    const { city: citySlug, service: serviceSlug } = await params;
    const cityData = CITIES.find((c) => c.slug === citySlug);
    const serviceData = SERVICES.find((s) => s.slug === serviceSlug);

    if (!cityData || !serviceData) {
        notFound();
    }

    const isBezirk = cityData.isBerlinBezirk;
    const info = cityData.bezirkInfo;

    // Уникальные FAQ для комбо-страниц Berlin-район + услуга
    const faqs = [
        {
            question: `Wie läuft eine ${serviceData.shortName}-Bekämpfung in ${cityData.name} ab?`,
            answer: isBezirk && info
                ? `In ${cityData.name} – mit seiner ${info.buildingType.split(',')[0]}-Bebauung – analysiert der Kammerjäger zunächst den genauen Befall. Danach wird die effektivste und umweltschonendste Methode zur ${serviceData.shortName}-Bekämpfung eingesetzt. Sie erhalten einen schriftlichen Bericht über die durchgeführten Maßnahmen.`
                : `Zunächst analysiert der Experte vor Ort in ${cityData.name} die Befallssituation. Danach wird die passende und umweltschonende Bekämpfungsmethode für ${serviceData.shortName} angewandt.`
        },
        {
            question: `Was kostet die Bekämpfung von ${serviceData.shortName} in ${cityData.name}?`,
            answer: `Nach der telefonischen Ersteinschätzung oder Besichtigung in ${cityData.name} erhalten Sie einen verbindlichen Festpreis – ohne versteckte Kosten. Die genauen Kosten hängen vom Ausmaß des Befalls und der Fläche ab.`
        },
        {
            question: `Ist die ${serviceData.shortName}-Behandlung in ${cityData.name} schädlich für Kinder und Haustiere?`,
            answer: `Wir setzen in ${cityData.name} ausschließlich zugelassene und geprüfte Mittel ein. Der Kammerjäger informiert Sie genau, welche Vorsichtsmaßnahmen bei Kindern oder Haustieren zu beachten sind. In den meisten Fällen können die Räume kurz nach der Behandlung wieder betreten werden.`
        },
        {
            question: `Wie schnell kann ein Kammerjäger für ${serviceData.shortName} in ${cityData.name} bei mir sein?`,
            answer: isBezirk
                ? `Dank mehrerer lokaler Partner in ${cityData.name} können wir in Notfällen oft noch am selben Tag reagieren – spätestens aber innerhalb von 24 Stunden.`
                : `Unser lokales Netzwerk in ${cityData.name} ermöglicht meist eine schnelle Reaktionszeit. In Notfällen ist der Fachmann oft schon am selben Tag vor Ort.`
        },
        {
            question: `Bieten Sie nach der ${serviceData.shortName}-Bekämpfung in ${cityData.name} eine Garantie an?`,
            answer: `Ja – wenn der Schädling nach der Behandlung erneut auftreten sollte, kommen wir nach ${cityData.name} zurück. Viele unserer Partner bieten eine Nachbehandlungsgarantie an, die im Angebot klar geregelt wird.`
        },
    ];

    // Другие услуги в том же районе — внутренняя перелинковка
    const otherServices = SERVICES.filter(s => s.slug !== serviceData.slug);

    return (
        <main className="min-h-screen bg-white flex flex-col items-center w-full overflow-x-hidden">
            <Hero
                cityName={cityData.name}
                serviceName={serviceData.shortName}
                {...(isBezirk && info ? { heroSubtitle: `${serviceData.name} in ${cityData.name} – professionell, schnell und zum Festpreis.` } : {})}
            />

            <UnserProzess />

            <section className="w-full flex flex-col items-center bg-white px-6 pt-[80px] pb-[120px]" style={{ background: '#f1f4f8' }}>
                <div className="w-full max-w-[850px]">
                    <LeadWizard />
                </div>
            </section>

            {/* Уникальный информационный блок для Berlin-районов */}
            {isBezirk && info && (
                <section style={{
                    width: '100%',
                    background: '#fff',
                    padding: '72px 24px 56px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{ width: '100%', maxWidth: '860px' }}>
                        <div style={{
                            fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
                            textTransform: 'uppercase', color: '#C8102E', marginBottom: '10px',
                        }}>
                            {serviceData.shortName} in {cityData.name}
                        </div>
                        <h2 style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 'clamp(26px, 4vw, 42px)',
                            fontWeight: 900, color: '#0f172a',
                            textTransform: 'uppercase', lineHeight: 1.1, margin: '0 0 20px',
                        }}>
                            {serviceData.name}<br />in {cityData.name}
                        </h2>
                        <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.75, maxWidth: '680px', margin: '0 0 24px' }}>
                            {serviceData.description} In {cityData.name} – bekannt für {info.buildingType.split(',')[0]} –
                            sind {serviceData.shortName} ein besonders häufiges Problem. {info.pestContext}
                        </p>
                        <div style={{
                            background: '#f8fafc', border: '1px solid #e2e8f0',
                            borderLeft: '4px solid #C8102E', padding: '16px 20px', marginBottom: '40px',
                        }}>
                            <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: 1.7 }}>
                                <strong style={{ color: '#0f172a' }}>Gebiet:</strong> {cityData.name} &nbsp;|&nbsp;
                                <strong style={{ color: '#0f172a' }}>Bebauung:</strong> {info.buildingType.split(',')[0]} &nbsp;|&nbsp;
                                <strong style={{ color: '#0f172a' }}>Reaktionszeit:</strong> &lt; 24 Stunden
                            </p>
                        </div>

                        {/* Другие услуги в том же районе */}
                        <div>
                            <div style={{
                                fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
                                textTransform: 'uppercase', color: '#94a3b8', marginBottom: '12px',
                            }}>
                                Weitere Leistungen in {cityData.name}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {otherServices.map(s => (
                                    <Link
                                        key={s.slug}
                                        href={`/${cityData.slug}/${s.slug}`}
                                        className="group flex items-center gap-[6px] px-[14px] py-[8px] border-[1.5px] border-[#e2e8f0] rounded-xl text-[13px] font-semibold text-[#334155] bg-white no-underline transition-colors hover:border-[#C8102E] hover:text-[#C8102E] hover:bg-[#fff5f5]"
                                    >
                                        {s.shortName}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#94a3b8] group-hover:text-[#C8102E] transition-colors">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="w-full bg-[#F8FAFC] border-t border-gray-100 pt-[80px] pb-[96px]">
                <ReviewSlider />
            </section>

            {/* FAQ */}
            <div className="w-full px-4 mt-20 md:mt-28 mb-20 md:mb-28">
                <FAQ
                    title={`Fragen zur ${serviceData.shortName}-Bekämpfung in ${cityData.name}`}
                    faqs={faqs}
                />
            </div>

            <Footer />
            <ChatBot />
        </main>
    );
}
