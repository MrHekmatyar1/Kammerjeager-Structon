export interface BezirkInfo {
    description: string;        // Уникальный вводный текст о районе (2-3 предложения)
    buildingType: string;       // Тип застройки
    population: string;         // Население района
    topPests: string[];         // Типичные вредители
    localKeywords: string[];    // Дополнительные ключевые слова
    heroSubtitle: string;       // Уникальный подзаголовок для Hero
    pestContext: string;        // Контекст проблем с вредителями в районе
    callToAction: string;       // Локализованный призыв к действию
}

export interface City {
    name: string;
    slug: string;
    isBerlinBezirk?: boolean;
    bezirkInfo?: BezirkInfo;
}

export const CITIES: City[] = [
    { name: 'Berlin', slug: 'berlin' },
    { name: 'Potsdam', slug: 'potsdam' },
    { name: 'Hennigsdorf', slug: 'hennigsdorf' },

    // ── Große Städte Deutschland ──────────────────────────────────────────────
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
    { name: 'Freiburg im Breisgau', slug: 'freiburg' },
    { name: 'Krefeld', slug: 'krefeld' },
    { name: 'Lübeck', slug: 'luebeck' },
    { name: 'Oberhausen', slug: 'oberhausen' },

    // ── Hamburg Bezirke ───────────────────────────────────────────────────────
    { name: 'Hamburg-Altona', slug: 'hamburg-altona' },
    { name: 'Hamburg-Eimsbüttel', slug: 'hamburg-eimsbuettel' },
    { name: 'Hamburg-Mitte', slug: 'hamburg-mitte' },
    { name: 'Hamburg-Nord', slug: 'hamburg-nord' },
    { name: 'Hamburg-Wandsbek', slug: 'hamburg-wandsbek' },
    { name: 'Hamburg-Harburg', slug: 'hamburg-harburg' },
    { name: 'Hamburg-Bergedorf', slug: 'hamburg-bergedorf' },

    // ── München Stadtbezirke ──────────────────────────────────────────────────
    { name: 'München-Schwabing', slug: 'muenchen-schwabing' },
    { name: 'München-Maxvorstadt', slug: 'muenchen-maxvorstadt' },
    { name: 'München-Neuhausen', slug: 'muenchen-neuhausen' },
    { name: 'München-Sendling', slug: 'muenchen-sendling' },
    { name: 'München-Bogenhausen', slug: 'muenchen-bogenhausen' },
    { name: 'München-Au-Haidhausen', slug: 'muenchen-au-haidhausen' },
    { name: 'München-Pasing', slug: 'muenchen-pasing' },
    { name: 'München-Moosach', slug: 'muenchen-moosach' },

    // ── Köln Stadtbezirke ─────────────────────────────────────────────────────
    { name: 'Köln-Innenstadt', slug: 'koeln-innenstadt' },
    { name: 'Köln-Ehrenfeld', slug: 'koeln-ehrenfeld' },
    { name: 'Köln-Nippes', slug: 'koeln-nippes' },
    { name: 'Köln-Porz', slug: 'koeln-porz' },
    { name: 'Köln-Kalk', slug: 'koeln-kalk' },
    { name: 'Köln-Lindenthal', slug: 'koeln-lindenthal' },

    // ── Frankfurt Stadtteile ──────────────────────────────────────────────────
    { name: 'Frankfurt-Innenstadt', slug: 'frankfurt-innenstadt' },
    { name: 'Frankfurt-Sachsenhausen', slug: 'frankfurt-sachsenhausen' },
    { name: 'Frankfurt-Bornheim', slug: 'frankfurt-bornheim' },
    { name: 'Frankfurt-Nordend', slug: 'frankfurt-nordend' },
    { name: 'Frankfurt-Westend', slug: 'frankfurt-westend' },
    { name: 'Frankfurt-Bockenheim', slug: 'frankfurt-bockenheim' },
    { name: 'Frankfurt-Höchst', slug: 'frankfurt-hoechst' },
    { name: 'Frankfurt-Gallus', slug: 'frankfurt-gallus' },

    // ── Stuttgart Stadtbezirke ────────────────────────────────────────────────
    { name: 'Stuttgart-Mitte', slug: 'stuttgart-mitte' },
    { name: 'Stuttgart-Nord', slug: 'stuttgart-nord' },
    { name: 'Stuttgart-Süd', slug: 'stuttgart-sued' },
    { name: 'Stuttgart-Ost', slug: 'stuttgart-ost' },
    { name: 'Stuttgart-West', slug: 'stuttgart-west' },
    { name: 'Stuttgart-Bad Cannstatt', slug: 'stuttgart-bad-cannstatt' },
    { name: 'Stuttgart-Zuffenhausen', slug: 'stuttgart-zuffenhausen' },

    // ── Düsseldorf Stadtbezirke ───────────────────────────────────────────────
    { name: 'Düsseldorf-Mitte', slug: 'duesseldorf-mitte' },
    { name: 'Düsseldorf-Pempelfort', slug: 'duesseldorf-pempelfort' },
    { name: 'Düsseldorf-Flingern', slug: 'duesseldorf-flingern' },
    { name: 'Düsseldorf-Bilk', slug: 'duesseldorf-bilk' },
    { name: 'Düsseldorf-Oberkassel', slug: 'duesseldorf-oberkassel' },
    { name: 'Düsseldorf-Gerresheim', slug: 'duesseldorf-gerresheim' },

    // ── Berlin Bezirke ────────────────────────────────────────────────────────

    {
        name: 'Berlin-Mitte',
        slug: 'berlin-mitte',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Berlin-Mitte ist das historische Herz der Hauptstadt – mit Altbauten aus dem 19. Jahrhundert, modernen Hochhäusern und einem der dichtesten Touristenströme Europas. Gerade diese Mischung aus alten Fundamenten, Hotellerie und Gastronomie macht den Bezirk besonders anfällig für Schädlingsbefall.',
            buildingType: 'Altbau (Gründerzeit), Plattenbau, Neubau gemischt',
            population: '375.000 Einwohner',
            topPests: ['Ratten', 'Bettwanzen', 'Schaben', 'Tauben'],
            localKeywords: ['Kammerjäger Mitte Berlin', 'Schädlingsbekämpfung Mitte', 'Bettwanzen Hotel Mitte', 'Ratten Keller Mitte'],
            heroSubtitle: 'Schnelle Hilfe im Herzen Berlins – diskret, professionell, zum Festpreis.',
            pestContext: 'In Mitte sind vor allem Bettwanzen in Mietunterkünften und Hotelbetten ein wachsendes Problem. Die alten Kanalrohre unter dem Bezirk bieten Ratten ideale Wanderrouten. Restaurants und Cafés kämpfen regelmäßig mit Schaben.',
            callToAction: 'Jetzt Kammerjäger in Mitte beauftragen',
        },
    },

    {
        name: 'Berlin-Prenzlauer Berg',
        slug: 'berlin-prenzlauer-berg',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Prenzlauer Berg ist bekannt für seine dichten Altbaustraßen mit Hinterhöfen aus der Gründerzeit. Die charakteristischen Holzbalkendecken und Außenwände aus dem späten 19. Jahrhundert bieten Mäusen und Schaben ideale Nistmöglichkeiten – direkt neben Berliner Familien.',
            buildingType: 'Altbau Gründerzeit (90%), Hinterhöfe, Dachgeschossausbauten',
            population: '162.000 Einwohner',
            topPests: ['Mäuse', 'Wespen', 'Ameisen', 'Ratten'],
            localKeywords: ['Kammerjäger Prenzlauer Berg', 'Mäuse Altbau Prenzlauer Berg', 'Wespennest Hinterhof', 'Schädlinge Prenzlauer Berg'],
            heroSubtitle: 'Ihr Schädlingsexperte für Altbau und Hinterhof in Prenzlauer Berg.',
            pestContext: 'Die Altbausubstanz mit Holzdielen und ungenutzten Kammern schafft perfekte Verstecke für Mäuse. In den begrünten Hinterhöfen entstehen jedes Jahr zahlreiche Wespennester. Durch die hohe Wohndichte breiten sich Bettwanzen schnell zwischen Nachbarwohnungen aus.',
            callToAction: 'Kammerjäger für Prenzlauer Berg anfragen',
        },
    },

    {
        name: 'Berlin-Friedrichshain',
        slug: 'berlin-friedrichshain',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Friedrichshain ist einer der jüngsten und dynamischsten Bezirke Berlins – mit einer Mischung aus DDR-Plattenbauten an der Karl-Marx-Allee, sanierten Altbauten und einer pulsierenden Bar- und Restaurantszene. Diese Kombination bringt typische Schädlingsprobleme mit sich.',
            buildingType: 'Plattenbau (Karl-Marx-Allee), Altbau saniert, Neubauten',
            population: '290.000 Einwohner (mit Kreuzberg)',
            topPests: ['Schaben', 'Ratten', 'Bettwanzen', 'Mäuse'],
            localKeywords: ['Kammerjäger Friedrichshain', 'Schaben Gastronomie Friedrichshain', 'Ratten Spree Friedrichshain', 'Schädlingsbekämpfung Friedrichshain'],
            heroSubtitle: 'Professionelle Schädlingsbekämpfung in Friedrichshain – schnell und diskret.',
            pestContext: 'Die lebhafte Bar- und Gastronomiezene in Friedrichshain zieht Schaben an – besonders in Kellerbereichen. Die Nähe zur Spree fördert Rattenprobleme entlang der Ufer. In den dicht belegten WGs verbreiten sich Bettwanzen rasant.',
            callToAction: 'Jetzt Experten in Friedrichshain anfragen',
        },
    },

    {
        name: 'Berlin-Kreuzberg',
        slug: 'berlin-kreuzberg',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Kreuzberg ist einer der lebendigsten Stadtteile Berlins – mit hunderten von Restaurants, Märkten und einer dichten Altbaubebauung. Die hohe Bevölkerungsdichte und die Vielzahl an Gastronomiebetrieben machen den Bezirk besonders anfällig für hartnäckige Schädlingsprobleme.',
            buildingType: 'Gründerzeit-Altbau, Vorder- und Hinterhäuser',
            population: '165.000 Einwohner',
            topPests: ['Schaben', 'Ratten', 'Ameisen', 'Bettwanzen'],
            localKeywords: ['Kammerjäger Kreuzberg', 'Kakerlaken Kreuzberg Restaurant', 'Ratten Kreuzberg', 'Schädlingsbekämpfung SO36'],
            heroSubtitle: 'Kammerjäger in Kreuzberg – für Privat und Gewerbe.',
            pestContext: 'In Kreuzberg ist die Restaurantdichte europaweit einzigartig – das zieht Schaben und Ratten an. Auf dem Wochenmarkt am Maybachufer bleiben Essensreste zurück, die Ratten aus dem Landwehrkanal anlocken. Enge Treppenhäuser beschleunigen die Ausbreitung von Bettwanzen.',
            callToAction: 'Kammerjäger Kreuzberg beauftragen',
        },
    },

    {
        name: 'Berlin-Neukölln',
        slug: 'berlin-neukoelln',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Neukölln ist Berlins vielfältigster Bezirk – mit einem der ältesten Mietshausbestände der Stadt, dem Volkspark Hasenheide und einer hohen Restaurantdichte entlang der Sonnenallee. Genau diese Kombination aus Grünflächen und dichter Bebauung schafft ideale Bedingungen für Schädlinge.',
            buildingType: 'Altbau (Gründerzeit, teils unsaniert), Plattenbau Nord-Neukölln',
            population: '330.000 Einwohner',
            topPests: ['Ratten', 'Bettwanzen', 'Schaben', 'Ameisen'],
            localKeywords: ['Kammerjäger Neukölln', 'Ratten Hasenheide Neukölln', 'Bettwanzen Neukölln', 'Schaben Sonnenallee', 'Schädlinge Neukölln'],
            heroSubtitle: 'Ihr Schädlingsbekämpfer in Neukölln – schnell und zuverlässig.',
            pestContext: 'Der Volkspark Hasenheide ist ein Ausgangspunkt für Ratten, die ins angrenzende Wohngebiet wandern. Unsanierte Altbaukeller bieten optimale Brutbedingungen. Die Restaurantdichte an der Sonnenallee fördert Schabenbefall in gewerblichen Küchen.',
            callToAction: 'Experten in Neukölln anfragen',
        },
    },

    {
        name: 'Berlin-Charlottenburg',
        slug: 'berlin-charlottenburg',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Charlottenburg ist das elegante Westberlin – mit prunkvollen Gründerzeithäusern rund ums Schloss, gehobener Hotellerie am Kurfürstendamm und großen Parkflächen. Trotz der gepflegten Erscheinung sind Schädlinge auch hier ein Problem, das diskrete professionelle Hilfe erfordert.',
            buildingType: 'Villen, Gründerzeit-Altbau, Hotels (5-Sterne), Neubau',
            population: '340.000 Einwohner (mit Wilmersdorf)',
            topPests: ['Bettwanzen', 'Tauben', 'Marder', 'Wespen'],
            localKeywords: ['Kammerjäger Charlottenburg', 'Bettwanzen Hotel Kurfürstendamm', 'Taubenabwehr Charlottenburg', 'Marder Dachboden Charlottenburg', 'Schädlinge Ku\'damm'],
            heroSubtitle: 'Diskrete Schädlingsbekämpfung für Charlottenburg – auf höchstem Niveau.',
            pestContext: 'In der Hotellandschaft am Ku\'damm sind Bettwanzen eine ständige Bedrohung für die Reputation. Tauben verschmutzen Balkone und Fassaden der Gründerzeithäuser. Marder finden in den großen Dachböden der Altbauten ideale Überwinterungsquartiere.',
            callToAction: 'Jetzt Kammerjäger in Charlottenburg anfragen',
        },
    },

    {
        name: 'Berlin-Spandau',
        slug: 'berlin-spandau',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Spandau ist der westlichste Bezirk Berlins – mit einer historischen Altstadt, ausgedehnten Waldflächen und einer starken Verbindung zur Havel. Die Nähe zu Gewässern und Wäldern sorgt für typische Schädlingsprobleme, die sich im Gegensatz zum Stadtzentrum anders äußern.',
            buildingType: 'Einfamilienhäuser, Kleinsiedlung, Altbau Altstadt, Plattenbau',
            population: '245.000 Einwohner',
            topPests: ['Mäuse', 'Ratten', 'Wespen', 'Marder'],
            localKeywords: ['Kammerjäger Spandau', 'Mäuse Haus Spandau', 'Ratten Havel Spandau', 'Wespennest Garten Spandau', 'Marder Spandau'],
            heroSubtitle: 'Schädlingsbekämpfung in Spandau – vom Keller bis zum Dachboden.',
            pestContext: 'Die Havel und ihre Nebenarme ziehen Wanderratten an, die in Gärten und Keller eindringen. In den Waldrandgebieten Spandaus nisten Wespen massenhaft in Erdlöchern und unter Holzverkleidungen. Marder wandern aus dem Forst in Einfamilienhäuser.',
            callToAction: 'Kammerjäger in Spandau beauftragen',
        },
    },

    {
        name: 'Berlin-Steglitz',
        slug: 'berlin-steglitz',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Steglitz-Zehlendorf ist der grünste Bezirk Berlins – mit dem Botanischen Garten, dem Grunewald und einer Vielzahl von Villengärten. Diese natürlichen Lebensräume direkt an der Wohnbebauung bedeuten: Schädlinge aus dem Grünen finden immer wieder den Weg ins Haus.',
            buildingType: 'Villen, Einfamilienhäuser, Reihenhäuser, wenig Mietshäuser',
            population: '295.000 Einwohner (mit Zehlendorf)',
            topPests: ['Wespen', 'Ameisen', 'Mäuse', 'Marder'],
            localKeywords: ['Kammerjäger Steglitz', 'Wespennest Garten Steglitz', 'Ameisen Haus Steglitz', 'Marder Dachboden Zehlendorf', 'Schädlinge Steglitz'],
            heroSubtitle: 'Schädlingsexperte in Steglitz-Zehlendorf – für Haus und Garten.',
            pestContext: 'In den großen Villengärten Steglitz-Zehlendorfs bauen Wespen jedes Jahr Nester unter Terrassendächern und in Gartenhäusern. Ameisenkolonien wandern aus dem Garten durch Risse in die Hausfundamente. Marder aus dem Grunewald nutzen ruhige Dachböden als Schlafplatz.',
            callToAction: 'Experten in Steglitz anfragen',
        },
    },

    {
        name: 'Berlin-Tempelhof',
        slug: 'berlin-tempelhof',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Tempelhof-Schöneberg ist ein vielseitiger Bezirk – mit dem ehemaligen Flughafen Tempelhof als riesigem Freizeitgelände, gewachsenen Wohnvierteln und einer starken Gewerbestruktur. Die Kombination aus historischen Gebäuden und innerstädtischen Grünflächen schafft vielfältige Schädlingsprobleme.',
            buildingType: 'Altbau (1900-1950), Gewerbebauten, Kiez-Bebauung',
            population: '350.000 Einwohner (mit Schöneberg)',
            topPests: ['Ratten', 'Mäuse', 'Tauben', 'Schaben'],
            localKeywords: ['Kammerjäger Tempelhof', 'Ratten Tempelhofer Feld', 'Tauben Schöneberg', 'Schaben Gewerbe Tempelhof', 'Schädlinge Tempelhof'],
            heroSubtitle: 'Kammerjäger in Tempelhof-Schöneberg – schnell, diskret, effektiv.',
            pestContext: 'Das Tempelhofer Feld ist eine Brutstätte für Ratten, die in die angrenzenden Wohngebiete wandern. Alte Gewerbehallen beherbergen Schaben-Kolonien. Die zahlreichen Wohnhäuser aus den 1920er-30er Jahren haben oft unsanierte Kellergeschosse – ein Paradies für Mäuse.',
            callToAction: 'Kammerjäger in Tempelhof beauftragen',
        },
    },

    {
        name: 'Berlin-Schöneberg',
        slug: 'berlin-schoeneberg',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Schöneberg ist für sein lebendiges Nachtleben, die Winterfeldtplatz-Szene und die charakteristischen Altbauzüge bekannt. Die hohe Restaurantdichte und die alten Kellersysteme unter dem Bezirk machen Schöneberg zu einem Schwerpunktgebiet für Schädlingsbekämpfung in Berlin.',
            buildingType: 'Gründerzeit-Altbau, Hinterhöfe, kaum Neubau',
            population: 'Teil von Tempelhof-Schöneberg',
            topPests: ['Schaben', 'Ratten', 'Bettwanzen', 'Ameisen'],
            localKeywords: ['Kammerjäger Schöneberg', 'Schaben Restaurant Schöneberg', 'Bettwanzen Altbau Schöneberg', 'Ratten Schöneberg Berlin'],
            heroSubtitle: 'Ihr Kammerjäger in Schöneberg – für Privat und Gastronomie.',
            pestContext: 'Rund um den Winterfeldtplatz häufen sich Schaben-Funde in Restaurantküchen. Die verzweigten Kellerflure der Altbauhäuser ermöglichen Ratten ein ganzes Tunnelsystem. Im dicht besiedelten Schöneberg breiten sich Bettwanzen über Gemeinschaftstreppen schnell auf benachbarte Wohnungen aus.',
            callToAction: 'Jetzt Kammerjäger in Schöneberg anfragen',
        },
    },

    {
        name: 'Berlin-Pankow',
        slug: 'berlin-pankow',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Pankow ist Berlins bevölkerungsreichster Bezirk – ein Mix aus ruhigen Villengegenden wie Niederschönhausen, dicht bebauten Altbaukiezen und dem wachsenden Neubaugebiet rund um die Pankower Hauptstraße. Grünflächen, Familiengärten und alte Bausubstanz bieten Schädlingen vielfältige Lebensräume.',
            buildingType: 'Altbau (Gründerzeit), Villen, Kleingärten, Neubauten',
            population: '410.000 Einwohner',
            topPests: ['Mäuse', 'Wespen', 'Ameisen', 'Ratten'],
            localKeywords: ['Kammerjäger Pankow', 'Mäuse Haus Pankow', 'Wespennest Garten Pankow', 'Ameisen Pankow Berlin', 'Schädlinge Niederschönhausen'],
            heroSubtitle: 'Schädlingsbekämpfung in Pankow – vom Kleingarten bis zum Altbau.',
            pestContext: 'In Pankows Kleingärten nisten Wespen unter Gartenhäuserdächern und in Erdlöchern. Mäuse nutzen alte Kellergewölbe als Winterquartier. In den Altbaugebieten rund um Prenzlauer Berg / Pankow-Zentrum verbreiten sich Schädlinge schnell durch verbundene Hauskeller.',
            callToAction: 'Kammerjäger für Pankow anfragen',
        },
    },

    {
        name: 'Berlin-Lichtenberg',
        slug: 'berlin-lichtenberg',
        isBerlinBezirk: true,
        bezirkInfo: {
            description: 'Lichtenberg ist ein aufstrebender Bezirk im Osten Berlins – mit einem hohen Anteil an Plattenbausiedlungen aus DDR-Zeiten, einem wachsenden Gewerbegebiet und der Nähe zur Rummelsburger Bucht. Die Großwohnblöcke und alten Industrieanlagen bringen typische Schädlingsprobleme mit sich.',
            buildingType: 'Plattenbau (WBS 70), Altbau, Gewerbegebiet, Neubauten',
            population: '295.000 Einwohner',
            topPests: ['Schaben', 'Bettwanzen', 'Ratten', 'Mäuse'],
            localKeywords: ['Kammerjäger Lichtenberg', 'Schaben Plattenbau Lichtenberg', 'Bettwanzen Lichtenberg', 'Ratten Rummelsburg', 'Schädlinge Lichtenberg Berlin'],
            heroSubtitle: 'Ihr Kammerjäger in Lichtenberg – für Plattenbau und Gewerbe.',
            pestContext: 'In den großen Plattenbausiedlungen Lichtenbergs können sich Schaben und Bettwanzen durch gemeinsame Leitungsschächte rasch verbreiten. Die Nähe zur Rummelsburger Bucht bringt Wanderratten in angrenzende Wohngebiete. Alte Industriehallen bieten Nagetieren ideale Verstecke.',
            callToAction: 'Experten in Lichtenberg anfragen',
        },
    },
];

// Helper: alle Berlin-Bezirke
export const BERLIN_BEZIRKE = CITIES.filter(c => c.isBerlinBezirk);

// Helper: alle deutschen Großstädte (ohne Berlin-Bezirke, nur Hauptstädte)
export const GERMAN_CITIES = CITIES.filter(c => !c.isBerlinBezirk);
