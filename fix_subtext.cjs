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

const files = walk('./src/app/dashboard');
let count = 0;
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    const original = content;
    
    // Replace dark-header-text with dark-subtext ONLY in <p> tags
    content = content.replace(/(<p[^>]*className="[^"]*)dark-header-text([^"]*">)/g, '$1dark-subtext$2');
    
    // Replace dark-header-text with dark-subtext in <div> tags that have text-slate-400, text-slate-500, or text-slate-600
    // These are typically subtext or descriptions. 
    // Example: <div className="text-slate-500 dark-header-text ...">
    content = content.replace(/(<div[^>]*className="[^"]*text-slate-[456]00[^"]*)dark-header-text([^"]*">)/g, '$1dark-subtext$2');

    if (content !== original) {
        fs.writeFileSync(f, content);
        console.log('Updated ' + f);
        count++;
    }
});
console.log('Total files updated: ' + count);
