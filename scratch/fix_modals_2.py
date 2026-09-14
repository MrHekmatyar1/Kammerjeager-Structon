import os

files_to_update = [
    'src/components/admin/LeadsTable.tsx',
    'src/components/admin/MastersTable.tsx',
    'src/components/admin/KundenTable.tsx'
]

for file_path in files_to_update:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. Make text pure white
        content = content.replace('<p className="text-sm text-slate-200 mb-6 text-center">', '<p className="text-[15px] font-medium text-white mb-6 text-center">')
        
        # 2. Make buttons even smaller (change text-sm to text-xs, reduce py)
        # Cancel Button
        old_cancel = 'className="px-3 py-1.5 bg-[#222222] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-slate-300 rounded-md text-sm font-medium transition-colors"'
        new_cancel = 'className="px-3 py-1 bg-[#222222] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-slate-300 rounded-md text-[13px] font-medium transition-colors"'
        content = content.replace(old_cancel, new_cancel)
        
        # Delete Button
        old_delete = 'className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"'
        new_delete = 'className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-[13px] font-medium transition-colors disabled:opacity-50"'
        content = content.replace(old_delete, new_delete)
        
        # 3. Make X icon smaller
        # The modal header has `<X size={20} />`
        # We only want to replace the one inside the modal. The easiest way is to look for the modal header structure.
        old_header = '<h3 className="font-bold text-white">Löschen bestätigen</h3>\n                            <button onClick={() => setDeletingId(null)} className="text-slate-500 hover:text-slate-300">\n                                <X size={20} />'
        new_header = '<h3 className="font-bold text-[15px] text-white">Löschen bestätigen</h3>\n                            <button onClick={() => setDeletingId(null)} className="text-slate-500 hover:text-white transition-colors">\n                                <X size={16} />'
        content = content.replace(old_header, new_header)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
print("Done")
