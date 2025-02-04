/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';
import { parseDocFolder, getAnchor } from './reportBrokenLinksLib';

/**
 * The remaining pat to the code is specific to this repository
 */
const UNSUPPORTED_PATHS = ['/api/', '/careers/', '/store/', '/x/'];

const docsSpaceRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '../');

const buffer = [];
function write(text) {
  buffer.push(text);
}

function save(lines) {
  const fileContents = [...lines, ''].join('\n');
  fse.writeFileSync(path.join(docsSpaceRoot, '.link-check-errors.txt'), fileContents);
}

function getPageUrlFromLink(link) {
  const [rep] = link.split('/#');
  return rep;
}

// {[url with hash]: true}
const availableLinks = {};

// {[url with hash]: list of files using this link}
const usedLinks = {};

parseDocFolder(path.join(docsSpaceRoot, './pages/'), availableLinks, usedLinks);

write('Broken links found by `pnpm docs:link-check` that exist:\n');
Object.keys(usedLinks)
  .filter((link) => link.startsWith('/'))
  .filter((link) => !availableLinks[link])
  // these url segments are specific to Base UI and added by scripts (can not be found in markdown)
  .filter((link) =>
    ['components-api', 'hooks-api', '#unstyled'].every((str) => !link.includes(str)),
  )
  .filter((link) => UNSUPPORTED_PATHS.every((unsupportedPath) => !link.includes(unsupportedPath)))
  .sort()
  .forEach((linkKey) => {
    //
    // <!-- #host-reference -->
    //
    write(`- https://next.mui.com${linkKey}`);
    console.log(`https://next.mui.com${linkKey}`);

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
