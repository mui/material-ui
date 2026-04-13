const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(
  __dirname,
  '../../node_modules/@mui/docs-shared-assets/sponsors',
);
const OUTPUT_DIR = path.join(__dirname, '../public/static/sponsors');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(SOURCE_DIR).filter((file) => file.endsWith('.svg'));

for (const file of files) {
  fs.copyFileSync(path.join(SOURCE_DIR, file), path.join(OUTPUT_DIR, file));
}

console.log(`Copied ${files.length} sponsor images to ${OUTPUT_DIR}`);
