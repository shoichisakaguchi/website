
import os
import glob
import shutil

PEOPLE_DIR = 'src/content/people'
POSTS_DIR = 'src/content/posts'
LEGACY_POSTS_DIR = 'src/content/_posts_legacy'

EDITION_MAP = {
    '2023': '2023-valencia',
    '2025': '2025-lisbon',
    '2027': '2027-germany',
    '2023 Valencia': '2023-valencia',
    '2025 Lisbon': '2025-lisbon',
    '2027 Germany': '2027-germany'
}

def parse_yaml(content):
    data = {}
    lines = content.splitlines()
    for line in lines:
        if ':' in line:
            key, val = line.split(':', 1)
            data[key.strip()] = val.strip().strip("'").strip('"')
    return data

def update_yaml_content(content, new_edition_slug):
    lines = content.splitlines()
    new_lines = []
    for line in lines:
        if line.strip().startswith('edition:'):
            new_lines.append(f"edition: {new_edition_slug}")
        elif line.strip().startswith('entryId:'):
            continue # Remove entryId
        else:
            new_lines.append(line)
    return '\n'.join(new_lines) + '\n'

def migrate_people():
    files = glob.glob(os.path.join(PEOPLE_DIR, '*.yaml'))
    print(f"Found {len(files)} people files.")
    
    for filepath in files:
        filename = os.path.basename(filepath)
        slug = filename.replace('.yaml', '')
        
        with open(filepath, 'r') as f:
            content = f.read()
            
        data = parse_yaml(content)
        edition_raw = data.get('edition', '')
        
        # Determine edition slug
        edition_dir = None
        for key, val in EDITION_MAP.items():
            if key in edition_raw:
                edition_dir = val
                break
        
        if not edition_dir:
            # Fallback based on filename
            for key, val in EDITION_MAP.items():
                if val in slug:
                    edition_dir = val
                    break
        
        if not edition_dir:
            print(f"Skipping {filename}: Could not determine edition.")
            continue
            
        # Clean slug (remove edition suffix)
        clean_slug = slug.replace(f"-{edition_dir}", "")
        
        # Create edition directory
        target_dir = os.path.join(PEOPLE_DIR, edition_dir)
        os.makedirs(target_dir, exist_ok=True)
        
        # New file path
        target_path = os.path.join(target_dir, f"{clean_slug}.yaml")
        
        # Update content
        new_content = update_yaml_content(content, edition_dir)
        
        with open(target_path, 'w') as out:
            out.write(new_content)
            
        # Remove old file
        os.remove(filepath)
        print(f"Moved {filename} -> {edition_dir}/{clean_slug}.yaml")

def migrate_posts():
    if os.path.exists(POSTS_DIR):
        if not os.path.exists(LEGACY_POSTS_DIR):
            os.makedirs(LEGACY_POSTS_DIR)
        
        # Move all files
        for item in os.listdir(POSTS_DIR):
            s = os.path.join(POSTS_DIR, item)
            d = os.path.join(LEGACY_POSTS_DIR, item)
            if os.path.isdir(s):
                shutil.move(s, d)
            else:
                shutil.move(s, d)
        
        # Remove empty dir
        os.rmdir(POSTS_DIR)
        print(f"Moved posts to {LEGACY_POSTS_DIR}")
    else:
        print("No legacy posts to move.")

if __name__ == '__main__':
    migrate_people()
    migrate_posts()
