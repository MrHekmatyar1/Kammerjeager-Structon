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
        
        # We replace padding classes in <td> elements: px-6 py-4 -> px-5 py-3
        content = content.replace('px-6 py-4', 'px-5 py-3')
        content = content.replace('px-4 py-4', 'px-4 py-3')
        
        # Mobile paddings: p-4 sm:p-5 -> p-4 sm:p-4 (or p-3 sm:p-4)
        content = content.replace('p-4 sm:p-5', 'p-3 sm:p-4')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
print("Done")
