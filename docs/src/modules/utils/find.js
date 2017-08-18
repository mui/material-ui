/* eslint-disable flowtype/require-valid-file-annotation */

const fs = require('fs');
const path = require('path');

const markdownRegex = /\.md$/;

function findPagesMarkdown(directory, pagesMarkdown = []) {
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

    let pathname = itemPath.replace(/^.*\/pages/, '').replace('.md', '');

    if (pathname.indexOf('/demos') === 0) {
      pathname = pathname.split('/').slice(0, 3).join('/');
    }

    pagesMarkdown.push({
      pathname,
      filename: itemPath,
    });
  });

  return pagesMarkdown;
}

const componentRegex = /^([A-Z][a-z]+)+\.js/;

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
const blackList = ['/.eslintrc', '/_document'];

function findPages(directory, options, pages = []) {
  fs.readdirSync(directory).forEach(item => {
    const itemPath = path.resolve(directory, item);
    const pathname = itemPath.replace(/^.*\/pages/, '').replace('.js', '');

    if (options.front && pathname.indexOf('/demos') === -1 && pathname.indexOf('/api') === -1) {
      return;
    }

    if (fs.statSync(itemPath).isDirectory()) {
      const children = [];
      pages.push({
        pathname,
        children,
      });
      findPages(itemPath, options, children);
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
