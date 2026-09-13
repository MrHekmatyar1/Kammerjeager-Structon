import fs from 'fs';

const filePath = 'src/components/admin/LeadsTable.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add imports if needed
if (!content.includes('import { Pencil, Save, X } from \'lucide-react\';')) {
    content = content.replace(
        "import { updateLeadStatus, assignLeadManually } from '@/app/admin/actions';",
        "import { updateLeadStatus, assignLeadManually, updateLeadProfile } from '@/app/admin/actions';\nimport { Pencil, Save, X } from 'lucide-react';"
    );
}

// 2. Add state
const stateHook = `    const [isPending, startTransition] = useTransition();

    // Edit state
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Lead>>({});
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (lead: Lead) => {
        setExpandedRowId(lead.id);
        setEditForm(lead);
    };

    const handleCancelEdit = () => {
        setExpandedRowId(null);
        setEditForm({});
    };

    const handleSaveEdit = async () => {
        if (!expandedRowId) return;
        setIsSaving(true);
        try {
            await updateLeadProfile(expandedRowId, editForm);
            setLeads(current => current.map(l => l.id === expandedRowId ? { ...l, ...editForm } as Lead : l));
            setExpandedRowId(null);
        } catch (e: any) {
            alert('Fehler beim Speichern: ' + e.message);
        } finally {
            setIsSaving(false);
        }
    };`;

content = content.replace('    const [isPending, startTransition] = useTransition();', stateHook);

// 3. Update the map loop inside tbody
const mapStart = `{filteredLeads.map((lead) => {
                                        const b2b = isB2BLead(lead);
                                        return (
                                            <tr key={lead.id} className="bg-white hover:bg-slate-50 transition-colors shadow-md group">`;
const newMapStart = `{filteredLeads.map((lead) => {
                                        const b2b = isB2BLead(lead);
                                        const isExpanded = expandedRowId === lead.id;
                                        return (
                                            <React.Fragment key={lead.id}>
                                            <tr className="bg-white hover:bg-slate-50 transition-colors shadow-md group">`;

content = content.replace(mapStart, newMapStart);

// We also need to import React.Fragment. Let's just import React from 'react' if not there
if (!content.includes('import React')) {
    content = content.replace("import { useState, useTransition } from 'react';", "import React, { useState, useTransition } from 'react';");
}

// Update the last cell and close React.Fragment, plus add the expanded row
const rowEnd = `                                                <td className="px-6 py-4 border-y border-r border-slate-300 rounded-r-xl group-hover:border-slate-400 text-right">
                                                    <button
                                                        onClick={() => setSelectedLeadForAssign(lead)}
                                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200"
                                                    >
                                                        Zuweisen
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}`;

const newRowEnd = `                                                <td className="px-6 py-4 border-y border-r border-slate-300 rounded-r-xl group-hover:border-slate-400 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setSelectedLeadForAssign(lead)}
                                                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200"
                                                        >
                                                            Zuweisen
                                                        </button>
                                                        <button
                                                            onClick={() => isExpanded ? handleCancelEdit() : handleEdit(lead)}
                                                            className={\`p-1.5 rounded-lg transition-colors border \${isExpanded ? 'bg-red-50 text-red-600 border-red-200' : 'bg-slate-50 text-slate-500 hover:text-slate-700 border-slate-200 hover:bg-slate-100'}\`}
                                                            title="Bearbeiten"
                                                        >
                                                            {isExpanded ? <X size={16} /> : <Pencil size={16} />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan={7} className="p-0 border-b border-slate-300">
                                                        <div className="bg-slate-50 p-6 border-x border-slate-300 shadow-inner">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                                    <Pencil size={18} className="text-blue-500" />
                                                                    Lead #{lead.id} bearbeiten
                                                                </h4>
                                                                <div className="flex gap-2">
                                                                    <button onClick={handleCancelEdit} disabled={isSaving} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Abbrechen</button>
                                                                    <button onClick={handleSaveEdit} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                                                        <Save size={16} /> Speichern
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                <div className="space-y-4">
                                                                    <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Kunde</h5>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
                                                                        <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Firma</label>
                                                                        <input type="text" value={editForm.firma || ''} onChange={e => setEditForm({...editForm, firma: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Telefon</label>
                                                                        <input type="text" value={editForm.telefon || ''} onChange={e => setEditForm({...editForm, telefon: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">E-Mail</label>
                                                                        <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="space-y-4">
                                                                    <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Adresse</h5>
                                                                    <div className="grid grid-cols-3 gap-2">
                                                                        <div className="col-span-1">
                                                                            <label className="block text-xs font-medium text-slate-700 mb-1">PLZ</label>
                                                                            <input type="text" value={editForm.plz || ''} onChange={e => setEditForm({...editForm, plz: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                        </div>
                                                                        <div className="col-span-2">
                                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Straße & Nr.</label>
                                                                            <div className="flex gap-2">
                                                                                <input type="text" value={editForm.strasse || ''} onChange={e => setEditForm({...editForm, strasse: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Straße" />
                                                                                <input type="text" value={editForm.hausnummer || ''} onChange={e => setEditForm({...editForm, hausnummer: e.target.value})} className="w-20 border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Nr." />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Etage / Zusatz</label>
                                                                        <input type="text" value={editForm.etage || ''} onChange={e => setEditForm({...editForm, etage: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="space-y-4">
                                                                    <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Problem</h5>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Schädling</label>
                                                                        <input type="text" value={editForm.schaedling || ''} onChange={e => setEditForm({...editForm, schaedling: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Objekt Typ</label>
                                                                        <input type="text" value={editForm.objekt_typ || ''} onChange={e => setEditForm({...editForm, objekt_typ: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-slate-700 mb-1">Beschreibung / Nachricht</label>
                                                                        <textarea value={editForm.zugang_beschreibung || ''} onChange={e => setEditForm({...editForm, zugang_beschreibung: e.target.value})} rows={3} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                            </React.Fragment>
                                        );
                                    })}`;

content = content.replace(rowEnd, newRowEnd);

fs.writeFileSync(filePath, content);
console.log('Done modifying LeadsTable.tsx');
