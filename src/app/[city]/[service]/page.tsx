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

export async function generateStaticParams() {
    // Предгенерируем все комбинации Город x Услуга
    const params: { city: string; service: string }[] = [];
    
    for (const city of CITIES) {
        for (const service of SERVICES) {
            params.push({
                city: city.slug,
                service: service.slug,
            });
        }
    }
    
    return params;
}

export async function generateMetadata({ params }: { params: { city: string; service: string } }): Promise<Metadata> {
    const cityData = CITIES.find((c) => c.slug === params.city);
    const serviceData = SERVICES.find((s) => s.slug === params.service);
    
    if (!cityData || !serviceData) {
        return { title: 'Seite nicht gefunden' };
    }

    return {
        title: `Kammerjäger ${cityData.name}: ${serviceData.name} | 24/7 Notdienst`,
        description: `${serviceData.description} Schnelle Hilfe in ${cityData.name} durch zertifizierte Experten. Diskret, transparent und zum Festpreis.`,
    };
}

export default function CityServicePage({ params }: { params: { city: string; service: string } }) {
    const cityData = CITIES.find((c) => c.slug === params.city);
    const serviceData = SERVICES.find((s) => s.slug === params.service);

    if (!cityData || !serviceData) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white flex flex-col items-center w-full overflow-x-hidden">
            <Hero cityName={cityData.name} serviceName={serviceData.shortName} />

            <UnserProzess />

            <section className="w-full flex flex-col items-center bg-white px-6 pt-[128px] pb-[200px]">
                <div className="w-full max-w-[850px]">
                    <LeadWizard />
                </div>
            </section>

            <section className="w-full bg-[#F8FAFC] border-t border-gray-100 pt-[80px] pb-[96px]">
                <ReviewSlider />
            </section>

            {/* ── FAQ ── */}
            <div className="w-full px-4 mt-20 md:mt-28 mb-20 md:mb-28">
                <FAQ 
                    title={`Häufige Fragen: ${serviceData.shortName} in ${cityData.name}`} 
                    faqs={[
                        { question: `Wie läuft eine ${serviceData.shortName}-Bekämpfung in ${cityData.name} ab?`, answer: `Zunächst analysiert der Experte vor Ort in ${cityData.name} die Befallssituation. Danach wird die passende und umweltschonende Bekämpfungsmethode für ${serviceData.shortName} angewandt.` },
                        { question: `Ist die ${serviceData.shortName}-Behandlung schädlich für Haustiere?`, answer: `Wir verwenden hochmoderne, zielgerichtete Präparate. Der Kammerjäger informiert Sie genau, worauf Sie bei Haustieren in ${cityData.name} achten müssen, in den meisten Fällen besteht keine Gefahr.` },
                        { question: `Was kostet die Bekämpfung von ${serviceData.shortName} in ${cityData.name}?`, answer: `Nach der telefonischen Ersteinschätzung oder Besichtigung in ${cityData.name} erhalten Sie einen garantierten Festpreis. Es gibt keine versteckten Kosten.` },
                        { question: `Wann kann ein Kammerjäger für ${serviceData.shortName} in ${cityData.name} bei mir sein?`, answer: `Unser lokales Netzwerk in ${cityData.name} ermöglicht meist eine schnelle Reaktionszeit. In Notfällen ist der Fachmann oft schon am selben Tag vor Ort.` }
                    ]} 
                />
            </div>

            <Footer />
            <ChatBot />
        </main>
    );
}
