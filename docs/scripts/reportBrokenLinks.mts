import * as path from 'path';
import { crawl } from '@mui/internal-code-infra/brokenLinksChecker';
import { globby } from 'globby';

async function main() {
  // The /blog/ page has pagination that's not persisted in the url.
  const blogPages = await globby('blog/**/*.js', {
    cwd: path.resolve(import.meta.dirname, '../pages'),
  });
  const blogSeedUrls = blogPages.map((page) => {
    const pathname = page.replace(/(?:\/index)?\.js$/, '');
    return `/${pathname}`;
  });

  const { issues } = await crawl({
    startCommand: 'pnpm start --no-request-logging -p 3001',
    host: 'http://localhost:3001/',
    seedUrls: ['/', ...blogSeedUrls],
    outPath: path.resolve(import.meta.dirname, '../export/material-ui/link-structure.json'),
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

  process.exit(issues.length);
}

main();
