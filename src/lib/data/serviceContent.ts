// serviceContent.ts — per-pest editorial content for the /schaedlinge/[service] pages
// Контент страниц по каждому виду вредителей

export interface ServiceFAQ {
    question: string;
    answer: string;
}

export interface ServiceContent {
    slug: string;
    tagline: string;          // e.g. "Schnell, sicher, diskret."
    intro: string;            // 2–3 sentence intro shown above the wizard
    warning: string;          // short urgency statement
    facts: { label: string; value: string }[];  // 3 quick-stat facts
    faqs: ServiceFAQ[];
    risks: string[];          // bullet list of dangers / why act fast
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
    'wespennest-entfernen': {
        slug: 'wespennest-entfernen',
        tagline: 'Schnell, sicher, diskret.',
        intro: 'Ein Wespennest in der Nähe von Aufenthaltsbereichen ist gefährlich – besonders für Allergiker. Unsere zertifizierten Kammerjäger entfernen das Nest fachgerecht und verhindern eine erneute Besiedlung.',
        warning: 'Nie selbst entfernen – Wespen greifen in Gruppen an.',
        facts: [
            { label: 'Reaktionszeit', value: '24h' },
            { label: 'Behandlungsgarantie', value: '100%' },
            { label: 'Festpreis', value: 'ab 160€' },
        ],
        risks: [
            'Allergische Schockreaktionen (Anaphylaxie) möglich',
            'Ein Nest kann bis zu 10.000 Wespen beherbergen',
            'Eigenversuche reizen den Schwarm und gefährden Nachbarn',
            'Im Herbst werden Wespen besonders aggressiv',
        ],
        faqs: [
            {
                question: 'Wie lange dauert eine Wespennest-Entfernung?',
                answer: 'Der Einsatz dauert je nach Nestgröße und Zugänglichkeit zwischen 30 Minuten und 2 Stunden. Anschließend ist der Bereich sofort wieder sicher nutzbar.',
            },
            {
                question: 'Muss ich das Haus verlassen?',
                answer: 'In der Regel nicht. Der Techniker sichert den betroffenen Bereich ab. Bei Nestern im Innenraum kann ein kurzes Verlassen des Zimmers nötig sein.',
            },
            {
                question: 'Wie viel kostet die Wespennest-Entfernung?',
                answer: 'Der Festpreis beginnt ab 160€ inklusive Anfahrt und Material. Der genaue Preis hängt von Nestgröße, Lage und Zugänglichkeit ab – Sie erhalten vorher ein verbindliches Angebot.',
            },
            {
                question: 'Kommt das Nest zurück?',
                answer: 'Wespen kehren nach einer professionellen Entfernung typischerweise nicht zurück. Auf Wunsch behandeln wir die Stelle vorbeugend mit einem Mittel, das eine Neuansiedlung verhindert.',
            },
            {
                question: 'Dürfen Wespen überhaupt entfernt werden?',
                answer: 'Wespen stehen unter Naturschutz, dürfen aber bei einer konkreten Gefährdung für Menschen bekämpft werden. Unser Kammerjäger prüft vor Ort die rechtliche Situation und handelt entsprechend.',
            },
        ],
    },

    'bettwanzen-bekaempfen': {
        slug: 'bettwanzen-bekaempfen',
        tagline: 'Gründlich. Nachhaltig. Diskret.',
        intro: 'Bettwanzen sind Meister im Verstecken – standard Hausmittel reichen nicht aus. Unsere Experten nutzen professionelle Wärme- oder Chemikalienbehandlungen, die den Befall vollständig und dauerhaft beseitigen.',
        warning: 'Bettwanzen verbreiten sich rasend schnell. Jede Woche zählt.',
        facts: [
            { label: 'Reaktionszeit', value: '24h' },
            { label: 'Erfolgrate', value: '>98%' },
            { label: 'Festpreis', value: 'ab 380€' },
        ],
        risks: [
            'Ein Weibchen legt bis zu 500 Eier in seinem Leben',
            'Verbreitung über Gepäck, Kleidung und Möbel',
            'Schlafmangel, Stress und psychische Belastung',
            'Eigenbehnadlung verdrängt Tiere, eliminiert sie aber nicht',
        ],
        faqs: [
            {
                question: 'Wie erkenne ich Bettwanzen?',
                answer: 'Typische Zeichen sind juckende Bissspuren in Reihen, kleine Blutflecken auf der Bettwäsche sowie schwarze Kotpunkte an Matratzenrahmen und Ritzen.',
            },
            {
                question: 'Wie läuft die Bettwanzen-Behandlung ab?',
                answer: 'Nach einer Inspektion wird ein Behandlungsverfahren gewählt – Wärmebehandlung (60°C) oder gezielte Chemikalienbehandlung. Eine Nachkontrolle nach 2–3 Wochen ist inklusive.',
            },
            {
                question: 'Muss ich meine Möbel wegwerfen?',
                answer: 'Nein. Eine professionelle Behandlung macht das in aller Regel unnötig. Wegwerfen von Möbeln verteilt Wanzen häufig sogar in der Wohnung.',
            },
            {
                question: 'Wie lange muss ich die Wohnung verlassen?',
                answer: 'Bei Chemikalienbehandlung 4–6 Stunden, bei Wärmebehandlung meist nur 2–3 Stunden. Der Techniker gibt Ihnen genaue Anweisungen.',
            },
            {
                question: 'Übernimmt die Versicherung die Kosten?',
                answer: 'Manche Hausrat- oder Gebäudeversicherungen übernehmen Kosten bei nachgewiesenem Befall. Wir stellen Ihnen alle notwendigen Dokumente für die Versicherung aus.',
            },
        ],
    },

    'ratten-bekaempfen': {
        slug: 'ratten-bekaempfen',
        tagline: 'Diskret, schnell, restlos.',
        intro: 'Ratten übertragen Krankheitserreger, beschädigen Gebäude und vermehren sich rasant. Unser Kammerjäger erstellt ein individuelles Bekämpfungskonzept und eliminiert den Befall restlos – inklusive Sicherung der Einfallstellen.',
        warning: 'Eine Rattenfamilie wächst innerhalb von Wochen auf Hunderte Tiere an.',
        facts: [
            { label: 'Reaktionszeit', value: '24h' },
            { label: 'Dokumentation', value: 'Inkl.' },
            { label: 'Festpreis', value: 'ab 290€' },
        ],
        risks: [
            'Übertragung von Leptospirose, Salmonellen und Hantavirus',
            'Nagerschäden an Kabeln und Leitungen – Brandgefahr',
            'Schnelle Reproduktion: ein Paar = 800 Nachkommen/Jahr',
            'Kontaminierung von Lebensmitteln und Trinkwasser',
        ],
        faqs: [
            {
                question: 'Woher kommen Ratten in mein Haus?',
                answer: 'Ratten gelangen über Kanalisation, defekte Leitungen, Rohrdurchführungen und Risse im Fundament. Oft reicht eine Öffnung von 2–3 cm.',
            },
            {
                question: 'Welche Methoden werden bei der Rattenbekämpfung eingesetzt?',
                answer: 'Je nach Situation werden Köderboxen mit zugelassenen Rodentiziden, Lebendfallen oder Kombimethoden eingesetzt. Anschließend sichern wir die Einfallstellen.',
            },
            {
                question: 'Muss ich mein Haus räumen?',
                answer: 'Nein. Die Köderboxen werden so platziert, dass sie für Kinder und Haustiere nicht zugänglich sind. Ihr Alltag wird kaum beeinträchtigt.',
            },
            {
                question: 'Wie lange dauert die Rattenbekämpfung?',
                answer: 'Die aktive Bekämpfungsphase dauert 2–4 Wochen, je nach Befallsstärke. Nach einer Abschlusskontrolle erhalten Sie eine vollständige Dokumentation.',
            },
            {
                question: 'Muss ich das dem Gesundheitsamt melden?',
                answer: 'In manchen Bundesländern und Kommunen besteht bei Rattenbefall Meldepflicht. Unser Techniker informiert Sie vor Ort über Ihre Pflichten.',
            },
        ],
    },

    'maeuse-bekaempfen': {
        slug: 'maeuse-bekaempfen',
        tagline: 'Konsequent und nachhaltig.',
        intro: 'Mäuse hinterlassen Kotspuren, kontaminieren Lebensmittel und nagen an Leitungen. Unser Experte lokalisiert Nester, beseitigt den Befall gezielt und sichert die Einfallstellen dauerhaft ab.',
        warning: 'Mäuse können täglich 40 Kotpellets hinterlassen – in Ihrer Küche.',
        facts: [
            { label: 'Reaktionszeit', value: '24h' },
            { label: 'Sicherung', value: 'Inkl.' },
            { label: 'Festpreis', value: 'ab 200€' },
        ],
        risks: [
            'Übertragung von Salmonellen, Hantavirus und Leptospirose',
            'Nagerschäden an Elektroleitungen – Brandrisiko',
            'Ein Mäusepaar produziert bis zu 80 Jungtiere pro Jahr',
            'Kontaminierung von Lebensmitteln und Vorräten',
        ],
        faqs: [
            {
                question: 'Wie finde ich heraus, ob ich Mäuse habe?',
                answer: 'Typische Zeichen: Kotpellets (ca. 3–6 mm, spitz), angenagter Verpackungen, Fettspuren an Wänden und ein charakteristischer Ammoniakgeruch.',
            },
            {
                question: 'Schaden Fallen oder Gift Haustieren?',
                answer: 'Wir setzen ausschließlich zugelassene Präparate ein und platzieren Köderboxen so, dass Kinder und Haustiere keinen Zugang haben.',
            },
            {
                question: 'Wie verhindere ich eine erneute Invasion?',
                answer: 'Nach der Bekämpfung sichern wir Einfallstellen mit geeigneten Materialien. Außerdem erhalten Sie konkrete Tipps zur Prävention (Lebensmittellagerung, Gartengestaltung).',
            },
            {
                question: 'Kann ich das Problem selbst lösen?',
                answer: 'Einzelne Mäuse lassen sich mit Fallen fangen, doch bei einem Nest ist professionelle Hilfe nötig. Ohne Bekämpfung des Nestes kehren die Tiere immer wieder.',
            },
        ],
    },

    'schaben-bekaempfen': {
        slug: 'schaben-bekaempfen',
        tagline: 'Gründlich. HACCP-konform. Restlos.',
        intro: 'Schaben sind nachtaktiv und verstecken sich extrem gut. Sie übertragen Krankheitserreger und sind resistent gegen viele Hausmittel. Unsere Fachleute setzen professionelle Gelköder und Sprühmittel ein, die eine vollständige Elimination sicherstellen.',
        warning: 'Schaben verdoppeln ihre Population alle 30 Tage.',
        facts: [
            { label: 'Reaktionszeit', value: '24h' },
            { label: 'HACCP-Dokumentation', value: 'Auf Anfrage' },
            { label: 'Festpreis', value: 'ab 420€' },
        ],
        risks: [
            'Übertragung von Salmonellen, E. coli und Dysenteriegif',
            'Auslöser von Asthma und Allergien durch Kotpartikel',
            'Ein Weibchen kann bis zu 400 Nachkommen haben',
            'Schnelle Resistenzbildung gegen ungeeignete Mittel',
        ],
        faqs: [
            {
                question: 'Wo kommen Schaben plötzlich her?',
                answer: 'Schaben gelangen häufig über Kartonverpackungen, Lebensmittel, Elektrogeräte oder aus der Kanalisation ins Gebäude.',
            },
            {
                question: 'Welche Methoden werden eingesetzt?',
                answer: 'Je nach Situation werden Gelköder (geruchlos, kaum Aufwand für Sie), Sprühbehandlungen oder Stäubemittel eingesetzt. Die Wahl hängt von Befallsstärke und Gebäudetyp ab.',
            },
            {
                question: 'Wie schnell sind Schaben nach der Behandlung verschwunden?',
                answer: 'Erste Reduktionen sind bereits nach 24–48 Stunden sichtbar. Ein vollständiges Ergebnis tritt nach 2–3 Wochen ein. Eine Nachkontrolle ist inklusive.',
            },
            {
                question: 'Kann mein Betrieb während der Behandlung weiterarbeiten?',
                answer: 'Bei Gelköder-Behandlungen ja – es sind keine Betriebsunterbrechungen nötig. Bei Sprühbehandlungen sind kurze Ruhephasen erforderlich. Wir planen individuell.',
            },
            {
                question: 'Erstellen Sie HACCP-Dokumentation?',
                answer: 'Ja, auf Anfrage erstellen wir HACCP-konforme Berichte für Lebensmittelbetriebe, Gastronomie und andere auditpflichtige Unternehmen.',
            },
        ],
    },

    'ameisen-bekaempfen': {
        slug: 'ameisen-bekaempfen',
        tagline: 'Nachhaltig. Haus- und gartenfreundlich.',
        intro: 'Ameisen schützen ihre Königin mit ausgefeilten Strategien. Ohne Bekämpfung der Königin kehren sie immer wieder. Unsere Kammerjäger setzen Köder ein, die gezielt zum Nest transportiert werden – langfristig und ohne Chemikalieneinsatz im Wohnraum.',
        warning: 'Superkolonien können Millionen Tiere umfassen.',
        facts: [
            { label: 'Reaktionszeit', value: '24h' },
            { label: 'Umweltschonend', value: 'Ja' },
            { label: 'Festpreis', value: 'ab 140€' },
        ],
        risks: [
            'Ameisenstraßen in der Küche kontaminieren Lebensmittel',
            'Zimmermannsameisen nagen Holzkonstruktionen an',
            'Erneuter Befall ohne Bekämpfung der Königin',
            'Importierte Feuerameisen können schmerzhaft stechen',
        ],
        faqs: [
            {
                question: 'Warum kommen Ameisen immer wieder zurück?',
                answer: 'Solange die Königin im Nest überlebt, produziert sie ständig neue Arbeiterinnen. Oberflächliche Maßnahmen ohne Nestzugang lösen das Problem nicht dauerhaft.',
            },
            {
                question: 'Funktionieren Ameisenmittel aus dem Supermarkt?',
                answer: 'Sprays töten sichtbare Ameisen, erreichen aber nie das Nest. Professionelle Köder werden von den Tieren selbst transportiert und eliminieren das Nest von innen.',
            },
            {
                question: 'Sind die Mittel sicher für Kinder und Haustiere?',
                answer: 'Ja. Die eingesetzten Gelköder sind in minimalen Mengen angewendet und für Warmblüter ungefährlich, sobald sie aufgetrocknet sind.',
            },
            {
                question: 'Können Ameisen Schäden am Gebäude verursachen?',
                answer: 'Zimmermannsameisen (die schwarzen, großen Ameisen) nagen Holz und können Konstruktionsschäden verursachen. Reguläre Wiesenameisen schaden dem Gebäude selbst nicht.',
            },
        ],
    },

    'marder-vertreiben': {
        slug: 'marder-vertreiben',
        tagline: 'Tierschutzgerecht. Effektiv. Dauerhaft.',
        intro: 'Marder verursachen im Kfz und unter dem Dach massive Schäden. Da sie unter Naturschutz stehen, ist Vertreibung die einzig legale Lösung. Unsere Fachleute installieren wirksame Abwehrsysteme und sichern Einfallstellen dauerhaft.',
        warning: 'Marderbisse an Zündkabeln verursachen ca. 200.000 Kfz-Schäden pro Jahr.',
        facts: [
            { label: 'Reaktionszeit', value: '48h' },
            { label: 'Tierschutzkonform', value: 'Ja' },
            { label: 'Festpreis', value: 'nach Aufwand' },
        ],
        risks: [
            'Durchgebissene Zündkabel können zum Motorausfall führen',
            'Isolationsschäden an Leitungen unter dem Dach',
            'Dachstuhl-Kontaminierung durch Kot und Urin',
            'Eigenversuche sind illegal (Tötung von Mardern verboten)',
        ],
        faqs: [
            {
                question: 'Darf man Marder töten?',
                answer: 'Nein. Marder sind durch das Bundesnaturschutzgesetz geschützt. Erlaubt sind ausschließlich tierschutzgerechte Vergrämung und Verdrängung.',
            },
            {
                question: 'Wie vertreibt man Marder dauerhaft?',
                answer: 'Effektive Methoden sind Ultraschall-Geräte, Duftrepellentien und das mechanische Sichern aller Einfallstellen. Eine Kombination aller Maßnahmen ist am wirksamsten.',
            },
            {
                question: 'Wie erkenne ich, ob ein Marder im Dach ist?',
                answer: 'Typische Zeichen: nächtliche Klopf- und Kratzgeräusche, Kotfunde, beschädigte Dämmwolle und ein unangenehmer Geruch im Dachraum.',
            },
            {
                question: 'Übernimmt meine Versicherung die Kosten?',
                answer: 'Kfz-Schäden durch Marder sind häufig durch die Teilkaskoversicherung abgedeckt. Gebäudeschäden kann die Gebäudeversicherung übernehmen. Wir stellen Ihnen alle erforderlichen Belege aus.',
            },
        ],
    },

    'taubenabwehr': {
        slug: 'taubenabwehr',
        tagline: 'Langfristig. Taubensicher. Diskret.',
        intro: 'Taubenkot ist ätzend, überträgt Krankheitserreger und zerstört Fassaden. Unsere Fachleute montieren effektive Abwehrsysteme – von Spikes bis zu Vogelschutznetzen – die dauerhaft und tierschutzgerecht schützen.',
        warning: 'Taubenkot enthält Pilzsporen, die Lungenkrankheiten auslösen können.',
        facts: [
            { label: 'Montagezeit', value: '1 Tag' },
            { label: 'Garantie', value: '5 Jahre' },
            { label: 'Festpreis', value: 'nach Aufwand' },
        ],
        risks: [
            'Salmonellen, Campylobacter und Histoplasmose im Taubenkot',
            'Kotätzung an Naturstein, Putz und Metall',
            'Verstopfte Abflüsse durch Kotablagerungen',
            'Nestbausubstanzen können Brände begünstigen',
        ],
        faqs: [
            {
                question: 'Welche Taubenabwehr-Systeme gibt es?',
                answer: 'Wir setzen je nach Fläche und Befallsstärke Vogelschutzspikes, -netze, Spiralen, elektrische Abwehrsysteme oder Vogelgel ein. Die Wahl erfolgt nach einer Vor-Ort-Inspektion.',
            },
            {
                question: 'Wie lange halten Taubenabwehr-Systeme?',
                answer: 'Hochwertige Edelstahl-Spikes und UV-beständige Netze halten 10–15 Jahre. Wir geben je nach System eine Garantie von bis zu 5 Jahren auf die Montage.',
            },
            {
                question: 'Ist Taubenabwehr tierschutzkonform?',
                answer: 'Ja. Alle eingesetzten Systeme vertreiben die Tiere ohne ihnen zu schaden. Die Verwendung von Giftstoffen ist aus Tierschutzgründen und wegen der Gefahr für andere Tiere verboten.',
            },
            {
                question: 'Kann man Taubenkot selbst entfernen?',
                answer: 'Das ist nicht empfehlenswert. Alter Kot enthält gefährliche Pilzsporen, die beim Aufwirbeln eingeatmet werden können. Unser Team entfernt den Kot fachgerecht mit Schutzausrüstung.',
            },
        ],
    },
};
