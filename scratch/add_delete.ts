import fs from 'fs';

// 1. LeadsTable
let leadsCode = fs.readFileSync('src/components/admin/LeadsTable.tsx', 'utf8');

// Add import for Trash2
if (!leadsCode.includes('Trash2')) {
    leadsCode = leadsCode.replace(/import { Pencil, Save, X } from 'lucide-react';/, "import { Pencil, Save, X, Trash2 } from 'lucide-react';");
}

// Add delete action to imports
if (!leadsCode.includes('deleteLead')) {
    leadsCode = leadsCode.replace(/updateLeadStatus, assignLeadManually, updateLeadProfile/, "updateLeadStatus, assignLeadManually, updateLeadProfile, deleteLead");
}

// Add handleDelete function
if (!leadsCode.includes('handleDeleteLead')) {
    const handleAssignMatch = "    const handleAssign = async () => {";
    const deleteFunc = `
    const handleDeleteLead = async (id: number) => {
        if (!window.confirm('Möchten Sie diesen Lead wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) return;
        startTransition(async () => {
            try {
                await deleteLead(id);
                setLeads(prev => prev.filter(l => l.id !== id));
            } catch (err) {
                console.error(err);
                alert('Fehler beim Löschen des Leads.');
            }
        });
    };
`;
    leadsCode = leadsCode.replace(handleAssignMatch, deleteFunc + handleAssignMatch);
}

// Add desktop button
leadsCode = leadsCode.replace(
    /<button\s+onClick=\{\(\) => setSelectedLeadForAssign\(lead\)\}\s+className="px-3 py-1\.5 bg-\[\#222222\] hover:bg-\[\#2a2a2a\] text-slate-300 text-xs font-bold rounded-lg transition-colors border border-\[\#2a2a2a\]"\s+>\s+Zuweisen\s+<\/button>/,
    `<div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setSelectedLeadForAssign(lead)}
                                                            className="px-3 py-1.5 bg-[#222222] hover:bg-[#2a2a2a] text-slate-300 text-xs font-bold rounded-lg transition-colors border border-[#2a2a2a]"
                                                        >
                                                            Zuweisen
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLead(lead.id)}
                                                            className="p-1.5 bg-[#111111] hover:bg-red-900/30 text-slate-500 hover:text-red-500 rounded-lg transition-colors border border-[#2a2a2a]"
                                                            title="Löschen"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>`
);

// Add mobile button
leadsCode = leadsCode.replace(
    /<button\s+onClick=\{\(\) => setSelectedLeadForAssign\(lead\)\}\s+className="w-full py-2 bg-\[\#222222\] hover:bg-\[\#2a2a2a\] text-slate-300 text-sm font-bold rounded-lg transition-colors border border-\[\#2a2a2a\]"\s+>\s+Manuell Zuweisen\s+<\/button>/,
    `<div className="flex gap-2 w-full">
                                                <button
                                                    onClick={() => setSelectedLeadForAssign(lead)}
                                                    className="flex-1 py-2 bg-[#222222] hover:bg-[#2a2a2a] text-slate-300 text-sm font-bold rounded-lg transition-colors border border-[#2a2a2a]"
                                                >
                                                    Manuell Zuweisen
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLead(lead.id)}
                                                    className="px-4 bg-[#111111] hover:bg-red-900/30 text-slate-500 hover:text-red-500 rounded-lg transition-colors border border-[#2a2a2a]"
                                                    title="Löschen"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>`
);

fs.writeFileSync('src/components/admin/LeadsTable.tsx', leadsCode);

// 2. MastersTable
let mastersCode = fs.readFileSync('src/components/admin/MastersTable.tsx', 'utf8');

if (!mastersCode.includes('Trash2')) {
    mastersCode = mastersCode.replace(/import { Pencil, Save, X, CheckCircle, XCircle, Gift } from 'lucide-react';/, "import { Pencil, Save, X, CheckCircle, XCircle, Gift, Trash2 } from 'lucide-react';");
}

if (!mastersCode.includes('deleteMaster')) {
    mastersCode = mastersCode.replace(/updateMasterProfile } from '\.\.\/actions';/, "updateMasterProfile, deleteMaster } from '../actions';");
}

if (!mastersCode.includes('handleDeleteMaster')) {
    const handleSaveMatch = "    const handleSave = async (e: React.FormEvent) => {";
    const deleteFunc = `
    const handleDeleteMaster = async (id: number) => {
        if (!window.confirm('Möchten Sie diesen Meister wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) return;
        startTransition(async () => {
            try {
                await deleteMaster(id);
                setMasters(prev => prev.filter(m => m.id !== id));
            } catch (err) {
                console.error(err);
                alert('Fehler beim Löschen des Meisters.');
            }
        });
    };
`;
    mastersCode = mastersCode.replace(handleSaveMatch, deleteFunc + handleSaveMatch);
}

mastersCode = mastersCode.replace(
    /\{isEditing \? \<X size=\{16\} \/\> : \<Pencil size=\{16\} \/\>\}\n\s+<\/button>\n\s+<\/div>/g,
    `{isEditing ? <X size={16} /> : <Pencil size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteMaster(m.id)}
                                                    className="p-1.5 rounded-lg transition-colors border bg-[#111111] text-slate-500 hover:text-red-500 hover:bg-red-900/30 border-[#2a2a2a]"
                                                    title="Löschen"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>`
);

fs.writeFileSync('src/components/admin/MastersTable.tsx', mastersCode);


// 3. KundenTable
let kundenCode = fs.readFileSync('src/components/admin/KundenTable.tsx', 'utf8');

if (!kundenCode.includes('Trash2')) {
    kundenCode = kundenCode.replace(/import { Pencil, Save, X } from 'lucide-react';/, "import { Pencil, Save, X, Trash2 } from 'lucide-react';");
}

if (!kundenCode.includes('deleteKunde')) {
    kundenCode = kundenCode.replace(/updateKundeProfile } from '\.\.\/actions';/, "updateKundeProfile, deleteKunde } from '../actions';");
}

if (!kundenCode.includes('handleDeleteKunde')) {
    const handleSaveMatch = "    const handleSave = async (e: React.FormEvent) => {";
    const deleteFunc = `
    const handleDeleteKunde = async (id: string) => {
        if (!window.confirm('Möchten Sie diesen Kunden wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) return;
        startTransition(async () => {
            try {
                await deleteKunde(id);
                setKunden(prev => prev.filter(k => k.id !== id));
            } catch (err) {
                console.error(err);
                alert('Fehler beim Löschen des Kunden.');
            }
        });
    };
`;
    kundenCode = kundenCode.replace(handleSaveMatch, deleteFunc + handleSaveMatch);
}

kundenCode = kundenCode.replace(
    /\{isEditing \? \<X size=\{16\} \/\> : \<Pencil size=\{16\} \/\>\}\n\s+<\/button>\n\s+<\/td>/g,
    `{isEditing ? <X size={16} /> : <Pencil size={16} />}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteKunde(k.id)}
                                                className="p-1.5 rounded-lg transition-colors border bg-[#111111] text-slate-500 hover:text-red-500 hover:bg-red-900/30 border-[#2a2a2a]"
                                                title="Löschen"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            </div>
                                        </td>`
);
// Fix the div wrapper we just introduced for desktop
kundenCode = kundenCode.replace(
    /<td className="px-6 py-4 border-y border-r border-\[\#2a2a2a\] rounded-r-xl group-hover:border-\[\#333333\] text-right">\n\s+<button/g,
    `<td className="px-6 py-4 border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333] text-right">
                                            <div className="flex items-center justify-end gap-2">
                                            <button`
);


fs.writeFileSync('src/components/admin/KundenTable.tsx', kundenCode);

console.log('Delete buttons added to all tables');
