import * as path from 'path';
import { getBlogSeedUrls, crawlSeedUrlsOnHost } from '@mui/internal-link-checker';

async function main() {
  const workingDir = import.meta.dirname;
  const pagesDir = path.resolve(workingDir, '../pages');

  const blogSeedUrls = await getBlogSeedUrls(pagesDir);

  const { issues } = await crawlSeedUrlsOnHost({
    host: 'http://localhost:3001/',
    seedUrls: ['/', ...blogSeedUrls],
    outPath: path.resolve(workingDir, '../export/material-ui/link-structure.json'),
  });

  process.exit(issues.length);
}

main();
