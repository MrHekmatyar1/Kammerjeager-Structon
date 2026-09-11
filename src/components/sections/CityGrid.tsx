'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Berlin-Bezirke für den Akkordeon
const BERLIN_BEZIRKE = [
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
];

// Alle deutschen Großstädte (ohne Berlin – Berlin ist separat mit Bezirken)
const MAJOR_CITIES = [
    { name: 'Hamburg', slug: 'hamburg' },
    { name: 'München', slug: 'muenchen' },
    { name: 'Köln', slug: 'koeln' },
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
    const [berlinOpen, setBerlinOpen] = useState(false);

    return (
        <section className="w-full max-w-5xl mx-auto bg-[#1a1a1a] text-white py-12 px-6 md:py-16 md:px-12 mt-0">
            {/* Заголовок — стиль 1:1 как у FAQ */}
            <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
                Unsere Standorte in Deutschland
            </h2>
            <p className="text-white/50 text-sm mb-10">
                Geprüfte Kammerjäger in allen großen Städten – schnell, diskret, zum Festpreis.
            </p>

            {/* Berlin — Sonderzeile mit Akkordeon (immer oben links) */}
            <div className="mb-1">
                <button
                    onClick={() => setBerlinOpen(!berlinOpen)}
                    className={`w-full flex items-center justify-between text-left py-4 px-2 md:px-4 transition-all duration-200 group
                        ${berlinOpen
                            ? 'border border-white/40 bg-white/5'
                            : 'border-b border-white/20 hover:border-white/50 hover:bg-white/5'
                        }`}
                >
                    <span className="font-semibold text-sm md:text-base flex items-center gap-3">
                        <span className="text-[#C8102E] font-black text-xs tracking-widest uppercase hidden sm:inline">
                            Hauptstadt
                        </span>
                        Berlin
                    </span>
                    <div className="flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors">
                        <span className="text-xs hidden sm:block">
                            {berlinOpen ? 'Bezirke ausblenden' : '12 Bezirke anzeigen'}
                        </span>
                        <motion.div
                            animate={{ rotate: berlinOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </motion.div>
                    </div>
                </button>

                {/* Bezirke-Akkordeon */}
                <AnimatePresence>
                    {berlinOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                        >
                            <div className="px-2 md:px-4 py-4 bg-white/5 border border-white/10 border-t-0">
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-semibold">
                                    Berliner Bezirke — direkte Kammerjäger-Vermittlung
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-0">
                                    {BERLIN_BEZIRKE.map((bezirk) => (
                                        <Link
                                            key={bezirk.slug}
                                            href={`/${bezirk.slug}`}
                                            className="flex items-center justify-between py-2.5 px-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 group/item"
                                        >
                                            <span>{bezirk.name}</span>
                                            <svg
                                                className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                                                width="14" height="14" viewBox="0 0 24 24" fill="none"
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

            {/* Divider */}
            <div className="border-t border-white/10 my-6" />

            {/* Alle anderen Städte als Grid */}
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-semibold">
                Weitere Städte in Deutschland
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-0">
                {MAJOR_CITIES.map((city) => (
                    <Link
                        key={city.slug}
                        href={`/${city.slug}`}
                        className="flex items-center justify-between py-3.5 px-2 text-sm text-white/70 hover:text-white border-b border-white/10 hover:bg-white/5 transition-all duration-150 group/city"
                    >
                        <span className="font-medium">{city.name}</span>
                        <svg
                            className="opacity-0 group-hover/city:opacity-100 transition-opacity shrink-0"
                            width="14" height="14" viewBox="0 0 24 24" fill="none"
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
