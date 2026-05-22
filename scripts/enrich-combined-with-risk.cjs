#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Color mapping for risk ratings
const riskColorMap = {
  'Very Low': '#2ecc71',        // green
  'Relatively Low': '#3498db',   // light blue
  'Relatively Moderate': '#f39c12', // orange
  'Relatively High': '#e74c3c',  // red
  'Very High': '#c0392b'         // dark red
};

// State name to abbreviation mapping
const stateToAbbr = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
  'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
  'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
  'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
  'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
  'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
  'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
  'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
  'Wisconsin': 'WI', 'Wyoming': 'WY'
};

// Read hazard.json and build a map
const hazardPath = path.join('src', 'lib', 'data', 'hazard.json');
const hazardData = JSON.parse(fs.readFileSync(hazardPath, 'utf-8'));
const hazardArray = Array.isArray(hazardData) ? hazardData : [hazardData];

const riskRankings = {
  'Very High': 5,
  'Relatively High': 4,
  'Relatively Moderate': 3,
  'Relatively Low': 2,
  'Very Low': 1
};

const countyRiskMap = {};
for (const entry of hazardArray) {
  try {
    const countyState = entry.COUNTYSTATE; // e.g., "Autauga, AL"
    const riskRating = entry.RISK_RATNG;
    
    if (!countyRiskMap[countyState]) {
      countyRiskMap[countyState] = { rating: riskRating, rank: riskRankings[riskRating] || 0 };
    } else {
      // Keep the higher risk rating
      const currentRank = countyRiskMap[countyState].rank;
      const newRank = riskRankings[riskRating] || 0;
      if (newRank > currentRank) {
        countyRiskMap[countyState] = { rating: riskRating, rank: newRank };
      }
    }
  } catch (e) {
    // skip unparseable entries
  }
}

console.log(`Built risk map for ${Object.keys(countyRiskMap).length} county/state combinations`);

// Read combined.json
const combinedPath = path.join('src', 'lib', 'data', 'combined.json');
const combinedData = JSON.parse(fs.readFileSync(combinedPath, 'utf-8'));

// Enrich features with risk rating and color
let enrichedCount = 0;
for (const feature of combinedData.features) {
  // Find the CountyState property (case-insensitive)
  const countyStateKey = Object.keys(feature.properties).find(key => 
    key.toLowerCase() === 'county/state' || key === 'CountyState'
  );
  
  const countyState = countyStateKey ? feature.properties[countyStateKey] : null;
  
  if (countyState && countyRiskMap[countyState]) {
    const riskData = countyRiskMap[countyState];
    feature.properties.RiskRating = riskData.rating;
    feature.properties.RiskColor = riskColorMap[riskData.rating] || '#808080';
    enrichedCount++;
  } else {
    // Default to neutral gray if not found
    feature.properties.RiskRating = 'Unknown';
    feature.properties.RiskColor = '#808080';
  }
}

// Write enriched combined.json back
fs.writeFileSync(combinedPath, JSON.stringify(combinedData, null, 2));
console.log(`DONE. Enriched ${enrichedCount} features with risk ratings and colors.`);
console.log(`Wrote updated combined.json to ${combinedPath}`);
