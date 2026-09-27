const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '.next/server/app/index.html'), 'utf8');

if (!html.includes('<p id="mq">true</p>')) {
  console.error(
    'The Next.js App Router build did not server-render useMediaQuery from the @mui/material barrel.',
  );
  process.exit(1);
}
