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
      '[id^="demo-"] a[href^="#simple-list"]',
      '[id^="demo-"] a[href^="#customized-list"]',
      '[id^="demo-"] a[href^="#text-buttons"]',
      '[id^="demo-"] a[href^="#contained-buttons"]',
      '[id^="demo-"] a[href^="#outlined-buttons"]',
      '[id^="demo-"] a[href^="#foo"]',
    ],
    htmlValidate: {
      extends: ['mui:recommended'],
      rules: {
        // Prism.js outputs raw ">" in syntax-highlighted code blocks.
        // https://github.com/PrismJS/prism/issues/2516
        // https://gitlab.com/html-validate/html-validate/-/work_items/348
        'no-raw-characters': 'off',
        // TODO: re-enable and fix violations (mostly <style>/<div> inside <span>/<div>).
        'element-permitted-content': 'off',
        // html-validate incorrectly requires `imagesizes` on `<link rel="preload"
        // as="image" imagesrcset="... 2x, ... 3x">`. Per the HTML spec, `imagesizes`
        // is only required when `imagesrcset` uses *width* descriptors; with density
        // descriptors (2x, 3x) it must be omitted.
        // Reported: https://gitlab.com/html-validate/html-validate/-/work_items/352
        'element-required-attributes': 'off',
        // TODO: re-enable after an a11y pass on demos. Many Slider/Radio/Switch
        // demos on styling-focused pages render a native <input> without a label.
        'input-missing-label': 'off',
        // TODO: remaining violations are infra-level (same demo rendered
        // multiple times gets duplicate anchor IDs, and the blog template
        // has desktop + mobile search with the same id="search").
        'no-dup-id': 'off',
        // Portaled elements (Menu, Select, Autocomplete listbox) and Base UI
        // components render aria-controls/aria-labelledby targets only after
        // client hydration, so they're missing from the static HTML.
        'no-missing-references': 'warn',
        // Demos use Typography variant="h6" for visual styling (renders <h6>),
        // some pages lack an <h1>, and typography demos intentionally show
        // all heading variants. Not semantic heading issues.
        'heading-level': 'warn',
        // MUI's Collapse and TreeView components wrap <li> children in <div>
        // elements, breaking the required <ul>/<ol> parentage.
        'element-permitted-parent': 'warn',
        // Some demos use aria-label on elements without an appropriate role
        // (Avatar <div>, FormGroup <div>), and templates have similar issues.
        'aria-label-misuse': 'warn',
      },
    },
    ignores: [
      {
        // The links checker uses standard github slugger to check if the anchor exists. But the MUI docs use
        // a custom slugger that sometimes generates different slugs.
        // Ideally we makeit use the github slugegr so links are consistent whether in the html version or
        // a standard markdown renderer.
        path: '/material-ui/react-table.md',
        href: '#sorting-selecting',
      },
    ],
  });

  process.exit(issues.length);
}

main();
