'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Millionenstädte mit Stadtbezirken — alle als identische Akkordeons
const CITIES_WITH_DISTRICTS = [
    {
        name: 'Berlin',
        slug: 'berlin',
        districts: [
            { name: 'Mitte', slug: 'berlin-mitte' },
            { name: 'Prenzlauer Berg', slug: 'berlin-prenzlauer-berg' },
            { name: 'Friedrichshain', slug: 'berlin-friedrichshain' },
            { name: 'Kreuzberg', slug: 'berlin-kreuzberg' },
            { name: 'Neukölln', slug: 'berlin-neukoelln' },
            { name: 'Charlottenburg', slug: 'berlin-charlottenburg' },
            { name: 'Spandau', slug: 'berlin-spandau' },
            { name: 'Steglitz', slug: 'berlin-steglitz' },
            { name: 'Tempelhof', slug: 'berlin-tempelhof' },
            { name: 'Schöneberg', slug: 'berlin-schoeneberg' },
            { name: 'Pankow', slug: 'berlin-pankow' },
            { name: 'Lichtenberg', slug: 'berlin-lichtenberg' },
        ],
    },
    {
        name: 'Hamburg',
        slug: 'hamburg',
        districts: [
            { name: 'Altona', slug: 'hamburg-altona' },
            { name: 'Eimsbüttel', slug: 'hamburg-eimsbuettel' },
            { name: 'Mitte', slug: 'hamburg-mitte' },
            { name: 'Nord', slug: 'hamburg-nord' },
            { name: 'Wandsbek', slug: 'hamburg-wandsbek' },
            { name: 'Harburg', slug: 'hamburg-harburg' },
            { name: 'Bergedorf', slug: 'hamburg-bergedorf' },
        ],
    },
    {
        name: 'München',
        slug: 'muenchen',
        districts: [
            { name: 'Schwabing', slug: 'muenchen-schwabing' },
            { name: 'Maxvorstadt', slug: 'muenchen-maxvorstadt' },
            { name: 'Neuhausen', slug: 'muenchen-neuhausen' },
            { name: 'Sendling', slug: 'muenchen-sendling' },
            { name: 'Bogenhausen', slug: 'muenchen-bogenhausen' },
            { name: 'Au-Haidhausen', slug: 'muenchen-au-haidhausen' },
            { name: 'Pasing', slug: 'muenchen-pasing' },
            { name: 'Moosach', slug: 'muenchen-moosach' },
        ],
    },
    {
        name: 'Köln',
        slug: 'koeln',
        districts: [
            { name: 'Innenstadt', slug: 'koeln-innenstadt' },
            { name: 'Ehrenfeld', slug: 'koeln-ehrenfeld' },
            { name: 'Nippes', slug: 'koeln-nippes' },
            { name: 'Porz', slug: 'koeln-porz' },
            { name: 'Kalk', slug: 'koeln-kalk' },
            { name: 'Lindenthal', slug: 'koeln-lindenthal' },
        ],
    },
];

// Alle anderen Städte — einfache Links in Rasteransicht
const OTHER_CITIES = [
    { name: 'Frankfurt am Main', slug: 'frankfurt' },
    { name: 'Stuttgart', slug: 'stuttgart' },
    { name: 'Düsseldorf', slug: 'duesseldorf' },
    { name: 'Leipzig', slug: 'leipzig' },
    { name: 'Dortmund', slug: 'dortmund' },
    { name: 'Essen', slug: 'essen' },
    { name: 'Bremen', slug: 'bremen' },
    { name: 'Dresden', slug: 'dresden' },
    { name: 'Hannover', slug: 'hannover' },
    { name: 'Nürnberg', slug: 'nuernberg' },
    { name: 'Duisburg', slug: 'duisburg' },
    { name: 'Bochum', slug: 'bochum' },
    { name: 'Wuppertal', slug: 'wuppertal' },
    { name: 'Bielefeld', slug: 'bielefeld' },
    { name: 'Bonn', slug: 'bonn' },
    { name: 'Münster', slug: 'muenster' },
    { name: 'Karlsruhe', slug: 'karlsruhe' },
    { name: 'Mannheim', slug: 'mannheim' },
    { name: 'Augsburg', slug: 'augsburg' },
    { name: 'Wiesbaden', slug: 'wiesbaden' },
    { name: 'Gelsenkirchen', slug: 'gelsenkirchen' },
    { name: 'Mönchengladbach', slug: 'moenchengladbach' },
    { name: 'Braunschweig', slug: 'braunschweig' },
    { name: 'Chemnitz', slug: 'chemnitz' },
    { name: 'Kiel', slug: 'kiel' },
    { name: 'Aachen', slug: 'aachen' },
    { name: 'Halle (Saale)', slug: 'halle-saale' },
    { name: 'Magdeburg', slug: 'magdeburg' },
    { name: 'Freiburg', slug: 'freiburg' },
    { name: 'Krefeld', slug: 'krefeld' },
    { name: 'Lübeck', slug: 'luebeck' },
    { name: 'Oberhausen', slug: 'oberhausen' },
];

export default function CityGrid() {
    // null = keine offen; string = slug der offenen Stadt
    const [openCity, setOpenCity] = useState<string | null>(null);

    const toggle = (slug: string) => {
        setOpenCity(prev => (prev === slug ? null : slug));
    };

    return (
        <section className="w-full max-w-5xl mx-auto bg-[#1a1a1a] text-white py-12 px-6 md:py-16 md:px-12">
            <h2 className="text-3xl md:text-4xl font-black mb-10 tracking-tight">
                Unsere Standorte in Deutschland
            </h2>

            {/* ── Millionenstädte mit Bezirken (je ein Akkordeon) ── */}
            <div className="flex flex-col mb-0">
                {CITIES_WITH_DISTRICTS.map((city) => {
                    const isOpen = openCity === city.slug;
                    return (
                        <div key={city.slug}>
                            <button
                                onClick={() => toggle(city.slug)}
                                className={`w-full flex items-center justify-between text-left py-3.5 px-2 md:px-4 transition-all duration-200
                                    ${isOpen
                                        ? 'border border-white/40'
                                        : 'border-b border-white/20 hover:border-white/50'
                                    }`}
                            >
                                <span className="font-semibold text-sm md:text-base">
                                    {city.name}
                                </span>
                                <div className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-2 md:px-4 pt-4 pb-5 border border-white/10 border-t-0">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-0">
                                                {city.districts.map((d) => (
                                                    <Link
                                                        key={d.slug}
                                                        href={`/${d.slug}`}
                                                        className="flex items-center justify-between py-2.5 px-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 group/item"
                                                    >
                                                        <span>{d.name}</span>
                                                        <svg
                                                            className="opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0"
                                                            width="13" height="13" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2.5"
                                                            strokeLinecap="round" strokeLinejoin="round"
                                                        >
                                                            <polyline points="9 18 15 12 9 6" />
                                                        </svg>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-white/10 my-6" />

            {/* ── Alle anderen Städte ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-0">
                {OTHER_CITIES.map((city) => (
                    <Link
                        key={city.slug}
                        href={`/${city.slug}`}
                        className="flex items-center justify-between py-3.5 px-2 text-sm text-white/70 hover:text-white border-b border-white/10 hover:bg-white/5 transition-all duration-150 group/city"
                    >
                        <span className="font-medium">{city.name}</span>
                        <svg
                            className="opacity-0 group-hover/city:opacity-100 transition-opacity shrink-0"
                            width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </Link>
                ))}
            </div>
        </section>
    );
}
