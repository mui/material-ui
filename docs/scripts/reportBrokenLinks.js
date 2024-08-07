/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const { createRender } = require('@mui/internal-markdown');
const { marked } = require('marked');
const { LANGUAGES_IGNORE_PAGES } = require('../config');

// Use renderer to extract all links into a markdown document
function getPageLinks(markdown) {
  const hrefs = [];

  const renderer = new marked.Renderer();
  renderer.link = ({ href }) => {
    if (href.startsWith('/')) {
      hrefs.push(href);
    }
  };
  marked(markdown, { mangle: false, headerIds: false, renderer });
  return hrefs;
}

// List all .js files in a folder
function getJsFilesInFolder(folderPath) {
  const files = fse.readdirSync(folderPath, { withFileTypes: true });
  return files.reduce((acc, file) => {
    if (file.isDirectory()) {
      const filesInFolder = getJsFilesInFolder(path.join(folderPath, file.name));
      return [...acc, ...filesInFolder];
    }
    if (file.name.endsWith('.js') || file.name.endsWith('.tsx')) {
      return [...acc, path.join(folderPath, file.name).replace(/\\/g, '/')];
    }
    return acc;
  }, []);
}

// Returns url assuming it's "./docs/pages/x/..." becomes  "mui.com/x/..."
const jsFilePathToUrl = (jsFilePath) => {
  const folder = path.dirname(jsFilePath);
  const file = path.basename(jsFilePath);

  const root = folder.slice(jsFilePath.indexOf('/pages') + '/pages'.length);
  const suffix = path.extname(file);
  let page = `/${file.slice(0, file.length - suffix.length)}/`;

  if (page === '/index/') {
    page = '/';
  }

  return `${root}${page}`;
};

function cleanLink(link) {
  const startQueryIndex = link.indexOf('?');
  const endQueryIndex = link.indexOf('#', startQueryIndex);

  if (startQueryIndex === -1) {
    return link;
  }
  if (endQueryIndex === -1) {
    return link.slice(0, startQueryIndex);
  }
  return `${link.slice(0, startQueryIndex)}${link.slice(endQueryIndex)}`;
}

function getLinksAndAnchors(fileName) {
  const toc = [];
  const headingHashes = {};
  const userLanguage = 'en';
  const render = createRender({
    headingHashes,
    toc,
    userLanguage,
    options: {
      ignoreLanguagePages: LANGUAGES_IGNORE_PAGES,
      env: {
        SOURCE_CODE_REPO: '',
      },
    },
  });

  const data = fse.readFileSync(fileName, { encoding: 'utf8' });
  render(data);

  const links = getPageLinks(data).map(cleanLink);

  return {
    hashes: Object.keys(headingHashes),
    links,
  };
}

const getMdFilesImported = (jsPageFile) => {
  // For each JS file extract the markdown rendered if it exists
  const fileContent = fse.readFileSync(jsPageFile, 'utf8');
  /**
   * Content files can be represented by either:
   * - 'docsx/data/advanced-components/overview.md?muiMarkdown'; (for mui-x)
   * - 'docs/data/advanced-components/overview.md?muiMarkdown';
   * - './index.md?muiMarkdown';
   */
  const importPaths = fileContent.match(/'.*\?muiMarkdown'/g);

  if (importPaths === null) {
    return [];
  }
  return importPaths.map((importPath) => {
    let cleanImportPath = importPath.slice(1, importPath.length - "?muiMarkdown'".length);
    if (cleanImportPath.startsWith('.')) {
      cleanImportPath = path.join(path.dirname(jsPageFile), cleanImportPath);
    } else if (cleanImportPath.startsWith('docs/')) {
      cleanImportPath = path.join(
        jsPageFile.slice(0, jsPageFile.indexOf('docs/')),
        cleanImportPath,
      );
    } else if (cleanImportPath.startsWith('docsx/')) {
      cleanImportPath = path.join(
        jsPageFile.slice(0, jsPageFile.indexOf('docs/')),
        cleanImportPath.replace('docsx', 'docs'),
      );
    } else {
      console.error(`unable to deal with import path: ${cleanImportPath}`);
    }

    return cleanImportPath;
  });
};

const parseDocFolder = (folderPath, availableLinks = {}, usedLinks = {}) => {
  const jsPageFiles = getJsFilesInFolder(folderPath);

  const mdFiles = jsPageFiles.flatMap((jsPageFile) => {
    const pageUrl = jsFilePathToUrl(jsPageFile);
    const importedMds = getMdFilesImported(jsPageFile);

    return importedMds.map((fileName) => ({ fileName, url: pageUrl }));
  });

  // Mark all the existing page as available
  jsPageFiles.forEach((jsFilePath) => {
    const url = jsFilePathToUrl(jsFilePath);
    availableLinks[url] = true;
  });

  // For each markdown file, extract links
  mdFiles.forEach(({ fileName, url }) => {
    const { hashes, links } = getLinksAndAnchors(fileName);

    links.forEach((link) => {
      if (usedLinks[link] === undefined) {
        usedLinks[link] = [fileName];
      } else {
        usedLinks[link].push(fileName);
      }
    });

    hashes.forEach((hash) => {
      availableLinks[`${url}#${hash}`] = true;
    });
  });
};

const getAnchor = (link) => {
  const splittedPath = link.split('/');
  const potentialAnchor = splittedPath[splittedPath.length - 1];
  return potentialAnchor.includes('#') ? potentialAnchor : '';
};

// Export useful method for doing similar checks in other repositories
module.exports = { parseDocFolder, getAnchor };

/**
 * The remaining pat to the code is specific to this repository
 */
const UNSUPPORTED_PATHS = ['/api/', '/careers/', '/store/', '/x/'];

const docsSpaceRoot = path.join(__dirname, '../');

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

if (require.main === module) {
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
      // <!-- #default-branch-switch -->
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
}
