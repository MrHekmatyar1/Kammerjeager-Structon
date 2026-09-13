import fs from 'fs';

const filePath = 'src/components/admin/KundenTable.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

if (!content.includes('import React')) {
    content = content.replace("import { useState } from 'react';", "import React, { useState } from 'react';");
}

const mapStart = `{kunden.map(k => {
                            const isEditing = editingId === k.id;
                            
                            return (
                                <tr key={k.id} className="bg-white hover:bg-slate-50 transition-colors shadow-md group">`;

const newMapStart = `{kunden.map(k => {
                            const isEditing = editingId === k.id;
                            
                            return (
                                <React.Fragment key={k.id}>
                                <tr className="bg-white hover:bg-slate-50 transition-colors shadow-md group">`;
content = content.replace(mapStart, newMapStart);

// Replace inline inputs with standard text for email/name
content = content.replace(
    `                                        {isEditing ? (
                                            <div className="flex flex-col gap-2">
                                                <input 
                                                    type="email" 
                                                    value={editForm.email || ''} 
                                                    onChange={e => setEditForm({...editForm, email: e.target.value})}
                                                    className="border rounded px-2 py-1 text-sm w-full"
                                                    placeholder="Email"
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
                                            <>
                                                <div className="font-bold text-slate-900">{k.email}</div>
                                                <div className="text-sm text-slate-500">{k.name || '-'}</div>
                                            </>
                                        )}`,
    `                                        <>
                                            <div className="font-bold text-slate-900">{k.email}</div>
                                            <div className="text-sm text-slate-500">{k.name || '-'}</div>
                                        </>`
);

// Update last cell
const rowEnd = `                                        {isEditing ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleSave(k.id)} disabled={saving} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Speichern">
                                                    <Save size={18} />
                                                </button>
                                                <button onClick={handleCancel} disabled={saving} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Abbrechen">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                                <button onClick={() => handleEdit(k)} className="p-2 hover:text-[#C8102E] hover:bg-red-50 rounded-full transition-colors" title="Bearbeiten">
                                                    <Pencil size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}`;

const newRowEnd = `                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => isEditing ? handleCancel() : handleEdit(k)} 
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
                                        <td colSpan={4} className="p-0 border-b border-slate-300">
                                            <div className="bg-slate-50 p-6 border-x border-slate-300 shadow-inner">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                        <Pencil size={18} className="text-blue-500" />
                                                        Kunde {k.email} bearbeiten
                                                    </h4>
                                                    <div className="flex gap-2">
                                                        <button onClick={handleCancel} disabled={saving} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Abbrechen</button>
                                                        <button onClick={() => handleSave(k.id)} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                                            <Save size={16} /> Speichern
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <h5 className="font-semibold text-xs text-slate-500 uppercase tracking-wider">Profil</h5>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
                                                            <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-slate-700 mb-1">E-Mail</label>
                                                            <input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
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
console.log('Done modifying KundenTable.tsx');
