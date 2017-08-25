const fs = require('fs');
const path = require('path');

const markdownRegex = /\.md$/;

// Returns the markdowns of the documentation in a flat array.
function findPagesMarkdown(
  directory = path.resolve(__dirname, '../../../src/pages'),
  pagesMarkdown = []
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
    let pathname = itemPath.replace(new RegExp(`\\${path.sep}`, 'g'), '/').replace(/^.*\/pages/, '').replace('.md', '');

    if (pathname.indexOf('/demos') === 0) {
      pathname = pathname.split('/').slice(0, 3).join('/');
    }

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
function findComponents(directory = path.resolve(__dirname, '../../../../src'), components = []) {
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
const blackList = ['/.eslintrc', '/_document'];

// Returns the next.js pages available in a nested format.
function findPages(
  options = {},
  directory = path.resolve(__dirname, '../../../../pages'),
  pages = []
) {
  fs.readdirSync(directory).forEach(item => {
    const itemPath = path.resolve(directory, item);
    const pathname = itemPath.replace(new RegExp(`\\${path.sep}`, 'g'), '/').replace(/^.*\/pages/, '').replace('.js', '');

    if (options.front && pathname.indexOf('/demos') === -1 && pathname.indexOf('/api') === -1) {
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

  return pages;
}

module.exports = {
  findPages,
  findPagesMarkdown,
  findComponents,
};
