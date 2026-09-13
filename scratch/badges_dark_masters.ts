import fs from 'fs';

function replaceInFile(file: string, replacements: {old: RegExp|string, new: string}[]) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    for (const {old, new: replacement} of replacements) {
        content = content.replace(old, replacement);
    }
    fs.writeFileSync(file, content);
}

replaceInFile('src/components/admin/MastersTable.tsx', [
    { old: /bg-green-100 text-green-700/g, new: 'bg-[#161616] text-green-400 border border-[#2a2a2a]' },
    { old: /bg-blue-100 text-blue-700/g, new: 'bg-[#161616] text-blue-400 border border-[#2a2a2a]' },
    { old: /text-blue-600 hover:bg-blue-50 border border-blue-200/g, new: 'text-blue-400 hover:bg-[#111111] border border-[#2a2a2a]' },
    { old: /bg-red-50 text-red-600 border-red-200/g, new: 'bg-[#161616] text-red-400 border-[#2a2a2a]' }
]);

replaceInFile('src/components/admin/KundenTable.tsx', [
    { old: /bg-green-100 text-green-700/g, new: 'bg-[#161616] text-green-400 border border-[#2a2a2a]' },
    { old: /bg-blue-100 text-blue-700/g, new: 'bg-[#161616] text-blue-400 border border-[#2a2a2a]' },
    { old: /bg-red-50 text-red-600 border-red-200/g, new: 'bg-[#161616] text-red-400 border-[#2a2a2a]' }
]);

replaceInFile('src/components/admin/LeadsTable.tsx', [
    { old: /bg-red-50 text-red-600 border-red-200/g, new: 'bg-[#161616] text-red-400 border-[#2a2a2a]' }
]);

console.log('Badges updated');
