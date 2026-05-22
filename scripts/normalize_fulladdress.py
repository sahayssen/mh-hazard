#!/usr/bin/env python3
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / 'src' / 'lib' / 'data' / 'combined.json'
BACKUP_PATH = DATA_PATH.with_suffix('.json.bak')

def normalize_address(s):
    # Replace any comma followed by any whitespace with a comma+single-space
    return re.sub(r',\s*', ', ', s).strip()

if __name__ == '__main__':
    if not DATA_PATH.exists():
        print(f"File not found: {DATA_PATH}")
        raise SystemExit(1)

    with DATA_PATH.open('r', encoding='utf-8') as f:
        data = json.load(f)

    # Backup original
    with BACKUP_PATH.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    # Support both wrapped { "geojson": FeatureCollection } and raw FeatureCollection
    if isinstance(data, dict) and 'geojson' in data and isinstance(data['geojson'], dict):
        fc = data['geojson']
        wrapped = True
    else:
        fc = data
        wrapped = False

    count = 0
    for feat in fc.get('features', []):
        props = feat.get('properties', {})
        addr = props.get('FullAddress')
        if isinstance(addr, str):
            newaddr = normalize_address(addr)
            if newaddr != addr:
                props['FullAddress'] = newaddr
                count += 1

    # write back
    out = {'geojson': fc} if wrapped else fc
    with DATA_PATH.open('w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"Normalized FullAddress for {count} features in {DATA_PATH}")
    print(f"Backup written to {BACKUP_PATH}")
