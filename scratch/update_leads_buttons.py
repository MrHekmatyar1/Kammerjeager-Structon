import re

with open('src/components/admin/LeadsTable.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'Settings' not in content:
    content = content.replace("import { Pencil, Save, X, Trash2 } from 'lucide-react';", "import { Pencil, Save, X, Trash2, Settings } from 'lucide-react';")
    content = content.replace("import { Pencil, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';", "import { Pencil, Trash2, X, ChevronDown, ChevronUp, Settings, Save } from 'lucide-react';")
    content = content.replace("import { Pencil, Save, X, Trash2, ChevronDown, ChevronUp } from 'lucide-react';", "import { Pencil, Save, X, Trash2, ChevronDown, ChevronUp, Settings } from 'lucide-react';")

# 1. Desktop buttons
desktop_pattern = r'(<div className="flex items-center justify-end gap-2">)\s*<button\s*onClick=\{\(\) => setSelectedLeadForAssign\(lead\)\}\s*className="p.1\.5 rounded-lg bg-\[#111111\] border border-\[#2a2a2a\] text-slate-500 hover:text-slate-300 hover:bg-\[#1a1a1a\] transition-colors"\s*title="Zuweisen / Bearbeiten"\s*>\s*<Pencil size=\{16\} />\s*</button>'
new_desktop = r'''\1
                                                        <button
                                                            onClick={() => setSelectedLeadForAssign(lead)}
                                                            className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a] transition-colors"
                                                            title="Zuweisen / Status"
                                                        >
                                                            <Settings size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => expandedRowId === lead.id ? handleCancelEdit() : handleEdit(lead)} 
                                                            className={`p-1.5 rounded-lg transition-colors border ${expandedRowId === lead.id ? 'bg-[#161616] text-red-400 border-[#2a2a2a]' : 'bg-[#111111] text-slate-500 hover:text-slate-300 border-[#2a2a2a] hover:bg-[#1a1a1a]'}`}
                                                            title="Bearbeiten"
                                                        >
                                                            {expandedRowId === lead.id ? <X size={16} /> : <Pencil size={16} />}
                                                        </button>'''
content = re.sub(desktop_pattern, new_desktop, content)

# 2. Desktop Inline Edit Form
desktop_row_end_pattern = r'(<Trash2 size=\{16\} />\s*</button>\s*</div>\s*</td>\s*</tr>)'

edit_form_jsx = r'''\1
                                                {expandedRowId === lead.id && (
                                                    <tr>
                                                        <td colSpan={7} className="p-0 border-b border-[#2a2a2a]">
                                                            <div className="bg-[#111111] p-6 border-x border-[#2a2a2a] shadow-inner">
                                                                <div className="flex justify-between items-center mb-4">
                                                                    <h4 className="font-bold text-white flex items-center gap-2">
                                                                        <Pencil size={18} className="text-blue-500" />
                                                                        Lead #{lead.id} bearbeiten
                                                                    </h4>
                                                                    <div className="flex gap-2">
                                                                        <button onClick={handleCancelEdit} disabled={isSaving} className="px-4 py-2 bg-[#161616] border border-[#2a2a2a] rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1e1e1e] transition-colors">Abbrechen</button>
                                                                        <button onClick={handleSaveEdit} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                                                            <Save size={16} /> Speichern
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                    <div className="space-y-4">
                                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Kunde & Kontakt</h5>
                                                                        
                                                                        <div>
                                                                            <label className="block text-xs text-slate-400 mb-1">Name</label>
                                                                            <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-xs text-slate-400 mb-1">Firma</label>
                                                                            <input type="text" value={editForm.firma || ''} onChange={e => setEditForm({...editForm, firma: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-xs text-slate-400 mb-1">E-Mail</label>
                                                                            <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-xs text-slate-400 mb-1">Telefon</label>
                                                                            <input type="text" value={editForm.telefon || ''} onChange={e => setEditForm({...editForm, telefon: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="space-y-4">
                                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Adresse</h5>
                                                                        
                                                                        <div className="grid grid-cols-2 gap-3">
                                                                            <div className="col-span-2">
                                                                                <label className="block text-xs text-slate-400 mb-1">PLZ & Ort</label>
                                                                                <input type="text" value={editForm.plz || ''} onChange={e => setEditForm({...editForm, plz: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                            </div>
                                                                            <div>
                                                                                <label className="block text-xs text-slate-400 mb-1">Straße</label>
                                                                                <input type="text" value={editForm.strasse || ''} onChange={e => setEditForm({...editForm, strasse: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                            </div>
                                                                            <div>
                                                                                <label className="block text-xs text-slate-400 mb-1">Nr.</label>
                                                                                <input type="text" value={editForm.hausnummer || ''} onChange={e => setEditForm({...editForm, hausnummer: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                            </div>
                                                                            <div className="col-span-2">
                                                                                <label className="block text-xs text-slate-400 mb-1">Etage</label>
                                                                                <input type="text" value={editForm.etage || ''} onChange={e => setEditForm({...editForm, etage: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="space-y-4">
                                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Details & Typ</h5>
                                                                        
                                                                        <div>
                                                                            <label className="block text-xs text-slate-400 mb-1">Schädling</label>
                                                                            <input type="text" value={editForm.schaedling || ''} onChange={e => setEditForm({...editForm, schaedling: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-xs text-slate-400 mb-1">Kunden Typ</label>
                                                                            <select value={editForm.kunde_typ || ''} onChange={e => setEditForm({...editForm, kunde_typ: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white">
                                                                                <option value="Privatkunde">Privatkunde</option>
                                                                                <option value="B2B">B2B / Firma</option>
                                                                                <option value="Öffentlicher Sektor">Öffentlicher Sektor</option>
                                                                            </select>
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-xs text-slate-400 mb-1">Nachricht</label>
                                                                            <textarea value={editForm.zugang_beschreibung || ''} onChange={e => setEditForm({...editForm, zugang_beschreibung: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white min-h-[60px]" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}'''
content = re.sub(desktop_row_end_pattern, edit_form_jsx, content)

# 3. Mobile buttons
mobile_pattern = r'(<div className="pt-3 border-t border-\[#2a2a2a\] flex items-center justify-end gap-2">)\s*<button\s*onClick=\{\(\) => setSelectedLeadForAssign\(lead\)\}\s*className="p-1\.5 rounded-lg bg-\[#111111\] border border-\[#2a2a2a\] text-slate-500 hover:text-slate-300 hover:bg-\[#1a1a1a\] transition-colors"\s*title="Zuweisen / Bearbeiten"\s*>\s*<Pencil size=\{16\} />\s*</button>'
new_mobile = r'''\1
                                            <button
                                                onClick={() => setSelectedLeadForAssign(lead)}
                                                className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a] transition-colors"
                                                title="Zuweisen / Status"
                                            >
                                                <Settings size={16} />
                                            </button>
                                            <button 
                                                onClick={() => expandedRowId === lead.id ? handleCancelEdit() : handleEdit(lead)} 
                                                className={`p-1.5 rounded-lg transition-colors border ${expandedRowId === lead.id ? 'bg-[#161616] text-red-400 border-[#2a2a2a]' : 'bg-[#111111] text-slate-500 hover:text-slate-300 border-[#2a2a2a] hover:bg-[#1a1a1a]'}`}
                                                title="Bearbeiten"
                                            >
                                                {expandedRowId === lead.id ? <X size={16} /> : <Pencil size={16} />}
                                            </button>'''
content = re.sub(mobile_pattern, new_mobile, content)

# 4. Mobile Inline Edit form
mobile_row_end_pattern = r'(<Trash2 size=\{16\} />\s*</button>\s*</div>\s*</div>\s*</div>)'

mobile_edit_form_jsx = r'''\1
                                {expandedRowId === lead.id && (
                                    <div className="mt-3 p-4 bg-[#111111] rounded-xl border border-[#2a2a2a] shadow-inner">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-bold text-white flex items-center gap-2">
                                                <Pencil size={18} className="text-blue-500" />
                                                Lead bearbeiten
                                            </h4>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Name</label>
                                                <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Firma</label>
                                                <input type="text" value={editForm.firma || ''} onChange={e => setEditForm({...editForm, firma: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">E-Mail</label>
                                                <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Telefon</label>
                                                <input type="text" value={editForm.telefon || ''} onChange={e => setEditForm({...editForm, telefon: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">PLZ & Ort</label>
                                                <input type="text" value={editForm.plz || ''} onChange={e => setEditForm({...editForm, plz: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs text-slate-400 mb-1">Straße</label>
                                                    <input type="text" value={editForm.strasse || ''} onChange={e => setEditForm({...editForm, strasse: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs text-slate-400 mb-1">Nr.</label>
                                                    <input type="text" value={editForm.hausnummer || ''} onChange={e => setEditForm({...editForm, hausnummer: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Schädling</label>
                                                <input type="text" value={editForm.schaedling || ''} onChange={e => setEditForm({...editForm, schaedling: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-400 mb-1">Kunden Typ</label>
                                                <select value={editForm.kunde_typ || ''} onChange={e => setEditForm({...editForm, kunde_typ: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#333] rounded px-3 py-1.5 text-sm text-white">
                                                    <option value="Privatkunde">Privatkunde</option>
                                                    <option value="B2B">B2B / Firma</option>
                                                    <option value="Öffentlicher Sektor">Öffentlicher Sektor</option>
                                                </select>
                                            </div>
                                            
                                            <div className="flex gap-2 pt-2 border-t border-[#2a2a2a]">
                                                <button onClick={handleCancelEdit} disabled={isSaving} className="flex-1 py-2 bg-[#161616] border border-[#2a2a2a] rounded-lg text-sm font-medium text-slate-300 hover:bg-[#1e1e1e] transition-colors">Abbrechen</button>
                                                <button onClick={handleSaveEdit} disabled={isSaving} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2">
                                                    <Save size={16} /> Speichern
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}'''

content = re.sub(mobile_row_end_pattern, mobile_edit_form_jsx, content)

with open('src/components/admin/LeadsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated LeadsTable.tsx")
