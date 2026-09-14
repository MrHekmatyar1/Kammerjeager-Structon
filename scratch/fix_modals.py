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
        
        # 1. Make text white
        content = content.replace('<p className="text-sm text-slate-400 mb-6">', '<p className="text-sm text-slate-200 mb-6 text-center">')
        
        # 2. Center the buttons
        content = content.replace('<div className="flex justify-end gap-3">', '<div className="flex justify-center gap-3">')
        
        # 3. Make buttons smaller (in the Delete Modal). 
        old_cancel = 'className="px-4 py-2 bg-[#222222] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-slate-300 rounded-md text-sm font-medium transition-colors"'
        new_cancel = 'className="px-3 py-1.5 bg-[#222222] border border-[#2a2a2a] hover:bg-[#2a2a2a] text-slate-300 rounded-md text-sm font-medium transition-colors"'
        content = content.replace(old_cancel, new_cancel)
        
        old_delete = 'className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"'
        new_delete = 'className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"'
        content = content.replace(old_delete, new_delete)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
print("Done")
