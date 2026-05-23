#!/usr/bin/env python3
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / 'src' / 'lib' / 'data' / 'MHCost.csv'
OUT_PATH = ROOT / 'src' / 'lib' / 'data' / 'MHCost.json'
BACKUP_PATH = OUT_PATH.with_suffix('.json.bak')

if not CSV_PATH.exists():
    print(f"CSV not found: {CSV_PATH}")
    raise SystemExit(1)

with CSV_PATH.open(newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

if len(rows) < 3:
    print('Unexpected CSV format')
    raise SystemExit(1)

# First row contains headers with empty first column
header_row = rows[0]
headers = [h.strip() for h in header_row[1:]]
# Skip second row (aggregate label like Total1)
data_rows = rows[2:]

out = []
for r in data_rows:
    # Some rows may have empty leading cell
    if not r or not r[0].strip():
        continue
    year = r[0].strip()
    entry = {'Year': int(year) if year.isdigit() else year}
    for i, h in enumerate(headers):
        try:
            raw = r[i+1].strip()
        except IndexError:
            raw = ''
        # Normalize numeric values: remove commas and convert to int if possible
        val = raw.replace('"', '').replace(',', '')
        if val == '':
            entry[h] = None
        else:
            try:
                entry[h] = int(val)
            except ValueError:
                try:
                    entry[h] = float(val)
                except ValueError:
                    entry[h] = val
    out.append(entry)

# Backup existing output
if OUT_PATH.exists():
    OUT_PATH.replace(BACKUP_PATH)

with OUT_PATH.open('w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

print(f'Wrote {OUT_PATH} with {len(out)} records')
