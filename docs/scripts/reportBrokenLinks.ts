/* eslint-disable no-console */
import path from 'path';
import fs from 'node:fs';
import { parseDocFolder, getAnchor } from './reportBrokenLinksLib';

/**
 * The remaining path to the code is specific to this repository
 */
const EXTERNAL_PATHS = [
  '/api/',
  // Not defined in .md file
  '/careers/',
  // Same domain, different project
  '/store/',
  // Same domain, different project
  '/x/',
  // these url segments are specific to Base UI and added by scripts (can not be found in markdown)
  'components-api',
  'hooks-api',
  '#unstyled',
];

const docsSpaceRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '../');

const buffer: string[] = [];

function write(text: string) {
  buffer.push(text);
}

function save(lines: string[]) {
  const fileContents = [...lines, ''].join('\n');
  fs.writeFileSync(path.join(docsSpaceRoot, '.link-check-errors.txt'), fileContents);
}

/**
 *
 * @param {string} link
 * @returns {string}
 */
function getPageUrlFromLink(link: string): string {
  const [rep] = link.split('/#');
  return rep;
}

const availableLinks: Record<string, boolean> = {};

// Per link a list a of files where it is used
const usedLinks: Record<string, string[]> = {};

parseDocFolder(path.join(docsSpaceRoot, './pages/'), availableLinks, usedLinks);

write('Broken links found by `pnpm docs:link-check` that exist:\n');
Object.keys(usedLinks)
  .filter((link) => link.startsWith('/'))
  .filter((link) => !availableLinks[link])
  .filter((link) => EXTERNAL_PATHS.every((externalPath) => !link.includes(externalPath)))
  .sort()
  .forEach((linkKey) => {
    //
    // <!-- #host-reference -->
    //
    write(`- https://mui.com${linkKey}`);
    console.log(`https://mui.com${linkKey}`);

    console.log(`used in`);
    usedLinks[linkKey].forEach((f) => console.log(`- ${path.relative(docsSpaceRoot, f)}`));
    console.log('available anchors on the same page:');
    console.log(
      Object.keys(availableLinks)
        .filter((link) => getPageUrlFromLink(link) === getPageUrlFromLink(linkKey))
        .sort()
        .map(getAnchor)
        .join('\n'),
    );
    console.log('\n\n');
  });
save(buffer);
