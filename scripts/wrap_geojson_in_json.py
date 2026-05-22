#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GEOJSON_PATH = ROOT / 'src' / 'lib' / 'data' / 'combined.geojson'
OUT_PATH = ROOT / 'src' / 'lib' / 'data' / 'combined.json'

def main():
    with GEOJSON_PATH.open('r', encoding='utf-8') as fh:
        geo = json.load(fh)

    wrapped = {"geojson": geo}
    with OUT_PATH.open('w', encoding='utf-8') as outfh:
        json.dump(wrapped, outfh, ensure_ascii=False, indent=2)

    print(f'Wrote {OUT_PATH}')

if __name__ == '__main__':
    main()
