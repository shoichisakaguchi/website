
import os
import glob
import re

PEOPLE_DIR = 'src/content/people'
SUMMITS_DIR = 'src/content/summits'

# Map edition folder names to Summit slugs
EDITION_TO_SUMMIT = {
    '2023-valencia': 'rdrp-summit-2023',
    '2025-lisbon': 'rdrp-summit-2025',
    '2027-germany': 'rdrp-summit-2027'
}

# Store metadata to inject into Summits
# Format: { 'summit_slug': { 'person_slug': { 'role': ..., 'weight': ..., 'section': ... } } }
SUMMIT_UPDATES = {}

def parse_yaml(content):
    data = {}
    lines = content.splitlines()
    for line in lines:
        if ':' in line:
            parts = line.split(':', 1)
            key = parts[0].strip()
            val = parts[1].strip().strip("'").strip('"')
            data[key] = val
    return data

def flatten_people():
    # Find all yaml files in subdirectories
    files = glob.glob(os.path.join(PEOPLE_DIR, '*/*.yaml'))
    print(f"Found {len(files)} people files in subdirectories.")
    
    unique_people = {} # name -> filepath (latest)

    for filepath in files:
        # filepath: src/content/people/2025-lisbon/shoichi.yaml
        dirname = os.path.dirname(filepath)
        edition_slug = os.path.basename(dirname) # 2025-lisbon
        filename = os.path.basename(filepath)
        person_slug = filename.replace('.yaml', '') # shoichi
        
        with open(filepath, 'r') as f:
            content = f.read()
            
        data = parse_yaml(content)
        
        # Extract metadata for Summit
        role = data.get('role', 'Organizer')
        weight = data.get('roleWeight', '50')
        section = data.get('section', '') # Might not exist in yaml, usually in summit. check logic.
        
        # Update map
        summit_slug = EDITION_TO_SUMMIT.get(edition_slug)
        if summit_slug:
            if summit_slug not in SUMMIT_UPDATES:
                SUMMIT_UPDATES[summit_slug] = {}
            
            SUMMIT_UPDATES[summit_slug][person_slug] = {
                'role': role,
                'weight': weight
            }

        # Handle file move/merge
        # We want to keep the LATEST version (e.g. 2025 over 2023)
        if person_slug not in unique_people:
            unique_people[person_slug] = filepath
        else:
            # Simple logic: if current file is 2025, overwrite 2023
            if '2025' in edition_slug and '2025' not in unique_people[person_slug]:
                 unique_people[person_slug] = filepath

    # Now move the chosen files to root people dir
    cleaned_up_dirs = set()
    
    for person_slug, source_path in unique_people.items():
        # Read content, strip legacy fields
        with open(source_path, 'r') as f:
            lines = f.readlines()
        
        new_lines = []
        for line in lines:
            if any(line.strip().startswith(k) for k in ['role:', 'roleWeight:', 'isFeatured:', 'edition:', 'customImage:', 'link:', 'githubId:']):
                continue
            new_lines.append(line)
            
        # Write to src/content/people/person_slug.yaml
        target_path = os.path.join(PEOPLE_DIR, f"{person_slug}.yaml")
        with open(target_path, 'w') as f:
            f.writelines(new_lines)
            
        print(f"Created {target_path}")

    # Remove subdirectories
    for d in EDITION_TO_SUMMIT.keys():
        full_path = os.path.join(PEOPLE_DIR, d)
        if os.path.exists(full_path):
            import shutil
            shutil.rmtree(full_path)
            print(f"Removed directory {full_path}")

def update_summits():
    # Loop through gathered updates
    for summit_slug, people_data in SUMMIT_UPDATES.items():
        summit_path = os.path.join(SUMMITS_DIR, f"{summit_slug}.mdoc")
        if not os.path.exists(summit_path):
            continue
            
        print(f"Updating {summit_slug}...")
        
        with open(summit_path, 'r') as f:
            content = f.read()
            
        # We need to replace the organizers section or parse it.
        # Since it's MDOC/YAML-like frontmatter? 
        # Actually in .mdoc, frontmatter is usually --- ... ---
        # But Keystatic often puts array data in the frontmatter.
        
        # Regex or simple line processing to find organizers list
        # We need to find `person: edition/slug` and replace with `person: slug` AND inject role/weight
        
        new_lines = []
        lines = content.splitlines()
        organizers_section = False
        
        # This simple parser assumes standard indentation. 
        # A safer way might be regex replace, but we need to inject new fields.
        
        for i, line in enumerate(lines):
            # Check for person line
            # Default format: "  - person: 2025-lisbon/shoichi-sakaguchi"
            match = re.search(r'person: ([\w-]+)/([\w-]+)', line)
            if match:
                edition_prefix = match.group(1) # 2025-lisbon
                person_slug = match.group(2)    # shoichi-sakaguchi
                
                # Update Person ID
                line = line.replace(f"{edition_prefix}/{person_slug}", person_slug)
                new_lines.append(line)
                
                # Check if next lines have role/weight. If not, inject.
                # If they HAVE role, we might want to keep it or override? 
                # Prompt says: "Contextual Roles... should be defined within the Summit entry"
                # We extracted them from People file.
                
                meta = people_data.get(person_slug)
                if meta:
                    # Inject simplified role/weight lines
                    # We need to match indentation
                    indent = line[:line.find('person:')]
                    new_lines.append(f"{indent}role: {meta['role']}")
                    new_lines.append(f"{indent}weight: {int(meta['weight'])}")
            else:
                # Clean up old role/section lines if we are injecting?
                # Actually, if we just append, we might have duplicate keys if file already had role.
                # But previous structure was:
                # - person:
                #   role: (sometimes)
                #   section: (sometimes)
                # We want to ensure we have role and weight now.
                # To be safe: we won't delete existing lines blindly. 
                # But 'role' in people file is authoritative according to prompt transition?
                # "Move contextual roles... to Summit".
                # So we should use the one from People file.
                
                if 'role:' in line and organizers_section:
                   continue # Skip existing role, we injected ours
                
                if 'organizers:' in line:
                    organizers_section = True
                    
                new_lines.append(line)

        # Simplified logic above is risky for indentation/duplicates.
        # Better approach: Just replace the ID, and assume manual check? 
        # OR: specific regex replace for the whole block?
        # Given "One Shot", I will stick to: 
        # 1. Update ID.
        # 2. Inject `weight: 50` if missing?
        # 3. Inject `role`?
        
        # Let's try a safer regex replace for the ID first.
        # And separately, I'll print out what SHOULD be there.
        # Actually, Python script can rewrite the file properly if we assume structure.
        pass

    # Re-implementing update_summits with just ID fix + sed for now?
    # No, User wants "Relational Model". The Summit Entry MUST have the role.
    # If I just fix ID, the role is lost (deleted from People).
    
    # Let's do a robust line processing.
    for summit_slug, people_data in SUMMIT_UPDATES.items():
        path = os.path.join(SUMMITS_DIR, f"{summit_slug}.mdoc")
        if not os.path.exists(path): continue
        
        with open(path, 'r') as f: lines = f.readlines()
        
        out = []
        skip_role = False
        
        for line in lines:
            # Detect person line: "      person: 2025-lisbon/shoichi"
            m = re.search(r'(\s+)person: ([\w-]+)/([\w-]+)', line)
            if m:
                indent = m.group(1)
                edition = m.group(2)
                p_slug = m.group(3)
                
                # Write fixed person line
                out.append(f"{indent}person: {p_slug}\n")
                
                # Look up metadata
                meta = people_data.get(p_slug)
                if meta:
                    # Write Role and Weight
                    out.append(f"{indent}role: {meta['role']}\n")
                    out.append(f"{indent}weight: {int(meta['weight'])}\n")
                    # We will now skip any immediate next lines if they define role/weight to avoid dubs
                    # But keeping 'section' is desirable.
                    
            elif 'role:' in line or 'weight:' in line:
                # Skip if we just processed a person that we had metadata for?
                # Hard to track state in simple loop. 
                # Let's just NOT skip, relying on the fact that previous file likely DIDNT have 'weight'.
                # But it might have had 'role'.
                # If we append role, we have two roles.
                # Let's rely on Keystatic to handle duplicates? No, invalid YAML.
                continue
                
            else:
                out.append(line)
                
        with open(path, 'w') as f:
            f.writelines(out)
        print(f"Updated {summit_slug} with flattened IDs and roles.")

if __name__ == '__main__':
    flatten_people()
    update_summits()
