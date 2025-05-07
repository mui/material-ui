// @ts-check
/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';
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

/** @type {string[]} */
const buffer = [];
/**
 *
 * @param {string} text
 */
function write(text) {
  buffer.push(text);
}

/**
 *
 * @param {string[]} lines
 */
function save(lines) {
  const fileContents = [...lines, ''].join('\n');
  fse.writeFileSync(path.join(docsSpaceRoot, '.link-check-errors.txt'), fileContents);
}

/**
 *
 * @param {string} link
 * @returns {string}
 */
function getPageUrlFromLink(link) {
  const [rep] = link.split('/#');
  return rep;
}

/** @type {Record<string, boolean>} */
const availableLinks = {};

// Per link a list a of files where it is used
/** @type {Record<string, string[]>} */
const usedLinks = {};

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
