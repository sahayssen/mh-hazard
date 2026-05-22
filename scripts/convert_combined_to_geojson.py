#!/usr/bin/env python3
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / 'src' / 'lib' / 'data' / 'combined.csv'
OUT_PATH = ROOT / 'src' / 'lib' / 'data' / 'combined.geojson'

def clean_key(k):
    return k.strip() if k is not None else k

def clean_val(v):
    return v.strip() if isinstance(v, str) else v

def main():
    features = []
    with CSV_PATH.open(newline='', encoding='utf-8') as fh:
        reader = csv.DictReader(fh)
        # normalize fieldnames
        fieldnames = [clean_key(fn) for fn in reader.fieldnames]
        for raw in reader:
            row = {clean_key(k): clean_val(v) for k, v in raw.items()}
            lat = row.get('Latitude') or row.get('latitude')
            lon = row.get('Longitude') or row.get('longitude')
            try:
                lat_f = float(lat) if lat not in (None, '', 'N/A') else None
                lon_f = float(lon) if lon not in (None, '', 'N/A') else None
            except ValueError:
                lat_f = lon_f = None

            props = {k: v for k, v in row.items() if k not in ('Latitude', 'Longitude', '')}
            # Remove empty-property keys and preserve strings
            props = {k: (v if v != '' else None) for k, v in props.items()}

            if lat_f is None or lon_f is None:
                # skip rows without valid coordinates
                continue

            feature = {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [lon_f, lat_f]},
                "properties": props,
            }
            features.append(feature)

    fc = {"type": "FeatureCollection", "features": features}
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PATH.open('w', encoding='utf-8') as outfh:
        json.dump(fc, outfh, ensure_ascii=False, indent=2)
    print(f'Wrote {OUT_PATH} with {len(features)} features')

if __name__ == '__main__':
    main()
