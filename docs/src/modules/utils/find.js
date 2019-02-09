const fs = require('fs');
const path = require('path');

const markdownRegex = /\.md$/;

// Returns the markdowns of the documentation in a flat array.
// {
//   pathname: String,
//   filename: String,
// }
function findPagesMarkdown(
  directory = path.resolve(__dirname, '../../../src/pages'),
  pagesMarkdown = [],
) {
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findPagesMarkdown(itemPath, pagesMarkdown);
      return;
    }

    if (!markdownRegex.test(item)) {
      return;
    }

    let pathname = itemPath
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/pages/, '')
      .replace('.md', '');

    // Remove the last pathname segment.
    pathname = pathname
      .split('/')
      .slice(0, 3)
      .join('/');

    pagesMarkdown.push({
      // Relative location in the path (URL) system.
      pathname,
      // Relative location in the file system.
      filename: itemPath,
    });
  });

  return pagesMarkdown;
}

const componentRegex = /^([A-Z][a-z]+)+\.js/;

// Returns the component source in a flat array.
function findComponents(directory, components = []) {
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const itemPath = path.resolve(directory, item);

    if (fs.statSync(itemPath).isDirectory()) {
      findComponents(itemPath, components);
      return;
    }

    if (!componentRegex.test(item)) {
      return;
    }

    components.push({
      filename: itemPath,
    });
  });

  return components;
}

const jsRegex = /\.js$/;
const blackList = ['/.eslintrc', '/_document', '/_app'];

// Returns the next.js pages available in a nested format.
// The output is in the next.js format.
// Each pathname is a route you can navigate to.
function findPages(
  options = {},
  directory = path.resolve(__dirname, '../../../../pages'),
  pages = [],
) {
  fs.readdirSync(directory).forEach(item => {
    const itemPath = path.resolve(directory, item);
    const pathname = itemPath
      .replace(new RegExp(`\\${path.sep}`, 'g'), '/')
      .replace(/^.*\/pages/, '')
      .replace('.js', '')
      .replace(/^\/index$/, '/') // Replace `index` by `/`.
      .replace(/\/index$/, '');

    if (
      options.front &&
      pathname.indexOf('/demos') === -1 &&
      pathname.indexOf('/api') === -1 &&
      pathname.indexOf('/lab') === -1
    ) {
      return;
    }

    if (fs.statSync(itemPath).isDirectory()) {
      const children = [];
      pages.push({
        pathname,
        children,
      });
      findPages(options, itemPath, children);
      return;
    }

    if (!jsRegex.test(item) || blackList.includes(pathname)) {
      return;
    }

    pages.push({
      pathname,
    });
  });

  // sort by pathnames without '-' so that e.g. card comes before card-action
  pages.sort((a, b) => {
    const pathnameA = a.pathname.replace(/-/g, '');
    const pathnameB = b.pathname.replace(/-/g, '');
    if (pathnameA < pathnameB) return -1;
    if (pathnameA > pathnameB) return 1;
    return 0;
  });

  return pages;
}

module.exports = {
  findPages,
  findPagesMarkdown,
  findComponents,
};
