const path = require('path');
const fse = require('fs-extra');
const { createRender } = require('@mui/markdown');
const { marked } = require('marked');

const UNSUPPORTED_PATHS = ['/api/', '/careers/', '/store/', '/x/'];

const docsSpaceRoot = path.join(__dirname, '../');

const buffer = [];

function write(text) {
  buffer.push(text);
}

function save() {
  const fileContents = [...buffer, ''].join('\n');
  fse.writeFileSync(path.join(docsSpaceRoot, 'broken-links.txt'), fileContents);
}

// Use renderer to extract all links into a markdown document
const getPageLinks = (markdown) => {
  const hrefs = [];

  const renderer = new marked.Renderer();
  renderer.link = (href) => {
    if (href[0] === '/') {
      hrefs.push(href);
    }
  };
  marked(markdown, { renderer });
  return hrefs;
};

// List all .js files in a folder
const getJsFilesInFolder = (folderPath) => {
  const files = fse.readdirSync(folderPath, { withFileTypes: true });
  return files.reduce((acc, file) => {
    if (file.isDirectory()) {
      const filesInFolder = getJsFilesInFolder(path.join(folderPath, file.name));
      return [...acc, ...filesInFolder];
    }
    if (file.name.endsWith('.js') || file.name.endsWith('.tsx')) {
      return [...acc, path.join(folderPath, file.name)];
    }
    return acc;
  }, []);
};

// Returns url assuming it's "./docs/pages/x/..." becomes  "mui.com/x/..."
const jsFilePathToUrl = (jsFilePath) => {
  const folder = path.dirname(jsFilePath);
  const file = path.basename(jsFilePath);

  const root = folder.slice(jsFilePath.indexOf('/pages') + '/pages'.length);
  const suffix = file.split('.').at(-1);
  let page = `/${file.slice(0, file.length - 1 - suffix.length)}`;

  if (page === '/index') {
    page = '';
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
  const render = createRender({ headingHashes, toc, userLanguage });

  const data = fse.readFileSync(fileName, { encoding: 'utf-8' });
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
   * - 'docsx/data/advanced-components/overview.md?@mui/markdown'; (for mui-x)
   * - 'docs/data/advanced-components/overview.md?@mui/markdown';
   * - './index.md?@mui/markdown';
   */
  const importPaths = fileContent.match(/'.*\?@mui\/markdown'/g);

  if (importPaths === null) {
    return [];
  }
  return importPaths.map((importPath) => {
    let cleanImportPath = importPath.slice(1, importPath.length - "?@mui/markdown'".length);
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

    links
      .map((link) => (link[link.length - 1] === '/' ? link.slice(0, link.length - 1) : link))
      .forEach((link) => {
        if (usedLinks[link] === undefined) {
          usedLinks[link] = [fileName];
        } else {
          usedLinks[link].push(fileName);
        }
      });

    hashes.forEach((hash) => {
      availableLinks[`${url}/#${hash}`] = true;
    });
  });
};

// {[url with hash]: true}
const availableLinks = {};

// {[url with hash]: list of files using this link}
const usedLinks = {};

parseDocFolder(path.join(docsSpaceRoot, './pages/'), availableLinks, usedLinks);
// TODO: Allows to run on documents of /mui/material-ui from /mui/mui-x
// parseDocFolder(path.join(ROOT, process.env.MUI_X_PATH, "docs/pages/"), availableLinks, usedLinks);

function getPageUrlFromLink(link) {
  const [rep] = link.split('/#');
  return rep;
}

Object.keys(usedLinks)
  .filter((link) => link.startsWith('/'))
  .filter((link) => !availableLinks[link])
  // unstyled sections are added by scripts (can not be found in markdown)
  .filter((link) => !link.includes('#unstyled'))
  .filter((link) => UNSUPPORTED_PATHS.every((unsupportedPath) => !link.includes(unsupportedPath)))
  .sort()
  .forEach((linkKey) => {
    write(`not found: https://mui.com${linkKey}`);
    write(`used in`);
    usedLinks[linkKey].forEach((f) => write(`- ${path.relative(docsSpaceRoot, f)}`));
    write('available anchors on the same page:');
    write(
      Object.keys(availableLinks)
        .filter((link) => getPageUrlFromLink(link) === getPageUrlFromLink(linkKey))
        .sort()
        .map((link) => link.split('/').at(-1))
        .join('\n'),
    );
    write('\n\n');
  });
save();
