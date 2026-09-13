import fs from 'fs';

const filePath = 'src/components/admin/MastersTable.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// The state already has `editingId`. We'll just use it as `expandedRowId` but rename it conceptually if we want,
// or just keep `editingId` but use it for the expanding row instead of inline.
// Wait, let's keep `editingId` and just change how it renders.

// First, wrap the TR in React.Fragment
if (!content.includes('import React')) {
    content = content.replace("import { useState } from 'react';", "import React, { useState } from 'react';");
}

const mapStart = `{masters.map(m => {
                            const isEditing = editingId === m.id;
                            const hasFreeLeads = m.free_leads_until && new Date(m.free_leads_until) > new Date();

                            return (
                                <tr key={m.id} className="bg-white hover:bg-slate-50 transition-colors shadow-md group">`;

const newMapStart = `{masters.map(m => {
                            const isEditing = editingId === m.id;
                            const hasFreeLeads = m.free_leads_until && new Date(m.free_leads_until) > new Date();

                            return (
                                <React.Fragment key={m.id}>
                                <tr className="bg-white hover:bg-slate-50 transition-colors shadow-md group">`;
content = content.replace(mapStart, newMapStart);

// Remove the inline editing inputs from TD
content = content.replace(
    `                                        {isEditing ? (
                                            <div className="flex flex-col gap-2">
                                                <input 
                                                    type="text" 
                                                    value={editForm.firma || ''} 
                                                    onChange={e => setEditForm({...editForm, firma: e.target.value})}
                                                    className="border rounded px-2 py-1 text-sm w-full"
                                                    placeholder="Firma"
                                                />
                                                <input 
                                                    type="text" 
                                                    value={editForm.name || ''} 
                                                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                                                    className="border rounded px-2 py-1 text-sm w-full"
                                                    placeholder="Name"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="font-bold text-slate-900">{m.firma || '-'}</div>
                                                <div className="text-sm text-slate-500">{m.name || '-'}</div>
                                            </div>
                                        )}`,
    `                                        <div>
                                            <div className="font-bold text-slate-900">{m.firma || '-'}</div>
                                            <div className="text-sm text-slate-500">{m.name || '-'}</div>
                                        </div>`
);

content = content.replace(
    `                                        {isEditing ? (
                                            <input 
                                                type="text" 
                                                value={editForm.telefon || ''} 
                                                onChange={e => setEditForm({...editForm, telefon: e.target.value})}
                                                className="border rounded px-2 py-1 text-sm w-full"
                                                placeholder="Telefon"
                                            />
                                        ) : (
                                            <div className="text-sm text-slate-700">{m.telefon || '-'}</div>
                                        )}`,
    `                                        <div className="text-sm text-slate-700">{m.telefon || '-'}</div>`
);

content = content.replace(
    `                                        {isEditing ? (
                                            <label className="flex items-center justify-center gap-2 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={editForm.is_active} 
                                                    onChange={e => setEditForm({...editForm, is_active: e.target.checked})}
                                                />
                                                <span className="text-sm">Aktiv</span>
                                            </label>
                                        ) : (
                                            m.is_active ? `,
    `                                        {m.is_active ? `
);

content = content.replace(
    `                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                                    <XCircle size={14} /> Inaktiv
                                                </span>
                                        )}`,
    `                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                                    <XCircle size={14} /> Inaktiv
                                                </span>
                                        }`
);

// Update last cell
const rowEnd = `                                        {isEditing ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={handleSaveEdit} disabled={saving} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Speichern">
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={handleCancelEdit} disabled={saving} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Abbrechen">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenFreeLeads(m)}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 text-blue-600 hover:bg-blue-50 text-xs font-medium rounded-lg border border-blue-200 transition-colors"
                                                >
                                                    <Gift size={14} /> Free Leads
                                                </button>
                                                <button onClick={() => handleEditClick(m)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Bearbeiten">
                                                    <Pencil size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}`;

const newRowEnd = `                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenFreeLeads(m)}
                                                    className="flex items-center gap-1 px-2.5 py-1.5 text-blue-600 hover:bg-blue-50 text-xs font-medium rounded-lg border border-blue-200 transition-colors"
                                                >
                                                    <Gift size={14} /> Free Leads
                                                </button>
                                                <button 
                                                    onClick={() => isEditing ? handleCancelEdit() : handleEditClick(m)} 
                                                    className={\`p-1.5 rounded-lg transition-colors border \${isEditing ? 'bg-red-50 text-red-600 border-red-200' : 'bg-slate-50 text-slate-500 hover:text-slate-700 border-slate-200 hover:bg-slate-100'}\`}
                                                    title="Bearbeiten"
                                                >
                                                    {isEditing ? <X size={16} /> : <Pencil size={16} />}
                                                </button>
                                            </div>
                                    </td>
                                </tr>
                                {isEditing && (
                                    <tr>
                                        <td colSpan={5} className="p-0 border-b border-slate-300">
                                            <div className="bg-slate-50 p-6 border-x border-slate-300 shadow-inner">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                        <Pencil size={18} className="text-blue-500" />
                                                        Meister #{m.id} bearbeiten
                                                    </h4>
                                                    <div className="flex gap-2">
                                                        <button onClick={handleCancelEdit} disabled={saving} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Abbrechen</button>
                                                        <button onClick={handleSaveEdit} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                                            <Save size={16} /> Speichern
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Allgemein</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
                                                            <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Firma</label>
                                                            <input type="text" value={editForm.firma || ''} onChange={e => setEditForm({...editForm, firma: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="flex items-center gap-2 cursor-pointer mt-4">
                                                                <input type="checkbox" checked={editForm.is_active || false} onChange={e => setEditForm({...editForm, is_active: e.target.checked})} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                                                                <span className="text-sm font-medium text-slate-700">Account ist aktiv</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Kontakt</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">E-Mail</label>
                                                            <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Telefon / Phone</label>
                                                            <input type="text" value={editForm.phone || editForm.telefon || ''} onChange={e => setEditForm({...editForm, phone: e.target.value, telefon: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Telegram Chat ID</label>
                                                            <input type="text" value={editForm.telegram_chat_id || ''} onChange={e => setEditForm({...editForm, telegram_chat_id: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Einstellungen</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Abrechnungsmodell (Billing)</label>
                                                            <select value={editForm.billing_model || 'pay_per_lead'} onChange={e => setEditForm({...editForm, billing_model: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                                                <option value="pay_per_lead">Pay Per Lead</option>
                                                                <option value="commission">Commission</option>
                                                                <option value="flat_rate">Flat Rate</option>
                                                                <option value="percentage">Percentage</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">PLZ Bereiche (durch Komma getrennt)</label>
                                                            <input type="text" value={Array.isArray(editForm.plz_bereiche) ? editForm.plz_bereiche.join(', ') : (editForm.plz_bereiche || '')} onChange={e => setEditForm({...editForm, plz_bereiche: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="10115, 10117" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Schädlinge (durch Komma getrennt)</label>
                                                            <input type="text" value={Array.isArray(editForm.pests_handled) ? editForm.pests_handled.join(', ') : (editForm.pests_handled || '')} onChange={e => setEditForm({...editForm, pests_handled: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Mäuse & Ratten, Wespen" />
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

// Also need to modify `handleSaveEdit` to pass more fields
content = content.replace(
    `            await updateMasterProfile(editingId!, {
                name: editForm.name,
                firma: editForm.firma,
                telefon: editForm.telefon,
                is_active: editForm.is_active,
            });`,
    `            await updateMasterProfile(editingId!, {
                name: editForm.name,
                firma: editForm.firma,
                phone: editForm.phone || editForm.telefon, // handle both formats
                email: editForm.email,
                is_active: editForm.is_active,
                telegram_chat_id: editForm.telegram_chat_id,
                billing_model: editForm.billing_model,
                plz_bereiche: editForm.plz_bereiche,
                pests_handled: editForm.pests_handled,
            });`
);

fs.writeFileSync(filePath, content);
console.log('Done modifying MastersTable.tsx');
