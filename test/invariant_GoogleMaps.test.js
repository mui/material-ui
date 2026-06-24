const fs = require('fs');
const path = require('path');

describe('Google Maps API key must not be exposed in client-side code', () => {
  const filePath = path.join(__dirname, '../docs/data/material/components/autocomplete/GoogleMaps.js');
  
  const payloads = [
    {
      name: 'exact exploit - hardcoded API key pattern',
      content: `const GOOGLE_MAPS_API_KEY = 'AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE';`
    },
    {
      name: 'boundary case - API key in comment',
      content: `// API_KEY=AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE`
    },
    {
      name: 'valid input - environment variable reference',
      content: `const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;`
    }
  ];

  test.each(payloads)('file content must not contain exposed API key: %s', ({ content }) => {
    // Read the actual production file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Security property: No hardcoded Google Maps API keys in the format AIzaSy[alphanumeric]
    const apiKeyRegex = /AIzaSy[0-9A-Za-z_-]{35}/;
    
    // Assert that the file does NOT contain exposed API keys
    const hasExposedApiKey = apiKeyRegex.test(fileContent);
    
    // If the test payload represents a valid case (environment variable), 
    // we still check the actual file doesn't have exposed keys
    if (content.includes('process.env')) {
      // For valid input test case, we're verifying the property holds on the actual file
      expect(hasExposedApiKey).toBe(false);
    } else {
      // For adversarial cases, we're testing that our detection logic works
      // by showing the actual file doesn't match the adversarial pattern
      expect(apiKeyRegex.test(content)).toBe(true); // The payload itself contains API key
      expect(hasExposedApiKey).toBe(false); // But the actual file should not
    }
  });
});