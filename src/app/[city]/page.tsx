import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES } from '@/lib/data/cities';

import Hero from '@/components/sections/Hero';
import ReviewSlider from '@/components/sections/ReviewSlider';
import UnserProzess from '@/components/sections/UnserProzess';
import LeadWizard from '@/components/interactive/LeadWizard';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/interactive/ChatBot';
import FAQ from '@/components/sections/FAQ';

// 1. Указываем Next.js, какие страницы (города) предгенерировать во время сборки (SSG)
export async function generateStaticParams() {
    return CITIES.map((city) => ({
        city: city.slug,
    }));
}

// 2. Генерируем уникальные метаданные (SEO-теги) для каждого города
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const cityData = CITIES.find((c) => c.slug === params.city);
    
    if (!cityData) {
        return { title: 'Stadt nicht gefunden' };
    }

    return {
        title: `Kammerjäger ${cityData.name} - 24/7 Notdienst | Experten vor Ort`,
        description: `Schädlingsbekämpfung in ${cityData.name}. Wir sind sofort für Sie da. Kammerjäger für Wespen, Ratten, Mäuse, Bettwanzen und mehr.`,
    };
}

// 3. Рендерим саму страницу
export default function CityPage({ params }: { params: { city: string } }) {
    const cityData = CITIES.find((c) => c.slug === params.city);

    // Если в URL ввели город, которого нет в нашем списке, показываем 404
    if (!cityData) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white flex flex-col items-center w-full overflow-x-hidden">
            <Hero cityName={cityData.name} />

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
                    title={`Häufige Fragen zu Kammerjägern in ${cityData.name}`} 
                    faqs={[
                        { question: `Wie schnell ist ein Kammerjäger in ${cityData.name} bei mir?`, answer: `Dank unseres lokalen Netzwerks in ${cityData.name} sind wir in Notfällen meist innerhalb von 24 Stunden vor Ort, oft sogar am selben Tag.` },
                        { question: `Bieten Sie in ${cityData.name} Festpreise an?`, answer: `Ja, wir arbeiten mit transparenten Festpreisen. Nach der telefonischen oder Vor-Ort-Analyse in ${cityData.name} nennen wir Ihnen einen garantierten Preis.` },
                        { question: `Sind Ihre Kammerjäger in ${cityData.name} zertifiziert?`, answer: `Absolut. Alle unsere Partner für ${cityData.name} und Umgebung sind geprüfte IHK-Schädlingsbekämpfer mit langjähriger Erfahrung.` },
                        { question: `Welche Schädlinge bekämpfen Sie in ${cityData.name}?`, answer: `Wir bekämpfen alle gängigen Schädlinge wie Ratten, Mäuse, Wespen, Bettwanzen, Kakerlaken und Ameisen im gesamten Stadtgebiet von ${cityData.name}.` }
                    ]} 
                />
            </div>

            <Footer />
            <ChatBot />
        </main>
    );
}
