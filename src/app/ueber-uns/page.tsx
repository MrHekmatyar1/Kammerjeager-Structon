import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import FAQ from '@/components/sections/FAQ';

export default function UeberUnsPage() {
    return (
        <>
            <Header />

            <main style={{ paddingTop: '100px' }} className="min-h-screen bg-white flex flex-col items-center w-full overflow-x-hidden">
                <section className="w-full flex justify-center py-16 px-6">
                    <div className="w-full max-w-[1200px] text-[#374151]">
                        <h1
                            className="text-5xl md:text-6xl font-black mb-16 text-[#1E293B] uppercase tracking-tight"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                            Über uns
                        </h1>

                        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
                            {/* Text Left */}
                            <div className="flex-1 space-y-6 text-[17px] leading-relaxed text-[#475569]">
                                <p className="font-bold text-[#1E293B] text-xl mb-4">
                                    Kammerjäger Structon – Ihr zuverlässiger Partner in der Schädlingsbekämpfung.
                                </p>
                                <p>
                                    Wir bieten professionelle, diskrete und rechtssichere Hilfe gegen Schädlinge aller Art in ganz Deutschland.
                                    Egal ob in privaten Haushalten, in der Gastronomie oder im industriellen Gewerbe – wir finden die passende und effektivste Lösung für Ihr Problem.
                                </p>
                                <p>
                                    Als Geschäftsführer und Student stehe ich, Yehor Kalchuk, mit meinem Namen für höchste Qualitätsstandards,
                                    schnelle Reaktionszeiten und absolute Klarheit. Ihre Sicherheit und eine schädlingsfreie Umgebung stehen für uns an absolut erster Stelle.
                                </p>
                                <p>
                                    <strong>Effizient & Faire Preise:</strong> Als modernes Netzwerk verzichten wir auf einen schwerfälligen, teuren Verwaltungsapparat. Durch unsere extrem schlanken, digitalisierten Abläufe sparen wir enorme Overhead-Kosten ein. Genau diesen Kostenvorteil geben wir direkt an Sie weiter. Das bedeutet für Sie: Hochgradig wettbewerbsfähige Preise und volle Transparenz in jedem Schritt. Sie zahlen bei uns ausschließlich für die schnelle, professionelle Lösung durch zertifizierte Experten – ohne versteckte Kosten.
                                </p>
                                <div className="pt-6 border-t border-gray-100 mt-8">
                                    <p className="font-black text-[#1E293B] text-2xl uppercase tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                                        YEHOR KALCHUK
                                    </p>
                                    <p className="text-[13px] text-[#C8102E] font-extrabold uppercase tracking-widest mt-1">
                                        Geschäftsführer & Student
                                    </p>
                                </div>
                            </div>

                            {/* Image Right */}
                            <div className="flex-1 w-full bg-[#f8fafc] flex justify-center relative rounded-none overflow-hidden shadow-2xl border border-gray-100 p-8">
                                <Image
                                    src="/images/founder.png"
                                    alt="Yehor Kalchuk - Geschäftsführer Kammerjäger Structon"
                                    width={800}
                                    height={600}
                                    className="object-contain w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* ── FAQ ── */}
                <div className="w-full bg-[#f4f6f8] py-20 px-4 mt-8">
                    <FAQ 
                        title="Fragen zu unserem Netzwerk"
                        faqs={[
                            { question: "Wer führt die Schädlingsbekämpfung vor Ort durch?", answer: "Wir arbeiten ausschließlich mit zertifizierten IHK-Schädlingsbekämpfern aus unserem deutschlandweiten Netzwerk zusammen. So garantieren wir höchste Qualität und schnelle Reaktionszeiten durch Experten aus Ihrer direkten Nähe." },
                            { question: "Warum können Sie so günstige Preise anbieten?", answer: "Als modernes Netzwerk nutzen wir digitale und automatisierte Prozesse. Wir sparen uns teure Büroräume und einen aufgeblähten Verwaltungsapparat. Diesen Kostenvorteil geben wir 1:1 an Sie weiter." },
                            { question: "Sind Sie im ganzen Bundesgebiet tätig?", answer: "Ja, wir haben unser Partnernetzwerk so aufgebaut, dass wir in nahezu jeder Region Deutschlands extrem schnell reagieren können." },
                            { question: "Wie gewährleisten Sie die Diskretion?", answer: "Diskretion ist ein Kern unserer Philosophie. Unsere Partner kommen in der Regel in neutralen Fahrzeugen ohne auffällige Werbung für Schädlingsbekämpfung zu Ihnen, um Ihr Image und Ihre Privatsphäre zu schützen." }
                        ]}
                    />
                </div>
            </main>

            <Footer />
        </>
    );
}
