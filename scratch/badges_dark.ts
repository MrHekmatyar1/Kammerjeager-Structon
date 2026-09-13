import fs from 'fs';

const file = 'src/components/admin/LeadsTable.tsx';
let content = fs.readFileSync(file, 'utf8');

// STATUS COLORS
content = content.replace(
    "'neu': 'bg-green-100 text-green-800 border-green-200',",
    "'neu': 'bg-[#161616] text-green-400 border-[#2a2a2a]',"
);
content = content.replace(
    "'in_bearbeitung': 'bg-yellow-100 text-yellow-800 border-yellow-200',",
    "'in_bearbeitung': 'bg-[#161616] text-yellow-400 border-[#2a2a2a]',"
);
content = content.replace(
    "'abgeschlossen': 'bg-blue-100 text-blue-800 border-blue-200',",
    "'abgeschlossen': 'bg-[#161616] text-blue-400 border-[#2a2a2a]',"
);

// Filter Tabs
content = content.replace(
    "'bg-[#161616] text-blue-700 border border-blue-200 hover:bg-blue-50'",
    "'bg-[#161616] text-blue-400 border border-[#2a2a2a] hover:bg-[#222222]'"
);

// Gewerbe Badge
content = content.replace(
    /bg-blue-100 text-blue-800 border border-blue-200/g,
    'bg-[#161616] text-blue-400 border border-[#2a2a2a]'
);

// Schädling Badge
content = content.replace(
    /bg-red-50 text-\[\#C8102E\] font-medium text-xs border border-red-100/g,
    'bg-[#161616] text-red-400 font-medium text-xs border border-[#2a2a2a]'
);

fs.writeFileSync(file, content);

// Now KundenTable
const kundenFile = 'src/components/admin/KundenTable.tsx';
if (fs.existsSync(kundenFile)) {
    let kc = fs.readFileSync(kundenFile, 'utf8');
    kc = kc.replace(
        "'bg-[#161616] text-blue-700 border border-blue-200 hover:bg-blue-50'",
        "'bg-[#161616] text-blue-400 border border-[#2a2a2a] hover:bg-[#222222]'"
    );
    kc = kc.replace(
        /bg-blue-100 text-blue-800 border border-blue-200/g,
        'bg-[#161616] text-blue-400 border border-[#2a2a2a]'
    );
    fs.writeFileSync(kundenFile, kc);
}

console.log('Badges updated to #161616 background and #2a2a2a borders');
