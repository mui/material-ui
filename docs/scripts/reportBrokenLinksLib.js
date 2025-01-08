import path from 'path';
import fse from 'fs-extra';
import { createRender } from '@mui/internal-markdown';
import { marked } from 'marked';
import { LANGUAGES_IGNORE_PAGES } from '../config';

// Use renderer to extract all links into a markdown document
function getPageLinks(markdown) {
  const hrefs = [];

  const renderer = new marked.Renderer();
  renderer.link = ({ href }) => {
    if (href.startsWith('/')) {
      hrefs.push(href);
    }
  };
  marked(markdown, { renderer });
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
  const headingHashes = {};
  const render = createRender({
    headingHashes,
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

const markdownImportRegExp = /'(.*)\?(muiMarkdown|@mui\/markdown)'/g;

const getMdFilesImported = (jsPageFile) => {
  // For each JS file extract the markdown rendered if it exists
  const fileContent = fse.readFileSync(jsPageFile, 'utf8');
  /**
   * Content files can be represented by either:
   * - 'docsx/data/advanced-components/overview.md?muiMarkdown'; (for mui-x)
   * - 'docs/data/advanced-components/overview.md?muiMarkdown';
   * - './index.md?muiMarkdown';
   */
  const importPaths = fileContent.match(markdownImportRegExp);

  if (importPaths === null) {
    return [];
  }
  return importPaths.map((importPath) => {
    let cleanImportPath = importPath.replace(markdownImportRegExp, '$1');
    if (cleanImportPath.startsWith('.')) {
      cleanImportPath = path.join(path.dirname(jsPageFile), cleanImportPath);
    } else {
      /**
       * convert /Users/oliviertassinari/base-ui/docs/pages/base-ui/react-switch/index.js
       * and docs-base/data/base/components/switch/switch.md
       * into /Users/oliviertassinari/base-ui/docs/data/base/components/switch/switch.md
       */
      const cleanImportPathArray = cleanImportPath.split('/');
      // Assume that the first folder is /docs or an alias that starts with /docs
      cleanImportPathArray.shift();

      // Truncate jsPageFile at /docs/ and append cleanImportPath
      cleanImportPath = path.join(
        jsPageFile.slice(0, jsPageFile.indexOf('/docs/')),
        'docs',
        cleanImportPathArray.join('/'),
      );
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
export { parseDocFolder, getAnchor };
