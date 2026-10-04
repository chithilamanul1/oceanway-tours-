import os
import json
import base64
from datetime import datetime

tours_dir = r'public/tours'
media = []

def add_files(dir_path, prefix, tags):
    if not os.path.exists(dir_path):
        return
    for f in os.listdir(dir_path):
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            url = prefix + '/' + f
            clean_name = os.path.splitext(f)[0].replace('%20', ' ').replace('_', ' ').replace('-', ' ')
            if len(clean_name) > 35:
                clean_name = clean_name[:35] + '...'
            b64_id = base64.b64encode(url.encode()).decode()[:14].replace('=', '').replace('/', '').replace('+', '')
            media.append({
                '_id': f'media-{b64_id}',
                'url': url,
                'name': clean_name.capitalize(),
                'tags': tags,
                'createdAt': datetime.now().isoformat()
            })

# Scan tour folders
add_files('public/tours', '/tours', ['Tours', 'Sri Lanka'])
add_files('public/tours/bahrain_assets/3day', '/tours/bahrain_assets/3day', ['Bahrain', 'Heritage'])
add_files('public/tours/bahrain_assets/4day', '/tours/bahrain_assets/4day', ['Bahrain', 'Discovery'])
add_files('public/tours/bahrain_assets/5day', '/tours/bahrain_assets/5day', ['Bahrain', 'Pearling'])
add_files('public/tours/bahrain_f1', '/tours/bahrain_f1', ['Bahrain', 'Formula 1'])

print(f'Total media items assembled: {len(media)}')

ts_content = '''export interface MediaItem {
  _id: string;
  url: string;
  name: string;
  tags: string[];
  createdAt: string;
}

export const mediaSeed: MediaItem[] = ''' + json.dumps(media, indent=2) + ';\n'

with open('src/data/mediaSeed.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print('Wrote src/data/mediaSeed.ts successfully!')
