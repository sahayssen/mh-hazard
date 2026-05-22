#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Read combined.json
const combinedPath = path.join('src', 'lib', 'data', 'combined.json');
const combinedData = JSON.parse(fs.readFileSync(combinedPath, 'utf-8'));

// Normalize property names: remove spaces and # characters
let normalizedCount = 0;
for (const feature of combinedData.features) {
  const props = feature.properties;
  const newProps = {};
  
  for (const [key, value] of Object.entries(props)) {
    // Remove spaces and # characters
    const normalizedKey = key.replace(/\s+/g, '').replace(/#/g, '');
    newProps[normalizedKey] = value;
  }
  
  feature.properties = newProps;
  normalizedCount++;
}

// Write back
fs.writeFileSync(combinedPath, JSON.stringify(combinedData, null, 2));
console.log(`DONE. Normalized property names in ${normalizedCount} features.`);
console.log(`Removed spaces and # from all property keys in ${combinedPath}`);
