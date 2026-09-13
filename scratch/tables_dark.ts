import fs from 'fs';

const files = [
    'src/components/admin/LeadsTable.tsx',
    'src/components/admin/MastersTable.tsx',
    'src/components/admin/KundenTable.tsx'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Table text color
    content = content.replace(/text-slate-600/g, 'text-slate-300');
    content = content.replace(/text-slate-500/g, 'text-slate-400');
    content = content.replace(/text-slate-400/g, 'text-slate-500');
    
    // 2. Headings and bold text
    content = content.replace(/text-slate-800/g, 'text-white');
    content = content.replace(/text-slate-900/g, 'text-white');
    content = content.replace(/text-slate-700/g, 'text-slate-300');

    // 3. Row background and hover
    content = content.replace(/bg-white/g, 'bg-[#161616]');
    content = content.replace(/hover:bg-slate-50/g, 'hover:bg-[#1e1e1e]');
    content = content.replace(/bg-slate-50/g, 'bg-[#111111]');

    // 4. Borders
    content = content.replace(/border-slate-300/g, 'border-[#2a2a2a]');
    content = content.replace(/group-hover:border-slate-400/g, 'group-hover:border-[#333333]');
    content = content.replace(/border-slate-200/g, 'border-[#2a2a2a]');
    content = content.replace(/border-slate-100/g, 'border-[#2a2a2a]');
    
    // 5. Inputs in accordion
    content = content.replace(/focus:ring-blue-500/g, 'focus:ring-red-500'); // make focus red
    
    // 6. Action buttons
    content = content.replace(/bg-slate-100/g, 'bg-[#222222]');
    content = content.replace(/hover:bg-slate-200/g, 'hover:bg-[#2a2a2a]');
    content = content.replace(/hover:bg-slate-100/g, 'hover:bg-[#2a2a2a]');

    // Write back
    fs.writeFileSync(file, content);
}
console.log('Tables updated to dark mode');
