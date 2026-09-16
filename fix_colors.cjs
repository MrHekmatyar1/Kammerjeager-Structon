const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const dirsToProcess = ['./src/app/kunden', './src/app/dashboard', './src/app/admin'];
let matchCount = 0;

dirsToProcess.forEach(dir => {
    const files = walk(dir);
    files.forEach(f => {
        let content = fs.readFileSync(f, 'utf8');
        const original = content;
        
        // We want to force white text in dark mode for all gray variants.
        // It's safer to just replace any dark:text-slate-* and dark:text-gray-* with dark-header-text
        content = content.replace(/dark:text-slate-[123456789]00/g, 'dark-header-text');
        content = content.replace(/dark:text-gray-[123456789]00/g, 'dark-header-text');
        content = content.replace(/dark:text-white/g, 'dark-header-text');
        
        if (content !== original) {
            fs.writeFileSync(f, content);
            console.log('Updated ' + f);
            matchCount++;
        }
    });
});
console.log('Total files updated: ' + matchCount);
