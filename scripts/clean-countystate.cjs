#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Read combined.json
const combinedPath = path.join('src', 'lib', 'data', 'combined.json');
const combinedData = JSON.parse(fs.readFileSync(combinedPath, 'utf-8'));

// Remove "County" from CountyState property values
let cleanedCount = 0;
for (const feature of combinedData.features) {
  const props = feature.properties;
  
  // Look for the CountyState property (could be "County/State" or "CountyState" after normalization)
  const countyStateKey = Object.keys(props).find(key => key.toLowerCase() === 'county/state' || key.toLowerCase() === 'countystate');
  
  if (countyStateKey && props[countyStateKey]) {
    // Remove "County" or "Parish" from the value
    props[countyStateKey] = props[countyStateKey]
      .replace(/\s+County,/, ',')
      .replace(/\s+Parish,/, ',');
    cleanedCount++;
  }
}

// Write back
fs.writeFileSync(combinedPath, JSON.stringify(combinedData, null, 2));
console.log(`DONE. Cleaned ${cleanedCount} features by removing "County" from CountyState values.`);
console.log(`Wrote updated combined.json to ${combinedPath}`);
