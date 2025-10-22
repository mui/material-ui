import * as path from 'path';
import { crawl } from './brokenLinksCrawler.mjs';

async function main() {
  const { brokenLinks } = await crawl({
    startCommand: 'pnpm start --no-request-logging -p 3001',
    host: 'http://localhost:3001/',
    outPath: path.resolve(import.meta.dirname, '../public/material-ui/link-structure.json'),
    // Target paths to ignore during link checking
    ignoredPaths: [
      // Internal links not on this server
      // TODO: Seed crawler with stored links from e.g. mui.com/x/link-structure.json
      /^\/(x|base-ui|joy-ui|store|toolpad)(\/|$)/,
    ],
    // CSS selectors for content to ignore during link checking
    ignoredContent: [
      // Links used in demos under MemoryRouter
      // TODO: Create an easier way to identify content under MemoryRouter
      // (e.g. a class or an option on the demo)
      '[id^="demo-"] a[href^="/inbox"]',
      '[id^="demo-"] a[href^="/trash"]',
      '[id^="demo-"] a[href^="/spam"]',
      '[id^="demo-"] a[href^="/drafts"]',
    ],
  });

  process.exit(brokenLinks);
}

main();
