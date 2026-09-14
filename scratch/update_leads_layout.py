with open('src/components/admin/LeadsTable.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update <tr className="bg-[#161616] hover:bg-[#1e1e1e] transition-colors shadow-md group">
old_tr = '<tr className="bg-[#161616] hover:bg-[#1e1e1e] transition-colors shadow-md group">'
new_tr = '<tr className="group shadow-md rounded-xl">'
content = content.replace(old_tr, new_tr)

# 2. Update <td>s to include background
old_td1 = '<td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 border-y border-l border-[#2a2a2a] rounded-l-xl group-hover:border-[#333333]">'
new_td1 = '<td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 border-y border-l border-[#2a2a2a] rounded-l-xl group-hover:border-[#333333] bg-[#161616] group-hover:bg-[#1e1e1e] transition-colors">'
content = content.replace(old_td1, new_td1)

old_td2 = '<td className="px-6 py-4 border-y border-[#2a2a2a] group-hover:border-[#333333]">'
new_td2 = '<td className="px-6 py-4 border-y border-[#2a2a2a] group-hover:border-[#333333] bg-[#161616] group-hover:bg-[#1e1e1e] transition-colors">'
content = content.replace(old_td2, new_td2)

old_td_status = '<td className="px-6 py-4 whitespace-nowrap border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333]">'
new_td_status = '<td className="px-6 py-4 whitespace-nowrap border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333] bg-[#161616] group-hover:bg-[#1e1e1e] transition-colors">'
content = content.replace(old_td_status, new_td_status)

# 3. Update Aktionen <td> and buttons
old_aktionen_td = '''                                                <td className="px-6 py-4 border-y border-r border-[#2a2a2a] rounded-r-xl group-hover:border-[#333333] text-right">
                                                    <div className="flex items-center justify-end gap-2">
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
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLead(lead.id)}
                                                            className="p-1.5 bg-[#111111] hover:bg-red-900/30 text-slate-500 hover:text-red-500 rounded-lg transition-colors border border-[#2a2a2a]"
                                                            title="Löschen"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>'''
new_aktionen_td = '''                                                <td className="px-3 py-2 align-middle border-none bg-transparent">
                                                    <div className="flex flex-col items-center justify-center gap-1.5">
                                                        <button 
                                                            onClick={() => expandedRowId === lead.id ? handleCancelEdit() : handleEdit(lead)} 
                                                            className={`p-1.5 rounded-lg transition-colors border ${expandedRowId === lead.id ? 'bg-[#161616] text-red-400 border-[#2a2a2a]' : 'bg-[#111111] text-slate-500 hover:text-slate-300 border-[#2a2a2a] hover:bg-[#1a1a1a]'}`}
                                                            title="Bearbeiten"
                                                        >
                                                            {expandedRowId === lead.id ? <X size={16} /> : <Pencil size={16} />}
                                                        </button>
                                                        <button
                                                            onClick={() => setSelectedLeadForAssign(lead)}
                                                            className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a] transition-colors"
                                                            title="Zuweisen / Status"
                                                        >
                                                            <Settings size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLead(lead.id)}
                                                            className="p-1.5 bg-[#111111] hover:bg-red-900/30 text-slate-500 hover:text-red-500 rounded-lg transition-colors border border-[#2a2a2a]"
                                                            title="Löschen"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>'''
content = content.replace(old_aktionen_td, new_aktionen_td)

# 4. Update the colSpan of inline edit
old_edit_form = '<td colSpan={7} className="p-0 border-b border-[#2a2a2a]">'
new_edit_form = '<td colSpan={6} className="p-0 border-b border-[#2a2a2a]">\n                                                        <div className="bg-[#111111] p-6 border-x border-[#2a2a2a] shadow-inner">'
content = content.replace(old_edit_form + '\n                                                        <div className="bg-[#111111] p-6 border-x border-[#2a2a2a] shadow-inner">', new_edit_form)
content = content.replace('                                                        </div>\n                                                    </td>\n                                                </tr>', '                                                        </div>\n                                                    </td>\n                                                    <td className="bg-transparent border-none"></td>\n                                                </tr>')

# 5. Mobile view updates
old_mobile_actions = '''                                        <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-end gap-2">
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
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLead(lead.id)}
                                                className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-red-500/70 hover:text-red-500 hover:bg-[#1a1111] transition-colors"
                                                title="Löschen"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>'''
new_mobile_actions = '''                                        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                                            <button 
                                                onClick={() => expandedRowId === lead.id ? handleCancelEdit() : handleEdit(lead)} 
                                                className={`p-1.5 rounded-lg transition-colors border ${expandedRowId === lead.id ? 'bg-[#161616] text-red-400 border-[#2a2a2a]' : 'bg-[#111111] text-slate-500 hover:text-slate-300 border-[#2a2a2a] hover:bg-[#1a1a1a]'}`}
                                                title="Bearbeiten"
                                            >
                                                {expandedRowId === lead.id ? <X size={16} /> : <Pencil size={16} />}
                                            </button>
                                            <button
                                                onClick={() => setSelectedLeadForAssign(lead)}
                                                className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-slate-500 hover:text-slate-300 hover:bg-[#1a1a1a] transition-colors"
                                                title="Zuweisen / Status"
                                            >
                                                <Settings size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLead(lead.id)}
                                                className="p-1.5 rounded-lg bg-[#111111] border border-[#2a2a2a] text-red-500/70 hover:text-red-500 hover:bg-[#1a1111] transition-colors"
                                                title="Löschen"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>'''
content = content.replace(old_mobile_actions, new_mobile_actions)

old_mobile_header = '<div className="bg-[#161616] rounded-xl shadow-sm border border-[#2a2a2a] p-4 sm:p-5 flex flex-col gap-4">'
new_mobile_header = '<div className="bg-[#161616] rounded-xl shadow-sm border border-[#2a2a2a] p-4 sm:p-5 flex flex-col gap-4 relative pr-14">'
content = content.replace(old_mobile_header, new_mobile_header)

with open('src/components/admin/LeadsTable.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
