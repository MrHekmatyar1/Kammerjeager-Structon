import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/data/services';
import { SERVICE_CONTENT } from '@/lib/data/serviceContent';

import Hero from '@/components/sections/Hero';
import UnserProzess from '@/components/sections/UnserProzess';
import ServicePageContent from '@/components/sections/ServicePageContent';
import LeadWizard from '@/components/interactive/LeadWizard';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/interactive/ChatBot';

export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        service: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
    const { service: serviceSlug } = await params;
    const serviceData = SERVICES.find((s) => s.slug === serviceSlug);

    if (!serviceData) {
        return { title: 'Service nicht gefunden' };
    }

    return {
        title: `Kammerjäger für ${serviceData.name} – 24/7 Notdienst | Experten vor Ort`,
        description: `${serviceData.description} Wir vermitteln zertifizierte Schädlingsbekämpfer in Ihrer Nähe. Schnell, diskret und zum Festpreis.`,
        alternates: {
            canonical: `https://kammerjaeger-structon.de/schaedlinge/${serviceData.slug}`,
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
    const { service: serviceSlug } = await params;
    const serviceData = SERVICES.find((s) => s.slug === serviceSlug);

    if (!serviceData) {
        notFound();
    }

    const content = SERVICE_CONTENT[serviceData!.slug];

    return (
        <main className="min-h-screen bg-white flex flex-col items-center w-full overflow-x-hidden">

            {/* Hero — animated headline with service name */}
            <Hero serviceName={serviceData!.shortName} />

            {/* 3-step process */}
            <UnserProzess />

            {/* Editorial content: intro, facts, risks, FAQ — only when data exists */}
            {content && <ServicePageContent content={content} />}

            {/* Lead form */}
            <section
                id="anfrage"
                className="w-full flex flex-col items-center px-6 pt-20 pb-24"
                style={{ background: '#f1f4f8' }}
            >
                <div className="w-full max-w-[850px]">
                    <LeadWizard />
                </div>
            </section>

            <Footer />
            <ChatBot />
        </main>
    );
}
