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
import BezirkInfo from '@/components/sections/BezirkInfo';

// Предгенерируем все страницы районов/городов
export async function generateStaticParams() {
    return CITIES.map((city) => ({
        city: city.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
    const { city: citySlug } = await params;
    const cityData = CITIES.find((c) => c.slug === citySlug);

    if (!cityData) {
        return { title: 'Stadt nicht gefunden' };
    }

    const isBezirk = cityData.isBerlinBezirk;
    const topPests = cityData.bezirkInfo?.topPests?.slice(0, 3).join(', ') ?? 'Wespen, Ratten, Bettwanzen';

    return {
        title: isBezirk
            ? `Kammerjäger ${cityData.name} – Schädlingsbekämpfung 24/7 | Experten vor Ort`
            : `Kammerjäger ${cityData.name} - 24/7 Notdienst | Experten vor Ort`,
        description: isBezirk
            ? `Professionelle Schädlingsbekämpfung in ${cityData.name}. Wir bekämpfen ${topPests} und weitere Schädlinge. Zertifizierte Kammerjäger – schnell, diskret und zum Festpreis.`
            : `Schädlingsbekämpfung in ${cityData.name}. Wir sind sofort für Sie da. Kammerjäger für Wespen, Ratten, Mäuse, Bettwanzen und mehr.`,
        alternates: {
            canonical: `https://kammerjaeger-structon.de/${cityData.slug}`,
        },
    };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
    const { city: citySlug } = await params;
    const cityData = CITIES.find((c) => c.slug === citySlug);

    if (!cityData) {
        notFound();
    }

    const isBezirk = cityData.isBerlinBezirk;

    // Уникальные FAQ для берлинских районов
    const faqs = isBezirk && cityData.bezirkInfo ? [
        {
            question: `Wie schnell kommt ein Kammerjäger in ${cityData.name}?`,
            answer: `Dank unseres lokalen Netzwerks in ${cityData.name} sind wir in Notfällen meist innerhalb von 24 Stunden vor Ort – oft noch am selben Tag. In ${cityData.name} haben wir mehrere geprüfte Partner, die kurzfristig reagieren können.`
        },
        {
            question: `Welche Schädlinge sind in ${cityData.name} besonders häufig?`,
            answer: `In ${cityData.name} treten aufgrund von ${cityData.bezirkInfo?.buildingType?.split(',')[0] ?? 'der typischen Baustruktur'} besonders häufig ${cityData.bezirkInfo?.topPests?.join(', ') ?? 'Ratten, Mäuse und Bettwanzen'} auf. ${cityData.bezirkInfo?.pestContext ?? ''}`
        },
        {
            question: `Bieten Sie in ${cityData.name} Festpreise an?`,
            answer: `Ja, wir arbeiten ausschließlich mit transparenten Festpreisen. Nach der Ersteinschätzung – telefonisch oder vor Ort in ${cityData.name} – nennen wir Ihnen einen verbindlichen Preis ohne versteckte Kosten.`
        },
        {
            question: `Sind Ihre Kammerjäger in ${cityData.name} zertifiziert?`,
            answer: `Alle unsere Partner für ${cityData.name} und Umgebung sind IHK-zertifizierte Schädlingsbekämpfer mit Sachkundenachweis nach §9 ChemG. Wir vermitteln ausschließlich geprüfte Fachbetriebe.`
        },
        {
            question: `Wie diskret arbeiten die Kammerjäger in ${cityData.name}?`,
            answer: `Diskretion ist uns sehr wichtig – besonders in dicht besiedelten Bezirken wie ${cityData.name}. Die Fahrzeuge unserer Partner sind dezent beschriftet, und der Einsatz wird professionell und unauffällig durchgeführt.`
        },
    ] : [
        { question: `Wie schnell ist ein Kammerjäger in ${cityData.name} bei mir?`, answer: `Dank unseres lokalen Netzwerks in ${cityData.name} sind wir in Notfällen meist innerhalb von 24 Stunden vor Ort, oft sogar am selben Tag.` },
        { question: `Bieten Sie in ${cityData.name} Festpreise an?`, answer: `Ja, wir arbeiten mit transparenten Festpreisen. Nach der telefonischen oder Vor-Ort-Analyse in ${cityData.name} nennen wir Ihnen einen garantierten Preis.` },
        { question: `Sind Ihre Kammerjäger in ${cityData.name} zertifiziert?`, answer: `Absolut. Alle unsere Partner für ${cityData.name} und Umgebung sind geprüfte IHK-Schädlingsbekämpfer mit langjähriger Erfahrung.` },
        { question: `Welche Schädlinge bekämpfen Sie in ${cityData.name}?`, answer: `Wir bekämpfen alle gängigen Schädlinge wie Ratten, Mäuse, Wespen, Bettwanzen, Kakerlaken und Ameisen im gesamten Stadtgebiet von ${cityData.name}.` },
    ];

    return (
        <main className="min-h-screen bg-white flex flex-col items-center w-full overflow-x-hidden">
            <Hero
                cityName={cityData.name}
                {...(cityData.bezirkInfo?.heroSubtitle ? { heroSubtitle: cityData.bezirkInfo.heroSubtitle } : {})}
            />

            <section className="w-full flex flex-col items-center bg-white px-6 pt-[80px] pb-[120px]" style={{ background: isBezirk ? '#f1f4f8' : undefined }}>
                <div className="w-full max-w-[850px]">
                    <LeadWizard />
                </div>
            </section>

            <UnserProzess />

            {/* Уникальный блок про район — только для берлинских Bezirke */}
            {isBezirk && <BezirkInfo city={cityData} />}

            <section className="w-full bg-[#F8FAFC] border-t border-gray-100 pt-[80px] pb-[96px]">
                <ReviewSlider />
            </section>

            {/* FAQ */}
            <div className="w-full px-4 mt-20 md:mt-28 mb-20 md:mb-28">
                <FAQ
                    title={`Häufige Fragen zu Kammerjägern in ${cityData.name}`}
                    faqs={faqs}
                />
            </div>

            <Footer />
            <ChatBot />
        </main>
    );
}
